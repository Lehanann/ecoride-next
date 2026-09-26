"use client"

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

import FormHosting from "@/components/forms/FormHosting";
import { useEffect } from "react";
import Hosting from "@/components/dashboard/driver/Hosting";


export default function HostingPage() {

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
            router.replace("/forbidden");
            return;
        }

    }, [user, isLoading, isDriver, router])


    if (isLoading){return <p>Chargement</p>}

    if (!user || !isDriver ) { return null}

    return(
        <section className="space-y-8">
            <div>
                <h4 className="text-2xl font-medium">Mes Trajets</h4>
                <p className="text-muted-foreground">Listes de vos trajets pour le covoiturage.<br/>
                Vous pouvez ajouter, modifier et supprimer vos trajets. </p>
            </div>
            <Hosting />
        </section>
    )
}