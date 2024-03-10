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
        src={"/img/logobgbtn.png"}
        alt="logo2"
        className="w-[150px] rounded-[0px] mr-2 absolute top-0 right-0 mt-3 "
      />
      <img
        src={"/img/Logo_BUMN_Untuk_Indonesia_2020.svg-removebg-preview.png"}
        alt="logo3"
        className="w-[150px] rounded-[0px] mr-2 absolute top-0 left-2 mt-5 "
      />
      <div className="w-full h-full flex justify-center items-center">
        <div className="bg-white xl:w-[300px] xl:h-[350px] w-[300px] h-[350px] md:w-[500px] md:h-[550px] rounded-2xl px-4 pt-10 flex flex-col">
          <img
            src={"/img/btn_logoopening.png"}
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
