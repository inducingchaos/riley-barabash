/**
 *
 */

"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Lock } from "lucide-react"
import Link from "next/link"
import { redirect, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useServerAction } from "zsa-react"
import { Spinner } from "~/components/svgs/icons"
import {
    Button,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input
} from "~/components/ui/primitives/inputs"
import { H3, Muted } from "~/components/ui/primitives/typography"
import { application } from "~/config"
import { useToast } from "~/hooks/ui"
import { signUpAction } from "~/server/actions/auth"

const formSchema = z
    .object({
        name: z.string().min(1, "A name is required."),
        email: z.string().email("Please enter a valid email address."),
        password: z.string().min(8, "Password must be at least 8 characters long."),
        passwordConfirmation: z.string().min(8, "Password must be at least 8 characters long.")
    })
    .refine(data => data.password === data.passwordConfirmation, {
        message: "Passwords don't match.",
        path: ["passwordConfirmation"]
    })

export default function SignUp(): JSX.Element {
    const searchParams = useSearchParams()
    const { toast } = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            passwordConfirmation: ""
        }
    })

    const { execute: signUp, isPending } = useServerAction(signUpAction, {
        onError({ err: error }) {
            toast({
                //  Fix.
                title: "Couldn't create account.",
                description: "The email provided is already in use.",
                variant: "destructive"
            })
        },

        onSuccess() {
            redirect(searchParams.get("search") ?? application.routing.paths.callbacks.auth.signIn)
        }
    })

    const onSubmit = async ({ name, email, password }: z.infer<typeof formSchema>) => {
        await signUp({
            name,
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
                            <H3>{"Sign Up"}</H3>

                            <Muted className="px-8">{"Fill out the details below to create an account."}</Muted>
                        </div>

                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="flex flex-col items-center justify-center gap-3"
                            >
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>{"Name"}</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="John Doe"
                                                    autoComplete="name"
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
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>{"Email"}</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="name@example.com
"
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
                                            <FormLabel>{"Password"}</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                                                    type="password"
                                                    autoComplete="new-password"
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
                                    name="passwordConfirmation"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>{"Confirm Password"}</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                                                    type="password"
                                                    autoComplete="new-password"
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

                                <Button asChild variant="link">
                                    <Link href="/sign-in">
                                        <Lock className="mr-2 h-4 w-4" />
                                        {"Go to Sign In"}
                                    </Link>
                                </Button>
                            </form>
                        </Form>
                    </div>
                </section>
            </div>
        </main>
    )
}
