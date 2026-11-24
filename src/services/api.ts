const API_URL = "http://192.168.10.20:8000";

/**
 * Performs an HTTP request to the backend API and returns
 * the parsed JSON response.
 *
 * Automatically:
 * - Prefixes requests with the application API URL.
 * - Includes authentication cookies.
 * - Sets the JSON content type when the request body is not FormData.
 * - Throws an error when the request fails.
 *
 * @typeParam T Expected response type.
 * @param path API endpoint path.
 * @param options Fetch request options.
 * @returns Parsed response body.
 *
 * @throws Error If the API response status is not successful.
 */
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