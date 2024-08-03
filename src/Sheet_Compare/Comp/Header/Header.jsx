import React from "react";
import Logo from "../../../Assets/Logo.png";
import { FaHome } from "react-icons/fa";

export default function Header({ setViewPage }) {
  return (
    <div className="w-[full] h-[3.5rem] bg-[#000000dc] flex flex-row items-center justify-between px-4">
      <img src={Logo} className="h-[2.8rem] hover:cursor-pointer" onClick={() => setViewPage(0)} />
      <div className="flex flex-row gap-5 justify-center items-center">
        <p className="text-white font-bold">Sheet Compare</p>
        <FaHome className="text-white hover:cursor-pointer text-2xl" onClick={() => setViewPage(0)} />
      </div>
    </div>
  );
}
