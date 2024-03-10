const Button = ({text}) => {
    return (
        <button>
            <div className="sm:mx-3  mb-6">
            <div className="cursor-pointer sm:bg-[#5293CE] items-center justify-center w-[170px] h-[40px] flex rounded-lg">
                <p className="font-medium text-white text-semibold">{text}</p>

            </div>
        </div>
        </button>
    );
};

export default Button;
