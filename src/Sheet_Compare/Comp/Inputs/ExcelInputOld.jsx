import React from "react";
import * as XLSX from "xlsx";
// import { originDataStore } from "../../../../Store/Store";
// import { FileNameStore } from "../../../../Store/Store";
// import { CompareColumnStore } from "../../../../Store/Store";
// import { CurrentStepStore } from "../../../../Store/Store";
import { SheetCompareStore } from "../../../../Store/Store";
import LoadingSpinner from "../LoadingSpinner/Spinner";

export default function ExcelInputOld() {
  const setOriginData = SheetCompareStore((state) => state.setOldData);
  const removeOriginData = SheetCompareStore((state) => state.removeOldData);
  const setFileName = SheetCompareStore((state) => state.setOldFileName);
  const fileName = SheetCompareStore((state) => state.data.oldFileName);
  const removeFileName = SheetCompareStore((state) => state.removeOldFileName);
  const [loading, setLoading] = React.useState(false);
  const removeCompareColumn = SheetCompareStore((state) => state.removeOldColumnCompare);
  const setShowColumns = SheetCompareStore((state) => state.setOldVisableTableShow);
  // const setCurrentStep = SheetCompareStore((state) => state.setCurrentStep);

  //const originData = originDataStore((state) => state.data.originData);

  const handleFile = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFileName(file.name);
      const reader = new FileReader();

      reader.onload = (event) => {
        const arrayBuffer = event.target.result;
        const workbook = XLSX.read(new Uint8Array(arrayBuffer), { type: "array" });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const sheetData = XLSX.utils.sheet_to_json(worksheet);
        console.log(worksheet);
        let FormattedData = {};
        Object.keys(worksheet)
          .filter((item) => !item.includes("!"))
          .forEach((key) => {
            FormattedData[key] = worksheet[key].v;
          });
        console.log(FormattedData);
        setOriginData(FormattedData);
      };

      reader.readAsArrayBuffer(file);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-row justify-between h-[3rem]">
      <div className="flex flex-row gap-5">
        {fileName != "" ? (
          <div>
            <button
              className="border-2 border-black rounded-md h-[3rem] px-3 flex flex-row items-center"
              onClick={() => {
                // setCurrentStep(1);
                removeOriginData();
                removeFileName();
                removeCompareColumn();
                document.getElementById("OriginInput").value = "";
                setShowColumns(0);
              }}
            >
              Clear Old File
            </button>
          </div>
        ) : null}
        <div>
          <button
            onClick={() => {
              // setCurrentStep(2);
              document.getElementById("OriginInput").click();
            }}
            disabled={fileName != "" ? true : false}
            className={` px-3 flex flex-row items-center rounded-md font-bold h-[3rem] ${fileName == "" ? "bg-orange-400 text-white" : "bg-gray-200"}`}
          >
            Open Old File
          </button>
          <input
            id="OriginInput"
            type="file"
            accept=".xlsx"
            className="hidden"
            onChange={(e) => {
              setLoading(true);
              setTimeout(() => {
                handleFile(e);
              }, 1000);
            }}
          />
        </div>
      </div>
      <div className="pl-5 flex flex-col justify-center pr-5">{fileName != "" ? <p className="text-md font-bold">{fileName}</p> : null}</div>
      {loading ? <LoadingSpinner /> : null}
    </div>
  );
}
