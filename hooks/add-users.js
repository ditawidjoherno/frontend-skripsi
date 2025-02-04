"use client";
import { getCookie } from "@/lib/cookieFunction";
import axios from "axios";
import { useState } from "react";

const AddStaff = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const cookie = process.env.NEXT_PUBLIC_COOKIE_NAME;
    const token = getCookie(cookie);

    const bearerToken = `Bearer ${token}`;

    const updateData = async (body) => {
        setLoading(true);
        setError(null);
        setData(null);

        try {
            const response = await axios.post("https://backend-monitoring-btn-production.up.railway.app/api/addUser", body, {
                headers: {
                    Authorization: bearerToken,
                },
            });

            if (response.status !== 200 && response.status !== 201) {
                throw new Error(response.data.message || "Gagal Menambahkan Aktivitas");
            }

            setData(response.data);
            return response.data;
        } catch (error) {
            const errorMessage = error.response ? error.response.data.message : error.message;
            setError(errorMessage || "Terjadi kesalahan saat mengirim data.");
            return { message: errorMessage || "Terjadi kesalahan saat mengirim data." };
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, data, updateData };
};

export default AddStaff;
