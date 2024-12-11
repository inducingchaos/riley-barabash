"use client"

import useSWR from "swr"

export function useUserMessageId() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { data: userMessageIdFromServer, mutate: setUserMessageIdFromServer } = useSWR("userMessageIdFromServer", null)

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return { userMessageIdFromServer, setUserMessageIdFromServer }
}
