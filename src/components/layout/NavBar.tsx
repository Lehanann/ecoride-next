"use client"

import Link from "next/link"
import { House, Car, Form, LayoutDashboard } from 'lucide-react'
import { useAuth } from "@/hooks/useAuth"

/**
 * Main navigation menu items.
 *
 * Defines the navigation links displayed
 * in the application's primary navigation bar.
 */
const menuNav = [
    { id:1, name:'Accueil', path: '/', icon: House},
    { id:2, name:'Covoiturage', path: '/carpooling', icon: Car},
    { id:3, name:'Contact', path: '/contact', icon: Form}
]
  
/**
 * Main application navigation component.
 *
 * Displays public navigation links and provides
 * access to the user dashboard when a user is
 * authenticated.
 *
 * @returns Main navigation component.
 */
export default function NavBar(){

    const { user } = useAuth()

    return(
        <nav className="flex flex-1">
            <ul className="w-full h-full flex items-center justify-center gap-10 text-xl">
                {
                    menuNav.map((item)=>(
                        <li key={item.id} className="">
                            <Link href={item.path} className="flex items-center gap-2 hover:text-[var(--color-accent)] transition-colors duration-300">
                                <item.icon className=""/>
                                <span>{item.name}</span>
                            </Link>
                        </li>
                    ))
                }
                {
                    user && (
                        <li>
                            <Link href="/dashboard" className="flex items-center gap-2 hover:text-[var(--color-accent)] transition-colors duration-300">
                                <LayoutDashboard/>
                                <span>Mon Espace</span>
                            </Link>
                        </li>
                    )
                }
            </ul>
        </nav>    
    )
}