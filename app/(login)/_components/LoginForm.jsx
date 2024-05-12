import React, { useState, useRef } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import useLogin from "@/hooks/use-login";
import { VscAccount } from "react-icons/vsc";
import { LuKeyRound } from "react-icons/lu";

const LoginForm = () => {
    const [nip, setNip] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(''); 
    const passwordInputRef = useRef(null); 

    const { loading, login } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loginResult = await login(nip, password);
        if (loginResult && loginResult.status === 200) {
            setError('');
        } else {
            setError('NIP atau password salah');
        }
    }
    
    const handleKeyPressNIP = (e) => {
        if (e.key === 'Enter') {
            passwordInputRef.current.focus();
        }
    }

    const handleKeyPressPassword = (e) => {
        if (e.key === 'Enter') {
            handleSubmit(e);
        }
    }

    return (
        <>
            {error && <p className="text-red-500 items-center justify-center flex text-sm mt-3">{error}</p>}
            <div>
                <div className='flex gap-2 w-full px-2 py-1 bg-[#D9D9D9] items-center rounded-xl mt-[15px]'>
                    <VscAccount size={25} />
                    <input
                        className='border-none outline-none bg-transparent font-lightitalic'
                        placeholder="NIP"
                        onChange={(e) => setNip(e.target.value)}
                        value={nip}
                        onKeyPress={handleKeyPressNIP}
                    />
                </div>
                <div className='flex gap-2 w-full px-2 py-1 bg-[#D9D9D9] items-center rounded-xl mt-[15px]'>
                    <LuKeyRound size={25} />
                    <input
                        ref={passwordInputRef}
                        type={showPassword ? "text" : "password"}
                        className='border-none outline-none bg-transparent font-lightitalic'
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        onKeyPress={handleKeyPressPassword} 
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
            </div>
            <button disabled={loading} onClick={handleSubmit} className="bg-[#3468C0] transition-all transform hover:bg-[#FFE500]  w-full h-[35px] rounded-2xl px-10 pt-30 mt-[25px] font-semibold">
                {loading ? 'Loading...' : 'Login'}
            </button>
        </>
    )
}

export default LoginForm;
