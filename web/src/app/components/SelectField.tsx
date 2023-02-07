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

export function SelectField() {
    return (
        <Select.Root>
            <Select.Trigger className="SelectTrigger" aria-label="Food">
                <Select.Value placeholder="Select a fruit…" />
                <Select.Icon className="SelectIcon">
                    <CaretDown />
                </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
                <Select.Content className="SelectContent">
                    <Select.ScrollUpButton className="SelectScrollButton">
                        <CaretUp />
                    </Select.ScrollUpButton>
                    <Select.Viewport className="SelectViewport">
                        <Select.Group>
                            <Select.Label className="SelectLabel">
                                Fruits
                            </Select.Label>
                            <SelectItem value="apple">Apple</SelectItem>
                            <SelectItem value="banana">Banana</SelectItem>
                            <SelectItem value="blueberry">Blueberry</SelectItem>
                            <SelectItem value="grapes">Grapes</SelectItem>
                            <SelectItem value="pineapple">Pineapple</SelectItem>
                        </Select.Group>

                        <Select.Separator className="SelectSeparator" />

                        <Select.Group>
                            <Select.Label className="SelectLabel">
                                Vegetables
                            </Select.Label>
                            <SelectItem value="aubergine">Aubergine</SelectItem>
                            <SelectItem value="broccoli">Broccoli</SelectItem>
                            <SelectItem value="carrot" disabled>
                                Carrot
                            </SelectItem>
                            <SelectItem value="courgette">Courgette</SelectItem>
                            <SelectItem value="leek">leek</SelectItem>
                        </Select.Group>

                        <Select.Separator className="SelectSeparator" />

                        <Select.Group>
                            <Select.Label className="SelectLabel">
                                Meat
                            </Select.Label>
                            <SelectItem value="beef">Beef</SelectItem>
                            <SelectItem value="chicken">Chicken</SelectItem>
                            <SelectItem value="lamb">Lamb</SelectItem>
                            <SelectItem value="pork">Pork</SelectItem>
                        </Select.Group>
                    </Select.Viewport>
                    <Select.ScrollDownButton className="SelectScrollButton">
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
                className={clsx('SelectItem', className)}
                {...props}
                ref={forwardedRef}
            >
                <Select.ItemText>{children}</Select.ItemText>
                <Select.ItemIndicator className="SelectItemIndicator">
                    <CheckCircle />
                </Select.ItemIndicator>
            </Select.Item>
        )
    }
)
