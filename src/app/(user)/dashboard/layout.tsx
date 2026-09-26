import DashboardSidebar from "@/components/dashboard/sections/DashboardSidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "website of carpooling ecoresponsable",
};

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