/**
 *
 */

import { createMysqlTable } from "~/utils/db/schema"

export const createKyznMysqlTable = createMysqlTable({
    for: "kyzn"
})
