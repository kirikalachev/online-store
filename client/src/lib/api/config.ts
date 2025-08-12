// lib/api/config.ts
export const getBaseUrl = () => {
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
};

export const apiConfig = {
  baseURL: getBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include' as RequestCredentials, // За HTTP-only cookies
};