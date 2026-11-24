"use client"

import { useState } from "react"

import { useAuth } from "@/hooks/useAuth"
import { apiFetch } from "@/services/api"
import { User } from "@/types/user"

import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { toast } from "sonner"

/**
 * Avatar upload form.
 *
 * Allows authenticated users to upload and update
 * their profile avatar.
 *
 * The selected image is sent to the backend using
 * multipart form data.
 *
 * @returns Avatar upload form component.
 */
export default function FormAvatar(){

    const { setUser } = useAuth()

    const [ file, setFile ] = useState<File | null>(null)

    /**
     * Handles avatar upload submission.
     *
     * Validates that a file has been selected, uploads
     * the image to the backend API, updates the authenticated
     * user stored in the authentication context, and displays
     * a success or error notification.
     */
    async function onSubmit(){
        
        if(!file){
            toast.error("veuillez sélectionner une image")
            return;
        }
        try{
            const formData = new FormData();

            formData.append("avatar_file", file);

            const updatedUser = await apiFetch<User>("/users/me/avatar",{
                method: "PATCH",
                body: formData
            });
            setUser(updatedUser)
            toast.success("Avatar mis à jour avec succès")
            setFile(null)
        }
        catch(error: any){
            toast.error(error.message)
        }
    }

    return(
        <div className="w-full mx-auto flex flex-col gap-7">
            <Input
                type="file"
                accept="image/*"
                onChange={(e) => setFile( e.target.files?.[0] ?? null)}
                className="border-zinc-500 rounded-md bg-white"
            />
            <Button 
                variant="primary"
                type="button"
                onClick={onSubmit}
            >
                Enregistrer
            </Button>     
        </div>
    )
}