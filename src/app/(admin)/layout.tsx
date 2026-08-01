import type { Metadata } from "next";


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
      <main className="max-w-7xl mx-auto p-12 flex flex-col gap-10">
        {children}        
      </main> 
  );
}