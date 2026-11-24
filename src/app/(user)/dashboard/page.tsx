"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";

import { User, Activity} from "lucide-react";

/**
* User dashboard home page.
*
* Displays an overview of the authenticated user's profile
* and recent activity, including:
* - Personal information.
* - Available credits.
* - Driver activity summary.
* - Passenger activity summary.
*
* Access is restricted to authenticated users.
*
* @returns User dashboard home page.
*/
export default function DashboardPage(){

    const { user, isLoading } = useAuth()

    const router = useRouter()

    useEffect(()=>{

        if(isLoading) return;

        if (!user){
            router.replace("/login");
            return;
        }

    }, [user, isLoading, router])

    if (isLoading){return <p>Chargement...</p>}

    if (!user) {return null}
    
    const isDriver = user.roles.some( role => role.name === "driver")
    
    const isPassenger = user.roles.some( role => role.name === "passenger")

   return(
    <section className="space-y-7">
        <h4 className="text-2xl font-medium">Dashboard</h4>
        <h3 className="text-3xl font-semibold">Bonjour,&nbsp;👋&nbsp;{user.username}.</h3> 
        <div>
            <h6 className="text-xl font-semibold flex items-center gap-1"><User size={18}/>Informations personnelles</h6>
            <hr className="border-zinc-400 mt-2 mb-4"></hr>
            <div className="px-5 space-y-2">
                <p>
                    <span className="text-zinc-500">Prénom&nbsp;:&nbsp;</span>
                    <span className="capitalize font-medium">{user.firstname}</span>
                </p>
                <p className="">
                    <span className="text-zinc-500">Nom&nbsp;:&nbsp;</span>
                    <span className="capitalize font-medium">{user.lastname}</span></p>
                <p className="flex items-center">📞&nbsp;:&nbsp;{user.phone}</p>
                <p className="flex items-center">📒&nbsp;:&nbsp;{user.address}</p>
            </div>
        </div>
        <div>
            <h6 className="text-xl font-semibold flex items-center gap-1"><Activity size={18}/>Activité récente</h6>
             <hr className="border-zinc-400 mt-2 mb-4"></hr>
            <div className="px-6 space-y-4">
                <p>💸 Solde actuel : <span className="font-medium">{user.credit}</span>&nbsp;Crédits</p> 
                {
                    isDriver &&
                    <p className="">🚙 Vous avez proposé ... trajets</p>
                }
                {
                    isPassenger &&
                    <p>📅 Vous avez participé à un total de x covoiturages</p>
                }
            </div>
        </div>
    </section>
    )
}