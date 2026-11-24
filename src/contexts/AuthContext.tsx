"use client"

import React, { createContext, useEffect, useState } from "react";
import { AuthContextType } from "@/types/auth";
import { User } from "@/types/user";
import { getCurrentUser } from "@/services/auth";

/**
 * Authentication context.
 *
 * Provides access to the current authenticated user,
 * authentication state, and user management functions
 * throughout the application.
 */
export const AuthContext = createContext<AuthContextType | null>(null);

/**
 * Properties accepted by the AuthProvider component.
 *
 * Properties:
 * - children: React components wrapped by the provider
 */
interface AuthProviderProps{
    children: React.ReactNode;
}

/**
 * Authentication context provider.
 *
 * Loads the current authenticated user when the application
 * starts and expodes authentication data through the AuthContext.
 *
 * Features:
 * - Retrieves the current user session.
 * - Stores the authenticated users.
 * - Exposes a loading state while authentication data is being fetched.
 * - Provides authentication data to all descendant components.
 *
 * @param props Provider properties.
 * @returns Authentication context provider.
 */
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