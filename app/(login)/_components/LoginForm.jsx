import React, { useState, useRef, useEffect } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import axios from "axios";
import { VscAccount } from "react-icons/vsc";
import { LuKeyRound } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { deleteCookie, getCookie, setCookie } from "@/lib/cookieFunction";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const router = useRouter();
    const cookieName = process.env.NEXT_PUBLIC_COOKIE_NAME;

    const login = async (nip, password) => {
        setLoading(true);
        setError(null);
        setData(null);

        if (!nip || !password) {
            setError("Harap isi NIP dan password.");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post("https://backend-monitoring-btn-production.up.railway.app/api/login", {
                nip: parseInt(nip),
                password: String(password)
            });

            if (response.status !== 200) {
                throw new Error(response.data.message || "Gagal Login");
            }

            setData(response.data);
            const token = response.data.data.token;

            if (getCookie(cookieName)) {
                deleteCookie(cookieName);
            }
            setCookie(cookieName, token, { path: '/', maxAge: 3600 });
            router.push("/beranda");
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
            const message = error.response && error.response.data && error.response.data.error === 'invalid_credentials'
                            ? "NIP atau password salah"
                            : error.message;
            setError(message);
            toast.error(message);
        }
         finally {
            setLoading(false);
        }
    };

    return { loading, error, data, login };
};


const LoginForm = () => {
    const [nip, setNip] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { loading, error: loginError, data, login } = useLogin();
    const passwordInputRef = useRef(null);
    const [error, setError] = useState('');
 

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            await login(nip, password);
            if (!nip || !password) {
                setError("Harap isi NIP dan password.");
                return;
            }
        } catch (error) {
            console.error("Login Error:", error);
            setError('Terjadi kesalahan saat login');
        }
    };
    

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

    useEffect(() => {
        setError('');
    }, []);

    return (
        <>
            <div>
            {loginError && <p className="text-red-500 items-center justify-center flex text-sm mt-3">{loginError}</p>}
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
