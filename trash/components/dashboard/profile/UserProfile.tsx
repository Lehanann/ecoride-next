"use client"

import { Avatar, AvatarFallback, AvatarImage } from "../../../../src/components/ui/avatar";
import { Mail, Phone, NotebookTabs, UserRound } from 'lucide-react';
import { Badge } from "../../../../src/components/ui/badge";
import { Button } from "../../../../src/components/ui/button";
import { User } from "@/types/user"
import { useRouter } from "next/navigation";
import Link from "next/link";

interface UserRolesProps {
    isDriver:boolean;
    isPassenger: boolean;
    user: User;
}

export default function UserProfile(props: Readonly<UserRolesProps>){

    const router = useRouter()

    return(
        <div className="flex flex-col gap-3">            
            <div className="flex flex-col gap-3 w-full">
                <div className="flex items-center gap-5">
                    <Avatar className="" size={"lg"}>
                        <AvatarImage src={`http://localhost:8000/${props.user?.avatar_url}`} />
                        <AvatarFallback></AvatarFallback>
                    </Avatar>
                    <h6 className="text-2xl font-semibold">{props.user?.username}</h6>
                    
                </div>
                
                <div className= "flex items-center gap-2">
                    <Mail size={20}/>
                    <p>:</p>
                    <p className="underline italic text-sm font-semibold text-sky-900">{props.user?.email} </p>
                </div>
                <div className="flex flex-col gap-2">
                    <Badge
                        className={`
                            w-24
                            border border-zinc-700 rounded-sm
                            ${ props.isPassenger ? 
                                'bg-[var(--color-primary)] text-xs font-bold text-white' : 
                                'bg-zinc-200 text-xs font-semilight text-zinc-600'} `}
                        >
                        Passager
                    </Badge>
                    <Badge
                        variant="outline"
                        className={`
                            w-24
                            border border-zinc-700 rounded-sm
                            ${props.isDriver 
                                ? 'bg-[var(--color-primary)] text-xs font-bold text-white'
                                : 'bg-zinc-200 text-xs font-semilight text-zinc-600'}
                            `}
                        >
                        Chauffeur
                    </Badge>
                </div>
                {
                    props.isDriver && <Link href="/dashboard/opinion/list" className="text-sky-600 underline underline-offset-4">Voir les avis</Link>
                }
                
            </div>
            <hr className="border border-zinc-300 my-3"></hr>
            <div className="flex flex-col gap-3 ">
                <div className="text-2xl flex gap-5 font-semibold">
                    <p>{props.user?.firstname}</p>
                    <p>{props.user?.lastname}</p>
                </div>
                
                <div className="flex gap-2">
                    <Phone className="rotate-90" size={20}/>
                    <p>:</p>
                    <p className="font-semibold  text-gray-500">{props.user?.phone}</p>
                </div>
                <div className="flex gap-2">
                    <NotebookTabs size={24}/>
                    <p>:</p>
                    <p className="font-semibold text-gray-500" >{props.user?.address}</p>
                </div>                
            </div>
            <hr className="border border-zinc-300 my-5"></hr>
            <div className="flex flex-col gap-3">
                <h2 className="text-2xl font-medium">Mes crédits</h2>
                <p className="text-3xl">{props.user.credit}€</p>
            </div>
            <Button 
                onClick={()=> router.push("/dashboard/profile") }
                variant="outline" 
                className="
                    mt-5 py-5
                    rounded-lg hover:border-[var(--color-primary)] cursor-pointer
                    bg-[var(--color-primary)] hover:bg-zinc-100 
                    text-zinc-100  hover:text-[var(--color-primary)]
                    transition-colors duration-500
                ">
                    Modifier mon profil
                </Button>
        </div>
    )
}