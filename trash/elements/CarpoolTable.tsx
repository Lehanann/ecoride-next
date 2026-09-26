"use client"

import { useRouter } from "next/navigation";

import { Reservation } from "@/types/reservation";
import { Badge } from "@/components/ui/badge";
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
 import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react"
import { formatDate, formatTime } from "@/utils/formatdatetime";

export default function CarpoolTable({reservations}:{reservations: Reservation[]}){

    const router = useRouter() 

    return(
        <Table>
            <TableHeader>
                <TableRow className="border-gray-700">
                    <TableHead className="text-center">Date</TableHead>
                    <TableHead className="text-center">Trajet</TableHead>
                    <TableHead className="text-center">Heure départ</TableHead>
                    <TableHead className="text-center">Chauffeur</TableHead>
                    <TableHead className="text-center">Etat</TableHead>
                    <TableHead className="text-center">Avis</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    reservations.map((reservation) => (
                        <TableRow key={reservation.carpooling.id} className="h-14">
                            <TableCell className="text-center">{formatDate(reservation.carpooling.departure_date)} </TableCell>
                            <TableCell className="flex items-center gap-2 justify-center">
                                {reservation.carpooling.departure_location} <ArrowRight />{reservation.carpooling.end_location}
                            </TableCell>
                            <TableCell className="text-center">
                                {formatTime(reservation.carpooling.departure_time)}&nbsp;-&nbsp;</TableCell>
                            <TableCell className="text-center">
                                <Badge className="bg-sky-100 text-sky-700">
                                    {reservation.carpooling.car.user.username}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-center">
                                {reservation.carpooling.status}
                            </TableCell>
                            <TableCell>
                                <div className="flex justify-center">
                                    {
                                        reservation.carpooling.status === "finished"
                                        && (
                                            <Button
                                                onClick={() => router.push(`/dashboard/opinion/${reservation.carpooling.id}/`)}
                                                className="bg-sky-600 rounded-md">
                                                Ajouter un avis
                                            </Button>)
                                    }
                                </div>                            
                            </TableCell>
                        </TableRow>
                    ))
                }
                
                
                             
            </TableBody>

        </Table>
    )
}