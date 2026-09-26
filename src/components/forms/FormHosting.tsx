"use client"

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from "next/navigation";

import { apiFetch } from '@/services/api';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { MoveRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface Brand{
    id: number,
    name: string
}

interface Car{
    id: number,
    model: string,
    registration: string,
    first_date_registration: Date,
    energy: string,
    color: string,
    brand: Brand
}

const formSchema = z.object({
    departure_date: z.iso.date({message: "La date de départ est obligatoire"}),
    departure_time: z.iso.time({message: "L'heure de départ est obligatoire"}),
    departure_location: z.string().min(1,"Ce champs est requis"),
    end_date: z.iso.date({message: "La date d'arrivée est obligatoire"}),
    end_time: z.iso.time({message: "L'heure d'arrivée est obligatoire"}),
    end_location: z.string().min(1, "Ce champs est requis"),
    place_number: z.number().min(1, "Le minimum est de 1 passager"),
    price: z.number().multipleOf(0.01).min(2.00,"Montant min.: 2.00 "),
    car_id: z.number()
});

type FormData = z.infer<typeof formSchema>;

type FormHostingProps = {
    onCancel?: ()=>void
}

export default function FormHosting(
    { onCancel } : FormHostingProps
){

    const router = useRouter();
    
    const [ cars, setCars ] = useState<Car[]>([])

    useEffect(()=>{

        async function getAllCars(){
            const allCars: Car[] = await apiFetch("/cars",{method: "GET"})
            setCars(allCars)
            console.log(cars)
        }
        getAllCars()

    },[])

    const { register, handleSubmit , setValue, formState: {errors} } = useForm<FormData>({
            resolver: zodResolver(formSchema),
            defaultValues:{
                place_number: 1,
                price: 2.00
            }
        });

     async function onSubmit(values: FormData){
    
        try{
            const params = values
            await apiFetch("/carpoolings", {
                method:"POST",
                body: JSON.stringify(params)
            })
            toast.success("Le covoiturage a été créé avec succès.")
            onCancel
        }
        
        catch (error: any){
            toast.error(error.message)
        }
    }



    return(
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-7">
            <hr className="border-zinc-300"></hr>
            <div className="grid grid-cols-7 gap-4">
                <div className="col-span-3 flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="departure_location">Ville de départ</Label>
                        <Input
                            {...register("departure_location")}
                            id="departure_location"
                            type="text"
                            placeholder="Paris"
                            className="border-zinc-700 rounded-md bg-white"
                        />
                        {errors.departure_location && <p className="text-xs text-red-500">{errors.departure_location.message}</p>}
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="departure_date">Date de départ</Label>
                        <Input
                            {...register("departure_date")}
                            id="departure_date"
                            type="date"
                            className="border-zinc-700 rounded-md bg-white"
                        />
                        {errors.departure_date && <p className="text-xs text-red-500">{errors.departure_date.message}</p>}
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="departure_time">Heure de départ</Label>
                        <Input
                            {...register("departure_time")}
                            id="departure_time"
                            type="time"
                            className="border-zinc-700 rounded-md bg-white"
                        />
                        {errors.departure_time && <p className="text-xs text-red-500">{errors.departure_time.message}</p>}
                    </div>
                </div>
                <div className="col-span-1 flex flex-col gap-4">
                    <div className="flex h-full items-end pb-2 justify-center">
                        <MoveRight />
                    </div>
                    <div className="flex h-full items-end pb-2 justify-center">
                        <MoveRight />
                    </div>
                    <div className="flex h-full items-end pb-2 justify-center">
                        <MoveRight />
                    </div>
                </div>
                <div className="col-span-3 flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="end_location">Ville d'arrivée</Label>
                        <Input
                            {...register("end_location")}
                            id="end_location"
                            type="text"
                            placeholder="Lyon"
                            className="border-zinc-700 rounded-md bg-white"
                        />
                        {errors.end_location && <p className="text-xs text-red-500">{errors.end_location.message}</p>}
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="end_date">date d'arrivée</Label>
                        <Input
                            {...register("end_date")}
                            id="end_date"
                            type="date" 
                            className="border-zinc-700 rounded-md bg-white"
                        />
                        {errors.end_date && <p className="text-xs text-red-500">{errors.end_date.message}</p>}
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="end_time">Heure d'arrivée</Label>
                        <Input
                            {...register("end_time")}
                            id="end_time"
                            type="time"
                            className="border-zinc-700 rounded-md bg-white"
                        />
                        {errors.end_time && <p className="text-xs text-red-500">{errors.end_time.message}</p>}
                    </div>
                </div>
            </div>
            <hr className="border-zinc-300"></hr>
            <div className="grid grid-cols-9 gap-15">
                <div className="col-span-2 flex flex-col gap-2">
                    <Label htmlFor="place_number">Nbre de Place</Label>
                    <Input 
                        {...register("place_number", {valueAsNumber: true})} 
                        id="place_number"
                        type="number"                                                              
                        className="
                            border-zinc-700 rounded-md bg-white
                            text-end pr-5
                            [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
                        "
                    />
                    {errors.place_number && <p className="text-xs text-red-500">{errors.place_number.message}</p>}
                </div>
                <div className="col-span-2 flex flex-col gap-2">
                    <Label htmlFor="price">Prix</Label>
                    <Input
                        {...register("price", {valueAsNumber: true})}
                        id="price"
                        type="number"
                        step={0.01}
                        min={2}
                        className="
                            [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
                            border-zinc-700 rounded-md bg-white
                            text-end pr-5
                        "
                    />
                    {errors.price && <p className="text-xs text-red-500">{errors.price.message}</p>}
                </div>
                <div className="col-span-5 flex flex-col gap-2">
                    <Label htmlFor="car_id">Véhicule pour le trajet</Label>
                    < Select onValueChange={(value) => setValue("car_id", Number(value))}>
                        <SelectTrigger className="w-full bg-white border-zinc-900 rounded-md">
                            <SelectValue className="w-full" placeholder="Choisir une marque"/>
                        </SelectTrigger>
                        <SelectContent className="">
                            <SelectGroup className="bg-white border-zinc-900 rounded-md">
                                {
                                    cars.map((car)=>(
                                        <SelectItem key={car.id} value={car.id.toString()} className="w-full">
                                            
                                            <span className="capitalize font-bold">{car.brand.name},&nbsp;{car.model}</span>
                                            <span className="uppercase font-semibold">&nbsp;:&nbsp;&nbsp;{car.registration}</span>    
                                        </SelectItem>
                                    ))
                                }
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <Button onClick={onCancel} variant="cancel" className="tracking-wider px-4">Annuler</Button>  
                <Button variant="primary" type="submit">Valider</Button>  
            </div>
        </form>
    )
}