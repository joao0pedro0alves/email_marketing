import schedule from 'node-schedule'
import * as dotenv from 'dotenv'

import { transporter } from './lib/mailer'
import { helloTemaplate } from './templates/hello'

dotenv.config()

type Contact = {
    name: string
    email: string
}

const contacts: Contact[] = [
    {name: 'Fulano 01', email: 'fulano01@gmail.com'},
    {name: 'Fulano 02', email: 'fulano02@gmail.com'}
]

function triggerSending(contact: Contact) {
    transporter.sendMail(
        {
            from: 'joao.alves@ecosis.com.br',
            to: contact.email,
            subject: `Hello ${contact.name}, how you do?`,
            text: '',
            html: helloTemaplate.generate(contact.name).toString(),
        },
        (error, info) => {
            if (error) {
                return console.log(error)
            }

            console.log('Message sent: %s', info.messageId)
        }
    )
}

function sendNewsletter(contacts: Contact[]) {

    const rule = new schedule.RecurrenceRule()
    rule.dayOfWeek = [new schedule.Range(1, 5)]
    rule.hour = 14
    rule.minute = 45
    rule.tz = 'UTC-03:00'

    const messageJob = schedule.scheduleJob(rule, () => {

        contacts.forEach(contact => {
            triggerSending(contact)
        })

        messageJob.cancel()
    })
}

// https://www.npmjs.com/package/node-schedule
transporter.verify((error) => {

    if (error) {
        console.log(error)
        process.exit(1)

    } else {
        console.log('Server is ready to take our messages')
        sendNewsletter(contacts)
    }
})