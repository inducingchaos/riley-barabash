import type { Attachment } from "ai"

import { LoaderIcon } from "./icons"

export const PreviewAttachment = ({ attachment, isUploading = false }: { attachment: Attachment; isUploading?: boolean }) => {
    const { name, url, contentType } = attachment

    return (
        <div className="flex flex-col gap-8px">
            {/* was w-96px */}
            <div className="relative flex aspect-video h-64px w-96px flex-col items-center justify-center rounded-6px bg-main/sixteenth">
                {contentType ? (
                    contentType.startsWith("image") ? (
                        // NOTE: it is recommended to use next/image for images
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            key={url}
                            src={url}
                            alt={name ?? "An image attachment"}
                            className="size-full rounded-6px object-cover"
                        />
                    ) : (
                        <div className="" />
                    )
                ) : (
                    <div className="" />
                )}

                {isUploading && (
                    <div className="absolute animate-spin text-zinc-500">
                        <LoaderIcon />
                    </div>
                )}
            </div>
            <div className="max-w-64px truncate text-12px text-zinc-500">{name}</div>
        </div>
    )
}
