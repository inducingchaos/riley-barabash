/**
 *
 */

export type ArrayToUnion<T extends readonly string[]> = T[number]

export type MakeOptional<T, K extends keyof T> = Partial<Pick<T, K>> & Omit<T, K>
