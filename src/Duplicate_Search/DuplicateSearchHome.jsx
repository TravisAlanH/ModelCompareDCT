import React from "react";
// import { CompareColumnStore, CurrentStepStore, FileNameStore } from "../../Store/Store";
import { DuplicateSearchStore } from "../../Store/Store";
import Header from "./Comp/Header/Header";
import SOPButton from "./Comp/Buttons/SOPButton";
import ExcelInputOrigin from "./Comp/Inputs/ExcelInputOrigin";
import Table from "./Comp/Table/Table";
import SOP from "./SOP/SOP";
import Modal from "./Comp/Modal/Modal";
import SOPModal from "./Comp/Modal/SOPModal";
import Footer from "./Comp/Footer/Footer";

export default function ModelCompareHome({ setViewPage }) {
  const setCurrentStep = DuplicateSearchStore((state) => state.setCurrentStep);
  const fileName = DuplicateSearchStore((state) => state.data.FileName);
  const SelectedColumn = DuplicateSearchStore((state) => state.data.CompareColumn);

  const { CompareStartOne, CompareEndOne, CompareEndTwo } = DuplicateSearchStore((state) => state.data);

  const [OpenProcessTrue, setOpenProcessTrue] = React.useState(false);

  React.useEffect(() => {
    if (CompareStartOne != "") {
      setOpenProcessTrue(false);
    } else {
      setOpenProcessTrue(true);
    }
  });

  return (
    <>
      <Header setViewPage={setViewPage} />
      <div className="p-3 flex flex-col justify-center items-center">
        <p className="text-xl font-bold">{`Duplicate Seaching => Output: Origin Data with new Duplicate Column`}</p>
        <p className="text-xl font-bold">{`Multiple Column Searching (ie: Name and Port vs Name and Port)`}</p>
        <p className="text-xl font-bold">BUILD IN PROGRESS...</p>
        <p className="font-bold">{`*** Click Sunbird Logo or Home (Upper right) to go Home ***`}</p>
      </div>
      {fileName != "" ? <SOPButton /> : null}
      <div className="flex flex-col w-full items-center">
        <div className="flex flex-row justify-center gap-5 py-2">
          <ExcelInputOrigin />
          <div className="flex flex-row gap-5 justify-center">
            <div
              className={`px-3 flex flex-row items-center rounded-md font-bold ${
                fileName == "" ? "bg-gray-200" : SelectedColumn != "" ? "bg-gray-200" : "bg-orange-400 text-white"
              }`}
            >
              <p>Select The Model Column Below</p>
            </div>
            <div>
              <button
                className={`px-3 h-[3rem] flex flex-row items-center rounded-md font-bold ${!OpenProcessTrue ? "bg-orange-400 text-white" : "bg-gray-200"}`}
                disabled={OpenProcessTrue}
                onClick={() => {
                  setCurrentStep(4);
                  document.getElementById("ProcessModal").style.display = "block";
                }}
              >
                Open Process
              </button>
            </div>
          </div>
        </div>
        {fileName != "" ? (
          <div className="px-5 flex flex-row justify-center w-[80%] h-[40-rem] border-2">
            <Table />
          </div>
        ) : null}
        {fileName == "" ? (
          <div className="flex flex-row justify-center pt-5">
            <SOP />
          </div>
        ) : null}
        <Modal />
        <SOPModal />

        <Footer />
      </div>
    </>
  );
}
