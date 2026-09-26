import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import React from "react"
import { Button } from "../ui/button"
import Link from "next/link"
import { OpinionType } from "@/types/opinion"
import { validateOpinion } from "@/services/opinion"

interface opinionTypeProps {
    opinion: OpinionType;
}

export default function OpinionCard({
    opinion
}: opinionTypeProps){


    async function handleApproved(id: number){

        try{
            await validateOpinion(id);

            
        }
        catch(error){

        }
    }

    return(
        <Card className="w-full max-w-xs" size="sm">
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
                <Button className="rounded-lg bg-red-700 hover:bg-red-100 hover:text-zinc-700 cursor-pointer">Avis refusé</Button>
                <Button className="rounded-lg hover:bg-green-100 hover:text-zinc-700 cursor-pointer">Avis accepté</Button>                
            </CardFooter>

        </Card>
    )
}