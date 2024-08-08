import React from "react";
import "./Modal.css";
// import { originDataStore } from "../../../../Store/Store";
// import { CompareColumnStore } from "../../../../Store/Store";
// import { FileNameStore } from "../../../../Store/Store";
// import { SortedStore } from "../../../../Store/Store";
import { DuplicateSearchStore } from "../../../../Store/Store";
// import { ModelMake } from "../../../Functions/LenenshteinDistance/MLT";
import SortFinishedTable from "../Sort/SortFinishedTable";
import LoadingSpinner from "../LoadingSpinner/Spinner";
// import findTopMatches from "../../../Functions/LenenshteinDistance/LenenshteinDistance";

export default function Modal() {
  const data = DuplicateSearchStore((state) => state.data.originData);
  const fileName = DuplicateSearchStore((state) => state.data.FileName);
  const compareColumn = DuplicateSearchStore((state) => state.data.CompareColumn);
  const [loading, setLoading] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const SortedBy = DuplicateSearchStore((state) => state.data.sortedby);
  const SortedOrder = DuplicateSearchStore((state) => state.data.sortedOrder);
  const [reload, setReload] = React.useState(false);

  React.useEffect(() => {
    setReload(!reload);
  }, [SortedOrder, SortedBy]);

  const columns = Array.from(new Set(Object.keys(data).map((key) => key.match(/[A-Z]+/)[0])));
  const rows = Array.from(new Set(Object.keys(data).map((key) => key.match(/\d+/)[0])));

  // const [tableData, setTableData] = React.useState(() => {
  //   let returnArray = [];
  //   const initObject = {};
  //   columns.map((col) => {
  //     initObject[data[`${col}1`]] = data[`${col}1`];
  //   });
  //   returnArray.push(initObject);
  //   console.log("Return Array", returnArray);
  //   return returnArray;
  // });

  const [tableData, setTableData] = React.useState([]);

  console.log("TableData", tableData);

  React.useEffect(() => {
    setTableData(() => {
      let returnArray = [];
      for (let index = 0; index < rows.length; index++) {
        // for (let index = 1; index < rows.length; index++) {
        let initObject = {};
        columns.map((col) => {
          initObject[data[`${col}1`]] = data[`${col}${rows[index]}`];
        });
        returnArray.push(initObject);
      }
      console.log(returnArray);
      return returnArray;
    });
  }, [data]);
  // }, [data, compareColumn]);

  // console.log("tableData", tableData);

  console.log("Table", tableData);

  async function ProcessData() {
    setLoading(true);
    for (let index = 0; index < tableData.length; index++) {
      await new Promise((resolve) => setTimeout(resolve, 0));
    }

    setLoading(false);
  }

  // console.log("tableData", tableData);

  return (
    <div id="ProcessModal" className="modal">
      <div className="modal-content flex flex-col">
        <div className="flex flex-row justify-between py-3">
          <div className="flex flex-row gap-5">
            <button
              className={`px-3 flex flex-row items-center rounded-md font-bold ${
                !tableData || tableData.length === 0 || !tableData[0].dctMakeOne ? "bg-orange-400 text-white" : "bg-gray-200"
              }`}
              onClick={() => {
                setLoading(true);
                setTimeout(() => {
                  ProcessData();
                }, 1000);
              }}
            >
              Begin Process
            </button>

            <button
              className={`px-3 flex flex-row items-center rounded-md font-bold ${
                !tableData || tableData.length === 0 || tableData[0].dctMakeOne ? "bg-orange-400 text-white" : "bg-gray-200"
              }`}
              onClick={() => {
                const table = document.getElementById("ProcessedTable");
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
          <span
            className="close"
            onClick={() => {
              document.getElementById("ProcessModal").style.display = "none";
            }}
          >
            &times;
          </span>
        </div>
        <div className="overflow-auto">
          <table id="ProcessedTable" className="">
            <tbody className="">
              <tr>
                {tableData.length > 0
                  ? Object.keys(tableData[0]).map((key, index) => {
                      return (
                        <td
                          key={index}
                          id="Header rows"
                          className={`border-2 px-1 w-auto text-nowrap bg-white sticky left-0 ${selectedRow === index ? "bg-gray-300" : ""}`}
                        >
                          {tableData[0][key]}
                        </td>
                      );
                    })
                  : null}
              </tr>
              {tableData.length > 0
                ? tableData
                    .sort((a, b) => {
                      if (SortedOrder === 0) {
                        return a.OrginOrder - b.OrginOrder;
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
                      return 0;
                    })
                    .map((row, index) => {
                      if (index === 0) {
                        return null;
                      }
                      return (
                        <tr
                          key={index}
                          className={`overflow-auto ${selectedRow === index ? "bg-gray-300" : ""}`}
                          onClick={() => {
                            if (selectedRow === index) {
                              setSelectedRow(null);
                            } else {
                              setSelectedRow(index);
                            }
                          }}
                        >
                          {Object.keys(row).map((key, index) => (
                            <td
                              key={index}
                              id="data rows"
                              className={`border-2 px-1 w-auto text-nowrap bg-white ${selectedRow === index ? "bg-gray-300" : ""}`}
                            >
                              {row[key]}
                            </td>
                          ))}
                        </tr>
                      );
                    })
                : null}
            </tbody>
          </table>
        </div>
      </div>
      {loading ? <LoadingSpinner /> : null}
    </div>
  );
}
