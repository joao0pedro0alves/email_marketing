import { FastifyInstance } from 'fastify'
import * as z from 'zod'
import { prisma } from '../lib/prisma'

export async function contactRoutes(fastify: FastifyInstance) {
    fastify.get('/contacts', async () => {
        const contacts = await prisma.contact.findMany()
        return { contacts }
    })

    fastify.post('/contacts', async (request, reply) => {
        const createContactBody = z.object({
            name: z.string(),
            email: z.string().email()
        })

        const { name, email } = createContactBody.parse(request.body)

        await prisma.contact.create({
            data: {
                name,
                email,
            }
        })

        return reply.send().status(201)
    })

    fastify.post('/contacts/:id', async (request, reply) => {

        const updateContactParams = z.object({
            id: z.string().cuid(),
        })
        
        const updateContactBody = z.object({
            name: z.string(),
            email: z.string().email()
        })

        const { id } = updateContactParams.parse(request.params)
        const { name, email } = updateContactBody.parse(request.body)

        await prisma.contact.update({
            where: {
                id
            },
            data: {
                name,
                email,
            }
        })

        return reply.send().status(200)
    })

    fastify.get('/count/contacts', async () => {
        const count = await prisma.contact.count()
        return { count }
    })
}
