import schedule from 'node-schedule'
import dayjs from 'dayjs'

import { prisma } from '../../lib/prisma'
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

        const yesterday = dayjs().add(0, 'day').startOf('day').toDate()

        const [lastMessage] = await prisma.message.findMany({
            where: {
                createdAt: {
                    lte: yesterday
                }
            },
            include: {
                contactMessages: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        // Verificar se é uma mensagem agendada
        // Criar um campo invited_at
        // Caso a mensagem for agendada, enviar no próximo dia as 07:30 para os contatos cadastrados na mensagem

        if (lastMessage) {

            const contacts = await prisma.contact.findMany({
                where: {
                    id: {
                        in: lastMessage.contactMessages.map(cm => cm.contact_id)
                    }
                }
            })
    
            await Promise.all(
                contacts.map((contact) => {
                    return NewsletterMail.handle({ message: lastMessage, contact })
                })
            )
        }

    }
}

export default new SendNewsletter()
