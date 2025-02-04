import { getCookie } from "@/lib/cookieFunction";
import axios from "axios";
import { useState } from "react";

const detailBulanan = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const cookie = process.env.NEXT_PUBLIC_COOKIE_NAME;
    const token = getCookie(cookie);
    const bearerToken = `Bearer ${token}`;

    const bulananDetail = async (id, tanggal_aktivitas) => {
        setLoading(true);
        setError(null);
        setData(null);

        try {
            const response = await axios.get(`https://back-btn-boost.vercel.app/aktivitas-bulanan?id=${id}&tanggal=${tanggal_aktivitas}`, {
                headers: {
                    Authorization: bearerToken
                }
            });

            if (response.status !== 200) {
                throw new Error(response.data.message || "Gagal Mendapat User");
            }

            const filteredData = response.data.data.filter(item => item.id === id && item.tanggal_aktivitas === tanggal_aktivitas);

            setData(filteredData.length > 0 ? filteredData[0] : null); 
            console.log(response);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, data, bulananDetail };
};

export default detailBulanan;
