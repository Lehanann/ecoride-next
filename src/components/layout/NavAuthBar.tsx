"use client"

import { getCurrentUser, logout } from "@/services/auth"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import  { useAuth } from '@/hooks/useAuth'

const menuAuth = [
    { id:1, name:'Se connecter', path: '/login' },
    { id:2, name:'S\'inscrire', path: '/register' },
  ]

export default function NavAuthBar() {

    const { user, setUser, isLoading } = useAuth()
    const router = useRouter();

    async function handleLogout(){
      try {
        await logout();
        setUser(null);
        router.push("/");
        router.refresh();
      }
      catch (error){
        console.error(error);
      }
    }

    if (isLoading) {
      return null;
    }

    return(
        <nav className="flex items-center shrink-0">
          {
            user ? (
            <ul className=" flex w-full justify-end px-1 gap-5">
              <li>
                <button
                  onClick={handleLogout}  
                  className="hover:text-[var(--color-accent)] text-lg transition-colors duration-300 cursor-pointer"
                >
                  Déconnexion
                </button>
              </li>

            </ul>)
            :
            (<ul className=" flex w-full justify-end px-1 gap-5">
            {
              menuAuth.map((item)=>(
                <li key={item.id}>
                  <Link href={item.path} className="hover:text-[var(--color-accent)] text-lg transition-colors duration-300">
                    <span>{item.name}</span>
                  </Link>
                </li>
                
              ))
            }
            </ul>)
          }
            
        </nav>
    )

}