'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { userApi } from '@/lib/api/users';
import { authApi } from '@/lib/api/auth';
import Link from 'next/link';

type UserType = { id: string; username: string; email: string; role: string; };

const UserProfileSection = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await userApi.getCurrentUser();
        setUser(response.user);
      } catch (err: any) {
        console.error('Error fetching user:', err);
        if (err.message === 'Unauthorized') {
          // router.push('/auth/login');
          console.log('Гост потребител — няма сесия.');
        }
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [router]);

  const handleLogout = async () => {
    try {
      await authApi.logout();
      setUser(null);
      router.push('/auth/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <div className="bg-gray-200 p-4 mb-4">
      {loading ? (
        <p>Зареждане...</p>
      ) : user ? (
        <div className="text-center">
          <p>Здравей, {user.username}!</p>
          <p>Имейл: {user.email}</p>
          <p>Роля: {user.role}</p>
          <button
            onClick={handleLogout}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none"
          >
            Изход
          </button>
        </div>
      ) : (
        <div className="text-center">
          <Link href="/auth/login" className="text-blue-500 hover:underline">
            Влезте в акаунта си
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserProfileSection;