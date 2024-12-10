// // in ~/lib/notes/note.ts

// export class Note {
//     name: string
//     tags?: string
//     content: string

//     constructor({ named: name, tags, content }: { named: string; tags?: string; content: string }) {
//         this.name = name
//         this.tags = tags
//         this.content = content
//     }
// }

// // in ~/lib/notes/types.ts

// // import * as notes from "~/lib/notes"

// // This is where most of the code will go to create the functionality.

// // in ~/lib/notes/use.ts

// export function notes({ named: name, withTags: tags, content }: { named: string; withTags?: string; content: string }) {
//     //
// }

// // in ~/notes/1.ts

// export default new Note({
//     named: "Password reset.",
//     tags: "#auth #test",

//     content: `Something cool.

//     Even cooler.`
// })

// // in any file...

// // import { notes } from "~/lib/notes"

// notes({
//     named: "Password reset.",
//     withTags: "#test #auth",
//     content: `Something cool.

//     Even cooler.`
// })

// /*

// Purpose: to provide a way for synced, inline notes.

// Usage: create a note in a code file or in a note. If defined in a code file, it will

// */
