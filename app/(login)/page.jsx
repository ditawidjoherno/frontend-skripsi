"use client"
import React, { useState } from 'react';
import Input from './_components/Input';
import { VscAccount } from 'react-icons/vsc';
import { LuKeyRound } from 'react-icons/lu';
import LoginForm from './_components/LoginForm';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {

  };

  return (
    <div className="bg-[#030637] h-screen w-screen pt-10">
      <img
        src={"/img/new_btn.png"}
        alt="logo2"
        className="sm:w-[150px] w-[100px] rounded-[0px] mr-2 absolute top-0 right-0 "
      />
      <img
        src={"/img/Logo_BUMN_Untuk_Indonesia_2020.svg-removebg-preview.png"}
        alt="logo3"
        className="sm:w-[150px] w-[100px] rounded-[0px] mr-2 absolute top-0 left-2 mt-7"
      />
      <div className="w-full h-full flex justify-center items-center">
        <div className="bg-white sm:w-[300px] sm:h-[350px] w-[300px] h-[350px]  rounded-2xl px-4 pt-1 flex flex-col">
          <img
            src={"/img/btn_boost.png"}
            alt="logo1"
            className="w-full px-[25px] mr-1 pt-1 "
          />
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
