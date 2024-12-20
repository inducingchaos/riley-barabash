/**
 * @todo
 * - [P3] Deconstruct into something more understandable, renaming to make the forgot/recovery and reset/change/update boundary more obvious. Make error messages more accurate. Go through code and create an audit checklist for things like proper input field attributes, etc.
 */

"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import type { HTMLAttributes } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useServerAction } from "zsa-react"
import { Button, Form, FormControl, FormField, FormItem, FormMessage, Input } from "~/components/ui/primitives/inputs"
import { H3, Muted } from "~/components/ui/primitives/typography"
import { useToast } from "~/hooks/ui"
import { Exception } from "~/meta"
import { changePasswordAction, resetPasswordAction } from "~/server/actions/auth"
import { cn } from "~/utils/ui"

const recoveryFormSchema = z.object({
    email: z.string().email("Please enter a valid email address.")
})

const resetFormSchema = z
    .object({
        password: z.string().min(8, "Password must be at least 8 characters long."),
        passwordConfirmation: z.string().min(8, "Password must be at least 8 characters long.")
    })
    .refine(data => data.password === data.passwordConfirmation, {
        message: "The passwords you entered do not match.",
        path: ["passwordConfirmation"]
    })

export function PasswordResetForm({
    token,
    className,
    ...props
}: { token: string | undefined } & HTMLAttributes<HTMLDivElement>): JSX.Element {
    const { toast } = useToast()

    const recoveryForm = useForm<z.infer<typeof recoveryFormSchema>>({
        resolver: zodResolver(recoveryFormSchema),
        defaultValues: {
            email: ""
        }
    })

    const {
        execute: sendRecoveryEmail,
        isPending: isRecoveryPending,
        isSuccess: isRecoverySuccess
    } = useServerAction(resetPasswordAction, {
        onError({ err: error }) {
            const exception = new Exception(error)

            toast({
                title: exception.applyDefaults().info?.external?.label,
                description: exception.applyDefaults().info?.external?.message,
                variant: "destructive"
            })
        }
    })

    const onRecoverySubmit = async ({ email }: z.infer<typeof recoveryFormSchema>) => {
        await sendRecoveryEmail({
            email
        })
    }

    const resetForm = useForm<z.infer<typeof resetFormSchema>>({
        resolver: zodResolver(resetFormSchema),
        defaultValues: {
            password: "",
            passwordConfirmation: ""
        }
    })

    const {
        execute: resetPassword,
        isPending: isResetPending,
        isSuccess: isResetSuccess,
        error: resetError
    } = useServerAction(changePasswordAction)

    const onResetSubmit = async ({ password }: z.infer<typeof resetFormSchema>) => {
        if (!token) {
            toast({
                title: "Something went wrong.",
                description: "Please contact support.",
                variant: "destructive"
            })

            return
        }

        await resetPassword({
            token,
            password
        })
    }

    return (
        <div className={cn("flex flex-col gap-24px", className)} {...props}>
            <div className="flex flex-col gap-12px text-center">
                <H3>{"Reset Password"}</H3>

                {!token ? (
                    !isRecoverySuccess ? (
                        <Muted className="px-32px">{"Enter your email below to receive a password recovery link."}</Muted>
                    ) : (
                        <Muted className="px-32px">{"A recovery link has been sent to your email."}</Muted>
                    )
                ) : resetError ? (
                    <Muted className="px-32px">{new Exception(resetError).applyDefaults().info?.external?.message}</Muted>
                ) : !isResetSuccess ? (
                    <Muted className="px-32px">{"Enter your new password below to update your account."}</Muted>
                ) : (
                    <Muted className="px-32px">{"Your password has been updated."}</Muted>
                )}
            </div>

            {!token && !isRecoverySuccess && (
                <Form {...recoveryForm}>
                    <form onSubmit={recoveryForm.handleSubmit(onRecoverySubmit)} className="flex flex-col gap-12px">
                        <FormField
                            control={recoveryForm.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            placeholder="Email"
                                            autoComplete="email"
                                            disabled={isRecoveryPending}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button disabled={isRecoveryPending} className="w-full" type="submit">
                            {"Get Recovery Link"}
                        </Button>
                    </form>
                </Form>
            )}

            {token && !isResetSuccess && !resetError && (
                <Form {...resetForm}>
                    <form onSubmit={resetForm.handleSubmit(onResetSubmit)} className="flex w-384px flex-col gap-12px">
                        <FormField
                            control={resetForm.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            placeholder="New Password"
                                            type="password"
                                            autoComplete="password"
                                            disabled={isResetPending}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={resetForm.control}
                            name="passwordConfirmation"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            placeholder="Confirm Password"
                                            type="password"
                                            autoComplete="password"
                                            disabled={isResetPending}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button disabled={isResetPending} className="w-full" type="submit">
                            {"Update Password"}
                        </Button>
                    </form>
                </Form>
            )}

            <Button style="link" asChild className="self-center">
                <Link href="/sign-in">
                    {(!token && !isRecoverySuccess) || (token && !isResetSuccess) ? "Go Back" : "Sign In"}
                </Link>
            </Button>
        </div>
    )
}
