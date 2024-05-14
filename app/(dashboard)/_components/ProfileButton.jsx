import useUser from "@/hooks/use-user";
import TeksProfil from "../profil/_components/TeksProfil";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaSpinner } from 'react-icons/fa';


const ProfileButton = () => {
  const { loading, error, data, getUserData } = useUser();

  useEffect(() => {
    getUserData();
  }, []);

//   if (loading) {
//     return (
//         <div className="flex items-center justify-center">
//             <FaSpinner className="animate-spin mr-2" /> Loading
//         </div>
//     );
// }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  if (data) {
    return (
      <Link href="/profil">
        <div className="cursor-pointer sm:px-2 px-0 sm:gap-[5px] sm:bg-[#EAEAEA] sm:hover:bg-gray-300 bg-transparent w-auto h-auto sm:py-1 py-[2px] mt-1 sm:mt-[2px] flex rounded-lg">
          <img
            src={data.foto_profil || '/img/profil.png'}
            alt="Profil staff"
            className="sm:w-[35px] w-[25px] h-[25px] sm:h-[35px] rounded-sm"
          />
          <div className="sm:block hidden">
            <p className="font-medium text-[13px]">
              <span className="font-medium">Nama: </span>{data?.nama}</p>
            <p className="font-medium text-[13px]">
              <span className="font-medium">NIP: </span>{data?.nip}</p>
          </div>
        </div>
      </Link>
    );
  }

  // Jika tidak ada data, tampilkan null atau pesan bahwa data tidak tersedia
  return null;
};

export default ProfileButton;
