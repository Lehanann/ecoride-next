"use client"

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

import EmployeeProfile from "@/components/moderation/EmployeeProfile";
import { OpinionType } from "@/types/opinion";
import { getPendingOpinions, validateOpinion, rejectOpinion } from "@/services/opinion";

import { toast } from "sonner";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

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

        async function loadOpinions(){
            try{
                const data: OpinionType[] = await getPendingOpinions()
                setOpinions(data)
            }
            catch(error){
                console.error(error);
            }
        }

        loadOpinions()

    }, [user, isEmployee])

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
                                <span className="font-semibold"></span>
                            </p>
                            <p className="font-medium">
                                <span>Note&nbsp;:&nbsp;</span>
                                <span className={`${opinion.note > 3 ? "text-green-500 font-semibold" : "text-amber-600"}`}>{opinion.note}</span>
                                <span>/5</span> 
                            </p>
                            <p className="line-clamp-2">{opinion.comment}</p>
                            <Link href="" className="text-sky-500 font-medium text-lg underline">Détail du post</Link>
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