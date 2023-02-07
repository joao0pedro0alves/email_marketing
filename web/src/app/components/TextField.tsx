import { Label } from './Label'

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
}

export function TextField({ label, ...props }: TextFieldProps) {
    return (
        <div className='w-full'>
            {label && (
                <Label htmlFor={props.id}>
                    {label}
                </Label>
            )}
            <input
                className="p-4 w-full rounded-lg mt-3 bg-gray-800 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:ring-offset-2 focus:ring-offset-gray-900"
                {...props}
            />
        </div>
    )
}
