import axios from "axios";
import { useState } from "react";
import { getCookie } from "@/lib/cookieFunction";
import useUserStore from "./use-data-user";

const useTargetTahunanBM = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const cookieName = process.env.NEXT_PUBLIC_COOKIE_NAME;
    const token = getCookie(cookieName);

    const getUserData = async () => {
        if (!token) {
            setError("No token found");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            console.log()
            const response = await axios.get(`https://backend-monitoring-btn-production.up.railway.app/api/target-tahunan`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status !== 200) {
                throw new Error("Failed to fetch user data");
            }


            console.log(response.data.data);
            setData(response.data.data);
        } catch (error) {
            setError(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    console.log(data)
    return { loading, error, data, getUserData };
};

export default useTargetTahunanBM;
