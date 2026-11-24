/**
 * Authentication service responsible for managing user sessions.
 *
 * Provides helper functions used to:
 * - Retrieve the currently authenticated user.
 * - Authenticate a user.
 * - Terminate an authenticated session.
 */

import { apiFetch } from "./api";
import { User } from "@/types/user"

/**
 * Retrieves the currently authenticated user.
 *
 * Uses the active session cookie to request the user's
 * profile information from the backend.
 *
 * @returns Authenticated user information.
 */
export async function getCurrentUser(){
    return apiFetch<User>("/users/me")
}

/**
 * Authenticates a user using their email address and password.
 *
 * Sends the provided credentials to the authentication endpoint
 * and establishes a new authenticated session on success.
 *
 * @param email User email address.
 * @param password User password.
 * @returns Authentication response.
 */
export async function login(email: string, password: string){
    return apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({email, password}),
    });
}

/**
 * Terminates the current authenticated session.
 *
 * Invalidates the active session and removes authentication
 * information stored by the backend.
 *
 * @returns Logout response.
 */
export async function logout() {
    return apiFetch("/auth/logout",{
        method: "POST"
    })    

}

