import Link from "next/link"
import React, { memo } from "react"
import ReactMarkdown, { type Components } from "react-markdown"
import remarkGfm from "remark-gfm"

const NonMemoizedMarkdown = ({ children }: { children: string }) => {
    const components: Partial<Components> = {
        // @ts-expect-error ???
        code: ({ _node, inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className ?? "")
            return !inline && match ? (
                // @ts-expect-error ???
                <pre
                    {...props}
                    className={`${className} text-14 rounded-lg mt-2 w-[80dvw] overflow-x-scroll bg-zinc-100 p-3 dark:bg-zinc-800 md:max-w-[500px]`}
                >
                    <code className={match[1]}>{children}</code>
                </pre>
            ) : (
                <code className={`${className} text-14 rounded-md bg-zinc-100 px-1 py-0.5 dark:bg-zinc-800`} {...props}>
                    {children}
                </code>
            )
        },
        ol: ({ node: _node, children, ...props }) => {
            return (
                <ol className="ml-4 list-outside list-decimal" {...props}>
                    {children}
                </ol>
            )
        },
        li: ({ node: _node, children, ...props }) => {
            return (
                <li className="py-1" {...props}>
                    {children}
                </li>
            )
        },
        ul: ({ node: _node, children, ...props }) => {
            return (
                <ul className="ml-4 list-outside list-decimal" {...props}>
                    {children}
                </ul>
            )
        },
        strong: ({ node: _node, children, ...props }) => {
            return (
                <span className="font-semibold" {...props}>
                    {children}
                </span>
            )
        },
        a: ({ node: _node, children, ...props }) => {
            return (
                // @ts-expect-error ???
                <Link className="text-blue-500 hover:underline" target="_blank" rel="noreferrer" {...props}>
                    {children}
                </Link>
            )
        },
        h1: ({ node: _node, children, ...props }) => {
            return (
                <h1 className="text-30 mb-2 mt-6 font-semibold" {...props}>
                    {children}
                </h1>
            )
        },
        h2: ({ node: _node, children, ...props }) => {
            return (
                <h2 className="text-24 mb-2 mt-6 font-semibold" {...props}>
                    {children}
                </h2>
            )
        },
        h3: ({ node: _node, children, ...props }) => {
            return (
                <h3 className="text-20 mb-2 mt-6 font-semibold" {...props}>
                    {children}
                </h3>
            )
        },
        h4: ({ node: _node, children, ...props }) => {
            return (
                <h4 className="text-18 mb-2 mt-6 font-semibold" {...props}>
                    {children}
                </h4>
            )
        },
        h5: ({ node: _node, children, ...props }) => {
            return (
                <h5 className="mb-2 mt-6 text-16 font-semibold" {...props}>
                    {children}
                </h5>
            )
        },
        h6: ({ node: _node, children, ...props }) => {
            return (
                <h6 className="text-14 mb-2 mt-6 font-semibold" {...props}>
                    {children}
                </h6>
            )
        }
    }

    return (
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
            {children}
        </ReactMarkdown>
    )
}

export const Markdown = memo(NonMemoizedMarkdown, (prevProps, nextProps) => prevProps.children === nextProps.children)
