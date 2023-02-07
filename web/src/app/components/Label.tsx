import clsx from 'clsx'

export function Label({
    children,
    ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
    return (
        <label
            {...props}
            className={clsx('font-semibold leading-tight', props.className)}
        >
            {children}
        </label>
    )
}
