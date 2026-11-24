"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";
import { apiFetch } from "@/services/api";
import { OpinionType } from "@/types/opinion";
import { formatDate } from "@/utils/formatdatetime";

import { toast } from "sonner";

/**
 * Generates a visual star rating representation.
 *
 * Creates an array of star elements corresponding
 * to the provided rating value.
 *
 * @param note Rating value.
 * @returns Array of star elements.
 */
function StarNote(note: number){
    const starNote = []

    for(let i=0; i<note ; i++){
        starNote.push(<span key={i}>⭐</span>)
    }
    return starNote
}

/**
 * Driver opinions dashboard.
 *
 * Displays validated reviews received by the authenticated driver.
 *
 * Features:
 * - Restricts access to users with the driver role.
 * - Retrieves validated driver opinions.
 * - Displays ratings and comments.
 * - Handles loading and empty states.
 *
 * @returns Driver opinions component.
 */
export default function Opinions(){
    const { user, isLoading } = useAuth();
    const [ opinionsDriver, setOpinionsDriver ] = useState<OpinionType[]>([])
    const [loading, setLoading ] = useState(true)

    const router = useRouter()

    const isDriver = user?.roles.some(role => role.name === "driver");

    useEffect(()=>{

        if (isLoading) return;

        if (!user){
            router.replace("/login");
            return;
        }
        if(!isDriver){
            router.replace("/forbidden")
            return;
        }

    }, [user, isLoading, isDriver, router])

    useEffect(()=>{
        if(!user || !isDriver) return;

        /**
         * Retrieves all validated opinions received by the authenticated driver.
         *
         * Loads the driver's reviews and up.
         */
        async function getOpinionsDriver(){
            try{
                const result: OpinionType[] = await apiFetch("/opinions/me", { method : "GET" })
                setOpinionsDriver(result)
            }
            catch(error: any){
                toast.error(error.message);
            }
            finally {
                setLoading(false)
            }            
        }
        getOpinionsDriver()
    }, [user , isDriver]);

    
    if(isLoading){ return (<p>Chargement...</p>)}
    
    if (!user || !isDriver) { return null; }
    
    if (loading) { return (<p>Chargement...</p>) }
    
    if (!loading && opinionsDriver.length === 0 ) 
    { 
        return (
            <article className="w-full flex justify-center items-center italic text-zinc-500 font-light">
                <p className="text-2xl">Vous n'avez reçu aucun avis validé pour le moment.</p>
            </article>
        )
    }

    return(
        <article className="space-y-5">
        <hr className="border-zinc-500"/>
        <div className="divide-y divide-zinc-500 divide-dashed space-y-2">
            {
                opinionsDriver.map((opinion)=>{
                    return(
                        <div key={opinion.id} className="py-5">
                            <div>
                                <p className="text-2xl capitalize font-semibold">{opinion.author.username}</p>
                                <p className="text-muted-foreground text-sm">
                                Avis validé le {formatDate(opinion.validated_at)}
                            </p>
                            </div>                                
                            <p>{ StarNote(opinion.note)}</p>
                            <p className="text-lg font-medium">{opinion.comment}</p>
                        </div>
                    )
                })
            }
        </div>
        </article>
    )
}