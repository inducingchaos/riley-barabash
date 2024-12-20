import { cookies } from "next/headers"

import { AppSidebar } from "~/domains/ai-chat/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "~/components/ui/layout/navigation"

// import { auth } from "../(auth)/auth"

export const experimental_ppr = true

export default async function Layout({ children }: { children: React.ReactNode }) {
    const [/*session, */ cookieStore] = await Promise.all([/*auth(), */ cookies()])
    const isCollapsed = cookieStore.get("sidebar:state")?.value !== "true"

    return (
        <SidebarProvider defaultOpen={!isCollapsed}>
            <AppSidebar user={{ email: "admin@rileybarabash.com" }} />
            <SidebarInset>{children}</SidebarInset>
        </SidebarProvider>
    )
}
