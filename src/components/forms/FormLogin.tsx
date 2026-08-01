"use client"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from "next/link";

import { useRouter } from "next/navigation";

const formSchema = z.object({
    email: z.email(),
    password: z.string().min(1, "Ce champs est requis")
});

type FormData = z.infer<typeof formSchema>;

export default function FormLogin(){

    const router = useRouter()

    const { register, handleSubmit, formState: {errors} } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            email: "",
            password: ""
        }
    })

    async function onSubmit(values: FormData){
        try{
            const params = values
            //à adapter pour authentification au moment où le backend aura le middleware de prêt
            /*
            if (roles.includes("ADMIN")) {
            router.push("/admin");
            }
            else if (roles.includes("EMPLOYEE")) {
            router.push("/moderation");
            }
            else {
            router.push("/dashboard");
            }*/
 
        }
        catch(error){

        }
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)} className="border border-gray-400 rounded-lg shadow-lg p-8 flex flex-col gap-5 bg-white">
            <div>
                <h1 className="text-3xl font-medium mb-2">Se connecter</h1>
                 <p className="text-gray-500 text-sm">Veuillez saisir vos identifiants pour vous connecter</p>
            </div>
            <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-1 ">
                    <Label htmlFor="email" className="text-md font-normal">Email</Label>
                    <Input {...register("email")} id="email" type="email" placeholder="jdoe@example.fr" className="border border-gray-900 rounded-sm bg-white"></Input>
                    {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                </div>
                <div className="flex flex-col gap-1">
                    <Label htmlFor="password" className="text-md font-normal">Mot de passe</Label>
                    <Input {...register("password")} id="password" type="password" className="border border-gray-900 rounded-sm bg-white"></Input>
                    {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
                </div>
            </div>
            <Link href="/register" className="text-sm text-red-500 font-medium">Pas de compte? Inscrivez-vous</Link>
            <div className="flex items-center justify-between mt-5 mb-2">
                <Button onClick={()=>router.push("/")} variant="outline" className="tracking-wider px-4">Annuler</Button>
                <Button type="submit" className="bg-[var(--color-primary)] tracking-wider px-4 ">Valider</Button>                
            </div>          
           
        </form>

    )
}