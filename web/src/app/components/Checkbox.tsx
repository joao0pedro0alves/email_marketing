import * as CheckboxUI from "@radix-ui/react-checkbox"
import {Check} from "phosphor-react"
import clsx from "clsx"

interface CheckboxProps extends CheckboxUI.CheckboxProps {
    label: string
    size?: "medium" | "large"
    lineThroughLabel?: boolean
}

export function Checkbox({label, size, lineThroughLabel, ...rest}: CheckboxProps) {
    return (
        <CheckboxUI.Root className="flex items-center gap-3 group focus:outline-none disabled:cursor-not-allowed" {...rest}>
            <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-gray-900 border-2 border-gray-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors group-focus:ring-2 group-focus:ring-sky-600 group-focus:ring-offset-2 group-focus:ring-offset-background">
                <CheckboxUI.Indicator>
                    <Check weight="bold" size={20} className="text-white" />
                </CheckboxUI.Indicator>
            </div>

            <span
                className={clsx("text-white leading-tight", {
                    "font-semibold text-xl": size === "large",
                    "group-data-[state=checked]:line-through group-data-[state=checked]:text-gray-400":
                        lineThroughLabel,
                })}
            >
                {label}
            </span>
        </CheckboxUI.Root>
    )
}

Checkbox.defaultProps = {
    size: "large",
    lineThroughLabel: false,
} as CheckboxProps
