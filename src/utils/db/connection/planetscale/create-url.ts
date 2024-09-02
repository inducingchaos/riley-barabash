/**
 * @file Creates a connection string for a Planetscale database.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * #src
 * #utils
 * #db
 * #connection
 * #planetscale
 * #create-connection-string
 * #database
 */

export interface CreateURLParams {
    database: string
    host: string
    username: string
    password: string
}

export function createUrl({ database, host, username, password }: CreateURLParams) {
    return `mysql://${username}:${password}@${host}/${database}?sslaccept=strict`
}
