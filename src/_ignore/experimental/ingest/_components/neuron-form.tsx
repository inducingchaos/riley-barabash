// /**
//  *
//  */

// "use client"

// import { zodResolver } from "@hookform/resolvers/zod"
// import { useRouter } from "next/navigation"
// import { useForm } from "react-hook-form"
// import { z } from "zod"
// import {
//     Button,
//     Input,
//     Form,
//     FormControl,
//     FormDescription,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage
// } from "~/components/ui/primitives/inputs"
// import { api } from "~/lib/infra/rpc/react"

// const formSchema = z.object({
//     content: z
//         .string()
//         .min(1, {
//             message: "A neuron needs to contain some content."
//         })
//         .max(768, {
//             message: "You've exceeded the character limit. Neurons are meant to be small, composable chunks of thought."
//         }),
//     tags: z.string().min(1).max(123)
// })

// export function NeuronForm() {
//     const form = useForm<z.infer<typeof formSchema>>({
//         resolver: zodResolver(formSchema),
//         defaultValues: {
//             content: "",
//             tags: ""
//         }
//     })

//     const { data: neurons, isLoading } = api.kyzn.neurons.all.useQuery()

//     const router = useRouter()

//     const utils = api.useUtils()

//     const create = api.kyzn.neurons.create.useMutation({
//         onSuccess: async () => {
//             await utils.kyzn.neurons.invalidate()

//             form.reset({
//                 content: "",
//                 tags: ""
//             })

//             router.refresh()
//         }
//     })

//     function onSubmit({ content, tags: tagString }: z.infer<typeof formSchema>) {
//         //  Split the tags at commas and spaces.

//         const tags: string[] = tagString.split(/[,\s]+/).filter(tag => tag.trim() !== "")

//         create.mutate({ content, tags })
//     }

//     // const _delete = api.kyzn.neurons.delete.useMutation({
//     //     onSuccess: async () => {
//     //         await utils.kyzn.neurons.invalidate()
//     //     }
//     // })

//     return (
//         <>
//             <Form {...form}>
//                 <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center justify-center gap-16px">
//                     <div className="flex flex-row gap-16px">
//                         <FormField
//                             control={form.control}
//                             name="content"
//                             render={({ field }) => (
//                                 <FormItem>
//                                     {/* <FormLabel>Content</FormLabel> */}
//                                     <FormControl>
//                                         <Input
//                                             className="rounded-0px w-384px border-2x shadow-none"
//                                             placeholder="Your next thought..."
//                                             disabled={isLoading}
//                                             {...field}
//                                         />
//                                     </FormControl>
//                                     {/* <FormDescription>The content of the neuron.</FormDescription> */}
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />
//                         {/* <Button type="submit" className="rounded-0px border-2x" variant="outline" disabled={isLoading}>
//                             {isLoading ? "Creating..." : "Create"}
//                         </Button> */}
//                     </div>
//                     <FormField
//                         control={form.control}
//                         name="tags"
//                         render={({ field }) => (
//                             <FormItem>
//                                 {/* <FormLabel>Tags</FormLabel> */}
//                                 <FormControl>
//                                     <Input
//                                         className="rounded-0px border-2x font-mono tracking-tighter shadow-none"
//                                         placeholder="tags"
//                                         disabled={isLoading}
//                                         {...field}
//                                     />
//                                 </FormControl>
//                                 {/* <FormDescription>The topics and attributes that describe the neuron.</FormDescription> */}
//                                 <FormMessage />
//                             </FormItem>
//                         )}
//                     />
//                 </form>
//             </Form>
//         </>
//     )
// }

// // {/* Entries. */}

// // {isLoading ? (
// //     <>
// //         {/* Loading UI. */}

// //         <p>Loading...</p>
// //     </>
// // ) : neurons && neurons.length > 0 ? (
// //     <ul>
// //         {neurons.map(neuron => (
// //             <li key={neuron.id} className="max-w-lg border">
// //                 {/* Content. */}

// //                 <p className="break-words">{`Content: ${neuron.content}`}</p>

// //                 {/* Tags. */}

// //                 <p className="break-words">{`Tags: ${neuron.tags.map(tag => tag.tag.name).join(", ")}`}</p>

// //                 {/* Delete. */}

// //                 {/* <button onClick={() => _delete.mutate({ id: neuron.id })}>Delete</button> */}
// //             </li>
// //         ))}
// //     </ul>
// // ) : (
// //     <>
// //         {/* Fallback UI. */}

// //         <p>{"No neurons found."}</p>
// //     </>
// // )}
