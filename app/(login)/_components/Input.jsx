import React from 'react'

const Input = ({ Icon, placeholder }) => {
    return (
        <div className='flex gap-2 w-full px-2 py-1 bg-[#D9D9D9] items-center rounded-xl mt-[15px]'>
            {Icon}
            <input className='border-none outline-none bg-transparent font-lightitalic' placeholder={placeholder} />
        </div>
    )
}

export default Input