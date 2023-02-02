import path from 'path'
import fs from 'fs'
import handlebars from 'handlebars'

import { transporter } from '../lib/mailer'

interface NewsletterMailParams {
    contact: {
        name: string
        email: string
    }
}

class NewsletterMail {
    key = 'NewsletterMail'

    async handle({ contact }: NewsletterMailParams) {
        const filePath = path.join(__dirname, '../emails/template.html')
        const source = fs.readFileSync(filePath, 'utf-8').toString()
        const template = handlebars.compile(source)

        const replacements = {
            username: contact.name,
        }

        const htmlToSend = template(replacements)

        transporter.sendMail({
            from: process.env.MAIL_SENDER,
            to: contact.email,
            subject: `Hello ${contact.name}, how you do?`,
            html: htmlToSend,
        })
    }
}

export default new NewsletterMail()