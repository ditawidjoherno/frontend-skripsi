import { getCookie } from "@/lib/cookieFunction";
import axios from "axios";
import { useState } from "react";
import { create } from "zustand";
import useUserStore from "./use-data-user";
import { bulanToAngka } from "@/lib/utils";

const useDataPerbulan = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)
    const cookie = process.env.NEXT_PUBLIC_COOKIE_NAME;
    const token = getCookie(cookie)
    const { user, setUser, clearUser } = useUserStore();

    const bearerToken = `Bearer ${token}`
    const getDataPerbulan = async (bulan, tahun) => {
        setLoading(true)
        setError(null)
        setData(null)
        const bulanBaru = bulanToAngka(bulan)

        try {
            const response = await axios.get(`https://backend-btn-tracking.vercel.app/aktivitas-bulanan/${bulanBaru}/${tahun}`, {
                headers: {
                    Authorization: bearerToken
                }
            });
            console.log(response);
            if (response.status !== 200) {
                throw new Error(response.data.message || "Gagal Mendapat Data Bulanan")
            }
            setData(response.data.data)
            console.log(response.data.data)
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    return { loading, error, data, getDataPerbulan }
}

export default useDataPerbulan;
