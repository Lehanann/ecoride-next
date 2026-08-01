"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/services/api";

export default function TestPage(){
    const [user, setUser] = useState<any>(null)

    useEffect(()=>{
        apiFetch("/users/me")
        .then(setUser)
        .catch(console.error)
    }, []);

    return (
        <div>
            <h1>test API</h1>
            <pre>{JSON.stringify(user, null,2)}</pre>
        </div>
    )
}