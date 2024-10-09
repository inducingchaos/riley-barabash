/**
 *
 */

export type ArrayToUnion<T extends readonly string[]> = T[number]

export type ArrayObjectToUnionObject<T extends Record<string, readonly string[]>> = { [K in keyof T]: ArrayToUnion<T[K]> }

export type ReverseUnionObject<T extends Record<string, string | string[]>> = {
    [K in T[keyof T] as K extends string ? K : never]: {
        [P in keyof T]: K extends T[P] ? P : never
    }[keyof T]
}

export type ExpandUnionObjectValuesToProperties<T extends Record<string, string>, V> = {
    [K in keyof T]: {
        [P in T[K] & string]: V
    }
}

export type FilterPropertiesByKeySuffix<T, Suffix extends string> = {
    [K in keyof T as K extends `${infer Prefix}${Suffix}` ? (Prefix extends "" ? never : K) : never]: T[K]
}

export type FilterPropertiesByType<T, U> = {
    [K in keyof T as T[K] extends U ? K : never]: T[K]
}

export type RemoveSuffixFromPropertyKeys<T, Suffix extends string> = {
    [K in keyof T as K extends `${infer Prefix}${Suffix}` ? Prefix : never]: T[K]
}
