import fastify from 'fastify'
import cors from '@fastify/cors'
import * as dotenv from 'dotenv'
// import { initializeJobs } from './jobs/scheduled'

import { contactRoutes } from './routes/contact'
import { messageRoutes } from './routes/message'

// Load enviroment variables...
dotenv.config()

async function bootstrap() {
    const app = fastify({
        logger: true
    })

    try {

        await app.register(cors, {
            origin: true
        })
    
        await app.register(contactRoutes)
        await app.register(messageRoutes)

        await app.listen({
            port: 3333,
        })

        // initializeJobs()

    } catch (error) {
        app.log.error(error)
        process.exit(1)
    }
}

bootstrap()