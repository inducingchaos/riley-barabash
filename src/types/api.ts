/**
 *
 */

import type { networkStatuses } from "~/constants/api"

export type NetworkStatusName = (typeof networkStatuses)[keyof typeof networkStatuses]
export type NetworkStatusCode = keyof typeof networkStatuses
