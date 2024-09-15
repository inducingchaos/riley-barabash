export interface UserProfile {
    id: UserId
    name: string | null
    image: string | null
}

export type UserId = number

export interface UserSession {
    id: UserId
}
