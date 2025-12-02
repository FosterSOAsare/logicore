type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface ApiOptions {
  method?: HttpMethod;
  body?: unknown;
  headers?: Record<string, string>;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
}

interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
  ok: boolean;
}

/**
 * Reusable API function built on top of fetch API
 * @param endpoint - API endpoint (relative or absolute URL)
 * @param options - Request options
 * @returns Promise with typed response
 */
export default async function api<T = unknown>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<ApiResponse<T>> {
  const { method = "GET", body, headers = {}, cache, next } = options;

  // Build fetch configuration
  const config: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    cache,
    next,
  };

  // Add body for non-GET requests
  if (body && method !== "GET") {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(endpoint, config);

    // Try to parse JSON response
    let data: T | undefined;
    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    }

    if (!response.ok) {
      return {
        data,
        error: `HTTP Error ${response.status}: ${response.statusText}`,
        status: response.status,
        ok: false,
      };
    }

    return {
      data,
      status: response.status,
      ok: true,
    };
  } catch (error) {
    // Network error or other fetch failure
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    return {
      error: errorMessage,
      status: 0,
      ok: false,
    };
  }
}
