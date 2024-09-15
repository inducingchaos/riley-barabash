import { Loader2Icon } from "lucide-react"
import { Button, type ButtonProps } from "~/components/button"
import { cn } from "~/utils/ui"

export function LoaderButton({ children, isLoading, className, ...props }: ButtonProps & { isLoading: boolean }) {
    return (
        <Button disabled={isLoading} type="submit" {...props} className={cn("flex justify-center gap-2 px-3", className)}>
            {isLoading && <Loader2Icon className="h-4 w-4 animate-spin" />}
            {children}
        </Button>
    )
}
