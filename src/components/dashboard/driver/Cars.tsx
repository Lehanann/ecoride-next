"use client"

import { useEffect, useState } from "react"

import { apiFetch } from "@/services/api";
import { Car } from "@/types/car";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { 
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import FormCar from "@/components/forms/FormCar";

export default function Cars(){
    
    const [cars, setCars ] = useState<readonly Car[]>([])

    const [isOpen, setIsOpen ] = useState(false)
    
    useEffect(()=>{

        async function getCarsByUser(){
            
            const allCars: Car[] = await apiFetch("/cars",{method: "GET"})
            setCars(allCars)

        }

        getCarsByUser()
        

    },[])

    async function handleDelete(carId: number){

        try{
            await apiFetch(`/cars/${carId}`, { method: "DELETE"})
            toast.success("Suppression du véhicule réussi.")

        }
        catch(error: any){
            toast.error(error.message)
        }

    }

    return(
        <article className="space-y-5">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button className="rounded-md bg-zinc-900 hover:bg-zinc-700 cursor-pointer">
                        Ajouter un nouveau véhicule
                    </Button>
                </DialogTrigger>
                <DialogContent className=" rounded-md [&>button]:hidden">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">
                            Ajouter un nouveau véhicule
                        </DialogTitle>
                    </DialogHeader>
                    <FormCar onCancel={()=> setIsOpen(false)}/>
                </DialogContent>
            </Dialog>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {
                cars.map((car)=>{
                    return(
                        <Card key={car.id} className="border rounded-md"> 
                            <CardHeader className="">
                                <CardTitle className="capitalize">{car.brand.name},&nbsp;{car.model}</CardTitle>
                                <CardDescription>
                                    Informations du véhicule.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex justify-between">
                                    <p>Immatriculation&nbsp;:&nbsp;</p>
                                    <p className="uppercase font-medium">{car.registration}</p> 
                                </div>
                                <div className="flex justify-between">
                                    <p>Date de 1ère immatriculation&nbsp;:&nbsp;</p>
                                    <p className="font-medium">{car.first_registration_date}</p> 
                                </div>
                                <div className="flex justify-between">
                                    <p>Energie&nbsp;:&nbsp;</p>
                                    <p className="font-medium">{car.energy}</p> 
                                </div>
                                <div className="flex justify-between">
                                    <p>Couleur&nbsp;:&nbsp;</p>
                                    <p className="font-medium">{car.color}</p> 
                                </div>                            
                            </CardContent>
                            <CardFooter className="flex gap-2">
                                <Button className="rounded-md bg-sky-900 hover:bg-sky-700 cursor-pointer">
                                    Modifier
                                </Button>
                                <Button className="rounded-md bg-red-900 hover:bg-red-700 cursor-pointer">
                                    Supprimer
                                </Button>
                            </CardFooter>
                        </Card>
                    )
                })
            }
            </div>  
        </article>
    )
}