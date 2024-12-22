/**
 *
 */

"use client"

import { motion } from "framer-motion"
import { XStack } from "~/components/ui/layout/stacks"

export function AnimatedSections(): JSX.Element {
    return (
        <>
            <XStack expand className="h-screen bg-accent-neutral">
                <motion.div
                    variants={{
                        hidden: {
                            opacity: 0,
                            scale: 0.75,
                            filter: "blur(32px)"
                        },
                        visible: {
                            opacity: 1,
                            scale: 1,
                            filter: "blur(0px)"
                        }
                    }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{
                        duration: 1,
                        delay: 0.5,
                        ease: [0.125, 1, 0.25, 1]
                    }}
                >
                    <p className="font-serif text-32px text-accent-alternate">{"Do more."}</p>
                </motion.div>
            </XStack>

            <XStack expand className="h-screen bg-main">
                <motion.div
                    variants={{
                        off: {
                            opacity: 0.125
                        },
                        on: {
                            opacity: [0.125, 1, 0.75, 1, 0.5, 1]
                        }
                    }}
                    initial="off"
                    whileInView="on"
                    viewport={{ once: false }}
                    transition={{
                        duration: 0.5,
                        delay: 1,
                        times: [0, 0.2, 0.4, 0.6, 0.8, 1]
                    }}
                >
                    <h1 className="text-192px font-thin text-alternate">{"Don't wait."}</h1>
                </motion.div>
            </XStack>
        </>
    )
}
