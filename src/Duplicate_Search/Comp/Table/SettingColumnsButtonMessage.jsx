import React from "react";

export default function SettingColumnsButtonMessage() {
  return (
    <div className="flex flex-row gap-2 pt-2 items-center">
      <div>
        <p className="font-bold">Use below to set the columns for duplicate comparisons</p>
      </div>
      <div>
        <button
          className="bg-gray-200 font-bold rounded-full h-[2rem] w-[2rem] text-xl"
          onClick={() => {
            document.getElementById("SOPDuplicateColumnSelection").style.display = "block";
          }}
        >
          ?
        </button>
      </div>
    </div>
  );
}
