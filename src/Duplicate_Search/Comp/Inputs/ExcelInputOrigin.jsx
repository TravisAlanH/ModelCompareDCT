import React from "react";
import * as XLSX from "xlsx";
// import { originDataStore } from "../../../../Store/Store";
// import { FileNameStore } from "../../../../Store/Store";
// import { CompareColumnStore } from "../../../../Store/Store";
// import { CurrentStepStore } from "../../../../Store/Store";
import { DuplicateSearchStore } from "../../../../Store/Store";
import LoadingSpinner from "../LoadingSpinner/Spinner";

export default function ExcelInputOrigin() {
  const setOriginData = DuplicateSearchStore((state) => state.setOriginData);
  const removeOriginData = DuplicateSearchStore((state) => state.removeOriginData);
  const setFileName = DuplicateSearchStore((state) => state.setFileName);
  const fileName = DuplicateSearchStore((state) => state.data.FileName);
  const removeFileName = DuplicateSearchStore((state) => state.removeFileName);
  const [loading, setLoading] = React.useState(false);
  // const removeCompareColumn = DuplicateSearchStore((state) => state.resetCompareColumn);

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
    <div className="flex flex-row gap-5 h-[3rem]">
      {fileName != "" ? (
        <div>
          <button
            className="border-2 border-black rounded-md h-[3rem] px-3 flex flex-row items-center"
            onClick={() => {
              removeOriginData();
              removeFileName();
              // removeCompareColumn();
              document.getElementById("OriginInput").value = "";
            }}
          >
            Clear File
          </button>
        </div>
      ) : null}
      <div>
        <button
          onClick={() => {
            document.getElementById("OriginInput").click();
          }}
          disabled={fileName != "" ? true : false}
          className={` px-3 flex flex-row items-center rounded-md font-bold h-full ${fileName == "" ? "bg-orange-400 text-white" : "bg-gray-200"}`}
        >
          Open File
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
      {loading ? <LoadingSpinner /> : null}
    </div>
  );
}
