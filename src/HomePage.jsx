import React from "react";
import Logo from "./Assets/Logo.png";

export default function HomePage({ setViewPage }) {
  return (
    <div>
      <div className="w-[full] h-[3.5rem] bg-[#000000dc] flex flex-row items-center justify-between px-4">
        <img src={Logo} className="h-[2.8rem]" />
      </div>
      <div className="p-3">
        <p className="text-xl font-bold">Tools List</p>
      </div>
      <div className="flex flex-row">
        <div className="px-3">
          <button className="bg-orange-400 hover:bg-[#f18c20bd] text-white font-bold py-2 px-4 rounded" onClick={() => setViewPage(1)}>
            Model Compare
          </button>
        </div>
        <div className="px-3">
          <button className="bg-orange-400 hover:bg-[#f18c20bd] text-white font-bold py-2 px-4 rounded" onClick={() => setViewPage(2)}>
            Sheet Compare
          </button>
        </div>
      </div>
    </div>
  );
}
