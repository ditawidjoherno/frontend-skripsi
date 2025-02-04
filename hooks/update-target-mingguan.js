"use client";

import { getCookie } from "@/lib/cookieFunction";
import axios from "axios";
import { useState } from "react";
import useUserStore from "./use-data-user";

const updateTargetMingguan = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const cookie = process.env.NEXT_PUBLIC_COOKIE_NAME;
    const token = getCookie(cookie);
    const { user } = useUserStore();

    const bearerToken = `Bearer ${token}`;

    const storeTargetMingguan = async (nip, body) => {
        setLoading(true);
        setError(null);
        setData(null);

        try {
            const response = await axios.put(
                `https://backend-monitoring-btn-production.up.railway.app/api/update-target-mingguan/${nip}`,
                body,
                { headers: { Authorization: bearerToken } }
            );

            if (response.status === 200) {
                setData(response.data); 
                return { success: true, message: response.data.message };
            } else {
                throw new Error(response.data.message || "Gagal Memperbarui Target Mingguan");
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            setError(errorMessage); 
            return { success: false, message: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, data, storeTargetMingguan };
};

export default updateTargetMingguan;
