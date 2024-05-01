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


    const bearerToken = `Bearer ${token}`
    const updateData = async (body) => {
        setLoading(true);
        setError(null);
        setData(null);

        console.log(body)
        try {
            const response = await axios.post("https://back-btn-boost.vercel.app/aktivitas", body, {
                headers: {
                    Authorization: bearerToken
                }
            });
            console.log(response)
            if (response.status !== 200) {
                throw new Error(response.data.message || "Gagal Menambahkan Aktivitas");
            }

            setData(response.data);
            console.log(response.data);
        } catch (error) {
            setError(error.message);
            alert(`${error.response.data.message}`)
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, data, updateData };
};

export default AddAktivitas;
