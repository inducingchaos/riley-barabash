/**
 *
 */

import { and, eq } from "drizzle-orm"
import { type MySqlColumn } from "drizzle-orm/mysql-core"
import type { Database } from "~/server/data"
import { sessions, type QueryableSession } from "~/server/data/schemas"

export async function deleteSessions({ where: query, in: db }: { where: QueryableSession; in: Database }): Promise<void> {
    const where = Object.entries(query)
        .filter(([_, queryValue]) => queryValue !== undefined)
        .map(([queryKey, queryValue]) => eq(sessions[queryKey as keyof typeof sessions] as MySqlColumn, queryValue))

    await db.delete(sessions).where(and(...where))
}
