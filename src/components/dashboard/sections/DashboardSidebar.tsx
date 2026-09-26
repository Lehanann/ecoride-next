"use client"

import { useAuth } from "@/hooks/useAuth"

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

import { LayoutDashboard, Car, Flag, Star, Road, Settings } from 'lucide-react';
import Link from "next/link";

const menu = [
    {id: 0, name: "Dashboard", path: "/dashboard", icon: LayoutDashboard , role: "all"},
    {id: 1, name: "Mes participations", path: "/dashboard/bookings", icon: Road , role: "passenger"},
    {id: 2, name: "Mes Véhicules", path: "/dashboard/car", icon: Car , role: "driver"},
    {id: 3, name: "Mes trajets", path: "/dashboard/hosting", icon: Flag, role: "driver" },
    {id: 4, name: "Mes avis", path: "/dashboard/opinion", icon: Star , role: "driver"},
    {id: 5, name: "Profil", path: "/dashboard/profile", icon: Settings , role: "all"},
]

export default function DashboardSidebar(){

    const { user, isLoading } = useAuth()

    if (isLoading){return <p>Chargement...</p>}

    if (!user) {return null}

    const userRoles = user.roles.map(role => role.name)

    const visibleMenus = menu.filter(item => {
        if (item.role === "all"){
            return true
        }

        return userRoles.includes(item.role)
    })

    const isDriver = user.roles.some( role => role.name === "driver")
    
    const isPassenger = user.roles.some( role => role.name === "passenger")

    return(
        <aside className="bg-zinc-100 p-4 rounded-md space-y-3">
            <div className="flex items-center gap-2">
                <Avatar className="" size={"lg"}>
                    <AvatarImage src={`http://localhost:8000/${user.avatar_url}`} />
                    <AvatarFallback className="uppercase">{user.username.slice(0,2)}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="text-lg font-semibold">{user.username}</p>
                    <p className="text-muted-foreground text-xs">{user.email}</p>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <Badge
                    className={`
                        w-24
                        border border-zinc-700 rounded-sm
                        ${ isPassenger 
                            ? 'bg-[var(--color-primary)] text-xs font-bold text-white' 
                            : 'bg-zinc-200 text-xs font-semilight text-zinc-600'} 
                        `}
                >
                    Passager
                </Badge>
                <Badge
                    variant="outline"
                    className={`
                        w-24
                        border border-zinc-700 rounded-sm
                        ${ isDriver 
                            ? 'bg-[var(--color-primary)] text-xs font-bold text-white'
                            : 'bg-zinc-200 text-xs font-semilight text-zinc-600'}
                        `}
                    >
                    Chauffeur
                </Badge>
                <hr className="border-b border-zinc-300 my-5"></hr>
                <ul className="flex flex-col gap-2">                    
                {
                    visibleMenus.map( item => {
                        const Icon = item.icon
                        return (
                            <li key={item.id}>
                                <Link href={item.path} className="flex items-center gap-2">
                                    <Icon />
                                    {item.name}                                    
                                </Link>
                            </li>
                        )
                    })
                }
                </ul>
            </div>
        </aside>
    )
}

