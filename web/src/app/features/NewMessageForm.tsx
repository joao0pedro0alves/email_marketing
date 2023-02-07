import { FormEvent } from 'react'
import { Check } from 'phosphor-react'

import { TextField } from '../components/TextField'
import { TextArea } from '../components/TextArea'
import { Checkbox } from '../components/Checkbox'
import { Label } from '../components/Label'
import { ContactsList } from './ContactsList'

export function NewMessageForm() {
    function createNewMessage(event: FormEvent) {
        event.preventDefault()
    }

    return (
        <form
            onSubmit={createNewMessage}
            className="h-full flex flex-col mt-6 gap-4"
        >
            <TextField
                type='text'
                label='Qual o título da mensagem?'
                autoFocus
                placeholder='ex.: Bem vindo, novo lançamento, etc...'
            />

            <TextArea
                type='text'
                label='Escreva a mensagem'
                placeholder='...'
            />

            <Checkbox
                size='medium' 
                label='Deseja enviar agora?'
                defaultChecked
            />

            <div className='mt-2'>
                <Label htmlFor=''>
                    Enviar para:
                </Label>

                <ContactsList />
            </div>

            <button
                type="submit"
                className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
            >
                <Check size={20} weight="bold" />
                Confirmar
            </button>
        </form>
    )
}
