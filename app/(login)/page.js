import React from "react";

const login = () => {
  return (
    <div className="bg-[#030637] h-screen w-screen pt-10">
      <img
        src={"/img/logo-bumn-removebg-preview.png"}
        alt="logo2"
        className="w-[345px] rounded-[210px] mr-2"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
        }} />
      <div className="w-full h-full flex justify-center items-center">
        <div className="bg-white w-[300px] h-[350px] rounded-2xl px-4 pt-9">
          <img
            src={"/img/btn-logo-login-page.png"}
            alt="logo1"
            className="w-full rounded-full mr-2" />
        </div>
      </div>
    </div>
  );
};

export default login;