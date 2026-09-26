import { apiFetch } from "./api";
import { User } from "@/types/user"

export async function getCurrentUser(){
    return apiFetch<User>("/users/me")
}

export async function login(email: string, password: string){
    return apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({email, password}),
    });
}

export async function logout() {
    return apiFetch("/auth/logout",{
        method: "POST"
    })    

}

