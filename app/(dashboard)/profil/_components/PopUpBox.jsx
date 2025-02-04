"use client";
import { usePopup } from '@/hooks/use-popup';
import React, { useEffect, useState } from 'react';
import Button from './button';
import UpdateProfile from '@/hooks/update-profile';
import useUserStore from '@/hooks/use-data-user';
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const PopUpBox = () => {
  const { updatePassword, updateData, updateProfileImage } = UpdateProfile();
  const { user } = useUserStore();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [updatedNama, setUpdatedNama] = useState('');
  const [updatedEmail, setUpdatedEmail] = useState('');
  const [updatedAlamat, setUpdatedAlamat] = useState('');
  const [updatedTelpon, setUpdatedTelpon] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { isPopUpOpen, setIsPopUpOpen, actionType, setActionType } = usePopup();
  const [loading, setLoading] = useState(false);

  // State untuk alert dan mengontrol pengalihan
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [goToProfile, setGoToProfile] = useState(false); // State untuk pengalihan

  const handleButtonClick = (type) => {
    setIsPopUpOpen(true);
    setActionType(type);
  };

  useEffect(() => {
    if (user) {
      setUpdatedNama(user.nama);
      setUpdatedEmail(user.email);
      setUpdatedAlamat(user.alamat);
      setUpdatedTelpon(user.nomor_hp);
    }
  }, [user]);

  const handleUpdatePassword = async () => {
    setLoading(true);
    setErrorMessage('');

    if (newPassword !== confirmPassword) {
      setErrorMessage('Password dan konfirmasi password tidak cocok.');
      setLoading(false);
      return;
    }

    try {
      await updatePassword({
        new_password: newPassword,
        new_password_confirmation: confirmPassword
      });
      setIsPopUpOpen(false);
      setAlertMessage('Password berhasil diperbarui!');
      setShowAlert(true);
    } catch (error) {
      console.error('Gagal memperbarui password:', error);
      setErrorMessage(error?.response?.data?.message || 'Gagal memperbarui password.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateData = async () => {
    setLoading(true);
    try {
      if (selectedImage) {
        await updateProfileImage(selectedImage);
      } else {
        const updatedProfileData = {
          nama: updatedNama,
          email: updatedEmail || '',
          nomor_hp: updatedTelpon,
          alamat: updatedAlamat,
        };
        await updateData(updatedProfileData);
      }
      setIsPopUpOpen(false);
      setAlertMessage('Profil berhasil diperbarui!');
      setShowAlert(true);
    } catch (error) {
      console.error('Gagal memperbarui profil:', error);
      alert('Gagal memperbarui profil.');
    } finally {
      setLoading(false);
    }
  };

  const AlertBox = () => (
    <div className="fixed inset-0 flex items-center justify-center z-20">
      <div className="fixed inset-0 bg-black opacity-25"></div>
      <div className="bg-white z-50 text-black px-6 py-3 rounded-lg shadow-md">
        <p>{alertMessage}</p>
        <button
          onClick={() => {
            setShowAlert(false);
            setGoToProfile(true);
            window.location.reload();
          }}
          className="mt-3 bg-blue-600 text-white py-2 px-4 rounded-md"
        >
          OK
        </button>
      </div>
    </div>
  );


  return (
    <>
      <div className='gap-2 flex justify-end w-full'>
        <Button
          text="Ganti Password"
          onClick={() => handleButtonClick('changePassword')}
        />
        <Button
          text="Ubah Data"
          onClick={() => handleButtonClick('editData')}
        />
      </div>

      {isPopUpOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="fixed inset-0 bg-black opacity-25"></div>
          <div className="bg-white h-auto w-full sm:ml-[380px] ml-[70px] sm:mr-[250px] mr-[30px] rounded-lg z-20 relative shadow-lg">
            {actionType === 'changePassword' && (
              <div className="flex flex-col mt-3">
                <h2 className="font-medium sm:text-[24px] text-[18px] sm:ml-11 ml-6">Ganti Password</h2>
                <hr className="my-3 mx-6 border-t-[1px] border-black" />
                <div className="sm:mt-4 mt-1 my-3 sm:mx-8 mx-3">
                  <label htmlFor="newPassword" className="font-medium sm:text-lg text-md text-gray-700 flex justify-center">
                    Password Baru
                  </label>
                  <div className='flex gap-2 w-full px-2 py-1 bg-[#D9D9D9] items-center rounded-lg'>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="newPassword"
                      className="w-full sm:h-[30px] h-[20px] text-center border-none bg-[#D9D9D9] rounded-md sm:text-lg text-sm"
                      placeholder="Masukkan password baru"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    {showPassword ? (
                      <IoEyeOffOutline
                        size={20}
                        className='text-gray-400 cursor-pointer'
                        onClick={() => setShowPassword(false)}
                      />
                    ) : (
                      <IoEyeOutline
                        size={20}
                        className='text-gray-400 cursor-pointer'
                        onClick={() => setShowPassword(true)}
                      />
                    )}
                  </div>

                  <label htmlFor="confirmPassword" className="mt-3 font-medium sm:text-lg text-md text-gray-700 flex justify-center">
                    Konfirmasi Password Baru
                  </label>

                  <div className='flex gap-2 w-full px-2 py-1 bg-[#D9D9D9] items-center rounded-lg mt-2'>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      className="w-full sm:h-[30px] h-[20px] text-center border-none bg-[#D9D9D9] rounded-md sm:text-lg text-sm"
                      placeholder="Konfirmasi password baru"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {showPassword ? (
                      <IoEyeOffOutline
                        size={20}
                        className='text-gray-400 cursor-pointer'
                        onClick={() => setShowPassword(false)}
                      />
                    ) : (
                      <IoEyeOutline
                        size={20}
                        className='text-gray-400 cursor-pointer'
                        onClick={() => setShowPassword(true)}
                      />
                    )}
                  </div>
                  {errorMessage && (
                    <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
                  )}
                </div>
              </div>
            )}
            {actionType === 'editData' && (
              <div className="flex flex-col mt-3">
                <h2 className="font-medium sm:text-[24px] text-[18px] sm:ml-11 ml-7">Ubah Data</h2>
                <hr className="my-3 mx-6 border-t-[1px] border-black" />
                <form className="mt-1 my-3 mx-7">
                  <div className="mb-3">
                    <label htmlFor="newNama" className="block font-medium text-gray-700 sm:text-lg text-sm">Nama</label>
                    <input
                      type="text"
                      id="newNama"
                      className="w-full bg-[#D9D9D9] rounded-md sm:text-lg text-sm pl-3 py-1"
                      placeholder="Masukkan Nama"
                      value={updatedNama}
                      onChange={(e) => setUpdatedNama(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="newAlamat" className="block font-medium text-gray-700 sm:text-lg text-sm">Alamat</label>
                    <input
                      type="text"
                      id="newAlamat"
                      className="w-full bg-[#D9D9D9] rounded-md sm:text-lg text-sm pl-3 py-1"
                      placeholder="Masukkan Alamat"
                      value={updatedAlamat}
                      onChange={(e) => setUpdatedAlamat(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="newEmail" className="block font-medium text-gray-700 sm:text-lg text-sm">Email</label>
                    <input
                      type="email"
                      id="newEmail"
                      className="w-full bg-[#D9D9D9] rounded-md sm:text-lg text-sm pl-3 py-1"
                      placeholder="Masukkan Email"
                      value={updatedEmail}
                      onChange={(e) => setUpdatedEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="newTelpon" className="block font-medium text-gray-700 sm:text-lg text-sm">Telepon</label>
                    <input
                      type="text"
                      id="newTelpon"
                      className="w-full bg-[#D9D9D9] rounded-md sm:text-lg text-sm pl-3 py-1"
                      placeholder="Masukkan Telepon"
                      value={updatedTelpon}
                      onChange={(e) => setUpdatedTelpon(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="newProfilePicture" className="block font-medium text-gray-700 sm:text-lg text-sm">Foto Profil</label>
                    <input
                      type="file"
                      id="newProfilePicture"
                      className="w-full"
                      onChange={(e) => setSelectedImage(e.target.files[0])}
                    />
                  </div>
                </form>
              </div>
            )}
            <div className="flex justify-end gap-3 mr-3 mt-3 mb-6">
              <button
                onClick={() => setIsPopUpOpen(false)}
                className="text-white shadow-sm bg-[#8E969E] sm:px-9 px-4 py-[3px] rounded hover:bg-[#adb5bd] sm:text-[18px] text-[14px]"
              >
                Tutup
              </button>
              <button
                type="button"
                className="bg-blue-500 shadow-md text-white sm:px-9 px-4 py-[3px] rounded hover:bg-blue-600 sm:text-[18px] text-[14px]"
                onClick={actionType === 'changePassword' ? handleUpdatePassword : handleUpdateData}
                disabled={loading}
              >
                {loading ? 'Memproses...' : 'Simpan'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Show alert */}
      {showAlert && <AlertBox />}


    </>
  );
};

export default PopUpBox;
