import axios from "axios";
import { useState } from "react";
import { getCookie } from "@/lib/cookieFunction";

const UpdateProfile = () => {
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
            const response = await axios.patch("https://back-btn-boost.vercel.app/user", body, {
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

    const updatePassword = async (body) => {
        setLoading(true);
        setError(null);
        setData(null);

        try {
            const response = await axios.put("https://backend-btn-tracking.vercel.app/update-password", body, {
                headers: {
                    Authorization: bearerToken
                }
            });

            if (response.status !== 200) {
                throw new Error(response.data.message || "Gagal Memperbarui Password");
            }

            setData(response.data);
            console.log(response);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const updateProfileImage = async (imageFile) => {
        setLoading(true);
        setError(null);
        setData(null);

        try {
            const formData = new FormData();
            formData.append('image', imageFile);

            const response = await axios.post("https://back-btn-boost.vercel.app/profile-image", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: bearerToken
                }
            });

            if (response.status !== 200) {
                throw new Error(response.data.message || "Gagal Mengupload Foto Profil");
            }

            setData(response.data);
            console.log(response);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, data, updateData, updatePassword, updateProfileImage };
};

export default UpdateProfile;
