import { Label } from './Label'

interface TextAreaProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
    label?: string
}

export function TextArea({ label, ...props }: TextAreaProps) {
    return (
        <div className='w-full'>
            {label && (
                <Label htmlFor={props.id}>
                    {label}
                </Label>
            )}
            <textarea
                className="p-4 w-full rounded-lg mt-3 bg-gray-800 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:ring-offset-2 focus:ring-offset-gray-900"
                rows={5}
                maxLength={140}
                {...props}
            />
        </div>
    )
}
