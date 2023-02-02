import schedule from 'node-schedule'
import SendNewsletter from "./SendNewsletter"

export function initializeJobs() {
    schedule.scheduleJob(SendNewsletter.rule, SendNewsletter.handle)
}