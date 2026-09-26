"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Carpooling, carpoolingStatus } from "@/types/carpooling";
import { apiFetch } from "@/services/api";
import { formatDate, formatTime } from "@/utils/formatdatetime";
import { formatStatus } from "@/utils/formatstatus";

import { Button } from "@/components/ui/button";
import { 
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
 } from "@/components/ui/table";

import { MoveRight, Trash, FlagTriangleLeft, SquareCheckBig, Check, X } from "lucide-react"

export default function CarpoolsManager(){

    const router = useRouter()

    const [ carpoolings, setCarpoolings ] = useState<Carpooling[]>([])

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
        <div>
            <div className="flex gap-10">
                <h1 className="text-2xl">Mes trajets</h1>
                <Button
                    onClick={()=>{router.push("/dashboard/hosting")}}
                    className="text-2xl rounded-md bg-zinc-900 w-8 h-8 
                        hover:bg-zinc-100 hover:border-zinc-900 hover:text-zinc-900 
                        cursor-pointer transition-colors duration-500"
                >
                    +
                </Button>
            </div>
            <Table>
                <TableHeader>
                    <TableRow className="border-gray-700">
                        <TableHead className="text-center">id</TableHead>
                        <TableHead className="text-center">Date</TableHead>
                        <TableHead className="text-center">Trajet</TableHead>
                        <TableHead className="text-center">Heure</TableHead>
                        <TableHead className="text-center">Statut</TableHead>
                        <TableHead className="text-center">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        carpoolings.map((carpooling)=>(
                            <TableRow key={carpooling.id} className="h-14">
                                <TableCell className="text-center">{carpooling.id}</TableCell>
                                <TableCell className="text-center">{formatDate(carpooling.departure_date)}</TableCell>
                                <TableCell className=""><span className="flex gap-2 items-center justify-center">{carpooling.departure_location}<MoveRight/>{carpooling.end_location}</span></TableCell>
                                <TableCell className="text-center">{formatTime(carpooling.departure_time)} - {formatTime(carpooling.end_time)} </TableCell>
                                <TableCell className="text-center">{formatStatus(carpooling.status)} </TableCell>
                                <TableCell className="">
                                    {
                                        carpooling.status === carpoolingStatus.draft
                                        && (
                                        <span className="flex items-center justify-center gap-2">
                                        <Button
                                            onClick={()=>updateStatus(carpooling.id, carpoolingStatus.cancelled)} 
                                            className="h-10 w-10 rounded-sm bg-red-600 hover:bg-red-400 cursor-pointer">
                                            <Trash size={6}/>
                                        </Button>
                                        <Button
                                            onClick={()=>updateStatus(carpooling.id, carpoolingStatus.published)} 
                                            className="h-10 w-10 rounded-sm cursor-pointer">
                                            <FlagTriangleLeft/>
                                        </Button>
                                    </span>)
                                    }
                                    {
                                        carpooling.status === carpoolingStatus.published
                                        &&(
                                            <span className="flex items-center justify-center gap-2">
                                                <Button
                                                    onClick={()=>updateStatus(carpooling.id, carpoolingStatus.cancelled)} 
                                                    className="h-10 w-10 rounded-sm bg-red-600 hover:bg-red-400 cursor-pointer"
                                                >
                                                    <Trash size={6}/>
                                                </Button>
                                                <Button
                                                    onClick={()=>updateStatus(carpooling.id, carpoolingStatus.finished)} 
                                                    className="h-10 w-10 rounded-sm cursor-pointer bg-sky-600 hover:bg-sky-400 ">
                                                    <SquareCheckBig/>
                                                </Button>
                                            </span>
                                        )

                                    }
                                    {
                                        carpooling.status === carpoolingStatus.finished
                                        &&(
                                            <span className="flex items-center justify-center">
                                                <Check size={24} color="green"/>
                                            </span>
                                            
                                        )

                                    }
                                    {
                                        carpooling.status === carpoolingStatus.cancelled
                                        &&(
                                            <span className="flex items-center justify-center">
                                                <X size={24} color="red"/>
                                            </span>
                                            
                                        )

                                    }                                   
                                       
                                </TableCell>
                            </TableRow>

                            )
                        )
                    }
                </TableBody>
            
            </Table>
        </div>
        
    )
}