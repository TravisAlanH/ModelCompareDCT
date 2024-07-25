import React from "react";
import Header from "./Comp/Header/Header";
import Footer from "./Comp/Footer/Footer";
import ExcelInputOld from "./Comp/Inputs/ExcelInputOld";
import OldTable from "./Comp/Table/OldTable";
import ExcelInputNew from "./Comp/Inputs/ExcelInputNew";
import NewTable from "./Comp/Table/NewTable";

export default function SheetCompareHome({ setViewPage }) {
  return (
    <div>
      <Header setViewPage={setViewPage} />

      <div className="p-3 flex flex-col justify-center items-center">
        <p className="text-xl font-bold">{`Compare two Excel Sheets => Output: Compareison Data`}</p>
        <p className="text-xl font-bold">BUILD IN PROGRESS...</p>
        <p className="font-bold">*** Click Sunbird Logo to go Home ***</p>
      </div>
      <div className="flex flex-row w-full justify-center gap-4">
        <div className="flex flex-col border-2 w-[40%] h-[30rem]">
          <ExcelInputOld />
          <OldTable />
        </div>
        <div className="flex flex-col border-2 w-[40%]">
          <ExcelInputNew />
          <NewTable />
        </div>
      </div>

      <Footer />
    </div>
  );
}
