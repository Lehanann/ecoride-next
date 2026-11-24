import type { Metadata } from "next";

import DashboardSidebar from "@/components/dashboard/sections/DashboardSidebar";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "website of carpooling ecoresponsable",
};

/**
* Dashboard layout.
*
* Provides the main dashboard structure by combining
* the dashboard sidebar navigation and page content area.
*
* @param props Layout properties.
* @param props.children Dashboard page content.
* @returns Dashboard layout component.
*/
export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>
){
    return(
        <main className="grid lg:grid-cols-[280px_1fr] gap-8">
            <DashboardSidebar />
            <section>
                {children}
            </section>
        </main>
    )

}