"use client"
import { getCookie } from "@/lib/cookieFunction";
import axios from "axios";
import { useState } from "react";
import { create } from "zustand";
import useUserStore from "./use-data-user";

const useTargetTahunan = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)
    const cookie = process.env.NEXT_PUBLIC_COOKIE_NAME;
    const token = getCookie(cookie)
    const { user, setUser, clearUser } = useUserStore();

    const bearerToken = `Bearer ${token}`
    const storeTargetTahunan = async (user_id, body) => {
        setLoading(true);
        setError(null);
        setData(null);

        try {
            const response = await axios.post(
                `https://backend-monitoring-btn-production.up.railway.app/api/add-target-tahunan/${user_id}`,
                body,
                { headers: { Authorization: bearerToken } }
            );

            if (response.status !== 200) {
                throw new Error(response.data.message || "Gagal Mengirim Target Tahunan");
            }

            return (response.data.message);
            setData(response.data.message);
        } catch (error) {
            setError(error.response.data.message);
            alert(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };


    return { loading, error, data, storeTargetTahunan }
}

export default useTargetTahunan