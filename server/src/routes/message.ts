import { FastifyInstance } from "fastify"
import * as z from 'zod'

import NewsletterMail from "../jobs/NewsletterMail"
import { prisma } from "../lib/prisma"
import { resetTimestamp } from "../utils/resetTimestamp"

export async function messageRoutes(fastify: FastifyInstance) {
    fastify.post('/messages', async (request, reply) => {
        const createMessageBody = z.object({
            title: z.string(),
            content: z.string(),
            contacts: z.array(z.string().cuid()).min(1),
            inviteNow: z.boolean()
        })

        const { title, content, contacts: contactIds, inviteNow } = createMessageBody.parse(request.body)

        const today = resetTimestamp()

        const contacts = await prisma.contact.findMany({
            where: {
                id: {
                    in: contactIds
                }
            }
        })

        if (contacts.length === 0) {
            return reply.status(400).send({
                message: 'Contatos não cadastrados.',
            })
        }

        const newMessage = await prisma.message.create({
            data: {
                createdAt: today,
                content,
                title,
                contactMessages: {
                    create: contacts.map((contact) => ({
                        contact_id: contact.id
                    }))
                }
            }
        })
        
        if (inviteNow) {
            await Promise.all(
                contacts.map((contact) => {
                    NewsletterMail.handle({
                        message: newMessage,
                        contact,
                    })
                })
            )

            // Update invited_at
            await prisma.message.update({
                where: {
                    id: newMessage.id
                },
                data: {
                    invitedAt: today
                }
            })
        }

        return reply.send().status(201)
    })
}