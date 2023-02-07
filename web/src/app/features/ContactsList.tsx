import { useState } from 'react'
import { Checkbox } from '../components/Checkbox'

interface Contact {
    name: string
    email: string
}

const initialContacts: Contact[] = [
    { email: 'noemie.mackay@example.com', name: 'Name' },
    { email: 'samir.lambert@example.com', name: 'Name' },
    { email: 'shawn.rivera@example.com', name: 'Name' },
    { email: 'monica.green@example.com', name: 'Name' },
    { email: 'teresa.byrd@example.com', name: 'Name' },
    { email: 'buytur.vermenich@example.com', name: 'Name' },
    { email: 'stephanie.medina@example.com', name: 'Name' },
    { email: 'willie.hicks@example.com', name: 'Name' },
    { email: 'sander.drage@example.com', name: 'Name' },
    { email: 'daniel.rasmussen@example.com', name: 'Name' },
]

export function ContactsList() {
    const [contacts] = useState<Contact[]>(initialContacts)

    return (
        <div>
            <ul className="flex flex-col">
                <li className='py-2 mb-2 border-b-2 border-b-gray-800'>
                    <Checkbox size="medium" label="Todos" defaultChecked />
                </li>

                {contacts.map((contact) => (
                    <li className='py-1' key={`contact-${contact.email}`}>
                        <Checkbox
                            size="medium"
                            label={contact.email}
                            defaultChecked
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}
