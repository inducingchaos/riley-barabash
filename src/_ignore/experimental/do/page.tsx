/**
 *
 */

export default function Do(): JSX.Element {
    return (
        <>
            <main className="flex flex-col items-center justify-center bg-[hsl(0,0%,6.25%)]">
                <div className="container">
                    <section className="flex min-h-screen flex-col items-center justify-center">
                        <div className="-translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-rose-100/eighth to-transparent"></div>
                        {/* was text-60px */}
                        <p className="mt-64px py-128px text-64px font-bold text-[hsl(0,0%,75%)] dark:text-[hsl(0,0%,25%)]">
                            Give it your all.
                        </p>

                        <div className="flex justify-center rounded-8px bg-rose-100/[1%] p-16px ring-1 ring-inset ring-rose-100/[3%]">
                            <div className="">
                                <div className="relative isolate space-y-24px overflow-hidden rounded-16px bg-white/sixteenth p-16px shadow-black/sixteenth before:absolute before:inset-0px before:-translate-x-full before:animate-[shimmer_2s_infinite] before:border-t before:border-rose-100/eighth before:bg-gradient-to-r before:from-transparent before:via-rose-100/eighth before:to-transparent">
                                    {/* was text-60px */}
                                    <p className="text-64px font-bold text-[hsl(0,0%,75%)] dark:text-[hsl(0,0%,25%)]">
                                        {"Give it your all."}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex w-full flex-col gap-16px">
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
                                    className="group flex w-full items-center justify-center border-2x border-[hsl(0,0%,87.5%)] transition-all duration-half ease-out hover:border-red-500 dark:border-[hsl(0,0%,12.5%)] hover:dark:border-[hsl(0,0%,9.375%)]"
                                >
                                    {/* was text-18px */}
                                    <p className="w-full p-16px text-left text-16px text-[hsl(0,0%,75%)] transition-all duration-half ease-out hover:text-[hsl(0,0%,12.5%)] group-hover:-border-opacity-quarter dark:text-[hsl(0,0%,25%)] dark:hover:text-[hsl(0,0%,87.5%)]">
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
