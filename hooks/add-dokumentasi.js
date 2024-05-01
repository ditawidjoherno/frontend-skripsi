"use client"
import { getCookie } from "@/lib/cookieFunction";
import axios from "axios";
import { useState } from "react";

const AddDokumentasi = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const cookie = process.env.NEXT_PUBLIC_COOKIE_NAME;
    const token = getCookie(cookie)


    const bearerToken = `Bearer ${token}`
    const addDokumentasi = async (formData) => {
        setLoading(true);
        setError(null);
        setData(null);

        try {
            const response = await axios.post("https://back-btn-boost.vercel.app/dokumentasi-image", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: bearerToken
                }
            });

            if (response.status !== 200) {
                throw new Error(response.data.message || "Gagal Mengupload Foto Profil");
            }

            setData(response.data.data.dokumentasi_url);
            console.log(response.data.data.dokumentasi_url);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, data, addDokumentasi };
};

export default AddDokumentasi;
