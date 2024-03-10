"use client"
import useUser from "@/hooks/use-user"
import TeksProfil from "../profil/_components/TeksProfil";
import { useEffect, useState } from "react";
import Link from "next/link";

const ProfileButton = () => {
  const { loading, error, data, getUserData } = useUser()

  const handleGetDataUser = async () => {
    await getUserData();
  }

  useEffect(() => {
    handleGetDataUser();
  }, [])

  if (data) {
    return (
      <Link href="/profil">
        <div className="cursor-pointer px-2 gap-[5px] sm:bg-[#EAEAEA] bg-transparent w-auto h-auto sm:py-1 py-[2px] mt-[2px] flex rounded-lg">
          <img
            src={"/img/profil-header.png"}
            alt="Profil staff"
            className="w-[35px] h-[35px]"
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
};

export default ProfileButton;



