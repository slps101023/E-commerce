// components/ui/field.tsx
import * as React from "react"
import { cn } from "@/lib/utils"

const Field = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn("flex flex-col gap-2", className)} {...props} />
    )
)
Field.displayName = "Field"

const FieldLabel = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
    ({ className, ...props }, ref) => (
        <label
            ref={ref}
            className={cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className)}
            {...props}
        />
    )
)
FieldLabel.displayName = "FieldLabel"

const FieldGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn("space-y-4", className)} {...props} />
    )
)
FieldGroup.displayName = "FieldGroup"

const FieldDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
    ({ className, ...props }, ref) => (
        <p ref={ref} className={cn("text-xs text-muted-foreground", className)} {...props} />
    )
)
FieldDescription.displayName = "FieldDescription"

const FieldError = ({ errors, className }: { errors: any[], className?: string }) => {
    if (!errors || errors.length === 0) return null
    return (
        <div className={cn("text-[10px] font-medium text-destructive", className)}>
            {errors.map((error, i) => (
                <p key={i}>{error?.message}</p>
            ))}
        </div>
    )
}

export { Field, FieldLabel, FieldGroup, FieldDescription, FieldError }