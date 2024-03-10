"use client";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import React, { useState } from 'react';
import Link from "next/link";
import Menu from "./_components/menu";

const page = () => {

    return (
        <div className={`bg-[#EAEAEA] h-full pb-4 flex flex-col items-center sm:pt-[75px] pt-[60px] sm:pr-5 pr-3 sm:ml-20 ml-10`}>
            <div className="flex items-center w-full justify-between">
                <div className="sm:ml-5 ml-4 flex items-center gap-3">
                    <h2 className="sm:text-[40px] text-[24px]  font-semibold">
                        Monitoring
                    </h2>
                    <Link href="/monitoring">
                        <IoIosArrowDropleftCircle className="sm:h-10 sm:w-10 h-5 w-5 sm:ml-3 ml-1" />
                    </Link>
                </div>
            </div>
            <div className="sm:ml-5 ml-3 w-full ">
                <div className="bg-[#056AAA] rounded-t-2xl h-[65px] flex">
                    <h1 className="font-bold text-white text-4xl pl-11 pt-3">Mingguan</h1>
                </div>
                <div className="bg-white rounded-b-2xl h-auto">
                    <div className="container mx-auto py-3 gap-1">
                            <Menu
                                title="Januari 2024"
                                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut neque vitae diam maximus interdum. Aenean ultrices eget neque eget pharetra. Suspendisse ullamcorper massa tincidunt nulla dictum, a dapibus ex hendrerit. Vivamus efficitur nulla at nibh eleifend consequat. Aliquam sodales lectus vitae lacus ultrices, non porttitor turpis facilisis."
                            />
                            <Menu
                                title="Februari 2024"
                                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut neque vitae diam maximus interdum. Aenean ultrices eget neque eget pharetra. Suspendisse ullamcorper massa tincidunt nulla dictum, a dapibus ex hendrerit. Vivamus efficitur nulla at nibh eleifend consequat. Aliquam sodales lectus vitae lacus ultrices, non porttitor turpis facilisis."
                            />
                            <Menu
                                title="Maret 2024"
                                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut neque vitae diam maximus interdum. Aenean ultrices eget neque eget pharetra. Suspendisse ullamcorper massa tincidunt nulla dictum, a dapibus ex hendrerit. Vivamus efficitur nulla at nibh eleifend consequat. Aliquam sodales lectus vitae lacus ultrices, non porttitor turpis facilisis."
                            />
                            <Menu
                                title="April 2024"
                                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut neque vitae diam maximus interdum. Aenean ultrices eget neque eget pharetra. Suspendisse ullamcorper massa tincidunt nulla dictum, a dapibus ex hendrerit. Vivamus efficitur nulla at nibh eleifend consequat. Aliquam sodales lectus vitae lacus ultrices, non porttitor turpis facilisis."
                            />
                            <Menu
                                title="Mei 2024"
                                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut neque vitae diam maximus interdum. Aenean ultrices eget neque eget pharetra. Suspendisse ullamcorper massa tincidunt nulla dictum, a dapibus ex hendrerit. Vivamus efficitur nulla at nibh eleifend consequat. Aliquam sodales lectus vitae lacus ultrices, non porttitor turpis facilisis."
                            />
                            <Menu
                                title="Juni 2024"
                                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut neque vitae diam maximus interdum. Aenean ultrices eget neque eget pharetra. Suspendisse ullamcorper massa tincidunt nulla dictum, a dapibus ex hendrerit. Vivamus efficitur nulla at nibh eleifend consequat. Aliquam sodales lectus vitae lacus ultrices, non porttitor turpis facilisis."
                            />
                            <Menu
                                title="Juli 2024"
                                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut neque vitae diam maximus interdum. Aenean ultrices eget neque eget pharetra. Suspendisse ullamcorper massa tincidunt nulla dictum, a dapibus ex hendrerit. Vivamus efficitur nulla at nibh eleifend consequat. Aliquam sodales lectus vitae lacus ultrices, non porttitor turpis facilisis."
                            />
                            <Menu
                                title="Agustus 2024"
                                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut neque vitae diam maximus interdum. Aenean ultrices eget neque eget pharetra. Suspendisse ullamcorper massa tincidunt nulla dictum, a dapibus ex hendrerit. Vivamus efficitur nulla at nibh eleifend consequat. Aliquam sodales lectus vitae lacus ultrices, non porttitor turpis facilisis."
                            />
                            <Menu
                                title="September 2024"
                                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut neque vitae diam maximus interdum. Aenean ultrices eget neque eget pharetra. Suspendisse ullamcorper massa tincidunt nulla dictum, a dapibus ex hendrerit. Vivamus efficitur nulla at nibh eleifend consequat. Aliquam sodales lectus vitae lacus ultrices, non porttitor turpis facilisis."
                            />
                            <Menu
                                title="Oktober 2024"
                                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut neque vitae diam maximus interdum. Aenean ultrices eget neque eget pharetra. Suspendisse ullamcorper massa tincidunt nulla dictum, a dapibus ex hendrerit. Vivamus efficitur nulla at nibh eleifend consequat. Aliquam sodales lectus vitae lacus ultrices, non porttitor turpis facilisis."
                            />
                            <Menu
                                title="November 2024"
                                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut neque vitae diam maximus interdum. Aenean ultrices eget neque eget pharetra. Suspendisse ullamcorper massa tincidunt nulla dictum, a dapibus ex hendrerit. Vivamus efficitur nulla at nibh eleifend consequat. Aliquam sodales lectus vitae lacus ultrices, non porttitor turpis facilisis."
                            />
                            <Menu
                                title="Desember 2024"
                                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut neque vitae diam maximus interdum. Aenean ultrices eget neque eget pharetra. Suspendisse ullamcorper massa tincidunt nulla dictum, a dapibus ex hendrerit. Vivamus efficitur nulla at nibh eleifend consequat. Aliquam sodales lectus vitae lacus ultrices, non porttitor turpis facilisis."
                            />
                    </div>

                </div>
            </div>
        </div>

    );
};

export default page;

