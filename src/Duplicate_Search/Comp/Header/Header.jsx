import React from "react";
import Logo from "../../../Assets/Logo.png";
import { DuplicateSearchStore } from "../../../../Store/Store";
import { FaHome } from "react-icons/fa";

export default function Header({ setViewPage }) {
  const fileName = DuplicateSearchStore((state) => state.data.FileName);
  return (
    <div className="w-[full] h-[3.5rem] bg-[#000000dc] flex flex-row items-center justify-between px-4">
      <img src={Logo} className="h-[2.8rem] hover:cursor-pointer" onClick={() => setViewPage(0)} />
      {fileName == "" ? <p className="text-white">Select a File</p> : <p className="text-white">{fileName}</p>}
      <div className="flex flex-row gap-5 justify-center items-center">
        <p className="text-white font-bold">Duplicate Search</p>
        <FaHome className="text-white hover:cursor-pointer text-2xl" onClick={() => setViewPage(0)} />
      </div>
    </div>
  );
}
