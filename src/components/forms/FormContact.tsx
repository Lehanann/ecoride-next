"use client";

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';


const formSchema = z.object({
    fname: z.string().min(1,{message:"Ce champs est requis"}),
    lname: z.string().min(1,{message:"Ce champs est requis"}),
    email: z.email({message:"Adresse mail invalide"}),
    title: z.string().min(1,{message:"Ce champs est requis"}).max(254,{message:"Ce champs ne peut excéder 254 caractères"}),
    description: z.string().min(1,{message:"Ce champs est requis"})
});

type FormData = z.infer<typeof formSchema>;

export default function FormContact(){

    const { register, handleSubmit, formState:{errors} } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            fname:"",
            lname:"",
            email:"",
            title:"",
            description:""
        }
    })

    async function onSubmit(values: FormData){
        try{

            const params = values;

        }
        catch(error){
            console.log(error)
        }

    }
    
    return(
        <form onSubmit={handleSubmit(onSubmit)} className="border border-gray-400 rounded-lg shadow-lg w-full max-w-2xl mx-auto p-8 flex flex-col gap-5">
            <div className="">
                <h2 className="text-3xl font-medium mb-2">Nous contacter</h2>
                <p className="text-gray-500 text-sm">Une question ? Envoyez-nous un message</p>
            </div>
            
            <div className="flex flex-col gap-1 ">
                <Label htmlFor="fname" className="text-lg font-normal">Prénom</Label>
                <Input {...register("fname")} id="fname" placeholder="John" className="border border-gray-900 rounded-sm bg-white"></Input>
                {errors.fname && <p className="text-xs text-red-500">{errors.fname.message}</p>}
            </div>
            <div className="flex flex-col gap-1">
                <Label htmlFor="lname" className="text-lg">Nom</Label>
                <Input {...register("lname")} id="lname" placeholder="Doe" className="border border-gray-900 rounded-sm bg-white"></Input>
                {errors.lname && <p className="text-xs text-red-500">{errors.lname.message}</p>}
            </div>
           <div className="flex flex-col gap-1">
                <Label htmlFor="email" className="text-lg">Email</Label>
                <Input {...register("email")} id="email" type="email" placeholder="jdoe@example.fr" className="border border-gray-900 rounded-sm bg-white"></Input>
                {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="title" className="text-lg">Sujet</Label>
                <Input {...register("title")} id="title" placeholder="Sujet" className="border border-gray-900 rounded-sm bg-white"></Input>
                {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="description" className="text-lg">Description</Label>
                <Textarea {...register("description")} id="description" placeholder="Message..." className="border border-gray-900 rounded-sm bg-white"></Textarea>
                {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
            </div>
            <div className="flex items-center justify-between mt-5 mb-2">
                <Button variant="outline" className="tracking-wider px-4">Annuler</Button>
                <Button type="submit" className="bg-[var(--color-primary)] tracking-wider px-4 ">Envoyer</Button>                
            </div>           
        </form>
    )
}