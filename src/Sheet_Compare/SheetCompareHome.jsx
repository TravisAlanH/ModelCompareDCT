import React from "react";
import Header from "./Comp/Header/Header";
import Footer from "./Comp/Footer/Footer";
import ExcelInputOld from "./Comp/Inputs/ExcelInputOld";
import OldTable from "./Comp/Table/OldTable";
import ExcelInputNew from "./Comp/Inputs/ExcelInputNew";
import NewTable from "./Comp/Table/NewTable";
import { SheetCompareStore } from "../../Store/Store";
import Modal from "./Comp/Modal/Modal";
import SOP from "./Comp/SOP/SOP";
import SOPButton from "./Comp/Buttons/SOPButton";
import SOPModal from "./Comp/Modal/SOPModal";

export default function SheetCompareHome({ setViewPage }) {
  // Destructure the state from SheetCompareStore to ensure consistent Hook usage
  const { data } = SheetCompareStore((state) => state);
  const { oldFileName, newFileName, oldColumnCompare, newColumnCompare, Begin } = data;
  const { setBegin } = SheetCompareStore((state) => state);

  // Check conditions based on the destructured state
  const isAnyFileNameEmpty = !oldFileName || !newFileName;
  const isColumnEmpty = !oldColumnCompare || !newColumnCompare;

  return (
    <div>
      <Header setViewPage={setViewPage} />
      {Begin ? <SOPButton /> : null}
      <div className="flex flex-col items-center gap-3">
        {/* <div className="p-3 flex flex-col justify-center items-center">
          <p className="text-xl font-bold">{`Compare two Excel Sheets => Output: Compareison Data`}</p>
          <p className="text-xl font-bold">BUILD IN PROGRESS...</p>
          <p className="font-bold">*** Click Sunbird Logo to go Home ***</p>
        </div> */}
        <div id="Actions" className="flex flex-row gap-5 pt-5">
          <button
            className={` px-3 flex flex-row items-center rounded-md font-bold h-[3rem] ${isAnyFileNameEmpty ? "bg-orange-400 text-white" : "bg-gray-200"}`}
            disabled={Begin}
            onClick={() => setBegin(true)}
          >
            {!Begin ? "Sheet Compare" : "Open Files Below"}
          </button>
          <button
            disabled={true}
            className={` px-3 flex flex-row items-center rounded-md font-bold h-[3rem] ${
              isAnyFileNameEmpty ? "bg-gray-200" : isColumnEmpty ? "bg-orange-400 text-white" : "bg-gray-200"
            }`}
          >
            Select Truth Colums
          </button>
          <button
            onClick={() => {
              document.getElementById("ProcessModal").style.display = "block";
            }}
            disabled={isAnyFileNameEmpty || isColumnEmpty}
            className={` px-3 flex flex-row items-center rounded-md font-bold h-[3rem] ${!isColumnEmpty ? "bg-orange-400 text-white" : "bg-gray-200"}`}
          >
            Open Process
          </button>
        </div>
        {Begin ? (
          <div className="flex flex-row w-full justify-center gap-4">
            <div className="flex flex-col border-2 w-[40%] h-[40rem]">
              <div className="p-2">
                <ExcelInputOld />
              </div>
              <OldTable />
            </div>
            <div className="flex flex-col border-2 w-[40%] h-[40rem]">
              <div className="p-2">
                <ExcelInputNew />
              </div>
              <NewTable />
            </div>
          </div>
        ) : (
          <SOP />
        )}
      </div>
      {isAnyFileNameEmpty ? null : <Modal />}
      <SOPModal />
      <Footer />
    </div>
  );
}
