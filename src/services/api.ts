const API_URL = "http://localhost:8000";

export async function apiFetch<T>( 
    path: string, 
    options?: RequestInit
): Promise<T> {

    const headers: HeadersInit ={}

    if (!(options?.body instanceof FormData)) {
        headers["Content-Type"] = "application/json"
    }

    const response = await fetch(
        `${API_URL}${path}`,
        {
            credentials: "include",
            headers: {
                ...headers,
            },
            ...options,
        }
    );
    
    if (!response.ok) {
        const errorText =
            await response.text();

        throw new Error(
            `API Error: ${errorText}`
        );
    }
    
   
    return response.json();
}