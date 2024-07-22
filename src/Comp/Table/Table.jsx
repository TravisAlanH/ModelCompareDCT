import React from "react";
import { originDataStore, CompareColumnStore } from "../../../Store/Store";
import { CurrentStepStore } from "../../../Store/Store";

export default function Table() {
  const data = originDataStore((state) => state.data.originData);
  const compareColumn = CompareColumnStore((state) => state.data.CompareColumn);
  const setCompareColumn = CompareColumnStore((state) => state.setCompareColumn);
  const removeCompareColumn = CompareColumnStore((state) => state.resetCompareColumn);
  const rows = Array.from(new Set(Object.keys(data).map((key) => key.match(/\d+/)[0])));
  const columns = Array.from(new Set(Object.keys(data).map((key) => key.match(/[A-Z]+/)[0])));
  const setCurrentStep = CurrentStepStore((state) => state.setCurrentStep);

  console.log(compareColumn);

  return (
    <div className="w-full h-1/2 overflow-auto">
      <table className="border-2 mb-10">
        <thead className="border-2">
          <tr className="border-2">
            {columns.map((col) => (
              <th key={col} className="border-2">
                <button
                  className="w-full h-full bg-orange-400 rounded-md"
                  onClick={() => {
                    if (compareColumn === col) {
                      setCurrentStep(2);
                      removeCompareColumn();
                    } else {
                      setCurrentStep(3);
                      setCompareColumn(col);
                    }
                  }}
                >
                  {col}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row}>
              {columns.map((col) => {
                return (
                  <td key={col + row} className={`border-2 text-nowrap px-2 ${compareColumn === col.toString() ? "bg-gray-300" : ""}`}>
                    {String(data[col + row]).length > 20 ? String(data[col + row]).substring(0, 20) + "..." : data[col + row]}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
