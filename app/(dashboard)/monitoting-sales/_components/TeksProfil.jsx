"use client";
import useSidebarCollapse from "@/hooks/useSidebarCollapse";

const TeksProfil = ({ label, value }) => {
    const { isCollapse } = useSidebarCollapse();

    return (
        <div className="mx-7">
            <p className="text-black sm:text-xl text-1xl justify-start pt-1 font-semibold h-1/4">
                {label}
            </p>
            <p className="text-black p-1 mt-">{value}</p>
        </div>
    );
};

export default TeksProfil;