import React from "react";
import { SheetCompareStore } from "../../../../Store/Store";
import OldTableNav from "../Inputs/OldTableNav";

export default function OldTable() {
  const data = SheetCompareStore((state) => state.data.oldData);
  const compareColumn = SheetCompareStore((state) => state.data.oldColumnCompare);
  const setCompareColumn = SheetCompareStore((state) => state.setOldColumnCompare);
  const removeCompareColumn = SheetCompareStore((state) => state.removeOldColumnCompare);
  const rows = Array.from(new Set(Object.keys(data).map((key) => key.match(/\d+/)[0])));
  const columns = Array.from(new Set(Object.keys(data).map((key) => key.match(/[A-Z]+/)[0])));
  const showColumns = SheetCompareStore((state) => state.data.oldVisableTableShow);
  // const setCurrentStep = SheetCompareStore((state) => state.setCurrentStep);

  return (
    <div className="w-full overflow-auto flex flex-col">
      <div className="py-2">{columns.length > 0 ? <OldTableNav columns={columns} /> : null}</div>

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
