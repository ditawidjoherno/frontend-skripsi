import { getCookie } from "@/lib/cookieFunction";
import axios from "axios";
import { useState } from "react";
import { create } from "zustand";
import useUserStore from "./use-data-user";

const useTotalMingguan = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)
    const cookie = process.env.NEXT_PUBLIC_COOKIE_NAME;
    const token = getCookie(cookie)
    const { user, setUser, clearUser } = useUserStore();

    const bearerToken = `Bearer ${token}`
    const getTotalMingguan = async () => {
        setLoading(true)
        setError(null)
        setData(null)

        try {
            const response = await axios.get(`http://localhost:8000/api/total-aktivitas-mingguan`, {
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

    return { loading, error, data, getTotalMingguan }
}

export default useTotalMingguan;
