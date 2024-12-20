"use client"

export const DocumentSkeleton = () => {
    return (
        <div className="flex w-full flex-col gap-16px">
            <div className="h-48px w-1/2 animate-pulse rounded-8px bg-main/eighth" />

            {/* each was h-24px */}
            <div className="h-24px w-full animate-pulse rounded-8px bg-main/eighth" />
            <div className="h-24px w-full animate-pulse rounded-8px bg-main/eighth" />
            <div className="h-24px w-1/3 animate-pulse rounded-8px bg-main/eighth" />
            {/* was w-192px */}
            <div className="h-24px w-192px animate-pulse rounded-8px bg-transparent" />
            {/* was w-192px */}
            <div className="h-32px w-192px animate-pulse rounded-8px bg-main/eighth" />
            <div className="h-24px w-2/3 animate-pulse rounded-8px bg-main/eighth" />
        </div>
    )
}
