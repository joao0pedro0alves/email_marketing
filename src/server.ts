import express from 'express'
import * as dotenv from 'dotenv'

import { transporter } from './lib/mailer'
import { sendNewsletter } from './jobs/sendNewsletter'

// Load enviroment variables...
dotenv.config()

// Initialize server instance
const app = express()

app.listen(3333, () => {
    console.log('Server is running on port 3333')

    // Initialize jobs
    transporter.verify((error) => {

        if (error) {
            console.log(error)
            process.exit(1)

        } else {
            console.log('Server is ready to take our messages')
            sendNewsletter()
        }
    })
})