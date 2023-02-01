import path from 'path'
import fs from 'fs'
import schedule from 'node-schedule'
import handlebars from 'handlebars'

import {transporter} from '../lib/mailer'

type Contact = {
    name: string
    email: string
}

const contacts: Contact[] = [
    {name: 'Fulano 01', email: 'fulano01@gmail.com'},
    {name: 'Fulano 02', email: 'fulano02@gmail.com'}
]

function triggerSending(contact: Contact) {

    const filePath = path.join(__dirname, '../emails/template.html')
    const source = fs.readFileSync(filePath, 'utf-8').toString()
    const template = handlebars.compile(source)

    const replacements = {
        username: contact.name
    }

    const htmlToSend = template(replacements)

    transporter.sendMail({
        from: 'joao.alves@ecosis.com.br',
        to: contact.email,
        subject: `Hello ${contact.name}, how you do?`,
        text: '',
        html: htmlToSend
    })
}

export function sendNewsletter() {

    const rule = new schedule.RecurrenceRule()
    rule.dayOfWeek = [new schedule.Range(1, 5)]
    rule.hour = 15
    rule.minute = 48
    rule.tz = 'UTC-03:00'

    const messageJob = schedule.scheduleJob(rule, () => {

        contacts.forEach(contact => {
            console.log(`Sending to ${contact.name}`)
            triggerSending(contact)
        })

        messageJob.cancel()
    })
}