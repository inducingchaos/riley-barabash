import { Geist, Geist_Mono, Inter } from "next/font/google"
import localFont from "next/font/local"

export const pxGrotesk = localFont({
    src: [
        {
            path: "../../public/shared/typefaces/px-grotesk-trial/thin.otf",
            weight: "100",
            style: "normal"
        },
        {
            path: "../../public/shared/typefaces/px-grotesk-trial/thin-italic.otf",
            weight: "100",
            style: "italic"
        },

        {
            path: "../../public/shared/typefaces/px-grotesk-trial/light.otf",
            weight: "300",
            style: "normal"
        },
        {
            path: "../../public/shared/typefaces/px-grotesk-trial/light-italic.otf",
            weight: "300",
            style: "italic"
        },

        {
            path: "../../public/shared/typefaces/px-grotesk/regular.otf",
            weight: "400",
            style: "normal"
        },
        // {
        //     path: "../../public/shared/typefaces/px-grotesk-trial/regular-italic.otf",
        //     weight: "400",
        //     style: "italic"
        // },

        {
            path: "../../public/shared/typefaces/px-grotesk/bold.otf",
            weight: "700",
            style: "normal"
        },
        // {
        //     path: "../../public/shared/typefaces/px-grotesk-trial/bold-italic.otf",
        //     weight: "700",
        //     style: "italic"
        // },

        {
            path: "../../public/shared/typefaces/px-grotesk-trial/black.otf",
            weight: "900",
            style: "normal"
        },
        {
            path: "../../public/shared/typefaces/px-grotesk-trial/black-italic.otf",
            weight: "900",
            style: "italic"
        }
    ],
    variable: "--font-px-grotesk"
})

export const pxGroteskMono = localFont({
    src: [
        {
            path: "../../public/shared/typefaces/px-grotesk-mono-trial/light.otf",
            weight: "300",
            style: "normal"
        },
        {
            path: "../../public/shared/typefaces/px-grotesk-mono-trial/light-italic.otf",
            weight: "300",
            style: "italic"
        },

        {
            path: "../../public/shared/typefaces/px-grotesk-mono/regular.otf",
            weight: "400",
            style: "normal"
        }
        // {
        //     path: "../../public/shared/typefaces/px-grotesk-mono-trial/regular-italic.otf",
        //     weight: "400",
        //     style: "italic"
        // },

        // {
        //     path: "../../public/shared/typefaces/px-grotesk-mono-trial/bold.otf",
        //     weight: "700",
        //     style: "normal"
        // },
        // {
        //     path: "../../public/shared/typefaces/px-grotesk-mono-trial/bold-italic.otf",
        //     weight: "700",
        //     style: "italic"
        // }
    ],
    variable: "--font-px-grotesk-mono"
})

export const hoeflerText = localFont({
    src: [
        {
            path: "../../public/shared/typefaces/hoefler-text/regular.ttf",
            weight: "400",
            style: "normal"
        },
        {
            path: "../../public/shared/typefaces/hoefler-text/regular-italic.ttf",
            weight: "400",
            style: "italic"
        },

        {
            path: "../../public/shared/typefaces/hoefler-text/black.ttf",
            weight: "900",
            style: "normal"
        },
        {
            path: "../../public/shared/typefaces/hoefler-text/black-italic.ttf",
            weight: "900",
            style: "italic"
        }
    ],
    variable: "--font-hoefler-text"
})

export const saans = localFont({
    src: "../../public/shared/typefaces/saans/variable.woff2",
    variable: "--font-saans"
})

export const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter"
})

export const geist = Geist({
    subsets: ["latin"],
    variable: "--font-geist"
})

export const geistMono = Geist_Mono({
    subsets: ["latin"],
    variable: "--font-geist-mono"
})
