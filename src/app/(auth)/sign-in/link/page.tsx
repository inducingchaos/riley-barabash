/**
 *
 */

"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { KeyRound } from "lucide-react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useServerAction } from "zsa-react"
import { Spinner } from "~/components/svgs/icons"
import { Button, Form, FormControl, FormField, FormItem, FormMessage, Input } from "~/components/ui/primitives/inputs"
import { H3, Muted } from "~/components/ui/primitives/typography"
import { useToast } from "~/hooks/ui"
import { Exception } from "~/meta"
import { signInWithMagicLinkAction } from "~/server/actions/auth"

const formSchema = z.object({
    email: z.string().email("Please enter a valid email address.")
})

export default function SignInWithLink(): JSX.Element {
    // const searchParams = useSearchParams()
    const { toast } = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: ""
        }
    })

    const {
        execute: sendLink,
        isPending,
        isSuccess
    } = useServerAction(signInWithMagicLinkAction, {
        onError({ err: error }) {
            const exception = new Exception(error)

            toast({
                title: exception.applyDefaults().info?.external?.label,
                description: exception.applyDefaults().info?.external?.message,
                variant: "destructive"
            })
        }
    })

    const onSubmit = async ({ email }: z.infer<typeof formSchema>) => {
        await sendLink({
            email
        })
    }

    return (
        <main className="flex flex-col items-center justify-center">
            <div className="container">
                <section className="flex h-screen flex-col items-center justify-center">
                    <div className="flex w-96 flex-col justify-center gap-6">
                        <div className="flex flex-col gap-3 text-center">
                            <H3>{"Sign in with Link"}</H3>

                            {!isSuccess ? (
                                <Muted className="px-8">{"Enter your email below and we'll send you a link to sign in."}</Muted>
                            ) : (
                                <Muted className="px-8">{"A sign-in link was sent to your email."}</Muted>
                            )}
                        </div>

                        {!isSuccess && (
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

                                    <Button className="w-full" type="submit" disabled={isPending}>
                                        {isPending ? (
                                            <div className="flex items-center justify-center gap-0.5">
                                                <Spinner className="mr-2 h-4 w-4 animate-spin" />
                                                {"Submitting..."}
                                            </div>
                                        ) : (
                                            <>{"Get Link"}</>
                                        )}
                                    </Button>
                                </form>
                            </Form>
                        )}

                        <Button asChild variant="link">
                            {!isSuccess ? (
                                <Link href="/sign-in">
                                    <KeyRound className="mr-2 h-4 w-4" />
                                    {"Use Password"}
                                </Link>
                            ) : (
                                <Link href="/">{"Go Back"}</Link>
                            )}
                        </Button>
                    </div>
                </section>
            </div>
        </main>
    )
}
