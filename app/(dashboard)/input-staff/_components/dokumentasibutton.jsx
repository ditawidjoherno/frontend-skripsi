import React from 'react';

const DocumentationButton = (text) => {
    const documentationUrl = "https://example.com/documentation";

    return (
        <div className='sm:px-10 pt-3'>
            <a href={documentationUrl} target="_blank" rel="noopener noreferrer">
                <h1 className='text-black text-[20px] font-medium mb-1'>Dokumentasi</h1>
                <button className="bg-[#D9D9D9] hover:bg-[#d0cccc] border border-black shadow-md text-black font-normal px-4 rounded ">
                    Choose File
                </button>
            </a>
        </div>
    );
};

export default DocumentationButton;