import React from "react";
import * as XLSX from "xlsx";
import { newDataStore } from "../../../Store/Store";

export default function ExcelInputNew() {
  const setNewData = newDataStore((state) => state.setNewData);
  const removeNewData = newDataStore((state) => state.removeNewData);
  const newData = newDataStore((state) => state.data.newData);

  console.log("New Data: ", newData);

  const handleFile = (e) => {
    const file = e.target.files[0];

    if (file) {
      console.log(file);
      const reader = new FileReader();

      reader.onload = (event) => {
        const arrayBuffer = event.target.result;
        const workbook = XLSX.read(new Uint8Array(arrayBuffer), { type: "array" });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const sheetData = XLSX.utils.sheet_to_json(worksheet);
        let FormattedData = {};
        Object.keys(worksheet)
          .filter((item) => !item.includes("!"))
          .forEach((key) => {
            FormattedData[key] = worksheet[key].v;
          });
        setNewData(FormattedData);
      };

      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div>
      <input id="NewInput" type="file" accept=".xlsx" onChange={handleFile} />
      <button
        className="border-2 border-black rounded-md p-1"
        onClick={() => {
          removeNewData();
          document.getElementById("NewInput").value = "";
        }}
      >
        Clear Data
      </button>
    </div>
  );
}
