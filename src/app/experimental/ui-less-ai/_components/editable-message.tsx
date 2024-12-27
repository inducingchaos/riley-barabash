// "use client"

// import { useState } from "react"
// import { EssentialTextArea } from "~/_ignore/experimental/essential-text-area"

// export type Message = {
//     id: string
//     content: string
//     createdAt: string
// }

// export type EditableMessageProps = {
//     message: Message
//     formAction: (content: FormData) => void
//     onSaveAction: (content: string) => void
//     onCancelAction: () => void
// }

// export function EditableMessage({ message, onSaveAction: onSave, onCancelAction: onCancel, formAction }: EditableMessageProps) {
//     const [content, setContent] = useState(message.content)

//     return (
//         <form
//             action={formData => {
//                 formAction(formData)
//             }}
//             onSubmit={_ => {
//                 setContent("")
//                 onSave(content)
//             }}
//         >
//             <div className="flex w-full flex-col gap-8px">
//                 <EssentialTextArea
//                     name="message"
//                     value={content}
//                     onChange={e => setContent(e.target.value)}
//                     rows={{ min: 1, max: 4 }}
//                     layoutReferences={{
//                         lineHeight: 24,
//                         paddingTop: 8,
//                         paddingBottom: 8,
//                         borderWidth: 2
//                     }}
//                     onEscape={onCancel}
//                     focusOnMount
//                     className="w-full border bg-alternate/-quarter px-16px py-8px font-light"
//                 />
//             </div>
//         </form>
//     )
// }
