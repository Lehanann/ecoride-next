"use client"

import React, { createContext, useEffect, useState } from "react";
import { AuthContextType } from "@/types/auth";
import { User } from "@/types/user";
import { getCurrentUser } from "@/services/auth";

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps{
    children: React.ReactNode;
}

export function AuthProvider({ 
    children, 
}: AuthProviderProps){
    const [ user, setUser ] = useState<User | null>(null);
    const [ isLoading, setIsLoading ] = useState<boolean>(true);

    useEffect(()=>{
        async function loadUser(){
            try{
                const currentUser = await getCurrentUser();
                setUser(currentUser);

            }
            catch(error){
                setUser(null)
            }
            finally{
                setIsLoading(false)
            }
        }
        loadUser()
        
    },[])

    return(
        <AuthContext.Provider
            value={{
                user,
                setUser,
                isLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}