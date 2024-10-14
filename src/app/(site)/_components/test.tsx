/**
 *
 */

"use client"

import { motion } from "framer-motion"
import { type ReactNode } from "react"

export default function Test() {
    return (
        <div className="flex flex-col gap-8 p-8">
            {Array.from({ length: 100 }, (_, i) => (
                <FadeUp key={i} delay={0.25}>
                    <p>
                        {
                            "The quick brown fox jumps over the lazy dog. Beneath the starry sky, a gentle breeze whispers through the trees. In the distance, a lone wolf howls at the moon, its mournful cry echoing across the valley. As dawn breaks, the world awakens to a new day, full of endless possibilities and untold adventures."
                        }
                    </p>
                </FadeUp>
            ))}
        </div>
    )
}

export function FadeUp({ children, delay }: { children: ReactNode; delay?: number }) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 32 },
                visible: { opacity: 1, y: 0 }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 1, delay, ease: [0.125, 1, 0.25, 1] }}
        >
            {children}
        </motion.div>
    )
}
