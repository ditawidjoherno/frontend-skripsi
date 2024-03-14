"use client"
import { setCookie } from "@/lib/cookieFunction";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const useLogin = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)
    const router = useRouter()
    const cookie = `${process.env.NEXT_PUBLIC_COOKIE_NAME}`
    // console.log(cookie)

    const login = async (nip, password) => {
        setLoading(true)
        setError(null)
        setData(null)

        try {
            const response = await axios.post("https://backend-btn-tracking.vercel.app/login",
                { nip: nip, password: password });

            if (!response.status === 200) {
                throw new Error(response.data.message || "Gagal Login")
            }

            setData(response.data)
            const token = response.data.data.token
            setCookie(cookie, token)
            console.log(response.data)
            router.push("/beranda")
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    return { loading, error, data, login }
}

export default useLogin