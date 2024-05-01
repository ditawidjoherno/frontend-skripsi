import { getCookie } from "@/lib/cookieFunction";
import axios from "axios";
import { useState } from "react";

const UpdatePassword = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const cookie = process.env.NEXT_PUBLIC_COOKIE_NAME;
    const token = getCookie(cookie);
    const bearerToken = `Bearer ${token}`;

    const updateData = async (body) => {
        setLoading(true);
        setError(null);
        setData(null);

        try {
            const response = await axios.put("https://back-btn-boost.vercel.app/update-password", body, {
                headers: {
                    Authorization: bearerToken
                }
            });

            if (response.status !== 200) {
                throw new Error(response.data.message || "Gagal Mendapat User");
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

export default UpdatePassword;
