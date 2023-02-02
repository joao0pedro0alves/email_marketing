import express from 'express'
import * as dotenv from 'dotenv'
import { initializeJobs } from './jobs/scheduled'

// Load enviroment variables...
dotenv.config()

// Initialize server instance
const app = express()

app.listen(3333, () => {
    console.log('Server running on port 3333')
    initializeJobs()
})