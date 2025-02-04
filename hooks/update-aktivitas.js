import { getCookie } from "@/lib/cookieFunction";
import axios from "axios";
import { useState } from "react";

const useAktivitas = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    // Fungsi untuk update aktivitas
    const updateAktivitas = async (aktivitasId, body) => {
        setLoading(true);
        setError(null);
        setData(null);

        try {
            const cookie = process.env.NEXT_PUBLIC_COOKIE_NAME;
            const token = getCookie(cookie);

            if (!token) {
                throw new Error("Token tidak tersedia. Harap login kembali.");
            }

            const response = await axios.put(
                `https://backend-monitoring-btn-production.up.railway.app/api/update-aktivitas/${aktivitasId}`,
                body,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setData(response.data);
            console.log("Aktivitas berhasil diperbarui:", response.data.data);
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Terjadi kesalahan");
            console.error("Error saat memperbarui aktivitas:", err);
        } finally {
            setLoading(false);
        }
    };

    const tambahDokumentasi = async (id, formData) => {
        try {
            const response = await fetch(`https://backend-monitoring-btn-production.up.railway.app/api/aktivitas/${id}/dokumentasi`, {
                method: 'POST',
                body: formData,
            });
    
            if (!response.ok) {
                throw new Error('Gagal meng-upload dokumentasi');
            }
    
            const data = await response.json();
            
            console.log("Response dari API:", data);
    
            if (data && data.data && Array.isArray(data.data) && data.data.length > 0) {
                const dokumentasiUrl = data.data[0]; 
                return dokumentasiUrl; 
            } else {
                throw new Error('Dokumentasi URL tidak ditemukan');
            }
        } catch (error) {
            console.error("Error uploading documentation:", error);
            throw error;
        }
    };
    
    

    const hapusDokumentasi = async (aktivitasId, documentId) => {
        setLoading(true);
        setError(null);
        setData(null);

        try {
            const cookie = process.env.NEXT_PUBLIC_COOKIE_NAME;
            const token = getCookie(cookie);

            if (!token) {
                throw new Error("Token tidak tersedia. Harap login kembali.");
            }

            const response = await axios.delete(
                `https://backend-monitoring-btn-production.up.railway.app/api/aktivitas/${aktivitasId}/dokumentasi/${documentId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setData(response.data);
            console.log("Dokumentasi berhasil dihapus:", response.data);
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Terjadi kesalahan");
            console.error("Error saat menghapus dokumentasi:", err);
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        data,
        updateAktivitas,
        tambahDokumentasi,
        hapusDokumentasi,
    };
};

export default useAktivitas;
