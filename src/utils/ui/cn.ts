/**
 * @file A utility for merging Tailwind classes.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * #src
 * #utils
 * #ui
 * #cn
 */

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}
