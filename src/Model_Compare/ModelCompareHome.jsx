import React from "react";
// import { CompareColumnStore, CurrentStepStore, FileNameStore } from "../../Store/Store";
import { ModelCompareStore } from "../../Store/Store";
import Header from "./Comp/Header/Header";
import SOPButton from "./Comp/Buttons/SOPButton";
import ExcelInputOrigin from "./Comp/Inputs/ExcelInputOrigin";
import Table from "./Comp/Table/Table";
import SOP from "./SOP/SOP";
import Modal from "./Comp/Modal/Modal";
import SOPModal from "./Comp/Modal/SOPModal";
import Footer from "./Comp/Footer/Footer";

export default function ModelCompareHome({ setViewPage }) {
  const setCurrentStep = ModelCompareStore((state) => state.setCurrentStep);
  const fileName = ModelCompareStore((state) => state.data.FileName);
  const SelectedColumn = ModelCompareStore((state) => state.data.CompareColumn);

  return (
    <>
      <Header setViewPage={setViewPage} />
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
                className={`px-3 h-[3rem] flex flex-row items-center rounded-md font-bold ${SelectedColumn != "" ? "bg-orange-400 text-white" : "bg-gray-200"}`}
                disabled={SelectedColumn == "" ? true : false}
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
        <div className="px-5 flex flex-row justify-center w-[80%] h-[40-rem] border-2">
          <Table />
        </div>
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
