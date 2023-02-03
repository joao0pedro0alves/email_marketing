import dayjs from 'dayjs'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const today = dayjs().startOf('day').toDate()
const yesterday = dayjs().add(-1, 'day').startOf('day').toDate()

async function run() {
    await prisma.contactMessage.deleteMany()
    await prisma.contact.deleteMany()
    await prisma.message.deleteMany()

    /**
     * Create contacts
     */
    const contacts = await Promise.all([
        prisma.contact.create({
            data: {
                email: 'fulano01@gmail.com',
                name: 'João Pedro',
            },
        }),

        prisma.contact.create({
            data: {
                email: 'fulano02@gmail.com',
                name: 'Rodrigo Santos',
            },
        }),

        prisma.contact.create({
            data: {
                email: 'fulano03@gmail.com',
                name: 'Jefferson Figueiredo',
            },
        }),
    ])

    const [firstContactId, secondContactId, thirdContactId] = contacts.map(
        (c) => c.id
    )

    /**
     * Create messages
     */
    await Promise.all([
        prisma.message.create({
            data: {
                createdAt: yesterday,
                title: 'Newsletter article #1',
                content:
                    'Mandeville carneiro robbins goas ross kelly ragan rodriguez stig jordan hodgekiss merlin yeaman.',
                contactMessages: {
                    create: [
                        { contact_id: firstContactId },
                        // { contact_id: secondContactId },
                        // { contact_id: thirdContactId },
                    ],
                },
            },
        }),

        prisma.message.create({
            data: {
                createdAt: today,
                title: 'Newsletter article #2',
                content:
                    'Mandeville carneiro robbins goas ross kelly ragan rodriguez stig jordan hodgekiss merlin yeaman.',
                contactMessages: {
                    create: [
                        { contact_id: firstContactId },
                        { contact_id: secondContactId },
                        { contact_id: thirdContactId },
                    ],
                },
            },
        }),

        prisma.message.create({
            data: {
                createdAt: today,
                title: 'Newsletter article #3',
                content:
                    'Mandeville carneiro robbins goas ross kelly ragan rodriguez stig jordan hodgekiss merlin yeaman',
            },
        }),
    ])
}

run()
