"use client"
import { usePopup } from '@/hooks/use-popup';
import React from 'react';
import Button from './button';

const PopUpBox = () => {


  const { isPopUpOpen, setIsPopUpOpen, actionType, setActionType } = usePopup();
  const handleButtonClick = (type) => {
    setIsPopUpOpen(true);
    setActionType(type);
  };
  return (
    <>
      <Button
        text={"Ganti Password"}
        onClick={() => handleButtonClick("changePassword")}
      />
      <Button
        text={"Ubah Data"}
        onClick={() => handleButtonClick('editData')}
      />
      {isPopUpOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="fixed inset-0 bg-black opacity-25"></div>
          <div className="bg-white h-[530px] w-[500px] rounded-lg z-20 relative shadow-lg">
            {actionType === 'changePassword' && (
              <>
                <div className=" flex mt-3 flex-col">
                  <h2 className="font-medium text-[24px] ml-11">Ganti Password</h2>
                  <hr className="my-3 mx-6  border-t-[1px] justify-center items-center border-black mt-1" />
                  <form className="mt-4  my-3 mx-3">
                    <div className="mb-3 flex flex-col items-center">
                      <label htmlFor="newPassword" className="block items-center text-md font-medium text-gray-700">
                        Password Baru
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        className="mt-1 py-1 w-full text-center border border-gray-300  bg-[#D9D9D9] rounded-md"
                        placeholder="Masukkan password baru"
                      />
                    </div>
                    <div className="mb-4 flex flex-col items-center">
                      <label htmlFor="newPassword" className="block items-center text-md font-medium text-gray-700">
                        Konfirmasi Password Baru
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        className="mt-1 py-1 w-full text-center border border-gray-300  bg-[#D9D9D9] rounded-md"
                        placeholder="Konfirmasi password baru"
                      />
                    </div>
                  </form>
                  <ul className="text-center text-[13px] font-light items-center px-5">
                    <li className="mb-1"> • Password minimal 8 karakter</li>
                    <li className="mb-7"> • Password harus memiliki minimal 1 karakter huruf kapital, 1 karakter huruf kecil, 1 karakter simbol (@, #, %, dsb) dan 1 karakter numerik</li>
                  </ul>

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
                      />
                    </div>
                  </form>

                </div>
              </>
            )}
            <div className='justify-end flex gap-3 mr-3 mt-8'>
              <button
                onClick={setIsPopUpOpen}
                className=" text-white shadow-sm bg-[#8E969E] px-9 py-[3px] rounded hover:bg-[#adb5bd]"
              >
                Tutup
              </button>
              <button
                type="submit"
                className="bg-blue-500 shadow-md text-white px-9 py-[3px] rounded hover:bg-blue-600"
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
