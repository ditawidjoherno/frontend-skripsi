const Button = ({ text, ...props }) => {
    return (
        <button {...props}>
            <div className="sm:mt-10 mt-1 mb-6 flex justify-center">
                <div className="cursor-pointer sm:bg-[#5293CE] bg-[#5293CE] items-center justify-center w-[170px] h-[40px] flex rounded-lg">
                    <p className="font-medium text-white text-semibold">{text}</p>

                </div>
            </div>
        </button>
    );
};

export default Button;