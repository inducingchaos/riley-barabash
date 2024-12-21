/**
 *
 */

"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { KeyRound } from "lucide-react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { useServerAction } from "zsa-react"
import { Spinner } from "~/components/svgs/icons"
import { Button, Form, FormControl, FormField, FormItem, FormMessage, Input } from "~/components/ui/primitives/inputs"
import { H3, Muted } from "~/components/ui/primitives/typography"
import { Exception } from "~/meta"
import { signInWithMagicLinkAction } from "~/server/actions/auth"

const formSchema = z.object({
    email: z.string().email("Please enter a valid email address.")
})

export default function SignInWithLink(): JSX.Element {
    // const searchParams = useSearchParams()

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

            toast.error(exception.applyDefaults().info?.external?.label, {
                description: exception.applyDefaults().info?.external?.message
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
                    <div className="flex w-384px flex-col justify-center gap-24px">
                        <div className="flex flex-col gap-12px text-center">
                            <H3>{"Sign in with Link"}</H3>

                            {!isSuccess ? (
                                <Muted className="px-32px">
                                    {"Enter your email below and we'll send you a link to sign in."}
                                </Muted>
                            ) : (
                                <Muted className="px-32px">{"A sign-in link was sent to your email."}</Muted>
                            )}
                        </div>

                        {!isSuccess && (
                            <Form {...form}>
                                <form
                                    onSubmit={form.handleSubmit(onSubmit)}
                                    className="flex flex-col items-center justify-center gap-12px"
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
                                            <div className="flex items-center justify-center gap-2px">
                                                <Spinner className="mr-8px size-16px animate-spin" />
                                                {"Submitting..."}
                                            </div>
                                        ) : (
                                            <>{"Get Link"}</>
                                        )}
                                    </Button>
                                </form>
                            </Form>
                        )}

                        <Button asChild style="link">
                            {!isSuccess ? (
                                <Link href="/sign-in">
                                    <KeyRound className="mr-8px size-16px" />
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
