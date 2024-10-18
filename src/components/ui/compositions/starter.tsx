/**
 *
 */

import type { ReactNode } from "react"

export function Starter({ children }: { children?: ReactNode }): JSX.Element {
    return (
        <main className="flex flex-col items-center justify-center">
            <div className="container">
                <section className="flex min-h-screen flex-col items-center justify-center">
                    {children ?? <p>Hello, world!</p>}
                </section>
            </div>
        </main>
    )
}
