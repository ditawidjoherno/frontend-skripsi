import { getCookie } from "@/lib/cookieFunction";
import axios from "axios";
import { useState } from "react";

const tambahReminder = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const cookie = process.env.NEXT_PUBLIC_COOKIE_NAME;
    const token = getCookie(cookie);

    const bearerToken = `Bearer ${token}`;

    const updateData = async (task, deadline) => {
        setLoading(true);
        setError(null);

        const body = {
            task: task,
            deadline: deadline
        };

        try {
            const response = await axios.post("http://localhost:8000/api/reminders", body, {
                headers: {
                    Authorization: bearerToken
                }
            });

            if (response.status !== 200) {
                throw new Error(response.data.message || "Gagal Menambahkan Aktivitas");
            }

            setData(response.data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, data, updateData };
};

export default tambahReminder;
