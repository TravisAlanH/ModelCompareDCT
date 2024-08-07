import React from "react";

export default function SettingColumnsButtonMessage() {
  return (
    <div className="flex flex-row gap-2 pt-2 items-center">
      <div>
        <p className="font-bold">Use below to set the columns for duplicate comparisons</p>
      </div>
      <div>
        <button
          className="bg-orange-400 text-white font-bold rounded-full h-[2rem] w-[2rem] text-xl"
          onClick={() => {
            document.getElementById("SOPModalCompare").style.display = "block";
          }}
        >
          ?
        </button>
      </div>
    </div>
  );
}
