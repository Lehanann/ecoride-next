"use client"

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Carpooling } from "@/types/carpooling";

import CarpoolDetail from "@/components/carpooling/CarpoolDetail";
import { apiFetch } from "@/services/api";

export default function CarpoolingDetails(){

    const { id } = useParams()    

    const [ carpooling, setCarpooling ] = useState<Carpooling>()

    useEffect(()=>{

        async function getCarpoolingById(){
            const result: Carpooling = await apiFetch(`/carpoolings/${id}`, { method: "GET"})
            setCarpooling(result)
        }

        getCarpoolingById()

    },[id])

    if(!carpooling){
        return (
            <main className="flex justify-center items-center container mx-auto">
                <p>Chargement...</p>
            </main>
            
        )
            
    }

    return(
        <main className="my-10 py-15 container mx-auto">
            <CarpoolDetail carpool={carpooling}/>
        </main>
    )
}