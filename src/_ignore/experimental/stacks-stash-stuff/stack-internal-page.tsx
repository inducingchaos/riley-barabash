// /**
//  * @file A page for testing UI.
//  * @author Riley Barabash <riley@rileybarabash.com>
//  *
//  * @tags
//  * #src
//  * #app
//  * #internal
//  * #experimental
//  * #test
//  * #page
//  * #tsx
//  */

// "use client"

// import Link from "next/link"
// import { ThemeToggle } from "~/components/ui/compositions/design"
// import { Spacer, Stack } from "~/components/ui/layout/helpers"
// import { Button } from "~/components/ui/primitives"
// import { personal } from "~/config"
// import { api } from "~/lib/infra/rpc/react"

// export default function Test(): JSX.Element {
//     const { mutate: sendMessage, isPending: isSending } = api.comms.sms.messages.send.useMutation()

//     return (
//         <>
//             {/* Main tag. */}

//             <Stack as="main">
//                 {/* Container. */}

//                 <Stack className="container">
//                     {/* Section one. */}

//                     <Stack as="section" alignment="bottom-right" className="min-h-screen" debug={{ id: "outer-wrapper" }}>
//                         {/* Wrapper. */}

//                         <Stack
//                             fill={true}
//                             className="gap-4"
//                             orientation="horizontal"
//                             alignment="bottom-right"
//                             spacing="between"
//                             debug={{ id: "wrapper" }}
//                         >
//                             {/* Change the theme. */}
//                             <Stack fill={false}>
//                                 <ThemeToggle />
//                             </Stack>

//                             {/* If you wanna holla at my SMS (don't spam pls). */}

//                             <Stack fill={true} debug={{ id: "comp-a" }}>
//                                 <Button
//                                     disabled={isSending}
//                                     onClick={() => sendMessage({ content: "Yolo, dude!", to: personal.contact.phone })}
//                                 >
//                                     {isSending ? "YAHHH BUDDY!!!" : "Yolo, dude!"}
//                                 </Button>
//                             </Stack>

//                             {/* Landing. */}

//                             <Stack fill={false}>
//                                 <Button variant="outline" asChild>
//                                     <Link href="/">{"Go back"}</Link>
//                                 </Button>
//                             </Stack>

//                             {/* <Spacer className="" /> */}

//                             {/* Unauthenticated. */}

//                             <Stack fill={false}>
//                                 <Button variant="destructive" asChild>
//                                     <Link href="/unauthenticated">{"Trespass me!"}</Link>
//                                 </Button>
//                             </Stack>
//                         </Stack>
//                     </Stack>
//                 </Stack>
//             </Stack>
//         </>
//     )
// }
