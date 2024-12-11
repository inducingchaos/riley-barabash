import Form from "next/form"

// import { signOut } from "~/app/experimental/ai-chat/_(auth)/auth"

export const SignOutForm = () => {
    return (
        <Form
            className="w-full"
            action={async () => {
                "use server"

                // await signOut({
                //     redirectTo: "/"
                // })

                console.log("signing out")
            }}
        >
            <button type="submit" className="w-full px-1 py-0.5 text-left text-red-500">
                Sign out
            </button>
        </Form>
    )
}
