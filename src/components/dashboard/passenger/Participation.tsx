"use client"

import { useEffect, useState } from "react";

import { apiFetch } from "@/services/api";
import { formatDate, formatTime } from "@/utils/formatdatetime";
import { formatStatus } from "@/utils/formatstatus";
import { Reservation } from "@/types/reservation";
import FormOpinion from "@/components/forms/FormOpinion";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

/**
 * User reservation history component.
 *
 * Displays all carpoolings reserved by the authenticated user.
 *
 * Features:
 * - Displays reservation information.
 * - Displays trip status.
 * - Displays driver and vehicle information.
 * - Allows users to submit an opinion after a trip.
 * - Indicates whether an opinion has already been submitted.
 *
 * @returns User reservation history component.
 */
export default function Participations(){

    const [ reservations, setReservations ] = useState<Reservation[]>([])

    const [ selectedReservationId, setSelectedReservationId ] = useState<number | null>(null)

    /**
     * Retrieves all reservations associated with the authenticated user.
     *
     * Loads the reservation history displayed in the dashboard.
     */
    async function loadReservations(){
        const allReservations: Reservation[] = await apiFetch("/reservations/me",{method: "GET"})
        setReservations(allReservations)  
    }

    useEffect(()=>{       
        loadReservations()
    },[])

    if (reservations.length === 0) {
        return (
            <p className="text-muted-foreground">
                Vous n'avez aucune réservation.
            </p>
        )
    }
    
    return (
        <article className="space-y-5">
            <hr className="border-zinc-500"/>
             <div className="divide-y divide-zinc-500 divide-dashed space-y-2">
                {
                    reservations.map((reservation)=>{
                        return(
                            <div key={reservation.carpooling.id} className="py-5 space-y-5 ">
                                <div className="">
                                    <div className="flex gap-2">
                                        <p className="font-semibold text-2xl">{reservation.carpooling.departure_location} → {reservation.carpooling.end_location}</p>
                                        <p className="text-xs mt-1">                                             
                                        </p>
                                        <Badge className={`
                                            ${reservation.carpooling.status === "finished" && "bg-emerald-200"} 
                                            ${reservation.carpooling.status === "published" && "bg-sky-200"} 
                                            ${reservation.carpooling.status === "cancelled" && "bg-red-200"}
                                            
                                            text-zinc-700 `}>
                                            {   
                                                formatStatus(reservation.carpooling.status)
                                            }
                                        </Badge>                                                                               
                                    </div>                                    
                                    <div className="flex gap-2 items-start">
                                        <p>🧑‍✈️</p>
                                        <div> 
                                            <p className="font-medium">{reservation.carpooling.car.user.username}</p>
                                            <p className="text-muted-foreground text-xs capitalize font-medium">
                                                {reservation.carpooling.car.brand.name},&nbsp;{reservation.carpooling.car.model}</p>
                                        </div>                                       
                                    </div>                                    
                                </div>
                                <div className="mb-2 flex flex-wrap gap-15 items-center text-xl font-medium">                                    
                                    <p>📅&nbsp;{formatDate(reservation.carpooling.departure_date)}</p>
                                    <p>⏱&nbsp;{formatTime(reservation.carpooling.departure_time)}&nbsp;-&nbsp;{formatTime(reservation.carpooling.end_time)}</p>     
                                    <p>💸 {reservation.carpooling.price}</p>
                                    {                                    
                                        reservation.has_opinion
                                        ? <Badge className="rounded-md bg-indigo-400 text-white cursor-pointer ml-auto">Avis déjà envoyé</Badge>
                                        : (
                                            <Dialog 
                                                open={selectedReservationId === reservation.carpooling.id} 
                                                onOpenChange={(open)=>{
                                                    setSelectedReservationId( open ? reservation.carpooling.id : null)
                                                }}
                                            >
                                                <DialogTrigger asChild>
                                                    <Button className="rounded-md bg-yellow-400 text-zinc-600 hover:bg-amber-200 cursor-pointer ml-auto">
                                                        Laisser un avis
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="w-full sm:max-w-2xl rounded-md [&>button]:hidden">
                                                    <DialogHeader>
                                                        <DialogTitle className="text-2xl">
                                                            Laisser votre avis
                                                        </DialogTitle>
                                                        <DialogDescription className="text-zinc-400 text-sm ">                                                                               
                                                            Donner votre avis et noter le chauffeur pour ce trajet, 
                                                            contribue au bon fonctionnement du site.
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <FormOpinion 
                                                        carpoolingId={reservation.carpooling.id} 
                                                        onCancel={() => setSelectedReservationId(null)}
                                                        onSuccess={loadReservations}
                                                    />
                                                </DialogContent>
                                            </Dialog>     
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