// // lib/api/auth.ts
import { apiConfig } from './config';

interface ApiResponse<T> {
  data: T;
  message?: string;
}

export const authApi = {
  async login(email: string, password: string): Promise<ApiResponse<{ user: { id: string; username: string; email: string } }>> {
    const response = await fetch(`${apiConfig.baseURL}/auth/login`, {
      method: 'POST',
      headers: apiConfig.headers,
      credentials: apiConfig.credentials,
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    return response.json();
  },

  async refreshToken(): Promise<void> {
    const response = await fetch(`${apiConfig.baseURL}/auth/refresh`, {
      method: 'POST',
      credentials: apiConfig.credentials,
    });

    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }
  },

  async logout(): Promise<void> {
    const response = await fetch(`${apiConfig.baseURL}/auth/logout`, {
      method: 'POST',
      headers: apiConfig.headers,
      credentials: apiConfig.credentials,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Logout failed');
    }
  },
};



// import { apiConfig } from './config';

// interface ApiResponse<T> {
//   data: T;
//   message?: string;
// }

// export const authApi = {
//   async login(email: string, password: string): Promise<ApiResponse<{ user: { id: string; username: string; email: string } }>> {
//     const response = await fetch(`${apiConfig.baseURL}/auth/login`, {
//       method: 'POST',
//       headers: apiConfig.headers,
//       credentials: apiConfig.credentials,
//       body: JSON.stringify({ email, password }),
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.message || 'Login failed');
//     }

//     return response.json();
//   },

//   async refreshToken(): Promise<void> {
//     const response = await fetch(`${apiConfig.baseURL}/auth/refresh`, {
//       method: 'POST',
//       credentials: apiConfig.credentials,
//     });

//     if (!response.ok) {
//       throw new Error('Failed to refresh token');
//     }
//   },

//   async logout(): Promise<void> {
//     const response = await fetch(`${apiConfig.baseURL}/auth/logout`, {
//       method: 'POST',
//       headers: apiConfig.headers,
//       credentials: apiConfig.credentials,
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.message || 'Logout failed');
//     }
//   },
// };