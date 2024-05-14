import { useEffect, useState } from 'react';
import { IoCaretUp } from "react-icons/io5";
import { IoCaretDown } from "react-icons/io5";
import Link from 'next/link';
import useTotalMingguan from '@/hooks/use-monitoring-mingguan';
import { FaSpinner } from 'react-icons/fa';

const MonitoringMingguan = ({ title, description }) => {
    const [openStates, setOpenStates] = useState({});
    const { loading, error, data, getTotalMingguan } = useTotalMingguan();

    const toggleDropdown = (bulan) => {
        setOpenStates(prevState => ({
            ...prevState,
            [bulan]: !prevState[bulan]
        }));
    };

    useEffect(() => {
        getTotalMingguan();
    }, []);

    const weekColors = ["bg-blue-500", "bg-blue-600"];

    if (loading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center">
                <FaSpinner className="animate-spin mr-2" /> Loading
            </div>
        );
    }

    return (
        <div>
            {data && Object.keys(data).map((bulan, index) => {
                const monthIndex = index + 1;
                const capitalizedMonth = bulan.charAt(0).toUpperCase() + bulan.slice(1);
                return (
                    <div className="my-4" key={index}>
                        <div
                            className="bg-[#056AAA] hover:bg-[#2f7cac] p-4 rounded-t-md cursor-pointer transition-opacity"
                            onClick={() => toggleDropdown(bulan)}
                        >
                            <h3 className="text-lg font-bold text-[#FFE500] text-center py-">{capitalizedMonth}</h3>
                            <div className='flex items-center justify-center'>
                                {openStates[bulan] ? <IoCaretUp size={20} /> : <IoCaretDown size={20} />}
                            </div>
                        </div>
                        {openStates[bulan] && (
                            <div className=" grid-cols-2 gap-4 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'}">
                                {data[bulan] && Object.keys(data[bulan]).map((minggu, index) => (
                                    <Link key={index} href={`/data-mingguan?bulan=${monthIndex}&minggu=${minggu.substring(7)}`}>
                                        <div className={`text-white p-2 hover:bg-blue-700 transition duration-300 cursor-pointer ${weekColors[index % weekColors.length]}`}>
                                            <p>Minggu ke-{minggu.substring(7)}</p>
                                            <p>Jumlah: {data[bulan][minggu].jumlah}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default MonitoringMingguan;
