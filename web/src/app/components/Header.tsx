import {PaperPlaneTilt, Plus, X} from "phosphor-react"
import * as Dialog from '@radix-ui/react-dialog'

import { NewMessageForm } from "../features/NewMessageForm"

export function Header() {
    return (
        <header className="w-full max-w-3xl mx-auto flex items-center justify-between p-6">
            <h1 className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 font-extrabold leading-tight text-5xl flex gap-4 items-center">
                <PaperPlaneTilt className="text-sky-400" weight="fill" />
                Newsletter
            </h1>

            <Dialog.Root>
                <Dialog.Trigger
                    type="button"
                    className="text-sky-500 border border-sky-500 font-semibold rounded-lg px-6 py-4 flex items-center gap-3 transition-all hover:ring-2 hover:ring-opacity-80 hover:ring-sky-500 focus:outline-none"
                >
                    <Plus size={20} />
                    Nova Mensagem
                </Dialog.Trigger>

                <Dialog.Portal>
                    <Dialog.Overlay className="w-screen h-screen bg-black/60 fixed inset-0" />

                    <Dialog.Content className="absolute p-10 bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-md min-h-[660px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <Dialog.Close className="absolute right-6 top-6 text-zinc-400 rounded-lg hover:text-zinc-500 focus:outline-none">
                            <X size={24} aria-label="Fechar" />
                        </Dialog.Close>

                        <Dialog.Title className="text-3xl leading-tight font-extrabold">
                            Nova Mensagem
                        </Dialog.Title>

                        <NewMessageForm />
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </header>
    )
}
