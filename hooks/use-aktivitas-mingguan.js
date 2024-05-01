// use-aktivitas-mingguan.js
import { useState } from 'react';
import axios from 'axios';
import { getCookie } from '@/lib/cookieFunction';
import useUserStore from './use-data-user';

const useAktivitasMingguan = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const cookie = process.env.NEXT_PUBLIC_COOKIE_NAME;
  const token = getCookie(cookie);
  const { user, setUser, clearUser } = useUserStore();
  
  const defaultBulan = 1; 
  const defaultMinggu = 1; 

  const getUserData = async (bulan = defaultBulan, minggu = defaultMinggu) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await axios.get(`https://back-btn-boost.vercel.app/aktivitas-mingguan?bulan=${bulan}&minggu=${minggu}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status !== 200) {
        throw new Error(response.data.message || 'Gagal Mendapat Data');
      }

      setData(response.data.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, data, getUserData };
};

export default useAktivitasMingguan;
