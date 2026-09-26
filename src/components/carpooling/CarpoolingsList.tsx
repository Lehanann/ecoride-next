
import { useRouter } from "next/navigation";

import { Carpooling } from "@/types/carpooling"
import { formatDate, formatTime } from "@/utils/formatdatetime";

import { ArrowRight, Armchair, Calendar1, Banknote, Clock2 } from 'lucide-react';
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

type CarpoolingProps = {
    carpoolings: Carpooling[];
}


export default function CarpoolingsList({carpoolings}: CarpoolingProps){

    const router = useRouter()

    return(
        <div className="divide-y-2 divide-zinc-300 divide-dashed space-y-2">
            {
                carpoolings.map((carpooling)=>{
                    return(
                        <div key={carpooling.id} className="my-5 space-y-2">
                            <div className="flex items-center gap-2 capitalize text-2xl font-semibold">
                                <p className="">{carpooling.departure_location}</p> <ArrowRight className=""/><p>{carpooling.end_location} </p>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-muted-foreground capitalize">{carpooling.car.user.username}</p>
                                <span className="text-xs font-medium text-muted-foreground capitalize flex"><p>{carpooling.car.brand.name}</p>,&nbsp;{carpooling.car.model}</span>
                            </div>
                            <div className="flex gap-20 text-lg mb-2">
                                <span className="flex items-center gap-2">
                                    <Calendar1 size={20} className="text-orange-600"/>
                                    <p className="font-semibold">{formatDate(carpooling.departure_date)} </p>
                                </span>
                                <span className="flex items-center gap-2 font-medium">
                                    <Clock2 size={20} className="text-indigo-600"/>
                                    <p>{formatTime(carpooling.departure_time)}</p>
                                </span>
                                <span className="flex items-center gap-2 font-medium">
                                    <Armchair className="text-rose-600"/>
                                    <p>{carpooling.place_number} </p>
                                    <p className="text-xs">place(s) restante(s)</p>
                                </span>
                                <span className="flex items-center gap-2 font-semibold">
                                    <Banknote className="text-emerald-600"/>
                                    <p>{carpooling.price} </p>
                                    <p className="text-xs">crédits</p>
                                </span>
                                <Drawer direction="right" >
                                    <DrawerTrigger 
                                        type="button" 
                                        className="rounded-md px-3 py-2 text-sm cursor-pointer text-white font-medium bg-sky-600 hover:bg-sky-500 transition-all ml-auto" 
                                    >
                                        voir les détails
                                    </DrawerTrigger>
                                    <DrawerContent className="flex-1 before:rounded-md data-[vaul-drawer-direction=right]:sm:max-w-xl">
                                        <DrawerHeader>
                                        <DrawerTitle>
                                            <h1 className="flex items-center text-4xl capitalize gap-2 text-bold ">
                                                {carpooling.departure_location} 
                                                <ArrowRight size={32}/> 
                                                {carpooling.end_location}
                                            </h1>
                                        </DrawerTitle>
                                        <DrawerDescription>This action cannot be undone.</DrawerDescription>
                                        </DrawerHeader>
                                        <div className="p-4 flex-1">
                                            {/* Content here */}
                                            {carpooling.car.brand.name},&nbsp;{carpooling.car.model}
                                        </div>
                                        <DrawerFooter>
                                        <Button className="rounded-md">Réservation</Button>
                                        <DrawerClose>Cancel</DrawerClose>
                                        </DrawerFooter>
                                    </DrawerContent>
                                    </Drawer>
                            </div>
                        </div>
                    )
                })
            }            
        </div>
    )
}