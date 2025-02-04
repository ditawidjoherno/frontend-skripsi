
import { useState } from 'react';
import axios from 'axios';
import { getCookie } from '@/lib/cookieFunction';
import useUserStore from './use-data-user';

const useGetTarget = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const cookie = process.env.NEXT_PUBLIC_COOKIE_NAME;
  const token = getCookie(cookie);
  const { user, setUser, clearUser } = useUserStore();

  const getUserData = async (nip) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await axios.get(`https://backend-monitoring-btn-production.up.railway.app/api/target-tahunan-staff?nip=${nip}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status !== 200) {
        throw new Error(response.data.message || 'Gagal Mendapat User');
      }

      setData(response.data.data);
      console.log(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, data, getUserData };
};

export default useGetTarget;
