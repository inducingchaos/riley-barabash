/**
 *
 */

"use client"

import { zodResolver } from "@hookform/resolvers/zod"
// import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Button,
    Input,
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "~/components/ui/primitives/inputs"
// import { api } from "~/lib/infra/rpc/react"

const formSchema = z.object({
    content: z
        .string()
        .min(1, {
            message: "A neuron needs to contain some content."
        })
        .max(768, {
            message: "You've exceeded the character limit. Neurons are meant to be small, composable chunks of thought."
        }),
    tags: z.string().min(1).max(123)
})

export function BroadcastForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: "",
            tags: ""
        }
    })

    // const { data: neurons, isLoading } = api.kyzn.neurons.all.useQuery()

    // const router = useRouter()

    // const utils = api.useUtils()

    // const create = api.kyzn.neurons.create.useMutation({
    //     onSuccess: async () => {
    //         await utils.kyzn.neurons.invalidate()

    //         form.reset({
    //             content: "",
    //             tags: ""
    //         })

    //         router.refresh()
    //     }
    // })

    function onSubmit({ content: _content }: z.infer<typeof formSchema>) {
        //  Split the tags at commas and spaces.
        // const tags: string[] = tagString.split(/[,\s]+/).filter(tag => tag.trim() !== "")
        // create.mutate({ content, tags })
    }

    // const _delete = api.kyzn.neurons.delete.useMutation({
    //     onSuccess: async () => {
    //         await utils.kyzn.neurons.invalidate()
    //     }
    // })

    const isLoading = false

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-start justify-center gap-4">
                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Content</FormLabel>
                                <FormControl>
                                    <Input
                                        className="w-96 rounded-none border-2 tracking-tighter shadow-none"
                                        placeholder="Your next thought..."
                                        disabled={isLoading}
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>The message you want to broadcast.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="rounded-none border-2 shadow-none" variant="outline" disabled={isLoading}>
                        {isLoading ? "Creating..." : "Create"}
                    </Button>
                </form>
            </Form>
        </>
    )
}
