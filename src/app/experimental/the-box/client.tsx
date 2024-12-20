"use client"

import { EssentialTextArea } from "~/_ignore/experimental/essential-text-area"
import { Stack } from "~/components/ui/layout/stacks"
// import { Button, TextArea } from "~/components/ui/primitives/inputs"

export default function TheBoxClient() {
    return (
        <Stack>
            <form className="flex w-[80vw] gap-8px">
                <div className="flex w-full flex-col">
                    {/* <TextArea placeholder="Your next thought..." /> */}
                    <EssentialTextArea
                        rows={{ min: 1, max: 4 }}
                        layoutReferences={{
                            lineHeight: 24,
                            paddingTop: 8,
                            paddingBottom: 8,
                            borderWidth: 2
                        }}
                        onEnter="submit"
                        className="w-full border px-16px py-8px"
                        placeholder="Your next thought..."
                    />
                </div>

                {/* <Button onClick={() => console.log("clicked")} className="self-stretch">
                    {">"}
                </Button> */}
            </form>
        </Stack>
    )
}
