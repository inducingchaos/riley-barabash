/**
 *
 */

export default function Do(): JSX.Element {
    return (
        <>
            <main className="flex flex-col items-center justify-center bg-[hsl(0,0%,6.25%)]">
                <div className="container">
                    <section className="flex min-h-screen flex-col items-center justify-center">
                        <div className="[...] -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-rose-100/10 to-transparent"></div>
                        <p className="mt-16 py-32 text-60 font-bold text-[hsl(0,0%,75%)] dark:text-[hsl(0,0%,25%)]">
                            Give it your all.
                        </p>

                        <div className="rounded-lg flex justify-center bg-rose-100/[1%] p-4 ring-1 ring-inset ring-rose-100/[3%]">
                            <div className="">
                                <div className="rounded-2xl relative isolate space-y-5 overflow-hidden bg-white/5 p-4 shadow-xl shadow-black/5 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:border-t before:border-rose-100/10 before:bg-gradient-to-r before:from-transparent before:via-rose-100/10 before:to-transparent">
                                    <p className="text-60 font-bold text-[hsl(0,0%,75%)] dark:text-[hsl(0,0%,25%)]">
                                        {"Give it your all."}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex w-full flex-col gap-4">
                            {[
                                "Implement user authentication system",
                                "Design and implement database schema",
                                "Create RESTful API endpoints",
                                "Implement front-end state management",
                                "Develop responsive UI components",
                                "Set up continuous integration and deployment",
                                "Implement error handling and logging",
                                "Optimize application performance",
                                "Write unit and integration tests",
                                "Implement data visualization features"
                            ].map((task, index) => (
                                <div
                                    key={index}
                                    className="ease-out-expo group flex w-full items-center justify-center border-2 border-[hsl(0,0%,87.5%)] transition-all duration-500 hover:border-red-500 dark:border-[hsl(0,0%,12.5%)] hover:dark:border-[hsl(0,0%,9.375%)]"
                                >
                                    <p className="ease-out-expo w-full p-4 text-left text-18 text-[hsl(0,0%,75%)] transition-all duration-500 hover:text-[hsl(0,0%,12.5%)] group-hover:border-opacity-75 dark:text-[hsl(0,0%,25%)] dark:hover:text-[hsl(0,0%,87.5%)]">
                                        Upcoming task: {task}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </>
    )
}
