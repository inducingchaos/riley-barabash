/**
 * @file
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 */

import dynamic from "next/dynamic"

const IngestForm = dynamic(() => import("./IngestForm"), { ssr: false })

export default function Ingest(): JSX.Element {
    return (
        <main className="flex flex-col items-center justify-center">
            <div className="container">
                <section className="flex min-h-screen flex-col items-center justify-center">
                    <IngestForm />
                </section>
            </div>
        </main>
    )
}
