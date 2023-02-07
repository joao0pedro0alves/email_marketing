import { Header } from './app/components/Header'
import { MessagesList } from './app/features/MessagesList'

import './lib/dayjs'

export function App() {
    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <div className="bg-gray-800/80 border border-gray-700/50 shadow-lg rounded-lg w-full max-w-4xl flex flex-col gap-2 overflow-hidden">
                <Header />
                <MessagesList />
            </div>
        </div>
    )
}
