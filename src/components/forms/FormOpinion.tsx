"use client"

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from "next/navigation";

import { apiFetch } from '@/services/api';

import { Button } from '../ui/button';
import { toast } from 'sonner';
import { Textarea } from '../ui/textarea';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
    comment: z.string().min(5,"Le commentaire est trop court."),
    note: z.number().min(1).max(5),
})

type FormData = z.infer<typeof formSchema>;

type FormOpinionProps = {
    carpoolingId: number,
    onCancel?: ()=>void
}


export default function FormOpinion(
    { carpoolingId, onCancel } : FormOpinionProps){

    const router = useRouter()

    const { register, handleSubmit , setValue, formState: {errors} } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            comment: "",
            note: 0
        }
    });

    async function onSubmit(values: FormData){
    
        try{
            
            await apiFetch("/opinions", {
                method:"POST",
                body: JSON.stringify({
                    comment: values.comment,
                    note: values.note,
                    carpooling_id: carpoolingId
                })
            })
            toast.success("Avis envoyé avec succès.")
            
        }
        
        catch (error: any){
            toast.error(error.message)
        }
    }


    return(
        <form onSubmit={handleSubmit(onSubmit)} className="flex justify-center ">
            <div className="w-full flex flex-col gap-8">
               
                <div className="flex flex-col gap-6">
                    <Select 
                        onValueChange={(value) =>
                            setValue("note", Number(value))
                        }
                    >
                        <SelectTrigger className="w-full bg-white border-zinc-900 rounded-md">
                            <SelectValue className="" placeholder="Sélectionner une note"/>
                        </SelectTrigger>
                        <SelectContent className="">
                            <SelectGroup className="bg-white border-zinc-900 rounded-md">
                               <SelectItem value="1">1</SelectItem>
                               <SelectItem value="2">2</SelectItem>
                               <SelectItem value="3">3</SelectItem>
                               <SelectItem value="4">4</SelectItem>
                               <SelectItem value="5">5</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Textarea {...register("comment")} id="comment" placeholder="Commentaire..." className="h-40"/>                 
                </div>
                <hr className="border border-zinc-300"></hr>
                <div className="flex justify-between items-center">
                    <Button type="button" onClick={onCancel} variant="cancel" className="tracking-wider px-4">Annuler</Button>  
                    <Button variant="primary" type="submit">Valider</Button>  
                </div>
            </div>
        </form>
    )
}
