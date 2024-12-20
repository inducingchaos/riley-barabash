/**
 *
 */

"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Lock } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"
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
import { application } from "~/config"
import { useToast } from "~/hooks/ui"
import { Exception } from "~/meta"
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

export function SignUpForm({ callbackUrl }: { callbackUrl?: string }): JSX.Element {
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
            const exception = new Exception(error)

            toast({
                title: exception.applyDefaults().info?.external?.label,
                description: exception.applyDefaults().info?.external?.message,
                variant: "destructive"
            })
        },

        onSuccess() {
            redirect(callbackUrl ?? application.routing.paths.callbacks.auth.signIn)
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
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center justify-center gap-12px">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>{"Name"}</FormLabel>
                            <FormControl>
                                <Input placeholder="John Doe" autoComplete="name" disabled={isPending} {...field} />
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
                                <Input placeholder="name@example.com" autoComplete="email" disabled={isPending} {...field} />
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
                        <div className="flex items-center justify-center gap-2px">
                            <Spinner className="mr-8px size-16px animate-spin" />
                            {"Submitting..."}
                        </div>
                    ) : (
                        <>{"Submit"}</>
                    )}
                </Button>

                <Button asChild style="link">
                    <Link href="/sign-in">
                        <Lock className="mr-8px size-16px" />
                        {"Go to Sign In"}
                    </Link>
                </Button>
            </form>
        </Form>
    )
}
