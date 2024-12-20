import { motion } from "framer-motion"
import Link from "next/link"

import { MessageIcon, VercelIcon } from "./icons"

export const Overview = () => {
    return (
        <motion.div
            key="overview"
            // was mt-20
            className="mx-auto max-w-3xl md:mt-96px"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ delay: 0.5 }}
        >
            <div className="flex max-w-xl flex-col gap-32px rounded-12px p-24px text-center leading-relaxed">
                <p className="flex flex-row items-center justify-center gap-16px">
                    <VercelIcon size={32} />
                    <span>+</span>
                    <MessageIcon size={32} />
                </p>
                <p>
                    This is an{" "}
                    <Link
                        className="font-medium underline underline-offset-4"
                        href="https://github.com/vercel/ai-chatbot"
                        target="_blank"
                    >
                        open source
                    </Link>{" "}
                    chatbot template built with Next.js and the AI SDK by Vercel. It uses the{" "}
                    <code className="rounded-6px bg-main/sixteenth px-4px py-2px">streamText</code> function in the server and
                    the <code className="rounded-6px bg-main/sixteenth px-4px py-2px">useChat</code> hook on the client to
                    create a seamless chat experience.
                </p>
                <p>
                    You can learn more about the AI SDK by visiting the{" "}
                    <Link
                        className="font-medium underline underline-offset-4"
                        href="https://sdk.vercel.ai/docs"
                        target="_blank"
                    >
                        docs
                    </Link>
                    .
                </p>
            </div>
        </motion.div>
    )
}
