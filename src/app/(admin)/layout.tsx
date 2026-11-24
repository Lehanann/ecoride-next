import type { Metadata } from "next";
import AdminLayoutClient from "@/components/layout/AdminLayoutClient";

export const metadata: Metadata = {
  title: "Administration Dshboard",
  description: "",
};

/**
 * Administrator layout.
 *
 * Wraps administrator pages with access control
 * and provides a common layout for the administration area.
 *
 * @param props Layout properties.
 * @param props.children Administrator page content.
 * @returns Administrator layout component.
 */
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