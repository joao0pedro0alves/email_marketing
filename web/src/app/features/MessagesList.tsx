import { CaretRight } from "phosphor-react"
import { Message } from "../components/Message"

export function MessagesList() {
    return (
        <div className="w-full">
            <ul className="flex flex-col">
                <Message 
                    data={{
                        title: "Hello",
                        content: "Olá contatos, é com muito prazer que venho comunicar a vocês que a plataforma está funcionando.",
                        createdAt: new Date(),
                        invitedAt: new Date(),
                    }}
                />
                <Message 
                    data={{
                        title: "Bye",
                        content: "Desejo a vocês um execelente dia.",
                        createdAt: new Date(),
                        invitedAt: null
                    }}
                />
            </ul>

            <div className="w-full p-6 flex items-center justify-end">
                <button className="text-lg font-bold text-white flex gap-2 items-center hover:text-zinc-200 transition-colors">
                    Ver todas
                    <CaretRight />
                </button>
            </div>
        </div>
    )
}