/**
 * Utility functions for API calls
 */

/**
 * Fetches data from the API
 * @param endpoint API endpoint
 * @param options Fetch options
 * @returns Promise with the response data
 */
export async function fetchApi(endpoint: string, options?: RequestInit) {
  try {
    const response = await fetch(`/api/${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || "An error occurred")
    }

    return data
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error)
    throw error
  }
}

/**
 * Makes a GET request to the API
 * @param endpoint API endpoint
 * @returns Promise with the response data
 */
export function get(endpoint: string) {
  return fetchApi(endpoint)
}

/**
 * Makes a POST request to the API
 * @param endpoint API endpoint
 * @param data Request body data
 * @returns Promise with the response data
 */
export function post(endpoint: string, data: any) {
  return fetchApi(endpoint, {
    method: "POST",
    body: JSON.stringify(data),
  })
}

/**
 * Makes a PUT request to the API
 * @param endpoint API endpoint
 * @param data Request body data
 * @returns Promise with the response data
 */
export function put(endpoint: string, data: any) {
  return fetchApi(endpoint, {
    method: "PUT",
    body: JSON.stringify(data),
  })
}

/**
 * Makes a DELETE request to the API
 * @param endpoint API endpoint
 * @returns Promise with the response data
 */
export function del(endpoint: string) {
  return fetchApi(endpoint, {
    method: "DELETE",
  })
}

