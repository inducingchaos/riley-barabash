/**
 *
 */

"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { LucideLink } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { useServerAction } from "zsa-react"
import { Apple, Google, Spinner } from "~/components/svgs/icons"
import { Separator } from "~/components/ui/primitives/display"
import { Button, Form, FormControl, FormField, FormItem, FormMessage, Input } from "~/components/ui/primitives/inputs"
import { Muted } from "~/components/ui/primitives/typography"
import { application } from "~/config"
import { Exception } from "~/meta"
import { signInAction } from "~/server/actions/auth"

const formSchema = z.object({
    email: z.string().email("Please enter a valid email address."),
    password: z.string().min(8, "Password must be at least 8 characters long.")
})

export function SignInForm({ callbackUrl }: { callbackUrl?: string }): JSX.Element {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const { execute: signIn, isPending } = useServerAction(signInAction, {
        onError({ err: error }) {
            const exception = new Exception(error)

            toast.error(exception.applyDefaults().info?.external?.label, {
                description: exception.applyDefaults().info?.external?.message
            })
        },

        onSuccess() {
            redirect(callbackUrl ?? application.routing.paths.callbacks.auth.signIn)
        }
    })

    const onSubmit = async ({ email, password }: z.infer<typeof formSchema>) => {
        await signIn({
            email,
            password
        })
    }

    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={onSubmit && form.handleSubmit(onSubmit)}
                    className="flex flex-col items-center justify-center gap-12px"
                >
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Input placeholder="Email" autoComplete="email" disabled={isPending} {...field} />
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
                            <div className="flex items-center justify-center gap-2px">
                                <Spinner className="mr-8px size-16px animate-spin" />
                                {"Submitting..."}
                            </div>
                        ) : (
                            <>{"Submit"}</>
                        )}
                    </Button>

                    <Button asChild style="link" className="w-full">
                        <Link href="/sign-in/link">
                            <LucideLink className="mr-8px size-16px" />
                            {"Sign in with Link"}
                        </Link>
                    </Button>
                </form>
            </Form>

            <div className="flex w-full items-center justify-center">
                <Separator />
                <Muted className="whitespace-nowrap px-8px uppercase">{"Or continue with"}</Muted>
                <Separator />
            </div>

            <div className="flex flex-col items-center justify-center gap-8px">
                <div className="flex w-full flex-row items-center justify-center gap-8px">
                    <form action={application.routing.paths.api.auth.oauth.apple} method="POST" className="w-full">
                        <Button className="w-full" type="submit" style="outline" disabled={isPending}>
                            <Apple className="mr-8px size-16px" />
                            {"Apple"}
                        </Button>
                    </form>

                    <form action={application.routing.paths.api.auth.oauth.google} method="POST" className="w-full">
                        <Button className="w-full" type="submit" style="outline" disabled={isPending}>
                            <Google className="mr-8px size-16px" />
                            {"Google"}
                        </Button>
                    </form>
                </div>
            </div>
        </>
    )
}
