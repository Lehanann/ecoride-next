"use client"

import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

/**
 * Authentication hook.
 *
 * Provides access to the authentication context and its values.
 *
 * This hook must be used within the AuthProvider component.
 *
 * @returns Authentication context values.
 *
 * @throws Error If used outside the AuthProvider.
 */
export function useAuth(){
    const context = useContext(AuthContext)

    if(!context) {
        throw new Error(
            "useAuth must be used inside AuthProvider"
        );
    }

    return context;
}