// /**
//  * @file The landing page.
//  * @author Riley Barabash <riley@rileybarabash.com>
//  *
//  * @tags
//  * #src
//  * #app
//  * #page
//  * #marketing
//  * #home
//  * #landing
//  * #tsx
//  *
//  * @remarks
//  * - Add container class
//  */

// import Link from "next/link"
// import { Stack } from "~/components/ui/layout/helpers"
// import { Button } from "~/components/ui/primitives"
// import { H1, H2, H3, H4, InlineCode, Muted, P } from "~/components/ui/primitives/typography"

// /**
//  * Stack API - Think of each stack as a child to its parent.
//  * - label: string (for readability and debugging)
//  * - as: "main" | "section"... (defaults to "div")
//  * - fill: boolean (fills the parent's width and height)
//  * - orientation: "horizontal" | "vertical" (direction)
//  * - spacing: "none" | "between" | "even" | "around" (gap between children)
//  * - className: string
//  * - children: React.ReactNode
//  */

// export default async function Landing(): Promise<JSX.Element> {
//     return (
//         <Stack
//             label="Main"
//             as="main"
//             // debug={{
//             //     // options: { logs: false },
//             //     styles: {
//             //         borderWidth: 2,
//             //         primaryColor: "hsla(45, 27%, 66%, 1.0)",
//             //         secondaryColor: "hsla(45, 27%, 66%, 0.25)"
//             //     },
//             //     propagation: {
//             //         styles: true,
//             //         options: true
//             //     }
//             // }}
//         >
//             <Stack label="Container" className="">
//                 <Stack label="Hero Section" as="section" className="min-h-screen" orientation="horizontal">
//                     <Stack
//                         label="Page Content"
//                         spacing="between"
//                         alignment="bottom-right"
//                         // debug={{ options: { logs: true }, propagation: { options: true } }}
//                         className=""
//                     >
//                         <Stack label="Header" fill={true} spacing="none" className="gap-16px">
//                             <Stack label="Logo" orientation="horizontal" alignment="center" className="gap-8px">
//                                 <span className="text-18px font-bold">kyzn.</span>
//                                 <InlineCode className="border-gray-[250]] border px-4px font-mono">preflight</InlineCode>
//                             </Stack>
//                             <H1>{"Riley Barabash"}</H1>
//                             <H2>{"Full-Stack Developer & Designer"}</H2>
//                             <Stack
//                                 label="Social Media"
//                                 fill={true}
//                                 orientation="horizontal"
//                                 alignment="center"
//                                 className="gap-8px"
//                             >
//                                 <InlineCode>{"X/IG: @inducingchaos"}</InlineCode>
//                                 <Muted>{"Explore my digital playground"}</Muted>
//                             </Stack>
//                         </Stack>

//                         <Stack label="Projects and Experimental" fill={true} orientation="horizontal" spacing="none">
//                             <Stack
//                                 label="Featured Projects"
//                                 fill={true}
//                                 orientation="vertical"
//                                 alignment="right"
//                                 spacing="none"
//                                 className="gap-16px"
//                             >
//                                 <H3>{"Featured Projects"}</H3>
//                                 <Stack
//                                     label="Project Buttons"
//                                     fill={false}
//                                     orientation="vertical"
//                                     alignment="right"
//                                     className="gap-8px"
//                                 >
//                                     <Stack
//                                         label="Top Row Projects"
//                                         fill={true}
//                                         alignment="center"
//                                         orientation="horizontal"
//                                         className="gap-8px"
//                                     >
//                                         <Button variant="default" asChild>
//                                             <Link href="/kyzn">{"Kyzn"}</Link>
//                                         </Button>
//                                         <Button variant="outline" asChild>
//                                             <Link href="/solopreneurkit">{"SolopreneurKit"}</Link>
//                                         </Button>
//                                     </Stack>
//                                     <Stack label="Bottom Row Projects" fill={false} orientation="horizontal" className="gap-8px">
//                                         <Button variant="secondary" asChild>
//                                             <Link href="/ledger">{"Ledger"}</Link>
//                                         </Button>
//                                         <Button variant="ghost" asChild>
//                                             <Link href="/portfolio">{"More Projects"}</Link>
//                                         </Button>
//                                     </Stack>
//                                 </Stack>
//                             </Stack>
//                             <Stack
//                                 label="Experimental Section"
//                                 fill={false}
//                                 orientation="vertical"
//                                 spacing="none"
//                                 className="gap-8px"
//                             >
//                                 <H3>{"Experimental"}</H3>
//                                 <Stack label="Experimental Buttons" fill={false} orientation="vertical" className="gap-8px">
//                                     <Button variant="destructive" asChild>
//                                         <Link href="/experimental/test">{"Enter the Lab"}</Link>
//                                     </Button>
//                                     <Stack label="Alpha/Beta Buttons" fill={false} orientation="horizontal" className="gap-8px">
//                                         <Button variant="outline" size="sm" asChild>
//                                             <Link href="/experimental/alpha">{"Alpha"}</Link>
//                                         </Button>
//                                         <Button variant="outline" size="sm" asChild>
//                                             <Link href="/experimental/beta">{"Beta"}</Link>
//                                         </Button>
//                                     </Stack>
//                                 </Stack>
//                             </Stack>
//                         </Stack>

