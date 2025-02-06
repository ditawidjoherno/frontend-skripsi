"use client"
import { IoIosArrowDropleftCircle } from "react-icons/io";
import Link from "next/link";
import MenuItem from "./_components/menu";
import { useRouter } from 'next/navigation';

const Page = () => {
    const router = useRouter();

    const handleGoBack = () => {
        router.back();
    };

    return (
        <div className={`bg-[#EAEAEA] h-full flex flex-col items-center sm:pt-[75px] pt-[60px] sm:pr-4 pr-3 sm:ml-20 ml-10`}>
            <div className="flex items-center w-full">
                <h2 className="sm:text-[40px] text-[24px] sm:ml-5 ml-4 font-semibold">
                    Informasi Menu
                </h2>
                
                <div>
                <IoIosArrowDropleftCircle
                        className="sm:h-10 sm:w-10 h-5 w-5 sm:ml-3 ml-0 transition-colors duration-300 hover:text-gray-400 focus:text-gray-400 cursor-pointer"
                        onClick={handleGoBack}
                    />
                </div>
            </div>
            <div className="bg-white rounded-2xl h-auto mb-5 sm:ml-5 ml-3 w-full sm:pt-10 pt-6">
                <div className="container mx-auto py-3">
                    <MenuItem
                        title="Beranda"
                        description="Menu Beranda menampilkan informasi kinerja, seperti jumlah total aktivitas, data terbaru, target harian, serta daftar tugas yang perlu diselesaikan. Terdapat juga grafik KPI yang membantu pengguna dalam memantau pencapaian target mereka."
                    />
                    <MenuItem
                        title="Monitoring"
                        description="Menu Monitoring ini menyediakan tiga kategori utama, yaitu Harian, Mingguan, dan Bulanan. Pada kategori Harian, pengguna dapat melihat jumlah aktivitas yang telah dilakukan dalam satu hari, sementara kategori Mingguan menampilkan total aktivitas dalam satu minggu untuk membantu dalam evaluasi target mingguan. Sedangkan kategori Bulanan memberikan gambaran menyeluruh mengenai produktivitas dalam jangka waktu lebih panjang. Selain itu, terdapat fitur Monitoring Staff yang memungkinkan pengguna melihat daftar staff beserta informasi dasar mereka."
                    />
                    <MenuItem
                        title="Input Data"
                        description="Menu Input Data pada halaman ini digunakan untuk mencatat aktivitas sales secara harian, mingguan, dan bulanan. Setiap aktivitas yang dimasukkan akan diperbarui dalam sistem dan ditampilkan dalam bentuk jumlah total pada masing-masing kategori. Dengan adanya menu ini, pengguna dapat memantau kinerja sales berdasarkan periode waktu tertentu."
                    />
                    <MenuItem
                        title="Target Tahunan"
                        description="Menu Target Tahunan dirancang untuk membantu memantau dan mengelola pencapaian target tahunan bagi setiap staf dalam perusahaan. Di dalam menu ini, pengguna dapat melihat berbagai KPI (Key Performance Indicators) yang telah ditetapkan untuk setiap staff, dengan rincian pencapaian bulanan dari Januari hingga Desember. Setiap KPI yang tertera, seperti Tabungan, Depo Ritel, QRIS, dan lainnya, mencerminkan tujuan spesifik yang harus dicapai oleh staff. Tabel ini juga menampilkan kolom yang mencatat pencapaian setiap bulan, memberikan gambaran yang jelas tentang kinerja staf sepanjang tahun"
                    />
                </div>
            </div>
        </div>

    );
};

export default Page;