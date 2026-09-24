"use client"

import * as React from "react"
import { cn } from "cn"

interface RadioGroupContextValue {
  value?: string
  defaultValue?: string
  name?: string
  onValueChange?: (value: string) => void
}

const RadioGroupContext = React.createContext<RadioGroupContextValue>({})

function RadioGroup({
  className,
  value,
  defaultValue,
  name,
  onValueChange,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  value?: string
  defaultValue?: string
  name?: string
  onValueChange?: (value: string) => void
}) {
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const isControlled = value !== undefined
  const currentValue = isControlled ? value : internalValue

  const handleValueChange = (val: string) => {
    if (!isControlled) {
      setInternalValue(val)
    }
    onValueChange?.(val)
  }

  return (
    <RadioGroupContext.Provider
      value={{
        value: currentValue,
        defaultValue,
        name,
        onValueChange: handleValueChange,
      }}
    >
      <div
        role="radiogroup"
        className={cn("grid gap-2", className)}
        {...props}
      >
        {children}
      </div>
    </RadioGroupContext.Provider>
  )
}

function RadioGroupItem({
  className,
  value,
  id,
  disabled,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  value: string
}) {
  const context = React.useContext(RadioGroupContext)
  const isChecked = context.value === value

  return (
    <div className="relative inline-flex items-center">
      <input
        type="radio"
        id={id}
        name={context.name}
        value={value}
        checked={isChecked}
        disabled={disabled}
        onChange={() => context.onValueChange?.(value)}
        className="sr-only"
        {...props}
      />
      <div
        onClick={() => !disabled && context.onValueChange?.(value)}
        className={cn(
          "aspect-square size-4 shrink-0 rounded-full border border-primary text-primary shadow-xs transition-all cursor-pointer flex items-center justify-center focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
          isChecked ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground/40 bg-background",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
      >
        {isChecked && (
          <div className="size-2 rounded-full bg-background dark:bg-foreground" />
        )}
      </div>
    </div>
  )
}

export { RadioGroup, RadioGroupItem }
