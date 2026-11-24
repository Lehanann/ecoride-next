import type { Metadata } from "next";
import EmployeeLayoutClient from "@/components/layout/EmployeeLayoutClient";

export const metadata: Metadata = {
  title: "Moderator Dashboard",
  description: "Dashboard moderation",
};

/**
* Employee layout.
*
* Provides a protected layout for moderation pages
* and wraps employee content with role-based access control.
*
* @param props Layout properties.
* @param props.children Employee page content.
* @returns Employee layout component.
*/
export default function EmployeeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <main className="max-w-[1500] border mx-auto p-12 flex flex-col gap-10">
      <EmployeeLayoutClient>
          {children}  
      </EmployeeLayoutClient>   
    </main>      
     
  );
}