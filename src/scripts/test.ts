/**
 * @remarks
 * - Run this script with `bun execute test`.
 */

import { encodePassword } from "~/utils/auth"

console.log("Hello, world!")

console.log(await encodePassword({ using: { password: "password" } }))
