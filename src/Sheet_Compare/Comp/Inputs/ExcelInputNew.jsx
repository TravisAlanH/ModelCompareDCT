import React from "react";
import * as XLSX from "xlsx";
// import { originDataStore } from "../../../../Store/Store";
// import { FileNameStore } from "../../../../Store/Store";
// import { CompareColumnStore } from "../../../../Store/Store";
// import { CurrentStepStore } from "../../../../Store/Store";
import { SheetCompareStore } from "../../../../Store/Store";
import LoadingSpinner from "../LoadingSpinner/Spinner";

export default function ExcelInputNew() {
  const setNewData = SheetCompareStore((state) => state.setNewData);
  const removeNewData = SheetCompareStore((state) => state.removeNewData);
  const setNewFileName = SheetCompareStore((state) => state.setNewFileName);
  const fileNameNew = SheetCompareStore((state) => state.data.newFileName);
  const removeNewFileName = SheetCompareStore((state) => state.removeNewFileName);
  const [loading, setLoading] = React.useState(false);
  const removeNewCompareColumn = SheetCompareStore((state) => state.removeNewColumnCompare);
  const setShowColumns = SheetCompareStore((state) => state.setNewVisableTableShow);
  // const setCurrentStep = SheetCompareStore((state) => state.setCurrentStep);

  //const originData = originDataStore((state) => state.data.originData);

  const handleFile = (e) => {
    const file = e.target.files[0];

    if (file) {
      setNewFileName(file.name);
      const reader = new FileReader();

      reader.onload = (event) => {
        const arrayBuffer = event.target.result;
        const workbook = XLSX.read(new Uint8Array(arrayBuffer), { type: "array" });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        console.log(worksheet);
        let FormattedData = {};
        Object.keys(worksheet)
          .filter((item) => !item.includes("!"))
          .forEach((key) => {
            FormattedData[key] = worksheet[key].v;
          });
        console.log(FormattedData);
        setNewData(FormattedData);
      };

      reader.readAsArrayBuffer(file);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-row justify-between h-[3rem]">
      <div className="flex flex-row gap-5">
        {fileNameNew != "" ? (
          <div>
            <button
              className="border-2 border-black rounded-md h-[3rem] px-3 flex flex-row items-center"
              onClick={() => {
                // setCurrentStep(1);
                removeNewData();
                removeNewFileName();
                removeNewCompareColumn();
                setShowColumns(0);
                document.getElementById("OriginInput").value = "";
              }}
            >
              Clear New File
            </button>
          </div>
        ) : null}
        <div>
          <button
            onClick={() => {
              // setCurrentStep(2);
              document.getElementById("OriginInputNew").click();
            }}
            disabled={fileNameNew != "" ? true : false}
            className={` px-3 flex flex-row items-center rounded-md font-bold h-[3rem] ${fileNameNew == "" ? "bg-orange-400 text-white" : "bg-gray-200"}`}
          >
            Open New File
          </button>
          <input
            id="OriginInputNew"
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
      <div className="pl-5 flex flex-col justify-center pr-5">{fileNameNew != "" ? <p className="text-md font-bold">{fileNameNew}</p> : null}</div>
      {loading ? <LoadingSpinner /> : null}
    </div>
  );
}
