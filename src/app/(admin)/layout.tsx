import type { Metadata } from "next";
import AdminLayoutClient from "@/components/layout/AdminLayoutClient";

export const metadata: Metadata = {
  title: "Administration Dshboard",
  description: "",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (   
      <main className="w-full border">
        <AdminLayoutClient>
          {children} 
        </AdminLayoutClient>               
      </main> 
  );
}