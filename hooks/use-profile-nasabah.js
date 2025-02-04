"use client";
import { getCookie } from "@/lib/cookieFunction";
import axios from "axios";
import { useState, useEffect } from "react";

const useProfileNasabah = (id) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const cookie = process.env.NEXT_PUBLIC_COOKIE_NAME;
    const token = getCookie(cookie);

    const bearerToken = `Bearer ${token}`;

    const getUserData = async () => {
        if (!token) {
            setError("Token tidak ditemukan.");
            return;
        }

        setLoading(true);
        setError(null);
        setData(null);

        try {
            const response = await axios.get(`https://backend-monitoring-btn-production.up.railway.app/api/nasabah/${id}`, {
                headers: {
                    Authorization: bearerToken,
                },
            });

            if (response.status !== 200) {
                throw new Error(response.data.message || "Gagal Mendapatkan Data Nasabah");
            }

            setData(response.data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUserData();
    }, [id]);

    return { loading, error, data, getUserData };
};

export default useProfileNasabah;
