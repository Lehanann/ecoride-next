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

const opinions = [
    {id:1, note: 5, comment: "Chauffeur très arrangeant. La conduite douce et prudente tout en étant ponctuel.", author: "mdupont", target: "jdoe", status:"pending", carpoolingId:221},
    {id:2, note: 4, comment: "Chauffeur très bon dans sa conduite. Calme et patient", author: "spayet", target: "jdoe", status:"pending", carpoolingId: 322},
    {id:3, note: 4.5, comment: "Le trajet était agréable, et le chauffeur très conciliant. je recommande", author: "smarcadet", target: "jsmith", status:"pending", carpoolingId: 221},
    {id:4, note: 3, comment: "Le chauffeur est très timide, mais le trajet fut agréable", author: "abenard", target: "jdoe", status:"pending", carpoolingId: 544},
]

export default function OpinionCard(){
    return(
        <React.Fragment>
            {
                opinions.map((opinion)=>{
                    return(
                        <Card key={opinion.id} className="w-full max-w-xs" size="sm">
                            <CardHeader>
                                <CardTitle className="flex justify-between">
                                    <p>Avis: {opinion.carpoolingId}</p>
                                    <p>Status: {opinion.status}</p>
                                </CardTitle>
                                <CardDescription>
                                    <p>Avis en attente de validation d'un modérateur</p>
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-2">
                                <p>
                                    <span className="font-medium">Auteur de l'avis&nbsp;:&nbsp;</span> 
                                    <span className="font-semibold">{opinion.author}</span>
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
                                
                                <Button className="rounded-lg hover:bg-green-100 hover:text-zinc-700 cursor-pointer">Avis accepté</Button>
                                <Button className="rounded-lg bg-red-700 hover:bg-red-100 hover:text-zinc-700 cursor-pointer">Avis refusé</Button>
                            </CardFooter>

                        </Card>
                    )
                })
            }
            
            
        </React.Fragment>
        
    )
}