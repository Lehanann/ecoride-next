"use client"

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { apiFetch } from '@/services/api';

import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { toast } from 'sonner';

/**
 * Password update form validation schema.
 *
 * Defines validation rules applied before changing
 * the authenticated user's password.
 *
 * Ensures that:
 * - All password fields are provided.
 * - Passwords meet the minimum length requirement.
 * - The confirmation password matches the new password.
 */
const formSchema = z.object({
    old_password: z.string().min(14,"Le mot de passe doit contenir 14 caractères min"),
    new_password: z.string().min(14, "Le mot de passe doit contenir 14 caractères min"),
    confirm_password:z.string().min(14)
}).refine(({new_password, confirm_password})=>{
    return confirm_password === new_password
},{
    message: "les mots de passe sont différents",
    path:["confirm_password"]
});

type FormData = z.infer<typeof formSchema>;

/**
 * Password update form.
 *
 * Allows authenticated users to change their password by providing:
 * - Their current password.
 * - A new password.
 * - A confirmation of the new password.
 *
 * Form validation is performed using react-hook-form and zod.
 *
 * @returns Password update form component.
 */
export default function FormPassword(){
    
    const { register, handleSubmit ,reset, formState: {errors} } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            old_password: "",
            new_password: "",
            confirm_password: ""         
        }
    })

    /**
     * Handles password update form submission.
     *
     * Sends the password update request to the backend API,
     * resets the form on success, and displays a notification
     * indicating whether the operation succeeded or failed.
     *
     * @param values Validated password update data.
     */
    async function onSubmit(values: FormData){
            
        try{
            
            const params = values           

            await apiFetch("/users/me/change-password", {
                method: "PUT",
                body: JSON.stringify(params)
            })
            toast.success("Mot de passe mis à jour avec succès.")
            reset()
            
        }
        catch (error: any){
            toast.error(error.message)
        }
    }
    
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full mx-auto flex flex-col gap-7">
            <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2 ">
                    <Label htmlFor="old_password" className="text-md font-normal">Ancien mot de passe</Label>
                    <Input {...register("old_password")} id="old_password" type="password" className="border border-gray-900 rounded-sm bg-white"></Input>
                    {errors.old_password && <p className="text-xs text-red-500">{errors.old_password.message}</p>}
                </div>
                <div className="flex flex-col gap-2 ">
                    <Label htmlFor="new_password" className="text-md font-normal">Nouveau mot de passe</Label>
                    <Input {...register("new_password")} id="new_password" type="password" className="border border-gray-900 rounded-sm bg-white"></Input>
                    {errors.new_password && <p className="text-xs text-red-500">{errors.new_password.message}</p>}
                </div>
                <div className="flex flex-col gap-2 ">
                    <Label htmlFor="confirm_password" className="text-md font-normal">Confirmation du nouveau mot de passe</Label>
                    <Input {...register("confirm_password")} id="confirm_password" type="password" className="border border-gray-900 rounded-sm bg-white"></Input>
                    {errors.confirm_password && <p className="text-xs text-red-500">{errors.confirm_password.message}</p>}
                </div>
            </div>
            <Button variant="primary" type="submit">Enregistrer</Button>   
        </form>
    )
}