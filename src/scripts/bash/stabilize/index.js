/**
 * @file Runs a bash script with Node.js.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * #src
 * #scripts
 * #bash
 * #stabilize
 * #script
 * #utility
 * #filesystem
 *
 * @todo
 * - [P4] Extract into a utility for running custom bash scripts.
 *
 * @see [ChatGPT reference](https://chatgpt.com/share/a5469ce3-f3f4-4011-b2bc-4cef8c35a952)
 */

import { exec } from "child_process"
import { dirname, resolve } from "path"
import { fileURLToPath } from "url"

const scriptPath = resolve(dirname(fileURLToPath(import.meta.url)), "./script.sh")

exec(`bash "${scriptPath}"`, (error, scriptOutput, scriptError) => {
    if (error) {
        console.error(error.message)
        return
    }
    if (scriptError) {
        console.error(scriptError)
        return
    }
    console.log(scriptOutput)
})