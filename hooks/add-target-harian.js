"use client";
import { getCookie } from "@/lib/cookieFunction";
import axios from "axios";
import { useState } from "react";
import useUserStore from "./use-data-user";

const addTargetHarian = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const cookie = process.env.NEXT_PUBLIC_COOKIE_NAME;
    const token = getCookie(cookie);
    const { user, setUser, clearUser } = useUserStore();

    const bearerToken = `Bearer ${token}`;

    const storeTargetHarian = async (nip, body) => {
        setLoading(true);
        setError(null);
        setData(null);
    
        try {
            const response = await axios.post(
                `https://backend-monitoring-btn-production.up.railway.app/api/add-target-harian/${nip}`,
                body,
                { headers: { Authorization: bearerToken } }
            );
    
            if (response.status === 201) {
                // Sukses menyimpan target mingguan
                setData(response.data);
                return { success: true, message: response.data.message };
            } else {
                throw new Error(response.data.message || "Gagal Mengirim Target Harian");
            }
        } catch (error) {
            // Tangani error yang dikirimkan backend atau error lainnya
            const errorMessage = error.response?.data?.message || error.message;
            setError(errorMessage);
            return { success: false, message: errorMessage };
        } finally {
            setLoading(false);
        }
    };
    

    return { loading, error, data, storeTargetHarian };
};

export default addTargetHarian;
