"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { Carpooling } from "@/types/carpooling"
import { formatTime } from "@/utils/formatdatetime"
import { capitalize } from "@/utils/formatstring"
import { formatEnergy } from "@/utils/formatenergy"
import { apiFetch } from "@/services/api"

import { toast } from "sonner"
import { Button } from "../ui/button"

import { ArrowRight, Car, EvCharger, MapPin, Flag, UserRound, PawPrint, CigaretteOff, Armchair } from "lucide-react"



type CarpoolingProps = {
    carpool: Carpooling
}

export default function CarpoolDetail({
    carpool
    }: CarpoolingProps
){

    const router = useRouter()

    const [ isLoading, setIsLoading ] = useState(false)

    async function handleReservation(){
        
        setIsLoading(true)

        try {
            await apiFetch("/reservations", {
                method: "POST",
                body:JSON.stringify({
                    carpooling_id: carpool.id
                })
            })
            toast.success("Réseavation effectuée avec succès")
            router.back()
        }
        catch (error: any) {
            toast.error(error.message)
        }
        finally {
            setIsLoading(false)
        }
        
    }

    return(
        <section className="w-full max-w-6xl mx-auto flex gap-16">
            <article className="w-2/3 flex flex-col gap-12">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-6xl font-medium">
                        <span>{carpool.departure_location}</span>
                        <ArrowRight size={56}/> 
                        <span>{carpool.end_location}</span> 
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className="flex flex-col justify-between">
                        <p>{formatTime(carpool.departure_time)}</p>
                        <p>{formatTime(carpool.end_time)}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <MapPin/>
                        <hr className="h-15 border-l-2 w-0 ml-3 my-2 border-gray-500 border-dashed"></hr>
                        <Flag/>                 
                    </div>
                    
                    <div className="flex flex-col justify-between gap-2">
                        <p></p>  
                        <p></p>
                    </div>
                </div>
                <div className="mt-10 flex flex-col gap-3">
                    <h6>Options du trajet</h6>
                    <p className="flex gap-1"><CigaretteOff/>: Voyage non fumeur.</p>
                    <p className="flex gap-1"><PawPrint/>: Votre animal de compagnie est le bien venu.</p>
                </div>
            </article>
            <aside className="flex flex-col w-1/3 gap-10 border-l pl-10">
                <div className="mx-auto">
                    <span className="text-7xl">{carpool.price}</span>
                </div>
                <div className="mx-auto flex items-center gap-1">
                    <Armchair size={48}/>
                    <span className="text-5xl font-medium">&nbsp;{carpool.place_number}</span>
                </div>
                <div className="mx-auto">
                    <div className="flex items-center gap-1 text-gray-500">
                        <UserRound size={40}/>
                        <p className="text-5xl text-gray-600">&nbsp;&nbsp;{carpool.car.user.username}</p>
                    </div>
                    <div className="mt-5 flex flex-col gap-2">
                        <div className="flex items-center gap-1">
                            <Car size={32} className="text-amber-700"/>
                            <p className="text-">
                                : {(carpool.car.brand.name).toUpperCase()},&nbsp;{capitalize(carpool.car.model)}
                            </p>
                        </div>
                        <div className="flex items-center gap-1">
                            <EvCharger size={32} className="text-sky-600"/>
                            <div className="text-l">
                                : {capitalize(formatEnergy(carpool.car.energy))}
                            </div>
                        </div>
                    </div>
                </div>
                <Button
                    disabled={isLoading}
                    onClick={handleReservation} 
                    className="bg-[var(--color-primary)] w-full text-lg font-medium py-4 cursor-pointer"
                >
                    Réservation
                </Button>
            </aside>
        </section>
    )
}