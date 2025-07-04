import { notFound } from "next/navigation";

interface FetchApiParams {
	endpoint: string;
	method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
	body?: any;
	token?: string;
}

export async function fetchApi<T>({
	endpoint,
	method,
	body,
	token,
}: FetchApiParams): Promise<T> {
	const headers: Record<string, string> = {
		"Content-Type": "application/json",
	};
	if (typeof window === "undefined" && process.env.API_KEY) {
		headers["APP-KEY"] = process.env.API_KEY;
	}
	if (token) {
		headers["Authorization"] = `Token ${token}`;
	}
	try {
		const response = await fetch(
			// `${process.env.NEXT_PUBLIC_API_URL}/api/v1/${endpoint}`,
			`http://192.168.100.81:8001/api/v1/${endpoint}`,
			// `http://192.168.1.73:8000/api/v1/${endpoint}`,
			{
				method,
				headers,
				body: body ? JSON.stringify(body) : undefined,
				cache: "no-store",
				redirect: "follow",
			}
		);
		const { status } = response;

		// 2xx: Success
		if (status >= 200 && status < 300) {
		// 204 No Content
		if (status === 204) {
			return {} as T;
		}
		return await response.json();
		}
		// 3xx: Redirects (should rarely happen with fetch.follow)
		if (status >= 300 && status < 400) {
		throw new Error(`Unexpected redirect (${status}).`);
		}
		// Parse any error payload
		let errorData: any;
		try {
		errorData = await response.json();
		} catch {
		errorData = null;
		}
		// 4xx: Client errors
		if (status >= 400 && status < 500 ) {
		if (status === 404) {
			
			notFound();
		}
		const message =
			errorData?.message || `Client error ${status}: ${response.statusText}`;
		throw new Error(message);
		}
		// 5xx: Server errors
		if (status >= 500) {
		const message =
			errorData?.message ||
			`Server error ${status}: ${response.statusText}. Please try again later.`;
		throw new Error(message);
		}
		// Fallback
		throw new Error(`Unexpected response ${status}: ${response.statusText}`);
	} catch (error: any) {
		throw error;
  }
}