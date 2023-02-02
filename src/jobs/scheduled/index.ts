import schedule from 'node-schedule'
import SendNewsletter from "./SendNewsletter"

export async function initializeJobs() {
    schedule.scheduleJob(SendNewsletter.rule, SendNewsletter.handle)
}