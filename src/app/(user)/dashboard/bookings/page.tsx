import CarpoolTable from "@/components/dashboard/elements/CarpoolTable";
import React from "react";


export default function BookingsPage(){

    return(
        <section className="flex flex-col w-full">
            <h2 className="text-2xl font-semibold mb-4">Mes participations</h2>
            <CarpoolTable/>
        </section>
        
    )
}