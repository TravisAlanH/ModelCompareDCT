import React from "react";
// import { originDataStore, CompareColumnStore } from "../../../../Store/Store";
import { SheetCompareStore } from "../../../../Store/Store";
import NewTableNav from "../Inputs/NewTableNav";
// import { CurrentStepStore } from "../../../../Store/Store";

export default function NewTable() {
  const data = SheetCompareStore((state) => state.data.newData);
  const compareColumn = SheetCompareStore((state) => state.data.newColumnCompare);
  const setCompareColumn = SheetCompareStore((state) => state.setNewColumnCompare);
  const removeCompareColumn = SheetCompareStore((state) => state.removeNewColumnCompare);
  const rows = Array.from(new Set(Object.keys(data).map((key) => key.match(/\d+/)[0])));
  const columns = Array.from(new Set(Object.keys(data).map((key) => key.match(/[A-Z]+/)[0])));
  const showColumns = SheetCompareStore((state) => state.data.newVisableTableShow);
  // const setCurrentStep = SheetCompareStore((state) => state.setCurrentStep);

  // console.log(compareColumn);

  return (
    <div className="w-full overflow-auto flex flex-col">
      <div className="py-2">{columns.length > 0 ? <NewTableNav columns={columns} /> : null}</div>
      <table className="border-2 mb-10">
        <thead className="border-2">
          <tr className="border-2">
            {columns.slice(showColumns, showColumns + 6).map((col) => (
              <th key={col} className="border-2">
                <button
                  className="w-full h-full bg-orange-400 rounded-md"
                  onClick={() => {
                    if (compareColumn === col) {
                      // setCurrentStep(2);
                      removeCompareColumn();
                    } else {
                      // setCurrentStep(3);
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
              {columns.slice(showColumns, showColumns + 6).map((col) => {
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
