"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { Carpooling, carpoolingStatus } from "@/types/carpooling";
import { apiFetch } from "@/services/api";
import FormHosting from "@/components/forms/FormHosting";

import { formatDate, formatTime } from "@/utils/formatdatetime";
import { formatStatus } from "@/utils/formatstatus";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { SquareActivity } from "lucide-react"

export default function Hosting(){

    const router = useRouter()

    const [ carpoolings, setCarpoolings ] = useState<Carpooling[]>([])

    const [isOpen, setIsOpen ] = useState(false)

    async function loadCarpooling(){
        const data: Carpooling[] = await apiFetch("/carpoolings/me", {method: "GET"})
            setCarpoolings(data)
    }

    useEffect(()=>{

        loadCarpooling()
        
    },[])

    async function updateStatus(carpooling_id: number, status: carpoolingStatus){
        try{
            await apiFetch(`/carpoolings/${carpooling_id}/status`, {
                method: "PATCH",
                body: JSON.stringify({status})
            })
            await loadCarpooling()
        }
        catch (error){

        }

    }

    return (
       <article className="space-y-5">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="rounded-md bg-zinc-900 hover:bg-zinc-700 cursor-pointer">
                    Créer un nouveau trajet
                </Button>
            </DialogTrigger>
            <DialogContent className="w-full sm:max-w-6xl rounded-md [&>button]:hidden">
                <DialogHeader>
                    <DialogTitle className="text-2xl">
                        Création d'un nouveau trajet
                    </DialogTitle>
                    <DialogDescription className="text-zinc-400 text-sm ">                     
                        Formulaire de création d'un nouveau trajet. <br/>Tous les champs sont obligatoires. 
                        Le nombre de place est fixé à 1 par défaut et le prix à 2.00 crédits. 
                        Ces 2.00 crédits sont versés à Ecoride pour le bon fonctionnement du site.<br/>
                        Vous devez fixer votre prix au dessus de ces 2.00 crédits pour créditer votre compte.
                    </DialogDescription>
                </DialogHeader>
                <FormHosting onCancel={()=> setIsOpen(false)}/>
            </DialogContent>
        </Dialog>
        <hr className="border-zinc-500"/>
        <div className="divide-y divide-zinc-500 divide-dashed space-y-2">
            {
                carpoolings.map((carpooling)=>{
                    return(
                        <div key={carpooling.id} className="py-5 space-y-4 ">
                            <div className="font-semibold text-lg">
                                {carpooling.departure_location} → {carpooling.end_location}
                            </div>
                            
                            <div className="mb-2 flex items-center gap-5 font-medium">
                                <p>📅&nbsp;{formatDate(carpooling.departure_date)}&nbsp;à&nbsp;{formatTime(carpooling.departure_time)}</p> 
                                <p>👥 {carpooling.place_number}</p>  <p>💸 {carpooling.price}</p>
                                <p className="flex items-center gap-2"><SquareActivity size={16}/> {formatStatus(carpooling.status)}</p>
                                 {
                                    carpooling.status === carpoolingStatus.draft
                                    && (
                                    <span className="flex items-center justify-center gap-2">
                                        <Button
                                            onClick={()=>updateStatus(carpooling.id, carpoolingStatus.cancelled)} 
                                            className="rounded-sm bg-red-600 hover:bg-red-400 cursor-pointer">
                                            Annuler
                                        </Button>
                                        <Button
                                            onClick={()=>updateStatus(carpooling.id, carpoolingStatus.published)} 
                                            className="rounded-sm cursor-pointer">
                                            En route!
                                        </Button>
                                    </span>)
                                }
                                {
                                    carpooling.status === carpoolingStatus.published
                                    &&(
                                        <span className="flex items-center justify-center gap-2">
                                            <Button
                                                onClick={()=>updateStatus(carpooling.id, carpoolingStatus.cancelled)} 
                                                className="rounded-sm bg-red-600 hover:bg-red-400 cursor-pointer"
                                            >
                                                Annuler
                                            </Button>
                                            <Button
                                                onClick={()=>updateStatus(carpooling.id, carpoolingStatus.finished)} 
                                                className=" rounded-sm cursor-pointer bg-sky-600 hover:bg-sky-400 ">
                                                Fin du trajet
                                            </Button>
                                        </span>
                                    )

                                }        
                            </div>
                        </div>
                    )
                })
            }
        </div>
       </article>
    )
}