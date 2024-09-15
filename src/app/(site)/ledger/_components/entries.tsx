/**
 * 
 */

"use client"

import { useState } from "react"
import { api } from "~/lib/infra/rpc/react"

export function Entries(): JSX.Element {
    const { data: entries, isLoading } = api.ledger.list.useQuery()

    const utils = api.useUtils()

    const [name, setName] = useState("")
    const [message, setMessage] = useState("")

    const save = api.ledger.save.useMutation({
        onSuccess: async () => {
            await utils.ledger.invalidate()

            setName("")
            setMessage("")
        }
    })

    const _delete = api.ledger.delete.useMutation({
        onSuccess: async () => {
            await utils.ledger.invalidate()
        }
    })

    const clear = api.ledger.clear.useMutation({
        onSuccess: async () => {
            await utils.ledger.invalidate()
        }
    })

    return (
        <>
            {/* The form. */}

            <form
                onSubmit={e => {
                    e.preventDefault()

                    save.mutate({ name, message })
                }}
                className="flex flex-col"
            >
                {/* The name input. */}

                <input className="border" type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />

                {/* The message input. */}

                <input className="border" type="text" placeholder="Message" value={message} onChange={e => setMessage(e.target.value)} />

                {/* Submit button. */}

                <button type="submit" disabled={save.isPending}>
                    {!save.isPending ? "Submit" : "Submitting..."}
                </button>
            </form>

            {/* Clear button. */}

            <button disabled={clear.isPending} onClick={() => clear.mutate()}>
                {clear.isPending ? "Clearing..." : "Clear"}
            </button>

            {/* Entries. */}

            {isLoading ? (
                <>
                    {/* Loading UI. */}

                    <p>Loading...</p>
                </>
            ) : entries && entries.length > 0 ? (
                <ul>
                    {entries.map(entry => (
                        <li key={entry.id} className="max-w-lg border">
                            {/* Name. */}

                            <h2 className="break-words">{`Name: ${entry.name}`}</h2>

                            {/* Message. */}

                            {entry.message && <p className="break-words">{`Message: ${entry.message}`}</p>}

                            {/* Date. */}

                            <p>{`Created: ${new Date(entry.createdAt).toLocaleString()}`}</p>

                            {/* Delete. */}

                            <button onClick={() => _delete.mutate({ id: entry.id })}>Delete</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <>
                    {/* Fallback UI. */}

                    <p>{"No entries found."}</p>
                </>
            )}
        </>
    )
}