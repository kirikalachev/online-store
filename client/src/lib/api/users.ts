// // lib/api/users.ts
import { apiFetch } from './apiClient';
import { UserType } from '@/types/user';

export const userApi = {
  async getCurrentUser(): Promise<{ user: UserType }> {
    const res = await apiFetch('/users/me', { method: 'GET' });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Failed to fetch user');
    }

    return res.json();
  },
};


// import { apiConfig } from './config';
// import { authApi } from './auth';
// import { UserType } from '@/types/user';

// export const userApi = {
//   async getCurrentUser(): Promise<{ user: UserType }> {
//     try {
//       const response = await fetch(`${apiConfig.baseURL}/users/me`, {
//         method: 'GET',
//         headers: apiConfig.headers,
//         credentials: apiConfig.credentials,
//       });

//       if (!response.ok) {
//         if (response.status === 401) {
//           try {
//             await authApi.refreshToken();
//             // Повтори заявката след опресняване
//             const retryResponse = await fetch(`${apiConfig.baseURL}/users/me`, {
//               method: 'GET',
//               headers: apiConfig.headers,
//               credentials: apiConfig.credentials,
//             });

//             if (!retryResponse.ok) {
//               const errorData = await retryResponse.json();
//               throw new Error(errorData.message || 'Failed to fetch user');
//             }

//             return retryResponse.json();
//           } catch (refreshError) {
//             throw new Error('Unauthorized');
//           }
//         }
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Failed to fetch user');
//       }

//       return response.json();
//     } catch (err) {
//       throw err;
//     }
//   },
// };