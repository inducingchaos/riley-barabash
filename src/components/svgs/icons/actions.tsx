/**
 *
 */

"use client"

import { createSVG, type SVG } from "~/utils/data"

export const Spinner: SVG = createSVG(({ width, height, ...props }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width ?? "24"}
        height={height ?? "24"}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
))
