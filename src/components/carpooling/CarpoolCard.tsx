import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { ArrowRight, Armchair, Coins } from 'lucide-react';
import { Button } from "../ui/button";
import { Carpooling } from "@/types/carpooling";
import { formatDate, formatTime } from "@/utils/formatdatetime";
import { useRouter } from "next/navigation";

type CarpoolingCardProps = {
    carpooling: Carpooling
}

export default function CarpoolCard({
    carpooling
}: CarpoolingCardProps){

    const router = useRouter()

    return(
       <Card className="w-full max-w-3xl border border-gray-400">
        <CardHeader>
            <CardTitle className="flex justify-between">
                <div className="flex items-center gap-3 text-2xl font-semibold">
                    <span>{carpooling.departure_location}</span> <ArrowRight className=""/> <span>{carpooling.end_location}</span> 
                </div>
                <div className="flex items-center gap-2">
                    <p className="text-3xl font-bold">{carpooling.price}</p>
                    <Coins/>
                </div>
            </CardTitle>
            <CardDescription className="flex items-center gap-2 text-lg">
                <Avatar>
                    <AvatarImage></AvatarImage>
                    <AvatarFallback></AvatarFallback>
                </Avatar>
                <p>{carpooling.car.user.username}</p>
            </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between text-lg text-gray-700">
            <p>{formatDate(carpooling.departure_date)} - {formatTime(carpooling.departure_time)}</p>
            <div className="flex items-center gap-2 text-xl">
                <Armchair/>
                <p>: {carpooling.place_number}</p>
            </div>            
        </CardContent>
        <CardFooter>
            <Button
                onClick={()=>router.push(`/carpooling/${carpooling.id}`)}
                className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/85 
                    transition-colors duration-300 cursor-pointer"
            >
                Voir le trajet
            </Button>
        </CardFooter>
       </Card>
    )
}