import path from 'path'
import fs from 'fs'
import handlebars from 'handlebars'
import { Attachment, Options } from 'nodemailer/lib/mailer'

import { Message } from '@prisma/client'
import { transporter } from '../lib/mailer'
import { randomIntFromInterval } from '../utils/randomIntFromInterval'

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
        const filePath = path.join(__dirname, '../emails/newsletter.html')
        const attachPath = path.join(__dirname, '../emails/assets')

        const source = fs.readFileSync(filePath, 'utf-8').toString()
        const template = handlebars.compile(source)

        const replacements = {
            name: contact.name,
            title: message.title,
            content: message.content,
        }

        const htmlToSend = template(replacements)

        const randomBannerFilename = `banner-${randomIntFromInterval(1, 3)}.png`
        const attachments: Attachment[] = [
            {
                filename: randomBannerFilename,
                path: `${attachPath}/${randomBannerFilename}`,
                cid: "@banner"
            },
            {
                filename: 'stripo-logo.png',
                path: `${attachPath}/stripo-logo.png`,
                cid: "@stripologo"
            },
            {
                filename: 'icon-header.png',
                path: `${attachPath}/icon-header.png`,
                cid: "@iconheader"
            },
            {
                filename: 'icon-footer.png',
                path: `${attachPath}/icon-footer.png`,
                cid: "@iconfooter"
            }
        ]

        transporter.sendMail({
            from: process.env.MAIL_SENDER,
            to: contact.email,
            subject: message.title,
            html: htmlToSend,
            attachments,
            ...options,
        })
    }
}

export default new NewsletterMail()
