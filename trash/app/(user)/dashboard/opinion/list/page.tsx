"use client"

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { OpinionType } from "@/types/opinion";
import { apiFetch } from "@/services/api";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { formatDate } from "@/utils/formatdatetime";
import { useRouter } from "next/navigation";


export default function OpinionsList(){

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

        async function getOpinionsDriver(){
            try{
                const result: OpinionType[] = await apiFetch("/opinions/me", { method : "GET" })
                setOpinionsDriver(result)
            }
            catch(error){
                console.error(error);
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
    
    if (!loading && opinionsDriver.length === 0 ) { 
        return (
            <main className="w-full flex justify-center items-center italic text-zinc-500 font-light">
                <p className="text-2xl">Vous n'avez reçu aucun avis validé pour le moment.</p>
            </main>
            
        )
    }

    return(
        <main className="w-full flex flex-col gap-2">
            {
                opinionsDriver.map((opinion)=>{
                    return(
                        <Card key={opinion.id} className="max-w-2xl mx-auto border border-zinc-300 rounded-md bg-emerald-100 ">
                            <CardHeader className="flex flex-col gap-2 w-full">
                                <CardTitle className="capitalize  text-xl flex items-center justify-between w-full">
                                    <div className="flex">
                                        <h4 className="font-bold">Auteur:</h4>
                                        &nbsp;
                                        <h4 className="font-medium">{opinion.author.username}</h4>
                                    </div>
                                    <div className="flex">
                                        <p className="font-bold">Note:</p>
                                        &nbsp;
                                        <p className="font-medium">{opinion.note}/5</p>
                                    </div>
                                    
                                </CardTitle>
                                
                            </CardHeader>
                            <hr className="border-zinc-400 mx-5"></hr>
                            
                            <CardContent className="text-xl">
                                <p>Description: </p>
                                <p>{opinion.comment}</p>
                            </CardContent>
                            <hr className="border-zinc-400 mx-5"></hr>
                            <CardFooter>
                                <CardDescription className="flex flex-col gap-4 w-full">
                                    <p className="italic text-end">Cet avis a été vérifié par un modérateur de la société Ecoride avant validation.</p>
                                    <p className="text-end text-zinc-700">Avis validé le: {formatDate(opinion.validated_at)} </p>         
                                </CardDescription>
                                                 
                            </CardFooter>
                        </Card>
                        
                    )
                })
            }


        </main>
    )
}