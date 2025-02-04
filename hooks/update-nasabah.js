import { getCookie } from "@/lib/cookieFunction";
import axios from "axios";
import { useState } from "react";

const useUpdateNasabah = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const updateNasabah = async (id, body) => {
        setLoading(true);
        setError(null);
        setData(null);

        try {
            const cookieName = process.env.NEXT_PUBLIC_COOKIE_NAME;
            const token = getCookie(cookieName);

            if (!token) {
                throw new Error("Token tidak tersedia. Harap login kembali.");
            }

            const response = await axios.put(
                `https://backend-monitoring-btn-production.up.railway.app/api/update-nasabah/${id}`, 
                body,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, 
                    },
                }
            );

            setData(response.data);
            console.log("Nasabah berhasil diperbarui:", response.data);
        } catch (err) {
            setError(
                err.response?.data?.message || err.message || "Terjadi kesalahan saat memperbarui data nasabah"
            );
            console.error("Error saat memperbarui nasabah:", err);
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        data,
        updateNasabah,
    };
};

export default useUpdateNasabah;
