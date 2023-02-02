import schedule from 'node-schedule'
import SendNewsletterToContacts from '../../controllers/SendNewsletterToContacts'

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

    handle() {
        SendNewsletterToContacts.handle()
    }
}

export default new SendNewsletter()
