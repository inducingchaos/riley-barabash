/**
 *
 */

// "use client"

// import { createContext, useContext } from "react"
// import { Exception } from "~/meta"
// import type { Session, User } from "~/server/data/schemas"

// export type AuthContext = {
//     user: User | null
//     session: Session | null
//     isAuthenticated: boolean
// }

// const authContext = createContext<AuthContext | undefined>(undefined)

// export function AuthProvider({ children, context }: { children: React.ReactNode; context: AuthContext }): JSX.Element {
//     context.isAuthenticated = !!context.user?.id

//     return <authContext.Provider value={context}>{children}</authContext.Provider>
// }

// export const useAuth = () => {
//     const context = useContext(authContext)
//     if (!context)
//         throw new Exception({
//             in: "framework",
//             of: "hook-outside-provider",
//             with: {
//                 internal: {
//                     label: "Auth Context Not Found",
//                     message: "`useAuth` must be used within an `AuthProvider`."
//                 }
//             }
//         })

//     return context
// }
