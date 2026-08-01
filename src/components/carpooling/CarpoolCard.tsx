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

export default function CarpoolCard(){
    return(
       <Card className="w-full max-w-3xl border border-gray-400">
        <CardHeader>
            <CardTitle className="flex justify-between">
                <div className="flex items-center gap-3 text-2xl font-semibold">
                    <span>Grandris</span> <ArrowRight className=""/> <span>Gleizé</span> 
                </div>
                <div className="flex items-center gap-2">
                    <p className="text-3xl font-bold">5</p>
                    <Coins/>
                </div>
            </CardTitle>
            <CardDescription className="flex items-center gap-2 text-lg">
                <Avatar>
                    <AvatarImage></AvatarImage>
                    <AvatarFallback>UN</AvatarFallback>
                </Avatar>
                <p>username</p>
            </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between text-lg text-gray-700">
            <p>25 juin - 9:00 am</p>
            <div className="flex items-center gap-2 text-xl">
                <Armchair/>
                <p>: 3</p>
            </div>            
        </CardContent>
        <CardFooter>
            <Button className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/85 transition-colors duration-300 cursor-pointer">Voir le trajet</Button>
        </CardFooter>
       </Card>
    )
}