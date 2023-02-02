import path from 'path'
import fs from 'fs'
import handlebars from 'handlebars'
import { Options } from 'nodemailer/lib/mailer'

import { Message } from '@prisma/client'
import { transporter } from '../lib/mailer'

interface NewsletterMailParams extends Options {
    message: Message
    contact: {
        name: string
        email: string
    }
}

class NewsletterMail {
    key = 'NewsletterMail'

    async handle({ message, contact, ...options }: NewsletterMailParams) {
        const filePath = path.join(__dirname, '../emails/template.html')
        const source = fs.readFileSync(filePath, 'utf-8').toString()
        const template = handlebars.compile(source)

        const replacements = {
            name: contact.name,
            title: message.title,
            content: message.content,
        }

        const htmlToSend = template(replacements)

        transporter.sendMail({
            from: process.env.MAIL_SENDER,
            to: contact.email,
            subject: message.title,
            html: htmlToSend,
            ...options,
        })
    }
}

export default new NewsletterMail()
