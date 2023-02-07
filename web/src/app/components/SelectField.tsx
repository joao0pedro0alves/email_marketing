import { forwardRef, ReactNode } from 'react'
import clsx from 'clsx'
import * as Select from '@radix-ui/react-select'
import { CheckCircle, CaretDown, CaretUp } from 'phosphor-react'

interface SelectItemProps {
    children: ReactNode
    value: string
    className?: string
    disabled?: boolean
}

interface SelectFieldProps {
    'aria-label'?: string
    placeholder: string
    options: {
        value: string
        label: string
    }[]
}

export function SelectField({
    placeholder,
    options,
    ...props
}: SelectFieldProps) {
    return (
        <Select.Root>
            <Select.Trigger
                className="inline-flex items-center justify-between gap-1 rounded-lg p-4 w-full h-14 bg-gray-800 transition-colors hover:bg-gray-700"
                aria-label={props['aria-label']}
            >
                <Select.Value placeholder={placeholder} />
                <Select.Icon>
                    <CaretDown size={20} />
                </Select.Icon>
            </Select.Trigger>

            <Select.Portal>
                <Select.Content className="overflow-hidden bg-gray-800 border border-gray-700 rounded-lg shadow-2xl">
                    <Select.ScrollUpButton className="flex items-center justify-center h-6 cursor-default">
                        <CaretUp />
                    </Select.ScrollUpButton>

                    <Select.Viewport className="p-4">
                        <Select.Group>
                            {options.map((option) => (
                                <SelectItem
                                    key={`option-${option.value}`}
                                    value={option.value}
                                >
                                    {option.label}
                                </SelectItem>
                            ))}
                        </Select.Group>
                    </Select.Viewport>

                    <Select.ScrollDownButton className="flex items-center justify-center h-6 cursor-default">
                        <CaretDown />
                    </Select.ScrollDownButton>
                </Select.Content>
            </Select.Portal>
        </Select.Root>
    )
}

const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
    ({ children, className, ...props }, forwardedRef) => {
        return (
            <Select.Item
                className={clsx(
                    'leading-none px-4 p-2 relative select-none rounded-lg transition-colors hover:bg-gray-700',
                    'data-[disabled]:text-gray-500',
                    className
                )}
                {...props}
                ref={forwardedRef}
            >
                <Select.ItemText>{children}</Select.ItemText>
            </Select.Item>
        )
    }
)
