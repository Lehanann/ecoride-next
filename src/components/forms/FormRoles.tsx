"use client"

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { apiFetch } from '@/services/api';
import { useAuth } from '@/hooks/useAuth';
import { User } from '@/types/user';

import { Button } from "../ui/button"
import { toast } from 'sonner';


const formSchema = z.object({
    roles: z.array(z.string()).min(1, "Vous devez sélectionner au moins un role.")
});

type FormData = z.infer<typeof formSchema>;

export default function FormRoles(){

    const { user, setUser } = useAuth()
           
    const { register, handleSubmit , formState: {errors} } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            roles: user?.roles.map(role => role.name) ?? [],           
        }
    })

    async function onSubmit(values: FormData){
            
        try{
            
            const params = values           
            
            const updatedUser = await apiFetch<User>("/users/me/roles", {
                method: "PATCH",
                body: JSON.stringify(params)
            })
            toast.success("Roles mis à jour avec succès.")
            setUser(updatedUser)
            
        }
        catch (error: any){
            toast.error(error.message)
        }
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)} className="w-full mx-auto flex flex-col gap-7">
            <div className="flex flex-col gap-3">
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        value="passenger"
                        {...register("roles")}
                    />
                    Passager
                </label>

                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        value="driver"
                        {...register("roles")}
                    />
                    Chauffeur
                </label>

                {errors.roles && (
                    <p className="text-xs text-red-500">
                        {errors.roles.message}
                    </p>
                )}
            </div>
            <Button variant="primary" type="submit">Enregistrer</Button>     
        </form>
    )
}
