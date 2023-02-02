import schedule from 'node-schedule'
import NewsletterMail from '../NewsletterMail'

const contacts = [
    { name: 'Fulano 01', email: 'fulano01@gmail.com' },
]

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
        await Promise.all(
            contacts.map((contact) => {
                return NewsletterMail.handle({ contact })
            })
        )
    }
}

export default new SendNewsletter()
