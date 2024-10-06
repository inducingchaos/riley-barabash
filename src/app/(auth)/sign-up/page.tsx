/**
 *
 */

"use client"

import { z } from "zod"

import { FormDescription, Input } from "~/components/ui/primitives/inputs"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Button } from "~/components/ui/primitives/inputs"
import { cn } from "~/utils/ui"
import { useToast } from "~/hooks/ui"
import { signUp } from "~/lib/auth"
import Link from "next/link"
import { H1 } from "~/components/ui/primitives/typography"

const registrationSchema = z
    .object({
        name: z.string().min(3),
        email: z.string().email(),
        password: z.string().min(8),
        passwordConfirmation: z.string().min(8)
    })
    .refine(data => data.password === data.passwordConfirmation, {
        message: "Passwords don't match",
        path: ["passwordConfirmation"]
    })

type RegistrationSchema = z.infer<typeof registrationSchema>
type FieldName = keyof RegistrationSchema

interface FormField {
    name: FieldName
    label: string
    placeholder: string
    type: string
    description?: string // Optional description field
}

const formFields: FormField[] = [
    {
        name: "name",
        label: "Name",
        placeholder: "John Appleseed",
        type: "text",
        description: "Your full name."
    },
    {
        name: "email",
        label: "Email",
        placeholder: "john@appleseed.com",
        type: "email",
        description: "We'll use this email for account-related communications."
    },
    {
        name: "password",
        label: "Password",
        placeholder: "your-password",
        type: "password",
        description: "Use at least 8 characters with a mix of letters, numbers & symbols."
    },
    {
        name: "passwordConfirmation",
        label: "Confirm Password",
        placeholder: "your-password",
        type: "password",
        description: "Re-enter your password to confirm."
    }
]

export default function SignUp() {
    const { toast } = useToast()

    const form = useForm<z.infer<typeof registrationSchema>>({
        resolver: zodResolver(registrationSchema),
        defaultValues: {
            email: "",
            password: "",
            passwordConfirmation: ""
        }
    })

    const onSubmit = async (values: z.infer<typeof registrationSchema>) =>
        await signUp.email(
            {
                name: values.name,
                email: values.email,
                password: values.password
            },
            {
                onRequest: _ctx => {
                    //show loading
                },
                onSuccess: _ctx => {
                    //redirect to the dashboard
                },
                onError: ctx => {
                    toast({
                        title: "Something went wrong",
                        description: ctx.error.message,
                        variant: "destructive"
                    })
                }
            }
        )

    return (
        <main className="flex flex-col items-center justify-center">
            <div className="container">
                <section className="flex min-h-screen flex-col items-center justify-center gap-8">
                    <H1 className={cn("text-center")}>Sign Up</H1>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            {formFields.map(field => (
                                <FormField
                                    key={field.name}
                                    control={form.control}
                                    name={field.name}
                                    render={({ field: formField }) => (
                                        <FormItem>
                                            <FormLabel>{field.label}</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...formField}
                                                    className="w-full"
                                                    placeholder={field.placeholder}
                                                    type={field.type}
                                                />
                                            </FormControl>
                                            {field.description && <FormDescription>{field.description}</FormDescription>}
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            ))}

                            <Button className="w-full" type="submit">
                                {"Sign Up"}
                            </Button>
                        </form>
                    </Form>

                    <p className="text-center text-sm text-muted-foreground">
                        Already have an account? <Link href="/sign-in">Sign In</Link>
                    </p>
                </section>
            </div>
        </main>
    )
}
