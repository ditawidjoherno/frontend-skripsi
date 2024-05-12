"use client"
import { IoIosArrowDropleftCircle } from "react-icons/io";
import Link from "next/link";
import MenuItem from "./_components/menu";
import { useRouter } from 'next/navigation';

const page = () => {
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
                        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut neque vitae diam maximus interdum. Aenean ultrices eget neque eget pharetra. Suspendisse ullamcorper massa tincidunt nulla dictum, a dapibus ex hendrerit. Vivamus efficitur nulla at nibh eleifend consequat. Aliquam sodales lectus vitae lacus ultrices, non porttitor turpis facilisis."
                    />
                    <MenuItem
                        title="Monitoring"
                        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut neque vitae diam maximus interdum. Aenean ultrices eget neque eget pharetra. Suspendisse ullamcorper massa tincidunt nulla dictum, a dapibus ex hendrerit. Vivamus efficitur nulla at nibh eleifend consequat. Aliquam sodales lectus vitae lacus ultrices, non porttitor turpis facilisis."
                    />
                    <MenuItem
                        title="Input Data"
                        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut neque vitae diam maximus interdum. Aenean ultrices eget neque eget pharetra. Suspendisse ullamcorper massa tincidunt nulla dictum, a dapibus ex hendrerit. Vivamus efficitur nulla at nibh eleifend consequat. Aliquam sodales lectus vitae lacus ultrices, non porttitor turpis facilisis."
                    />
                    <MenuItem
                        title="Target Tahunan"
                        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut neque vitae diam maximus interdum. Aenean ultrices eget neque eget pharetra. Suspendisse ullamcorper massa tincidunt nulla dictum, a dapibus ex hendrerit. Vivamus efficitur nulla at nibh eleifend consequat. Aliquam sodales lectus vitae lacus ultrices, non porttitor turpis facilisis."
                    />
                </div>
            </div>
        </div>

    );
};

export default page;