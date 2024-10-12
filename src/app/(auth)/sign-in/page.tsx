/**
 *
 */

"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { LucideLink } from "lucide-react"
import Link from "next/link"
import { redirect, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useServerAction } from "zsa-react"
import { Apple, Google, Spinner } from "~/components/svgs/icons"
import { Separator } from "~/components/ui/primitives/display"
import { Button, Form, FormControl, FormField, FormItem, FormMessage, Input } from "~/components/ui/primitives/inputs"
import { H3, Muted } from "~/components/ui/primitives/typography"
import { application } from "~/config"
import { useToast } from "~/hooks/ui"
import { signInAction } from "~/server/actions/auth"
import { Exception } from "~/meta"

const formSchema = z.object({
    email: z.string().email("Please enter a valid email address."),
    password: z.string().min(8, "Password must be at least 8 characters long.")
})

export default function SignIn(): JSX.Element {
    const searchParams = useSearchParams()
    const { toast } = useToast()

    const { execute: signIn, isPending } = useServerAction(signInAction, {
        onError({ err: error }) {
            const exception = new Exception(error)

            toast({
                title: exception.applyDefaults().info?.external?.label,
                description: exception.applyDefaults().info?.external?.message,
                variant: "destructive"
            })
        },

        onSuccess() {
            redirect(searchParams.get("search") ?? application.routing.paths.callbacks.auth.signIn)
        }
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = async ({ email, password }: z.infer<typeof formSchema>) => {
        await signIn({
            email,
            password
        })
    }

    return (
        <main className="flex flex-col items-center justify-center">
            <div className="container">
                <section className="flex h-screen flex-col items-center justify-center">
                    <div className="flex w-96 flex-col justify-center gap-6">
                        <div className="flex flex-col gap-3 text-center">
                            <H3>{"Sign In"}</H3>

                            <Muted className="px-8">
                                {"Sign in below to access your account. If this is your first time, you can "}

                                <Link
                                    href={application.routing.paths.pages.auth.signUp}
                                    className="underline underline-offset-4 hover:text-primary"
                                >
                                    {"create one here."}
                                </Link>
                            </Muted>
                        </div>

                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="flex flex-col items-center justify-center gap-3"
                            >
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormControl>
                                                <Input
                                                    placeholder="Email"
                                                    autoComplete="email"
                                                    disabled={isPending}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormControl>
                                                <Input
                                                    placeholder="Password"
                                                    type="password"
                                                    autoComplete="current-password"
                                                    disabled={isPending}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button className="w-full" type="submit" disabled={isPending}>
                                    {isPending ? (
                                        <div className="flex items-center justify-center gap-0.5">
                                            <Spinner className="mr-2 h-4 w-4 animate-spin" />
                                            {"Submitting..."}
                                        </div>
                                    ) : (
                                        <>{"Submit"}</>
                                    )}
                                </Button>
                                <Button asChild variant="link" className="w-full">
                                    <Link href="/sign-in/link">
                                        <LucideLink className="mr-2 h-4 w-4" />
                                        {"Sign in with Link"}
                                    </Link>
                                </Button>
                            </form>
                        </Form>

                        <div className="flex w-full items-center justify-center">
                            <Separator />
                            <Muted className="whitespace-nowrap px-2 uppercase">{"Or continue with"}</Muted>
                            <Separator />
                        </div>

                        <div className="flex flex-col items-center justify-center gap-2">
                            <div className="flex w-full flex-row items-center justify-center gap-2">
                                <form action={application.routing.paths.api.auth.oauth.apple} method="POST" className="w-full">
                                    <Button className="w-full" type="submit" variant="outline" disabled={isPending}>
                                        <Apple className="mr-2 h-4 w-4" />
                                        {"Apple"}
                                    </Button>
                                </form>

                                <form action={application.routing.paths.api.auth.oauth.google} method="POST" className="w-full">
                                    <Button className="w-full" type="submit" variant="outline" disabled={isPending}>
                                        <Google className="mr-2 h-4 w-4" />
                                        {"Google"}
                                    </Button>
                                </form>
                            </div>
                        </div>

                        <Button asChild variant="link">
                            <Link href="/reset-password">Forgot Password?</Link>
                        </Button>
                    </div>
                </section>
            </div>
        </main>
    )
}
