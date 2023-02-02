import { FastifyInstance } from "fastify"
import * as z from 'zod'
import NewsletterMail from "../jobs/NewsletterMail"

import { prisma } from "../lib/prisma"

export async function messageRoutes(fastify: FastifyInstance) {
    fastify.post('/messages', async (request, reply) => {
        const createMessageBody = z.object({
            title: z.string(),
            content: z.string(),
            contacts: z.array(z.string())
        })

        const { title, content, contacts: contactIds } = createMessageBody.parse(request.body)

        const newMessage = await prisma.message.create({
            data: {
                content,
                title,
                contactMessages: {
                    create: contactIds.map(contactId => ({
                        contact_id: contactId
                    }))
                }
            }
        })

        const contacts = await prisma.contact.findMany({
            where: {
                id: {
                    in: contactIds
                }
            }
        })
        
        await Promise.all(
            contacts.map((contact) => {
                NewsletterMail.handle({
                    message: newMessage,
                    contact,
                })
            })
        )

        return reply.send().status(200)
    })
}