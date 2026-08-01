const API_URL = "http://127.0.0.1:8000";

export async function apiFetch<T>(path: string,options?: RequestInit): Promise<T> 
{
    const response = await fetch(`${API_URL}${path}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "1"
        },
        ...options,
    });
    if (!response.ok)
    {
        const errorText = await response.text();
        throw new Error(`API Error: ${errorText}`);
    }

    return response.json()
}

