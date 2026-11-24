import { Carpooling } from "@/types/carpooling"
import { formatDate, formatTime } from "@/utils/formatdatetime";
import { apiFetch } from "@/services/api";

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
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "../ui/badge";
import { toast } from "sonner"

import { ArrowRight, Armchair, Calendar1, Banknote, Clock2, Star, CarIcon, User, X } from 'lucide-react';
import { useRouter } from "next/navigation";

/**
 * Properties accepted by the CarpoolingsList component.
 *
 * Properties:
 * - carpoolings: List of carpoolings to display.
 */
type CarpoolingProps = {
    carpoolings: Carpooling[];
}

/**
 * Displays a list of available carpoolings.
 *
 * Features:
 * - Displays trip information.
 * - Displays driver information and ratings.
 * - Displays vehicle information.
 * - Provides access to a detailed trip drawer.
 * - Allows users to reserve a carpooling.
 *
 * @param props Component properties.
 * @param props.carpoolings Carpoolings available for display.
 * @returns Carpoolings list component.
 */
export default function CarpoolingsList({carpoolings}: CarpoolingProps){

    const router = useRouter()

    /**
    * Creates a reservation for the selected carpooling.
    *
    * Sends a reservation request to the backend API and displays
    * a success or error notification depending on the result.
    *
    * On success, the page is refreshed to update displayed data.
    *
    * @param carpoolingId Identifier of the carpooling to reserve.
    */
    async function handleReservation(carpoolingId: number){
        
        try {
            await apiFetch("/reservations", {
                method: "POST",
                body:JSON.stringify({
                    carpooling_id: carpoolingId
                })
            })
            toast.success("Réseavation effectuée avec succès")
            router.refresh()
            
        }
        catch (error: any) {
            toast.error(error.message)
        }
        
    }

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
                                <div className="text- font-semibold text-muted-foreground capitalize flex items-center gap-5">
                                    <Avatar className="" size={"lg"}>
                                        <AvatarImage src={`http://localhost:8000/${carpooling.car.user.avatar_url}`} />
                                        <AvatarFallback className="uppercase">{carpooling.car.user.username.slice(0,2)}</AvatarFallback>
                                    </Avatar>
                                    <div className="">
                                        <div className="flex items-center gap-7">
                                            <p>{carpooling.car.user.username}</p>
                                            {
                                                carpooling.car.user.count === 0
                                                ? <Badge className="bg-emerald-600">Aucun avis</Badge>
                                                :(
                                                     <div className="flex items-center gap-1">
                                                        <div>{carpooling.car.user.average_ratings.toFixed(1)}</div>
                                                        <Star 
                                                            size={16}
                                                            fill="currentColor"
                                                            className="text-amber-400"
                                                        />
                                                        <div className="relative">
                                                             <p className="absolute bottom-0 text-xs">({carpooling.car.user.count})</p>
                                                        </div>
                                                       
                                                    </div>
                                                ) 
                                            }
                                           
                                        </div>
                                       <span className="text-xs font-medium text-muted-foreground capitalize flex"><p>
                                        {carpooling.car.brand.name}</p>,&nbsp;{carpooling.car.model}
                                    </span>
                                    </div>                                   
                                </div>                                
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
                                <Drawer 
                                    direction="right" 
                                >
                                    {
                                        carpooling.place_number === 0
                                        ? (
                                            <Badge variant="destructive" className="ml-auto rounded-md text-base p-2" >
                                                Complet
                                            </Badge>
                                        )
                                        :(
                                            <DrawerTrigger 
                                                type="button"
                                                className="rounded-md px-3 py-2 text-sm cursor-pointer text-white font-medium bg-sky-600 hover:bg-sky-500 transition-all ml-auto" 
                                            >
                                                voir les détails
                                            </DrawerTrigger>
                                        )

                                    }
                                    
                                    <DrawerContent className="flex-1 before:rounded-md data-[vaul-drawer-direction=right]:sm:max-w-xl">
                                        <DrawerHeader className="relative">
                                            <DrawerTitle>
                                                <p className="flex items-center text-4xl capitalize gap-2 text-bold ">
                                                    {carpooling.departure_location} 
                                                    <ArrowRight size={32}/> 
                                                    {carpooling.end_location}
                                                </p>
                                            </DrawerTitle>
                                            <DrawerDescription>Détail du trajet</DrawerDescription>
                                            <DrawerClose asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="absolute right-2 top-2 cursor-pointer"
                                                >
                                                    <X className="h-5 w-5"/>

                                                </Button>
                                            </DrawerClose>

                                        </DrawerHeader>
                                        <div className="p-4 flex-1 space-y-5">
                                            <div className="flex gap-2 items-center">
                                                <Calendar1 size={32} className="text-orange-600"/>
                                                <p className="text-xl font-semibold">{formatDate(carpooling.departure_date)}</p>
                                            </div>
                                            <div className="flex items-center gap-2 w-full">
                                                <Clock2 size={32} className="text-indigo-600"/>
                                                <div className="flex items-center gap-5 w-full max-w-2/3 text-xl">
                                                     
                                                    <p>{formatTime(carpooling.departure_time)}</p>
                                                    <hr className="flex-1 border-t-zinc-600"/>
                                                    <p>{formatTime(carpooling.end_time)}</p> 
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                    <Banknote
                                                        size={32} 
                                                        className="text-emerald-600"/>
                                                    <p className="text-xl font-bold">{carpooling.price}</p>
                                                    <p>crédits</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Armchair 
                                                        size={32}
                                                        className="text-rose-600"/>
                                                    <p className="text-xl font-medium">{carpooling.place_number}</p>
                                                    <p>place(s) disponible(s)</p>
                                                </div>
                                            <hr />
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-2">
                                                    <CarIcon />
                                                    <h3 className="text-lg text-muted-foreground">Véhicule</h3>
                                                </div>
                                                
                                                <div className="flex flex-col text-lg font-medium">
                                                    <div className="flex items-center gap-2">
                                                        <p className=" text-zinc-500">Marque&nbsp;:&nbsp;</p>
                                                        <p className="capitalize">{carpooling.car.brand.name}</p>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <p className=" text-zinc-500">Modèle&nbsp;:&nbsp;</p>
                                                        <p className="capitalize">{carpooling.car.model}</p>
                                                    </div>
                                                    <div className="capitalize text-lg flex items-center gap-2">
                                                        <p className=" text-zinc-500">Energie&nbsp;:&nbsp;</p>
                                                        <p className="m">{carpooling.car.energy}</p>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <p className=" text-zinc-500">Immatriculation&nbsp;:&nbsp;</p>
                                                        <p className="uppercase">{carpooling.car.registration}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-2">
                                                    <User/>
                                                     <h3 className="text-lg text-muted-foreground">Chauffeur</h3>
                                                </div>
                                               
                                                <div className="space-y-3">
                                                    <Avatar className="" size={"lg"}>
                                                        <AvatarImage src={`http://localhost:8000/${carpooling.car.user.avatar_url}`} />
                                                        <AvatarFallback className="uppercase">{carpooling.car.user.username.slice(0,2)}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <div className="">
                                                            <p className="text-xl">{carpooling.car.user.username}</p>
                                                        </div> 
                                                            {
                                                                carpooling.car.user.count === 0
                                                            ?   <div>
                                                                    <Badge className="bg-emerald-600">Aucun avis</Badge>
                                                                </div>
                                                            :(
                                                                <div className="relative">
                                                                    <div className="flex items-center gap-2">
                                                                        <p className="text-xl text-zinc-500 font-semibold">
                                                                            {carpooling.car.user.average_ratings}
                                                                        </p>
                                                                        <Star 
                                                                            size={24}
                                                                            fill="currentColor"
                                                                            className="text-amber-400"
                                                                        />  
                                                                    </div>                                                           
                                                                    <div className="absolute top-0 left-16">
                                                                        <p className="text-xs">({carpooling.car.user.count})</p>
                                                                    </div>                                                   
                                                                </div>
                                                            )
                                                        }
                                                        
                                                    </div>        
                                                </div>
                                            </div>
                                        </div>
                                        <DrawerFooter>
                                            <DrawerClose asChild>
                                                {
                                                    carpooling.place_number === 0 
                                                    ? (
                                                        <Badge variant="destructive"className="text-base">
                                                            Complet
                                                        </Badge>
                                                    )
                                                    : (
                                                        <Button
                                                            type="button"
                                                            onClick={()=>handleReservation(carpooling.id)}
                                                            className="rounded-md cursor-pointer">Réservation
                                                        </Button>)
                                                }                                               
                                            </DrawerClose>
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