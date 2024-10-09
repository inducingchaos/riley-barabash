/**
 *
 */

import "server-only"

import { initializeGetDataFunction } from "~/utils/db/access"
import { profiles } from "~/server/data/schemas"

export const getProfile = initializeGetDataFunction({ for: profiles, selectMany: false })
export const getProfiles = initializeGetDataFunction({ for: profiles, selectMany: true })
