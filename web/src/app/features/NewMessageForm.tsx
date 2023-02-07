import { FormEvent } from 'react'
import * as Tabs from '@radix-ui/react-tabs'
import { Check } from 'phosphor-react'

import { TextField } from '../components/TextField'
import { TextArea } from '../components/TextArea'
import { Checkbox } from '../components/Checkbox'
import { ContactsList } from './ContactsList'

export function NewMessageForm() {
    function createNewMessage(event: FormEvent) {
        event.preventDefault()
    }

    return (
        <Tabs.Root
            defaultValue='tab1'
            className='flex flex-col'
        >

            <Tabs.List className="flex-shrink-0 my-6 flex border-b border-b-gray-700" aria-label="Create new message">
                <Tabs.Trigger 
                    value="tab1"
                    className="text-gray-200 py-0 px-5 h-11 flex-1 flex items-center justify-center font-semibold leading-none select-none transition-colors hover:text-white data-[state='active']:bg-gray-800 focus:shadow-gray-400" 
                >
                    Conteúdo
                </Tabs.Trigger>
                <Tabs.Trigger 
                    value="tab2"
                    className="text-gray-200 py-0 px-5 h-11 flex-1 flex items-center justify-center font-semibold leading-none select-none transition-colors hover:text-white data-[state='active']:bg-gray-800 focus:shadow-gray-400" 
                >
                    Enviar para
                </Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content className="TabsContent" value="tab1">
                <form
                    onSubmit={createNewMessage}
                    className="h-full flex flex-col gap-4"
                >
                    <TextField
                        type="text"
                        label="Qual o título da mensagem?"
                        autoFocus
                        placeholder="ex.: Bem vindo, novo lançamento, etc..."
                    />

                    <TextArea
                        type="text"
                        label="Escreva a mensagem"
                        placeholder="..."
                    />

                    <Checkbox
                        size="medium"
                        label="Deseja enviar agora?"
                        defaultChecked
                    />

                    <button
                        type="submit"
                        className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
                    >
                        <Check size={20} weight="bold" />
                        Confirmar
                    </button>
                </form>
            </Tabs.Content>

            <Tabs.Content value="tab2">
                <ContactsList />
            </Tabs.Content>
        </Tabs.Root>
    )
}
