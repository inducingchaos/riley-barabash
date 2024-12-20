import { memo, type SetStateAction } from "react"
import { Button } from "~/components/ui/primitives/inputs"
import { type UIBlock } from "./block"
import { CrossIcon } from "./icons"

type BlockCloseButtonProps = {
    setBlock: (value: SetStateAction<UIBlock>) => void
}

function PureBlockCloseButton({ setBlock }: BlockCloseButtonProps) {
    return (
        <Button
            style="outline"
            className="h-fit p-8px dark:hover:bg-zinc-700"
            onClick={() => {
                setBlock(currentBlock => ({
                    ...currentBlock,
                    isVisible: false
                }))
            }}
        >
            <CrossIcon size={18} />
        </Button>
    )
}

export const BlockCloseButton = memo(PureBlockCloseButton, () => true)
