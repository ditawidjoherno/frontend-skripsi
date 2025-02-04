"use client"
import { getCookie } from "@/lib/cookieFunction";
import axios from "axios";
import { useState } from "react";

const AddAktivitas = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const cookie = process.env.NEXT_PUBLIC_COOKIE_NAME;
    const token = getCookie(cookie)

    const bearerToken = `Bearer ${token}`;

    const updateData = async (body, files) => {
        setLoading(true);
        setError(null);
        setData(null);

        const formData = new FormData();
        
        for (let key in body) {
            formData.append(key, body[key]);
        }

        if (files && files.length > 0) {
            files.forEach(file => {
                formData.append('dokumentasi[]', file);
            });
        }

        try {
            const response = await axios.post("https://backend-monitoring-btn-production.up.railway.app/api/aktivitas", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: bearerToken
                }
            });

            if (response.status !== 200) {
                throw new Error(response.data.message || "Gagal Menambahkan Aktivitas");
            }

            setData(response.data);
            console.log(response.data);
        } catch (error) {
            setError(error.message);
            alert(`${error.response?.data?.message || 'Terjadi kesalahan'}`);
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, data, updateData };
};

export default AddAktivitas;
