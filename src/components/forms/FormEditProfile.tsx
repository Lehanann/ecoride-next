"use client"

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from "next/link";

import { useRouter } from "next/navigation";

import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"


const formSchema = z.object({
    username: z.string().min(1, "ce champs est requis").max(150,"Ce champs ne peut exécer 150 caractères"),
    email: z.email().max(254, {message: "Ce champs ne respecte pas la limite de 254 caractères max"}),
    firstname: z.string().max(100, {message: "Ce champs ne peut excéder 100 caractères"}),
    lastname: z.string().max(100, {message: "Ce champs ne peut excéder 100 caractères"}),
    phone: z.string().max(10, {message: "Ce champs ne peut excéder 10 caractères"}),
    address: z.string().max(250, {message: "Ce champs ne peut excéder 250 caractères"}),
    birth_date: z.date(),
});

type FormData = z.infer<typeof formSchema>;


export default function FormEditProfile(){

    const router = useRouter()

    const handleCancel = () => {
        if (window.history.length > 1){
            router.back();
        } else {
            router.push("/dashboard");
        }

    }

    const { register, handleSubmit , formState: {errors} } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            username: "",
            email: "",
            firstname: "",
            lastname: "",
            phone: "",
            address: "",
            birth_date: undefined
        }
    })

    async function onSubmit(values: FormData){

        try{
            const params = values
        }
        catch (error){

        }
    }
    
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-xl mx-auto border p-8 flex flex-col gap-10">
            <div>
                <h2 className="text-3xl font-medium">Modifier mon profil</h2>
            </div>
            <hr className="border-zinc-500"></hr>
            <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2 ">
                    <Label htmlFor="username" className="text-md font-normal">Nom d'utilisateur</Label>
                    <Input {...register("username")} id="username" type="text" placeholder="jdoe" className="border border-gray-900 rounded-sm bg-white"></Input>
                    {errors.username && <p className="text-xs text-red-500">{errors.username.message}</p>}
                </div>
                <div className="flex flex-col gap-2 ">
                    <Label htmlFor="email" className="text-md font-normal">Courriel</Label>
                    <Input {...register("email")} id="email" type="email" placeholder="jdoe" className="border border-gray-900 rounded-sm bg-white"></Input>
                    {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                </div>
                <div className="flex flex-col gap-2 ">
                    <Label htmlFor="firstname" className="text-md font-normal">Prénom</Label>
                    <Input {...register("firstname")} id="firstname" type="text" placeholder="John" className="border border-gray-900 rounded-sm bg-white"></Input>
                    {errors.firstname && <p className="text-xs text-red-500">{errors.firstname.message}</p>}
                </div>
                <div className="flex flex-col gap-2 ">
                    <Label htmlFor="lastname" className="text-md font-normal">Nom</Label>
                    <Input {...register("lastname")} id="lastname" type="text" placeholder="jdoe" className="border border-gray-900 rounded-sm bg-white"></Input>
                    {errors.lastname && <p className="text-xs text-red-500">{errors.lastname.message}</p>}
                </div>
                <div className="flex flex-col gap-2 ">
                    <Label htmlFor="phone" className="text-md font-normal">Tél.</Label>
                    <Input {...register("phone")} id="phone" type="tel" placeholder="jdoe" className="border border-gray-900 rounded-sm bg-white"></Input>
                    {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
                </div>
                <div className="flex flex-col gap-2 ">
                    <Label htmlFor="address" className="text-md font-normal">Adresse</Label>
                    <Input {...register("address")} id="address" type="text" placeholder="" className="border border-gray-900 rounded-sm bg-white"></Input>
                    {errors.address && <p className="text-xs text-red-500">{errors.address.message}</p>}
                </div>
            </div>
            <div className="flex justify-between items-center">
                <Button onClick={handleCancel} variant="cancel" className="tracking-wider px-4">Annuler</Button>  
                <Button variant="primary" type="submit">Valider</Button>  
            </div>
                      
            

        </form>
    )
}