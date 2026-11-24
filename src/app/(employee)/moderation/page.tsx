"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";
import { getPendingOpinions, validateOpinion, rejectOpinion } from "@/services/opinion";
import { OpinionType } from "@/types/opinion";
import EmployeeProfile from "../../../../trash/components/moderation/EmployeeProfile";

import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

/**
 * Opinion moderation dashboard page.
 *
 * Allows employees to review and moderate opinions
 * submitted by users before publication.
 *
 * Features:
 * - Restricts access to employees.
 * - Displays pending opinions.
 * - Approves opinions.
 * - Rejects opinions.
 * - Updates the moderation queue in real time.
 *
 * @returns Opinion moderation dashboard page.
 */
export default function ModerationPage(){

    const { user, isLoading } = useAuth()

    const router = useRouter()

    const [ opinions, setOpinions ] = useState<OpinionType[]>([])

    const isEmployee = user?.roles.some(role => role.name === "employee")

    useEffect(()=>{
        if (isLoading) return;

        if (!user){
            router.replace("/login")
            return;
        }
        if (!isEmployee){
            router.replace("/forbidden")
            return;
        }

    },[isLoading, user, isEmployee, router])

    useEffect(()=>{
        if (!user || !isEmployee) return;
        
        /**
         * Retrieves all opinions awaiting moderation.
         *
         * Loads the moderation queue displayed to employees.
         */
        async function loadOpinions(){
            try{
                const data: OpinionType[] = await getPendingOpinions()
                setOpinions(data)
            }
            catch(error: any){
                toast.error(error);
            }
        }
        loadOpinions()
    }, [user, isEmployee])

    /**
     * Approves an opinion.
     *
     * Validates the selected opinion, removes it from the 
     * moderation queue and displays a success or error notification.
     * 
     * @param id Identifier of the opinion to approve.
     */
    async function handleApproved(id: number){
        try{
            await validateOpinion(id);
            setOpinions(current => 
                current.filter( 
                    opinion => opinion.id !== id 
                )
            );
            toast.success("Avis approuvé.")                
        }
        catch(error: any){
            toast.error(error.message)
        }
    }

    /**
     * Rejects an opinion.
     *
     * Rejects the selected opinion, removes it from the
     * moderation queue's and displays a success or error notification.
     *
     * @param id Identitier of the opinion to reject.
     */
    async function handleRejected(id: number){    
        try{
            await rejectOpinion(id);
            setOpinions(current => 
                current.filter( 
                    opinion => opinion.id !== id 
                )
            );
            toast.success("Avis refusé")                
        }
        catch(error: any){
            toast.error(error.message)
        }
    }

    if ( isLoading ) { return <p>Chargement...</p> }
    
    if ( !user || !isEmployee ) {return null}

    return(
        <section className="grid grid-cols-[1fr_3fr]">
           <EmployeeProfile employee={user}/>
           <div className="flex flex-wrap gap-5 px-6">
            {
                opinions.map((opinion) => (
                    <Card key={opinion.id} className="w-full max-w-xs" size="sm">
                        <CardHeader>
                            <CardTitle className="flex justify-between">
                                <p>Avis: {opinion.carpooling_id}</p>
                                <p>Status: {opinion.status}</p>
                            </CardTitle>
                            <CardDescription>
                                <p>Avis en attente de validation d'un modérateur</p>
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-2">
                            <p>
                                <span className="font-medium">Auteur de l'avis&nbsp;:&nbsp;</span>
                                <span>{opinion.author.username}</span>
                                <span className="font-semibold"></span>
                            </p>
                            <p className="font-medium">
                                <span>Note&nbsp;:&nbsp;</span>
                                <span className={`${opinion.note > 3 ? "text-green-500 font-semibold" : "text-amber-600"}`}>{opinion.note}</span>
                                <span>/5</span> 
                            </p>
                            <p className="line-clamp-2">{opinion.comment}</p>
                        </CardContent>
                        <CardFooter className="flex justify-between ">
                            <Button
                                onClick={()=> handleRejected(opinion.id)} 
                                className="rounded-lg bg-red-700 hover:bg-red-100 hover:text-zinc-700 cursor-pointer"
                            >
                                Avis refusé
                            </Button>
                            <Button 
                                onClick={() => handleApproved(opinion.id)}
                                className="rounded-lg hover:bg-green-100 hover:text-zinc-700 cursor-pointer"
                            >
                                Avis accepté
                            </Button>                
                        </CardFooter>
                    </Card>
                ))
            }   
           </div>
        </section>
    )
}