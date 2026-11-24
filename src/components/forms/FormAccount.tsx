"use client"

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { apiFetch } from '@/services/api';
import { useAuth } from '@/hooks/useAuth';
import { User } from '@/types/user';

import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { toast } from 'sonner';

/**
 * Account update form validation schema.
 *
 * Defines validation rules applied before updating
 * account information.
 */
const formSchema = z.object({
    username: z.string().max(100, {message: "Ce champs ne peut excéder 100 caractères"}),
    email: z.email({error: "Adresse email invalide"}).max(254, {message: "Ce champs ne peut excéder 254 caractères"}),
});

type FormData = z.infer<typeof formSchema>;

/**
 * Account management form.
 *
 * Allows authenticated users to update their account information,
 * including their username and email address.
 *
 * Form validation is performed using react-hook-form and zod.
 *
 * @returns Account update form component.
 */
export default function FormAccount(){

    const { user, setUser } = useAuth()
       
        const { register, handleSubmit , formState: {errors} } = useForm<FormData>({
            resolver: zodResolver(formSchema),
            defaultValues:{
                username: user?.username ?? "",
                email: user?.email ?? "",           
            }
        })
        /**
         * Handles account update form submission.
         *
         * Sends updated account information to the backend API,
         * updates the authenticated user stored in the authentication
         * context, and displays a success or error notification.
         **
         * @param values Validated account data.
         */
        async function onSubmit(values: FormData){
             
            try{
                
                const params = values           
                
                const updatedUser = await apiFetch<User>("/users/me/account", {
                    method: "PATCH",
                    body: JSON.stringify(params)
                })
                toast.success("Compte mis à jour avec succès.")
                setUser(updatedUser)
                
            }
            catch (error: any){
                toast.error(error.message)
            }
        }
        
        return (
            <form onSubmit={handleSubmit(onSubmit)} className="w-full mx-auto flex flex-col gap-7">
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2 ">
                        <Label htmlFor="username" className="text-md font-normal">Nom d'utilisateur</Label>
                        <Input {...register("username")} id="username" type="text" placeholder="jdoe" className="border border-gray-900 rounded-sm bg-white"></Input>
                        {errors.username && <p className="text-xs text-red-500">{errors.username.message}</p>}
                    </div>
                    <div className="flex flex-col gap-2 ">
                        <Label htmlFor="email" className="text-md font-normal">Courriel</Label>
                        <Input {...register("email")} id="email" type="email" placeholder="jdoe@exemple.fr" className="border border-gray-900 rounded-sm bg-white"></Input>
                        {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                    </div>                    
                </div>
                <Button variant="primary" type="submit">Enregistrer</Button>     
            </form>
        )
}