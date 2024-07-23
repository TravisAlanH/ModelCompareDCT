import React from "react";

export default function SOPButton() {
  return (
    <div className="flex flex-row justify-center items-center z-10 fixed right-[1rem] top-[3.8rem]">
      <button
        className="bg-orange-400 text-white font-bold rounded-full h-[2.5rem] w-[2.5rem] text-xl"
        onClick={() => {
          document.getElementById("SOPModal").style.display = "block";
        }}
      >
        ?
      </button>
    </div>
  );
}
