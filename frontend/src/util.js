const DEFAULT_API_BASE_URL = import.meta.env.DEV
	? "/api"
	: "https://adventure-ai-c0pr.onrender.com/api";

const rawBaseUrl = import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL;
const trimmedBaseUrl = rawBaseUrl.replace(/\/+$/, "");

export const API_BASE_URL = trimmedBaseUrl.endsWith("/api")
	? trimmedBaseUrl
	: `${trimmedBaseUrl}/api`;
