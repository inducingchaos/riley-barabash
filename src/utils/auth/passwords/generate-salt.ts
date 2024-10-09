/**
 *
 */

import crypto from "crypto"

export const generateSalt = () => crypto.randomBytes(32).toString("hex")
