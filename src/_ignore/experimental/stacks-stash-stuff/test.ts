// /**
//  * @remarks
//  * - Run this script with `bun execute test`.
//  */

// import { colors } from "~/config/external/tailwind"

// console.log("Hello, world!")

// export function clamp({ value, min = 0, max }: { value: number; min?: number; max: number }): number {
//     return Math.min(Math.max(value, min), max)
// }

// export function setDecimalPrecision({ for: value, to: decimalPlaces }: { for: number; to: number }): number {
//     const factor = Math.pow(10, decimalPlaces)
//     return Math.round(value * factor) / factor
// }

// export function getRandomInRange({
//     min = 0,
//     max,
//     incrementBy: interval,
//     anchorIntervalAt: origin = 0,
//     decimalPrecision = 3
// }: {
//     min?: number
//     max: number
//     incrementBy?: number
//     anchorIntervalAt?: number
//     decimalPrecision?: number
// }): number {
//     const intervalRange = max - min
//     const correctedOrigin = origin - min
//     const rangeOffset = interval ? Math.abs(correctedOrigin % interval) : 0
//     const randomInOffsetRange = Math.random() * intervalRange

//     let correctedInterval
//     if (interval) {
//         const intervalInOffsetRange = Math.round(randomInOffsetRange / interval) * interval
//         const adjustedIntervalRange = Math.floor(intervalRange / interval) * interval

//         let res

//         if (intervalInOffsetRange > adjustedIntervalRange) {
//             const a = (intervalInOffsetRange + rangeOffset) % intervalRange
//             res = a + min
//         }
//         const a = intervalInOffsetRange + rangeOffset

//         res = a

//         const correctedInterval = res + min

//         return setDecimalPrecision({ for: correctedInterval, to: decimalPrecision })
//     } else return setDecimalPrecision({ for: randomInOffsetRange, to: decimalPrecision })
// }

// // 2.05, 4.55, 7.05, 9.55

// // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
// function runTestMultipleTimes(times: number = 100) {
//     const results = Array(times)
//         .fill(null)
//         .map(() => getRandomInRange({ min: 1, max: 10, incrementBy: 2.5, anchorIntervalAt: 12.05 }))

//     const counts = results.reduce(
//         (acc, num) => {
//             const roundedNum = Math.round(num * 100) / 100 // Round to 2 decimal places
//             acc[roundedNum] = (acc[roundedNum] || 0) + 1
//             return acc
//         },
//         {} as Record<number, number>
//     )

//     const probabilities = Object.entries(counts).reduce(
//         (acc: Record<string, number>, [num, count]) => {
//             acc[num] = count / times
//             return acc
//         },
//         {} as Record<number, number>
//     )

//     console.log("Probabilities:")
//     Object.entries(probabilities)
//         .sort(([a], [b]) => parseFloat(a) - parseFloat(b))
//         .forEach(([num, prob]) => {
//             console.log(`${num}: ${(prob * 100).toFixed(2)}%`)
//         })

//     return probabilities
// }

// // Run the test 1000 times
// runTestMultipleTimes(1000)

// // console.log(getRandomInRange({ min: 1, max: 10, incrementBy: 2.5, anchorIntervalAt: 12.05 }))
// // console.log(getRandomInRange({ min: 1, max: 10, incrementBy: 2.5, anchorIntervalAt: 100.05 }))

// console.log(
//     Array(20)
//         .fill(null)
//         .map(() => getRandomInRange({ min: 1, max: 10, incrementBy: 2.5, anchorIntervalAt: 12.05 }))
// )
// // console.log(
// //     Array(20)
// //         .fill(null)
// //         .map(() => getRandomInRange({ min: 1, max: 10, incrementBy: 2.5, anchorIntervalAt: 100.05 }))
// // )

// // Should produce 1.5, 3.5, 5.5, 7.5, or 9.5

// // water when done