//                         <Stack label="About and Quick Links" fill={false} orientation="horizontal" spacing="between">
//                             <Stack label="About Me Section" fill={true} orientation="vertical" spacing="none" className="gap-16px">
//                                 <H3>{"About Me"}</H3>
//                                 <P>{"Passionate about creating intuitive and powerful web applications."}</P>
//                                 <Stack
//                                     label="About Me Buttons"
//                                     fill={false}
//                                     orientation="horizontal"
//                                     spacing="none"
//                                     className="gap-8px"
//                                 >
//                                     <Button variant="link" asChild>
//                                         <Link href="/about">{"Learn More"}</Link>
//                                     </Button>
//                                     <Button variant="ghost" asChild>
//                                         <Link href="/contact">{"Get in Touch"}</Link>
//                                     </Button>
//                                 </Stack>
//                             </Stack>
//                             <Stack
//                                 label="Quick Links Section"
//                                 fill={false}
//                                 orientation="vertical"
//                                 spacing="none"
//                                 className="gap-16px"
//                             >
//                                 <H4>{"Quick Links"}</H4>
//                                 <Stack label="Quick Link Buttons" fill={false} orientation="vertical" className="gap-8px">
//                                     <Button variant="link" size="sm" asChild>
//                                         <Link href="/blog">{"Blog"}</Link>
//                                     </Button>
//                                     <Button variant="link" size="sm" asChild>
//                                         <Link href="/resources">{"Resources"}</Link>
//                                     </Button>
//                                     <Button variant="link" size="sm" asChild>
//                                         <Link href="/faq">{"FAQ"}</Link>
//                                     </Button>
//                                 </Stack>
//                             </Stack>
//                         </Stack>
//                     </Stack>
//                     <Stack label="Test" fill={false}>
//                         Test
//                     </Stack>

//                     <Stack
//                         label="Footer"
//                         as="footer"
//                         fill={true}
//                         orientation="horizontal"
//                         spacing="between"
//                         alignment="right"
//                         debug={true}
//                         className=""
//                     >
//                         <Stack label="Copyright and Legal" fill={false} orientation="vertical" spacing="none" className="gap-8px">
//                             <Muted>{"© 2024 Riley Barabash"}</Muted>
//                             <Stack label="Legal Links" fill={false} orientation="horizontal" className="gap-8px">
//                                 <Button variant="link" size="sm" asChild>
//                                     <Link href="/privacy">{"Privacy"}</Link>
//                                 </Button>
//                                 <Button variant="link" size="sm" asChild>
//                                     <Link href="/terms">{"Terms"}</Link>
//                                 </Button>
//                             </Stack>
//                         </Stack>
//                         <Stack label="Social Links" fill={false} orientation="horizontal" spacing="none" className="gap-16px">
//                             <Button variant="outline" size="sm" asChild>
//                                 <Link href="https://github.com/yourusername">{"GitHub"}</Link>
//                             </Button>
//                             <Button variant="outline" size="sm" asChild>
//                                 <Link href="https://linkedin.com/in/yourusername">{"LinkedIn"}</Link>
//                             </Button>
//                         </Stack>
//                     </Stack>
//                 </Stack>
//             </Stack>
//         </Stack>
//     )
// }
