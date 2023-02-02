import NewsletterMail from "../jobs/NewsletterMail"

const contacts = [
    {name: 'Fulano 01', email: 'fulano01@gmail.com'},
]

class SendNewsletterToContacts {
    async handle() {

        // Fetch db contacts...

        await Promise.all(contacts.map(contact => {
            return NewsletterMail.handle({contact})
        }))
    }
}

export default new SendNewsletterToContacts()