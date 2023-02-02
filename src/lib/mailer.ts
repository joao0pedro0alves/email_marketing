import nodemailer from 'nodemailer'
import * as dotenv from 'dotenv'

dotenv.config()

export const transporter = nodemailer.createTransport({
    // from: process.env.MAIL_SENDER,
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    },
})