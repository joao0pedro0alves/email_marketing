import schedule from 'node-schedule'
import dayjs from 'dayjs'

import { prisma } from '../../lib/prisma'
import { resetTimestamp } from '../../utils/resetTimestamp'
import NewsletterMail from '../NewsletterMail'

class SendNewsletter {
    key = 'SendNewsletter'
    rule = new schedule.RecurrenceRule()

    constructor() {
        
        // On weekdays at 7:30AM
        this.rule.dayOfWeek = [new schedule.Range(1, 5)]
        this.rule.hour = 7
        this.rule.minute = 30
        this.rule.tz = 'UTC-03:00'
    }

    async handle() {

        const yesterday = resetTimestamp(dayjs().add(-1, 'day'))
        const today = resetTimestamp()

        const [lastMessage] = await prisma.message.findMany({
            where: {
                createdAt: {
                    equals: yesterday
                },
                invitedAt: {
                    equals: null
                }
            },
            include: {
                contactMessages: {
                    select: {
                        contact_id: true
                    }
                }
            },
        })

        // Verificar se é uma mensagem agendada
        // Criar um campo invited_at
        // Caso a mensagem for agendada, enviar no próximo dia as 07:30 para os contatos cadastrados na mensagem

        if (lastMessage) {

            const contacts = await prisma.contact.findMany({
                where: {
                    id: {
                        in: lastMessage.contactMessages.map(cm => cm.contact_id)
                    },
                    active: {
                        equals: true
                    }
                }
            })

            await Promise.all(
                contacts.map((contact) => {
                    return NewsletterMail.handle({ message: lastMessage, contact })
                })
            )

            // Update invited_at

            await prisma.message.update({
                where: {
                    id: lastMessage.id
                },
                data: {
                    invitedAt: today
                }
            })
        }

    }
}

export default new SendNewsletter()
