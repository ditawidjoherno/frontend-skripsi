import { getCookie } from "@/lib/cookieFunction";
import axios from "axios";
import { useState } from "react";

const addAktivitas = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const cookie = process.env.NEXT_PUBLIC_COOKIE_NAME;
    const token = getCookie(cookie)


    const bearerToken = `Bearer ${token}`
    const Nasabah = async (body) => {
        setLoading(true);
        setError(null);
        setData(null);

        try {
            const response = await axios.post("https://backend-btn-tracking.vercel.app/add-nasabah", {
                headers: {
                    Authorization: bearerToken
                }
            }, body );

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

    return { loading, error, data, Nasabah };
};

export default addAktivitas;
