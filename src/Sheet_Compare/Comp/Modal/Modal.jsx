import React from "react";
import "./Modal.css";
import { SheetCompareStore } from "../../../../Store/Store";
import LoadingSpinner from "../LoadingSpinner/Spinner";
import SortFinishedTable from "../Sort/SortFinishedTable";

export default function Modal() {
  const data = SheetCompareStore((state) => state.data);
  const { newData, oldData, newFileName, oldFileName, oldColumnCompare, newColumnCompare, sortedby, sortedOrder } = data;
  const SortedBy = SheetCompareStore((state) => state.data.sortedby);
  const SortedOrder = SheetCompareStore((state) => state.data.sortedOrder);
  const fileName = SheetCompareStore((state) => state.data.newFileName);

  const [loading, setLoading] = React.useState(false);
  const rowsNewData = Array.from(new Set(Object.keys(newData).map((key) => key.match(/\d+/)[0])));
  const columnsNewData = Array.from(new Set(Object.keys(newData).map((key) => key.match(/[A-Z]+/)[0])));
  const rowsOldData = Array.from(new Set(Object.keys(oldData).map((key) => key.match(/\d+/)[0])));
  const columnsOldData = Array.from(new Set(Object.keys(oldData).map((key) => key.match(/[A-Z]+/)[0])));

  console.log(sortedOrder, sortedby);

  const [reload, setReload] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(-1);

  React.useEffect(() => {
    setReload(!reload);
  }, [sortedOrder, sortedby]);

  function hasConsecutiveEqualValues(obj) {
    const keys = Object.keys(obj).filter((key) => key !== "index" && key !== "Changed?");

    // keys.sort((a, b) => a - b);

    let ChangeFound = false;

    for (let i = 0; i < keys.length - 1; i = i + 2) {
      if (obj[keys[i]] === obj[keys[i + 1]]) {
        continue;
      } else {
        ChangeFound = true;
        break;
      }
    }
    return ChangeFound;
  }

  const combineData = () => {
    let testingOrderInNewData = [];
    let inOldNotNew = [];
    let inNewNotOld = [];
    let newDataCopy = Object.keys(JSON.parse(JSON.stringify(newData))).filter((item) => item.includes(newColumnCompare));
    let oldDataCopy = Object.keys(JSON.parse(JSON.stringify(oldData))).filter((item) => item.includes(oldColumnCompare));

    oldDataCopy.forEach((key) => {
      let found = false;
      for (let index = 0; index < newDataCopy.length; index++) {
        let item = newDataCopy[index];
        if (oldData[key] === newData[item]) {
          testingOrderInNewData.push(item.replace(/[a-zA-Z]/g, ""));
          newDataCopy.splice(index, 1);
          found = true;
          break;
        }
      }
      if (!found) {
        inOldNotNew.push(key);
      }
    });
    inNewNotOld = newDataCopy;

    let combinedTableData = [];
    rowsOldData.forEach((row, rowIndex) => {
      const fillObject = {};
      columnsOldData.forEach((col, colIndex) => {
        fillObject[`${oldData[`${col}1`]}`] = oldData[`${col}${rowIndex + 1}`];
        fillObject[`${newData[`${col}1`]} (new)`] = newData[`${col}${testingOrderInNewData[rowIndex]}`];
      });
      fillObject["index"] = rowIndex;
      fillObject["Changed?"] = hasConsecutiveEqualValues(fillObject);
      combinedTableData.push(fillObject);
    });
    return combinedTableData;
  };

  const [tableData, setTableData] = React.useState(combineData());

  React.useEffect(() => {
    const newTableData = combineData();
    setTableData(newTableData);
  }, [newData, oldData, newColumnCompare, oldColumnCompare, sortedOrder, sortedby]);

  function handleSelectedRow(index) {
    if (index === selectedRow) {
      setSelectedRow(-1);
    }
    setSelectedRow(index);
  }

  return (
    <div id="ProcessModal" className="modal">
      <div className="modal-content">
        <div className="flex flex-col justify-start items-center h-full pt-5">
          <div className="flex flex-row justify-between items-center pb-5 w-[90%]">
            <div className="flex flex-row gap-5">
              <button
                className="bg-orange-400 hover:bg-orange-300 h-[3rem] text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  const table = document.getElementById("ChangedTable");
                  const rows = Array.from(table.querySelectorAll("tr"));
                  const csv = rows
                    .map((row) => {
                      const columns = row.querySelectorAll("td");
                      return Array.from(columns)
                        .map((column) => column.innerText)
                        .join(",");
                    })
                    .join("\n");
                  const blob = new Blob([csv], { type: "text/csv" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.setAttribute("href", url);
                  a.setAttribute("download", `Model_${fileName.length > 18 ? fileName.substring(0, 18) : fileName}.csv`);
                  a.click();
                }}
              >
                Export
              </button>
              <SortFinishedTable />
            </div>
            <span className="close" onClick={() => (document.getElementById("ProcessModal").style.display = "none")}>
              &times;
            </span>
          </div>
          <div className="w-[90%] h-full items-center gap-3 overflow-auto">
            {tableData.length > 0 ? (
              <table className="border-2 mb-10" id="ChangedTable">
                <tbody>
                  <tr>
                    <td className="font-bold border-2 px-1 w-auto text-nowrap ">Changed?</td>
                    {Object.keys(tableData[0]).map((key, index) => {
                      if (key === "index") return null;
                      if (key === "Changed?") return null;
                      return (
                        <td className="font-bold border-2 px-1 w-auto text-nowrap " key={index}>
                          {key}
                        </td>
                      );
                    })}
                  </tr>
                  {tableData
                    .sort((a, b) => {
                      if (SortedOrder === 0) {
                        return a["index"] - b["index"];
                      }
                      const aValue = a[SortedBy];
                      const bValue = b[SortedBy];

                      if (SortedBy === "accuracyOne") {
                        if (SortedOrder === 1) {
                          return parseFloat(bValue) - parseFloat(aValue);
                        } else if (SortedOrder === -1) {
                          return parseFloat(aValue) - parseFloat(bValue);
                        }
                      }

                      if (typeof aValue === "string" && typeof bValue === "string") {
                        if (SortedOrder === 1) {
                          return bValue.localeCompare(String(aValue));
                        } else if (SortedOrder === -1) {
                          return aValue.localeCompare(String(bValue));
                        }
                      }
                      if (typeof aValue === "number" && typeof bValue === "number") {
                        if (SortedOrder === 1) {
                          return bValue - aValue;
                        } else if (SortedOrder === -1) {
                          return aValue - bValue;
                        }
                      }
                      if (typeof aValue === "boolean" && typeof bValue === "boolean") {
                        if (SortedOrder === 1) {
                          return bValue - aValue;
                        } else if (SortedOrder === -1) {
                          return aValue - bValue;
                        }
                      }
                      return 0;
                    })
                    .map((row, rowIndex) => {
                      if (row["index"] === 0) return null;
                      return (
                        <tr key={rowIndex}>
                          <td
                            className={`border-2 text-nowrap px-2 h-[1.5rem] ${selectedRow === rowIndex ? "bg-slate-300" : ""}`}
                            onClick={() => handleSelectedRow(rowIndex)}
                          >
                            {row["Changed?"] ? "Altered" : ""}
                          </td>
                          {Object.keys(row).map((key, cellIndex) => {
                            if (key === "index") return null;
                            return (
                              <td
                                id="CheckCell"
                                className={`border-2 text-nowrap px-2 h-[1.5rem] ${selectedRow === rowIndex ? "bg-slate-300" : ""}`}
                                key={cellIndex}
                                onClick={() => handleSelectedRow(rowIndex)}
                              >
                                {cellIndex % 2 === 0
                                  ? row[key]
                                  : (() => {
                                      const priorKey = Object.keys(row)[cellIndex - 1];
                                      if (row[priorKey] === row[key]) {
                                        return "";
                                      } else {
                                        return row[key];
                                      }
                                    })()}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            ) : null}
          </div>
        </div>
        {loading ? <LoadingSpinner /> : null}
      </div>
    </div>
  );
}
