"use client"

import Cars from "@/components/dashboard/driver/Cars";
import FormCar from "@/components/forms/FormCar";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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