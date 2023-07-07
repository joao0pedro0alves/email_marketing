import { CheckCircle, Timer } from 'phosphor-react'
import dayjs from 'dayjs'

interface MessageProps {
    data: {
        title: string
        content: string
        createdAt: Date
        invitedAt: Date | null
    }
}

export function Message({ data }: MessageProps) {

    const createdAt = dayjs(data.createdAt).format('DD [de] MMM, YYYY')

    return (
        <li className="p-4 w-full border-t border-gray-700 group">
            <div className="w-full grid grid-cols-2 items-center mb-3">
                <div className="flex items-center gap-4">
                    <strong className="whitespace-nowrap text-2xl transition-all group-hover:text-sky-500">
                        {data.title}
                    </strong>

                    <div className="w-1 h-1 rounded-full bg-gray-500 transition-all group-hover:w-2 group-hover:h-2 group-hover:bg-sky-500" />

                    <div className="flex items-center justify-center gap-2 text-gray-300 text-lg transition-all group-hover:text-sky-500">
                        <span>{createdAt}</span>
                    </div>
                </div>

                <div className="flex items-center justify-end">
                    {data.invitedAt ? (
                        <span className="font-semibold text-white bg-emerald-500 rounded-full py-1 px-3 flex items-center justify-center gap-2">
                            <CheckCircle weight="bold" size={20} />
                            Enviado
                        </span>
                    ) : (
                        <span className="font-semibold text-white bg-sky-500 rounded-full py-1 px-3 flex items-center justify-center gap-2">
                            <Timer weight="bold" size={20} />
                            Pendente
                        </span>
                    )}
                </div>
            </div>

            <p className="text-sm text-gray-400">
                {data.content}
            </p>
        </li>
    )
}
