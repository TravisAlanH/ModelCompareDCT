import React from "react";
import Header from "./Header/Header";

export default function SheetCompareHome({ setViewPage }) {
  return (
    <div>
      <Header setViewPage={setViewPage} />

      <div className="p-3 flex flex-col justify-center items-center">
        <p className="text-xl font-bold">{`Compare two Excel Sheets => Output: Compareison Data`}</p>
        <p className="text-xl font-bold">BUILD IN PROGRESS...</p>
        <p className="font-bold">*** Click Sunbird Logo to go Home ***</p>
      </div>
    </div>
  );
}
