import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { deleteCookie, getCookie, setCookie } from "@/lib/cookieFunction";

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const router = useRouter();
    const cookieName = process.env.NEXT_PUBLIC_COOKIE_NAME;

    const login = async (nip, password) => {
        setLoading(true);
        setError(null);
        setData(null);

        try {
            const response = await axios.post("https://back-btn-boost.vercel.app/auth/login", {
                nip: parseInt(nip), // Ubah string `nip` menjadi bilangan bulat
                password: String(password)
            });

            console.log(response); // Pernyataan logging tambahan

            if (response.status !== 200) {
                throw new Error(response.data.message || "Gagal Login");
            }

            setData(response.data);
            const token = response.data.data.token;

            if (getCookie(cookieName)) {
                deleteCookie(cookieName);
            }
            setCookie(cookieName, token, { path: '/', maxAge: 3600 });
            router.push("/beranda");
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
            setError(error.response ? error.response.data.message : error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, data, login };
};

export default useLogin;
