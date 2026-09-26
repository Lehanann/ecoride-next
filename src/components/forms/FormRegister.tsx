"use client"

import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from "next/link";

import { useRouter } from "next/navigation";
import { apiFetch } from "@/services/api";

const formSchema = z.object({
    username: z.string().min(1, "ce champs est requis"),
    email: z.email().max(254, {message: "Ce champs ne respecte pas la limite de 254 caractères max"}),
    password: z.string().min(14, "Le mot de passe doit contenir 14 caractères min"),
    confirm_password:z.string().min(14)
}).refine(({password, confirm_password})=>{
    return confirm_password === password
},{
    message: "les mots de passe sont différents",
    path:["confirm_password"]
});

type FormData = z.infer<typeof formSchema>;

export default function FormRegister(){

    const router = useRouter()

    const { register, handleSubmit, formState: {errors} } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            username: "",
            email: "",
            password: "",
            confirm_password: "",
        }
    })

    async function onSubmit(values: FormData){
        try{
            const params = values
            await apiFetch("/users",{
                method: "POST",
                body: JSON.stringify({username:params.username, email: params.email, password: params.password, confirm_password: params.confirm_password})
            })
            router.push("/login")
        }
        catch(error){

        }
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)} className="border rounded-lg bg-white shadow-lg p-8 flex flex-col gap-5">
            <div>
                <h1 className="text-3xl font-medium mb-2">S'inscrire</h1>
                 <p className="text-gray-500 text-sm">Formulaire d'inscription</p>
            </div>
            <hr></hr>
            <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-1 ">
                    <Label htmlFor="username" className="text-md font-normal">Nom d'utilisateur *</Label>
                    <Input {...register("username")} id="username" type="text" placeholder="jdoe" className="border border-gray-900 rounded-sm bg-white"></Input>
                    {errors.username && <p className="text-xs text-red-500">{errors.username.message}</p>}
                </div>
                <div className="flex flex-col gap-1 ">
                    <Label htmlFor="email" className="text-md font-normal">Email *</Label>
                    <Input {...register("email")} id="email" type="email" placeholder="jdoe@example.fr" className="border border-gray-900 rounded-sm bg-white"></Input>
                    {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                </div>
                <div className="flex flex-col gap-1">
                    <Label htmlFor="password" className="text-md font-normal">Mot de passe *</Label>
                    <Input {...register("password")} id="password" type="password" className="border border-gray-900 rounded-sm bg-white"></Input>
                    {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
                </div>
                <div className="flex flex-col gap-1">
                    <Label htmlFor="confirm_password" className="text-md font-normal">Confirmation du mot de passe *</Label>
                    <Input {...register("confirm_password")} id="confirm_password" type="password" className="border border-gray-900 rounded-sm bg-white"></Input>
                    {errors.confirm_password && <p className="text-xs text-red-500">{errors.confirm_password.message}</p>}
                </div>                  
            </div>
            <Link href="/login" className="text-sm text-red-500 font-medium">Déjà un compte? Connectez-vous</Link>
            <div className="flex items-center justify-between mt-5 mb-2">
                <Button onClick={()=>router.push("/")} variant="outline" className="tracking-wider px-4">Annuler</Button>
                <Button type="submit" className="bg-[var(--color-primary)] tracking-wider px-4 ">Valider</Button>                
            </div>           
        </form>
    )
}