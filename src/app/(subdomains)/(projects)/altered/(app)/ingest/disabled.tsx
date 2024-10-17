// /**
//  *
//  */

// import { H1 } from "~/components/ui/primitives/typography"
// import { DataTable, NeuronForm, getColumns, type Neuron } from "./_components"
// import { api } from "~/lib/infra/rpc/server"

// async function getData(): Promise<Neuron[]> {
//     const neurons = (await api.kyzn.neurons.all()).map(n => {
//         const parsedTags: Record<string, string[]> & { tags: string[] } = { tags: [] }
//         n.tags.forEach(tag => {
//             const [prefix, value] = tag.tag.name.split(":")
//             if (prefix && value) {
//                 parsedTags[prefix] = parsedTags[prefix] ?? []
//                 parsedTags[prefix].push(value)
//             } else {
//                 parsedTags.tags.push(tag.tag.name)
//             }
//         })
//         return {
//             id: n.id,
//             content: n.content,
//             ...parsedTags
//         }
//     })

//     // Keep your example if needed
//     const example = {
//         id: 27,
//         content: "New app feature: user can create a neuron.",
//         tags: ["app", "software-development"],
//         ds: ["neurons", "app-features"]
//     } satisfies Neuron

//     return [example, ...neurons]
// }

// export default async function Ingest(): Promise<JSX.Element> {
//     const data = await getData()

//     return (
//         <>
//             <main className="flex flex-col items-center justify-center">
//                 <div className="container">
//                     <section className="flex min-h-screen flex-col items-center justify-center gap-16 py-64">
//                         <H1>Ingest.</H1>

//                         <NeuronForm />

//                         <DataTable data={data} />
//                     </section>
//                 </div>
//             </main>
//         </>
//     )
// }
