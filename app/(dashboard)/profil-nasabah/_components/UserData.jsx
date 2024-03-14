"use client"
import useProfileNasabah from "@/hooks/use-profile-nasabah";
import TeksProfil from "./TeksProfil"
import { useEffect, useState } from "react";

const UserData = () => {
    const { loading, error, data, getUserData } = useProfileNasabah()

    const handleGetDataUser = async () => {
        await getUserData();
    }

    useEffect(() => {
        handleGetDataUser();
    }, [])

    if (loading) {
        return (
            <div>Loading</div>
        )
    }

    if (data) {
        return (
            <div className="sm:mr-6 sm:flex">
                <div>
                    <TeksProfil label="NIP:" value={data?.nip} />
                    <TeksProfil label="Nama:" value={data?.nama} />
                    <TeksProfil label="Tempat Lahir:" value={data?.tempat_lahir || ""} />
                    <TeksProfil label="Tanggal Lahir:" value={data?.tanggal_lahir} />
                    <TeksProfil label="Jenis Kelamin:" value={data?.jenis_kelamin} />
                </div>
                <div className="sm:ml-[120px]">
                    <TeksProfil label="Alamat:" value={data?.alamat} />
                    <TeksProfil label="Jabatan:" value={data?.jabatan} />
                    <TeksProfil label="Email:" value={data?.email} />
                    <TeksProfil label="Nomor Telepon:" value={data?.nomor_telepon} />
                </div>
            </div>
        )
    }
}

export default UserData
