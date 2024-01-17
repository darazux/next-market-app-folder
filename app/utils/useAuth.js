// app/utils/useAuth.js

import { jwtVerify } from 'jose';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const secretKeyStr = process.env.NEXT_PUBLIC_JWT_SECRET_KEY;
const secretKey = new TextEncoder().encode(secretKeyStr);

const useAuth = () => {
  const [loginUserEmail, setLoginUserEmail] = useState('');
  const router = useRouter();
  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/user/login');
      }
      try {
        const decodedJwt = await jwtVerify(token, secretKey);
        setLoginUserEmail(decodedJwt.payload.email);
      } catch (error) {
        console.log(error);
        router.push('/user/login');
      }
    };
    checkToken();
  }, [router]);
  return loginUserEmail;
};

export default useAuth;
