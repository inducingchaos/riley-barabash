import Form from "next/form"

import { Input } from "~/components/ui/primitives/inputs"
import { Label } from "~/components/ui/primitives/display"

export function AuthForm({
    action,
    children,
    defaultEmail = ""
}: {
    action: NonNullable<string | ((formData: FormData) => void | Promise<void>) | undefined>
    children: React.ReactNode
    defaultEmail?: string
}) {
    return (
        <Form action={action} className="flex flex-col gap-16px px-16px sm:px-64px">
            <div className="flex flex-col gap-8px">
                <Label htmlFor="email" className="font-normal text-zinc-600 dark:text-zinc-400">
                    Email Address
                </Label>

                <Input
                    id="email"
                    name="email"
                    className="bg-main/sixteenth text-16px md:text-14px"
                    type="email"
                    placeholder="user@acme.com"
                    autoComplete="email"
                    required
                    autoFocus
                    defaultValue={defaultEmail}
                />
            </div>

            <div className="flex flex-col gap-8px">
                <Label htmlFor="password" className="font-normal text-zinc-600 dark:text-zinc-400">
                    Password
                </Label>

                <Input
                    id="password"
                    name="password"
                    className="bg-main/sixteenth text-16px md:text-14px"
                    type="password"
                    required
                />
            </div>

            {children}
        </Form>
    )
}
