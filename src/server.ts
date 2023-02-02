import fastify from 'fastify'
import * as dotenv from 'dotenv'
import { initializeJobs } from './jobs/scheduled'

// Load enviroment variables...
dotenv.config()

async function bootstrap() {
    const app = fastify({
        logger: true
    })

    try {
    
        await app.listen({
            port: 3333,
        })

        initializeJobs()

    } catch (error) {
        app.log.error(error)
        process.exit(1)
    }
}

bootstrap()