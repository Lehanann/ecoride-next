"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";
import Cars from "@/components/dashboard/driver/Cars";

/**
* Driver vehicles management page.
*
* Allows drivers to manage their registered vehicles,
* including creation, modification, and deletion.
*
* Access is restricted to users with the driver role.
*
* @returns Driver vehicles management page.
*/
export default function CreateNewCar(){

    const { user, isLoading } = useAuth()

    const router = useRouter()

    const isDriver = user?.roles.some(role => role.name === "driver")

    useEffect(()=>{
        if (isLoading) return;
        if (!user){
            router.replace("/login");
            return;
        }
        if (!isDriver){
            router.replace("/forbidden")
            return;
        }
    },[user, isLoading, isDriver, router])
    
    if(isLoading) { return <p>Chargement...</p> }

    if(!user || !isDriver ) {return null };

    return(
        <section className="space-y-8">
            <div>
                <h4 className="text-2xl font-medium">Mes Véhicules</h4>
                <p className="text-muted-foreground">Listes des véhicules enregistrés.<br/>
                Vous pouvez ajouter, modifier et supprimer vos véhicules. </p>
            </div>
            <Cars/>
        </section>
    )
}