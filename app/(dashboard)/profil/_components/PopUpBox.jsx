"use client";
import { usePopup } from '@/hooks/use-popup';
import React, { useEffect, useState } from 'react';
import Button from './button';
import UpdateProfile from '@/hooks/update-profile';
import useUserStore from '@/hooks/use-data-user';
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const PopUpBox = () => {
  const { loading, error, data, updateData, updatePassword } = UpdateProfile();
  const { user } = useUserStore();
  const [updatedNama, setUpdatedNama] = useState('');
  const [updatedEmail, setUpdatedEmail] = useState('');
  const [updatedAlamat, setUpdatedAlamat] = useState('');
  const [updatedTelpon, setUpdatedTelpon] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State untuk menunjukkan atau menyembunyikan password

  const { isPopUpOpen, setIsPopUpOpen, actionType, setActionType } = usePopup();

  const handleButtonClick = (type) => {
    setIsPopUpOpen(true);
    setActionType(type);
  };

  useEffect(() => {
    if (user) {
      setUpdatedNama(user.nama);
      setUpdatedEmail(user.email);
      setUpdatedAlamat(user.alamat);
      setUpdatedTelpon(user.nomor_telepon);
    }
  }, [user]);

  const allUpdatedData = {
    "nama": updatedNama,
    "email": updatedEmail || "",
    "nomor_telepon": updatedTelpon,
    "alamat": updatedAlamat
  };

  const handleUpdateData = async () => {
    if (actionType === 'changePassword') {
      try {
        await updatePassword({ password: newPassword });
        setIsPopUpOpen(false);
      } catch (error) {
        console.error('Gagal memperbarui password:', error.message);
        alert('Gagal memperbarui password');
      }
    } else {
      console.log(allUpdatedData);
      await updateData(allUpdatedData);
      setIsPopUpOpen(false);
    }
  };

  return (
    <>
      <div className='gap-2 flex justify-end w-full'>
        <Button
          text={"Ganti Password"}
          onClick={() => handleButtonClick("changePassword")}
        />
        <Button
          text={"Ubah Data"}
          onClick={() => handleButtonClick('editData')}
        />
      </div>
      {isPopUpOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="fixed inset-0 bg-black opacity-25"></div>
          <div className="bg-white sm:h-[530px] h-[550px] sm:w-[500px] w-[300px] rounded-lg z-20 relative shadow-lg">
            {actionType === 'changePassword' && (
              <>
                <div className=" flex mt-3 flex-col">
                  <h2 className="font-medium text-[24px] ml-11">Ganti Password</h2>
                  <hr className="my-3 mx-6 border-t-[1px] justify-center items-center border-black mt-1" />
                  <div className="mt-4  my-3 mx-3">
                    <label htmlFor="newPassword" className=" items-center text-md font-medium text-lg text-gray-700 justify-center flex">
                      Password Baru
                    </label>
                    <div className='flex gap-2 w-full px-2 py-1 bg-[#D9D9D9] items-center rounded-xl'>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="newPassword"
                        className="mt-1 py-1 w-full text-center border border-gray-300  bg-[#D9D9D9] rounded-md"
                        placeholder="Masukkan password baru"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                      {showPassword ? (
                        <IoEyeOffOutline
                          size={20}
                          className='text-gray-500 cursor-pointer'
                          onClick={() => setShowPassword(false)}
                        />
                      ) : (
                        <IoEyeOutline
                          size={20}
                          className='text-gray-500 cursor-pointer'
                          onClick={() => setShowPassword(true)}
                        />
                      )}
                    </div>
                    {errorMessage && (
                      <p className="text-red-500 text-sm">{errorMessage}</p>
                    )}
                  </div>
                </div>
              </>
            )}
            {actionType === 'editData' && (
              <>
                <div className=" flex mt-3 flex-col">
                  <h2 className="font-medium text-[24px] ml-11">Ubah Data</h2>
                  <hr className="my-3 mx-6  border-t-[1px] justify-center items-center border-black mt-1" />
                  <form className="mt-1 my-3 mx-7">
                    <div className="mb-3 flex flex-col ">
                      <label htmlFor="newNama" className="block items-center text-md font-medium text-gray-700">
                        Nama
                      </label>
                      <input
                        type="nama"
                        id="newNama"
                        className="mt-1 pl-3 py-1 w-full border border-gray-300  bg-[#D9D9D9] rounded-md"
                        placeholder="Masukkan Nama"
                        value={updatedNama}
                        onChange={(e) => setUpdatedNama(e.target.value)}
                      />
                    </div>
                    <div className="mb-4 flex flex-col">
                      <label htmlFor="newAlamat" className="block items-center text-md font-medium text-gray-700">
                        Alamat
                      </label>
                      <input
                        type="newAlamat"
                        id="newAlamat"
                        className="mt-1 pl-3 py-1 w-full border border-gray-300  bg-[#D9D9D9] rounded-md"
                        placeholder="Masukkan Alamat"
                        value={updatedAlamat}
                        onChange={(e) => setUpdatedAlamat(e.target.value)}
                      />
                    </div>
                    <div className="mb-3 flex flex-col ">
                      <label htmlFor="newEmail" className="block items-center text-md font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="Email"
                        id="newEmail"
                        className="mt-1 pl-3 py-1 w-full border border-gray-300  bg-[#D9D9D9] rounded-md"
                        placeholder="Masukkan Email"
                        value={updatedEmail}
                        onChange={(e) => setUpdatedEmail(e.target.value)}
                      />
                    </div>
                    <div className="mb-4 flex flex-col">
                      <label htmlFor="newNomorTelepon" className="block items-center text-md font-medium text-gray-700">
                        Nomor Telepon
                      </label>
                      <input
                        type="NomorTelepont"
                        id="newNomorTelepon"
                        className="mt-1 pl-3 py-1 w-full border border-gray-300  bg-[#D9D9D9] rounded-md"
                        placeholder="Masukkan Nomor Telepon"
                        value={updatedTelpon}
                        onChange={(e) => setUpdatedTelpon(e.target.value)}
                      />
                    </div>
                  </form>

                </div>
              </>
            )}
            <div className='justify-end flex gap-3 mr-3 mt-8'>
              <button
                onClick={() => setIsPopUpOpen(false)}
                className=" text-white shadow-sm bg-[#8E969E] px-9 py-[3px] rounded hover:bg-[#adb5bd]"
              >
                Tutup
              </button>
              <button
                type="submit"
                className="bg-blue-500 shadow-md text-white px-9 py-[3px] rounded hover:bg-blue-600"
                onClick={handleUpdateData}
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PopUpBox;
