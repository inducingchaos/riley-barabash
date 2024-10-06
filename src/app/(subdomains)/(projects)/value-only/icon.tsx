import { ImageResponse } from "next/og"

// Image metadata
export const size = {
    width: 32,
    height: 32
}
export const contentType = "image/png"

// export const runtime = "edge";

// Image generation
export default async function Icon() {
    // const fontData = await fetch(new URL("../../../../../public/fonts/px-grotesk-regular.otf", import.meta.url)).then(res =>
    //     res.arrayBuffer()
    // )

    const font1 = await fetch(new URL("https://rileybarabash.com/fonts/px-grotesk-bold.otf"))

    if (!font1.ok) {
        throw new Error("Failed to fetch the font file")
    }

    const fontData1 = await font1.arrayBuffer()

    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    fontSize: 16,
                    fontFamily: "Px Grotesk",
                    background: "black",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontWeight: "bold"
                }}
            >
                V
            </div>
        ),
        // ImageResponse options
        {
            // For convenience, we can re-use the exported icons size metadata
            // config to also set the ImageResponse's width and height.
            ...size,
            fonts: [
                {
                    name: "Px Grotesk",
                    data: fontData1,
                    style: "normal"
                }
            ]
        }
    )
}
