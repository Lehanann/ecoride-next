"use client"
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from "next/link";

import { useRouter } from "next/navigation";
import { getCurrentUser, login } from "@/services/auth";
import { useAuth } from '@/hooks/useAuth';

import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { toast } from "sonner";

const formSchema = z.object({
    email: z.email(),
    password: z.string().min(1, "Ce champs est requis")
});

type FormData = z.infer<typeof formSchema>;

export default function FormLogin(){

    const router = useRouter()

    const { setUser } = useAuth();

    const { register, handleSubmit, formState: {errors} } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            email: "",
            password: ""
        }
    })

    async function onSubmit(values: FormData){

        try{
            await login(
                values.email,
                values.password,
            );
            
            const user = await getCurrentUser();
            setUser(user)

            if (user.roles.some(role => role.name === "administrator")) {
                router.push("/admin");
            }
            else if (user.roles.some(role => role.name === "employee")) {
                router.push("/moderation");
            }
            else {
                router.push("/dashboard");
            }
            toast.success("Vous êtes maintenant connecté")
            router.refresh();
        }
        catch(error: any){
            toast.error("Compte ou mot de passe erroné")
            router.refresh()
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