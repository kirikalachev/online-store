// users.ts
import { apiConfig } from './config';
import { authApi } from './auth';

interface UserType {
  id: string;
  username: string;
  email: string;
}

export const userApi = {
  async getCurrentUser(): Promise<{ user: UserType }> {
    try {
      const response = await fetch(`${apiConfig.baseURL}/users/me`, {
        method: 'GET',
        headers: apiConfig.headers,
        credentials: apiConfig.credentials,
      });

      if (!response.ok) {
        if (response.status === 401) {
          try {
            await authApi.refreshToken();
            // Повтори заявката след опресняване
            const retryResponse = await fetch(`${apiConfig.baseURL}/users/me`, {
              method: 'GET',
              headers: apiConfig.headers,
              credentials: apiConfig.credentials,
            });

            if (!retryResponse.ok) {
              const errorData = await retryResponse.json();
              throw new Error(errorData.message || 'Failed to fetch user');
            }

            return retryResponse.json();
          } catch (refreshError) {
            throw new Error('Unauthorized');
          }
        }
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch user');
      }

      return response.json();
    } catch (err) {
      throw err;
    }
  },
};