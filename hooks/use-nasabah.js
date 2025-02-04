"use client"
import { getCookie } from "@/lib/cookieFunction";
import axios from "axios";
import { useState } from "react";
import { create } from "zustand";
import useUserStore from "./use-data-user";

const useAddNasabah = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)
    const cookie = process.env.NEXT_PUBLIC_COOKIE_NAME;
    const token = getCookie(cookie)
    const { user, setUser, clearUser } = useUserStore();

    const bearerToken = `Bearer ${token}`
    const addNasabah = async (body) => {
        setLoading(true)
        setError(null)
        setData(null)

        console.log(body)

        try {
            const response = await axios.post(`http://localhost:8000/api/input-nasabah`, body, {
                headers: {
                    Authorization: bearerToken
                }
            });


            // if (!response.status === 200) {
            //     throw new Error(response.data.message || "Gagal Mendapat User")
            // }

            setData(response.data)
            console.log(response.data)
        } catch (error) {
            setError(error.message)
            alert(`${error.response.data.message}`)
        } finally {
            setLoading(false)
        }
    }

    return { loading, error, data, addNasabah }
}

export default useAddNasabah