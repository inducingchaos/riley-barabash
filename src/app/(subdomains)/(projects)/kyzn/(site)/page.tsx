/**
 *
 */

import { AlteredLogo } from "~/components/svgs/brand/altered"

export default function Landing(): JSX.Element {
    return (
        <>
            <main className="flex flex-col items-center justify-center">
                <div className="container">
                    <section className="flex min-h-screen flex-col items-center justify-center">
                        <div className="flex w-full">
                            <div className="flex flex-col">
                                <p className="w-2/3 font-inter text-96px font-bold tracking-tight">{"Systems for creation."}</p>
                                <p className="w-2/3 font-inter text-96px font-bold tracking-tight">{"/altered"}</p>
                                <p className="w-2/3 text-96px font-bold tracking-tighter">{"/altered"}</p>
                                <p className="w-2/3 font-mono text-96px font-bold tracking-widest">{"/ altered"}</p>
                            </div>
                            <div className="flex w-1/3 items-center justify-center">
                                <AlteredLogo />
                                {/* <Cpu size={120} /> */}
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </>
    )
}
