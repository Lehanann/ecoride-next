import type { Metadata } from "next";
import EmployeeLayoutClient from "@/components/layout/EmployeeLayoutClient";

export const metadata: Metadata = {
  title: "Moderator Dashboard",
  description: "Dashboard moderation",
};

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