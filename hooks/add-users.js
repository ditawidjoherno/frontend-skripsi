"use client"
import { getCookie } from "@/lib/cookieFunction";
import axios from "axios";
import { useState } from "react";

const AddStaff = () => {
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
            const response = await axios.post("https://back-btn-boost.vercel.app/create-user", body, {
                headers: {
                    Authorization: bearerToken
                }
            });
            console.log(response)
            if (response.status !== 200) {
                throw new Error(response.data.message || "Gagal Menambahkan Aktivitas");
            }

            setData(response.data);
            console.log(response);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, data, updateData };
};

export default AddStaff;
