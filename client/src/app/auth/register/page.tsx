// // app/register/register.tsx
// 'use client';
// import { useState } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';

// const RegisterPage = () => {
//   const router = useRouter();
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     setIsLoading(true);
//     setError('');

//     try {
//       await axios.post('http://localhost:3000/api/auth/register', {
//         username,
//         email,
//         password,
//         firstName,
//         lastName,
//       });

//       router.push('/auth/login');
//     } catch (err) {
//       console.log("Error creating profile " + err);
//       setError('Registration failed. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
//         <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
//         {error && <p className="text-red-500 text-center mb-4">{error}</p>}
//         <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//             <label className="block text-gray-700">First Name</label>
//             <input
//               type="text"
//               value={firstName}
//               onChange={(e) => setFirstName(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Last Name</label>
//             <input
//               type="text"
//               value={lastName}
//               onChange={(e) => setLastName(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Username</label>
//             <input
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md"
//               required
//             />
//           </div>
//           <div className="mb-6">
//             <label className="block text-gray-700">Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
//           >
//             {isLoading ? 'Registering...' : 'Register'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default RegisterPage;


'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const RegisterPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setError('');

    try {
      await axios.post('http://localhost:3000/api/auth/register', {
        username,
        email,
        password,
        firstName,
        lastName,
      });

      router.push('/auth/login');
    } catch (err) {
      console.log("Error creating profile " + err);
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
            <label className="block text-gray-700">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;