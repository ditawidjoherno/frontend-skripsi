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
                `http://localhost:8000/api/update-nasabah/${id}`, // Sesuaikan endpoint dengan ID nasabah
                body,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Menambahkan token dalam header untuk otentikasi
                    },
                }
            );

            setData(response.data); // Menyimpan data dari respons server
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
