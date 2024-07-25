import React from "react";
import Logo from "../../../Assets/Logo.png";
import { ModelCompareStore } from "../../../../Store/Store";

export default function Header({ setViewPage }) {
  const fileName = ModelCompareStore((state) => state.data.FileName);
  return (
    <div className="w-[full] h-[3.5rem] bg-[#000000dc] flex flex-row items-center justify-between px-4">
      <img src={Logo} className="h-[2.8rem] hover:cursor-pointer" onClick={() => setViewPage(0)} />
      {fileName == "" ? <p className="text-white">Select a File</p> : <p className="text-white">{fileName}</p>}
    </div>
  );
}
