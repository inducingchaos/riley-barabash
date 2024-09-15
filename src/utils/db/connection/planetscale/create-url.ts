/**
 *
 */

export interface CreateURLParams {
    database: string
    host: string
    username: string
    password: string
}

export function createUrl({ database, host, username, password }: CreateURLParams): string {
    return `mysql://${username}:${password}@${host}/${database}?sslaccept=strict`
}
