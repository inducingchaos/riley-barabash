"use client"

export const DocumentSkeleton = () => {
    return (
        <div className="flex w-full flex-col gap-4">
            <div className="rounded-lg bg-muted-foreground/20 h-12 w-1/2 animate-pulse" />
            <div className="rounded-lg bg-muted-foreground/20 h-5 w-full animate-pulse" />
            <div className="rounded-lg bg-muted-foreground/20 h-5 w-full animate-pulse" />
            <div className="rounded-lg bg-muted-foreground/20 h-5 w-1/3 animate-pulse" />
            <div className="rounded-lg h-5 w-52 animate-pulse bg-transparent" />
            <div className="rounded-lg bg-muted-foreground/20 h-8 w-52 animate-pulse" />
            <div className="rounded-lg bg-muted-foreground/20 h-5 w-2/3 animate-pulse" />
        </div>
    )
}
