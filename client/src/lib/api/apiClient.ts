import { apiConfig } from './config';
import { authApi } from './auth';

export async function apiFetch(url: string, options: RequestInit = {}) {
  let response = await fetch(`${apiConfig.baseURL}${url}`, {
    ...options,
    headers: { ...apiConfig.headers, ...(options.headers || {}) },
    credentials: apiConfig.credentials,
  });

  // Ако active token е изтекъл
  if (response.status === 401) {
    try {
      await authApi.refreshToken(); // опресняване на active token
      response = await fetch(`${apiConfig.baseURL}${url}`, {
        ...options,
        headers: { ...apiConfig.headers, ...(options.headers || {}) },
        credentials: apiConfig.credentials,
      });
    } catch {
      throw new Error('Unauthorized');
    }
  }

  return response;
}

