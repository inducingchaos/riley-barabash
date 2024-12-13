import { useEffect, useRef, type RefObject } from "react"

export function useScrollToBottom<T extends HTMLElement, W extends HTMLElement>(): [RefObject<T>, RefObject<W>] {
    const containerRef = useRef<T>(null)
    const endRef = useRef<W>(null)

    useEffect(() => {
        const container = containerRef.current
        const end = endRef.current

        if (container && end) {
            const observer = new MutationObserver(() => {
                end.scrollIntoView({ behavior: "instant", block: "end" })
            })

            observer.observe(container, {
                childList: true,
                subtree: true,
                attributes: true,
                characterData: true
            })

            return () => observer.disconnect()
        }
    }, [])

    return [containerRef, endRef]
}
