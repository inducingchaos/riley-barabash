// // some type madness -
// // Goes in primitive/data/type/value manipulion manipulation
// // collections, iterables

// export type OptionSetGroup = Record<string, readonly string[]>
// export type GetOptionTypes<T extends OptionSetGroup> = T[keyof T][number]

// export function findOptionSetKey<UniqueOptionSetGroup extends OptionSetGroup, Option extends GetOptionTypes<UniqueOptionSetGroup>>(option: Option, optionSetGroup: UniqueOptionSetGroup): keyof UniqueOptionSetGroup {
//     return Object.entries(optionSetGroup).find(([_, optionSet]) => optionSet.includes(option))![0] as keyof UniqueOptionSetGroup
// }

// // const alignmentPositions = {
// //     start: ["top", "left"],
// //     center: ["center"],
// //     end: ["bottom", "right"]
// // } as const satisfies OptionSetGroup
