"use client"

import { useState, useEffect } from 'react';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Energy, Brand } from "@/types/car";
import { apiFetch } from "@/services/api";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from 'sonner';

/**
 * Vehicle creation form validation schema.
 *
 * Defines validation rules applied before submitting
 * a new vehicle to the backend API.
 */
const formSchema = z.object({
    model: z.string().min(1,"Ce champs est requis").max(50, "ce champs ne peut excéder 50 caractères"),
    registration: z.string().min(1,"Ce champs est requis").max(50, "ce champs ne peut excéder 50 caractères"),
    first_registration_date: z.date(),
    energy: z.enum(Energy),
    color: z.string(),
    brand_id: z.number(),
});


/**
 * Properties accepted by the FormCar component.
 *
 * Properties:
 * - onCancel: Optional callback executed when the form is cancelled.
 */
type FormCarProps = {
    onCancel?: ()=> void
    onSuccess?: () => void
}

type FormData = z.infer<typeof formSchema>;

/**
 * Vehicle creation form.
 *
 * Allows users to register a new vehicle by providing:
 * - Brand
 * - Model
 * - Registration number
 * - First registration da*e
 * - Energy type
 * - Color
 *
 * Form validation is performed using react-hook-form and zod.
 *
 * @param props Component properties.
 **@param props.onCancel Optional callback executed when the form is can*elled.
 * @returns Vehicle creation form component.
 */
export default function FormCar(
    {onCancel, onSuccess }: FormCarProps
){
    const [ brands, setBrands ] = useState<Brand[]>([])

    useEffect(()=>{
        /**
         * Retrieves all available vehicle brands.
         *
         * Loads the list of brands used to populate
         * the brand selection field.
         */
        async function getAllBrands(){            
            const allBrands: Brand[] = await apiFetch("/brands",{
                method: "GET"
            })
            setBrands(allBrands)
        }
        getAllBrands()

    },[])
      
    const { register, handleSubmit , setValue, formState: {errors} } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    })

    /**
     * Handles vehicle creation form submission.
     *
     * Sends the validated vehicle data to the backend API
     * and displays a notification *ndicating whether the
     * operation succeeded or failed.
     *
     * @param values Validated vehicle data.
     */
    async function onSubmit(values: FormData){
        try{
            const params = values
            await apiFetch("/cars", {
                method:"POST",
                body: JSON.stringify(params)
            })
            onSuccess?.()
            onCancel?.()
            toast.success("Le véhicule a été créé avec succès.")
        }        
        catch (error: any){
            toast.error(error.message);            
        }
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)} className="w-full mx-auto flex flex-col gap-10">
          
            <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2 ">
                    <Label htmlFor="brand" className="text-md font-normal">Marque du véhicule</Label>
                    <Select onValueChange={(value) => setValue("brand_id", Number(value))}>
                        <SelectTrigger className="w-full bg-white border-zinc-900 rounded-md">
                            <SelectValue className="" placeholder="Choisir une marque"/>
                        </SelectTrigger>
                        <SelectContent className="">
                            <SelectGroup className="bg-white border-zinc-900 rounded-md">
                                {
                                    brands.map((brand)=>(
                                        <SelectItem key={brand.id} value={brand.id.toString()} className="">
                                            <span className="capitalize">{brand.name}</span>
                                        </SelectItem>
                                    ))
                                }
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex flex-col gap-2 ">
                    <Label htmlFor="model" className="text-md font-normal">Modèle du véhicule</Label>
                    <Input {...register("model")} id="model" type="text" placeholder="zoe" className="border border-gray-900 rounded-sm bg-white"></Input>
                    {errors.model && <p className="text-xs text-red-500">{errors.model.message}</p>}
                </div>
                <div className="flex flex-col gap-2 ">
                    <Label htmlFor="registration" className="text-md font-normal">Immatriculation</Label>
                    <Input {...register("registration")} id="registration" type="text" placeholder="AB-123-CD" className="border border-gray-900 rounded-sm bg-white"></Input>
                    {errors.registration && <p className="text-xs text-red-500">{errors.registration.message}</p>}
                </div>
                <div className="flex flex-col gap-2 ">
                    <Label htmlFor="first_registration_date" className="text-md font-normal">Date d'immatriculation</Label>
                    <Input {...register("first_registration_date",{valueAsDate: true})} id="first_registration_date" type="date" className="border border-gray-900 rounded-sm bg-white"></Input>
                    {errors.first_registration_date && <p className="text-xs text-red-500">{errors.first_registration_date.message}</p>}
                </div>
                <div className="flex flex-col gap-2 ">
                    <Label htmlFor="energy" className="text-md font-normal">Energie</Label>
                    <Select
                        onValueChange={(value) =>
                            setValue("energy", value as Energy, 
                                {shouldValidate: true,})
                            }
                        >
                        <SelectTrigger className="w-full bg-white border-zinc-900 rounded-md">
                            <SelectValue placeholder="Choisir une énergie" />
                        </SelectTrigger>

                        <SelectContent>
                            {Object.values(Energy).map((item) => (
                            <SelectItem
                                key={item}
                                value={item}
                            >
                                {item}
                            </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex flex-col gap-2 ">
                    <Label htmlFor="color" className="text-md font-normal">Couleur.</Label>
                    <Input {...register("color")} id="color" type="text" placeholder="bleu" className="border border-gray-900 rounded-sm bg-white"></Input>
                    {errors.color && <p className="text-xs text-red-500">{errors.color.message}</p>}
                </div>
            </div>
            <div className="flex justify-between items-center">
                <Button
                    type="button"
                    onClick={onCancel}
                    className="rounded-md bg-zinc-100 text-zinc-700 border-zinc-700 cursor-pointer hover:bg-white"
                >
                    Annuler
                </Button>
                <Button variant="primary" type="submit">Valider</Button>  
            </div>
        </form>
    )


}
