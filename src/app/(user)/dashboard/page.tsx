import React from "react"
import CarpoolsManager from "@/components/dashboard/driver/CarpoolsManager";
import Cars from "@/components/dashboard/driver/Cars";
import Participations from "@/components/dashboard/passenger/Participation";
import UserProfile from "@/components/dashboard/profile/UserProfile";

export default function DashboardPage(){

    const isDriver = true;
    const isPassenger = true;
  

    if (isPassenger && !isDriver){
        return(
            <section className="grid grid-cols-[1fr_4fr]">
                <UserProfile isDriver={isDriver} isPassenger={isPassenger}/>
                <Participations />
            </section>
        )
    }
    if (isDriver && !isPassenger){
        return(
            <section className="grid grid-cols-[1fr_4fr]">
                <aside className="flex flex-col gap-10">
                    <UserProfile isDriver={isDriver} isPassenger={isPassenger} />
                    <Cars />
                </aside>               
                <CarpoolsManager />
               
            </section>
        )
    }

    return (
        <section className="flex flex-col gap-10">
            <article className="grid grid-cols-[1fr_3fr_1fr] gap-6">            
                <UserProfile isDriver={isDriver} isPassenger={isPassenger} />
                <Participations />
                <Cars />
            </article>
            <article>
                <CarpoolsManager></CarpoolsManager>
            </article>
        </section>
        
    )
            
}