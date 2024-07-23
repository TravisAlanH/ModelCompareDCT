import React from "react";
import "./Modal.css";
import { originDataStore } from "../../../Store/Store";
import { CompareColumnStore } from "../../../Store/Store";
import { ModelMake } from "../../MLT";
import { FileNameStore } from "../../../Store/Store";
import LoadingSpinner from "../LoadingSpinner/Spinner";
import findTopMatches from "../../Functions/LenenshteinDistance";
import { startName } from "../../Functions/StartName";
import SortFinishedTable from "../Inputs/Sort/SortFinishedTable";
import { SortedStore } from "../../../Store/Store";

export default function Modal() {
  const data = originDataStore((state) => state.data.originData);
  const fileName = FileNameStore((state) => state.data.FileName);
  const compareColumn = CompareColumnStore((state) => state.data.CompareColumn);
  const [loading, setLoading] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const SortedBy = SortedStore((state) => state.data.sortedby);
  const SortedOrder = SortedStore((state) => state.data.sortedOrder);
  const [reload, setReload] = React.useState(false);

  React.useEffect(() => {
    setReload(!reload);
  }, [SortedOrder, SortedBy]);

  const [tableData, setTableData] = React.useState(
    Array.from(
      new Map(
        Object.keys(data)
          .filter((key) => key.includes(compareColumn))
          .map((key) => ({
            Model: data[key],
            dctModalOne: "",
            dctMakeOne: "",
            accuracyOne: "",
            dctModalTwo: "",
            dctMakeTwo: "",
            accuracyTwo: "",
            dctModalThree: "",
            dctMakeThree: "",
            accuracyThree: "",
          }))
          .map((item) => [item.Model, item]) // Convert each item to a key-value pair
      ).values() // Extract unique values from the Map
    )
  );

  React.useEffect(() => {
    setTableData(
      Array.from(
        new Map(
          Object.keys(data)
            .filter((key) => key.includes(compareColumn))
            .map((key) => ({
              Model: data[key],
              dctModalOne: "",
              dctMakeOne: "",
              accuracyOne: "",
              ObjectOne: "",
              dctModalTwo: "",
              dctMakeTwo: "",
              accuracyTwo: "",
              ObjectTwo: "",
              dctModalThree: "",
              dctMakeThree: "",
              accuracyThree: "",
              ObjectThree: "",
            }))
            .map((item) => [item.Model, item]) // Convert each item to a key-value pair
        ).values() // Extract unique values from the Map
      )
    );
  }, [data, compareColumn]);

  // console.log("tableData", tableData);

  function createModelStringArray() {
    let modelStringArray = [];
    Object.keys(ModelMake).forEach((key) => {
      modelStringArray.push(key);
    });
    return modelStringArray;
  }

  function fillMatches() {
    const ModelString = createModelStringArray();
    tableData.forEach((element, index) => {
      let topMatches = findTopMatches(String(element.Model), ModelString, 3);
      setTableData((prev) => {
        return prev.map((row) => {
          if (row.Model === element.Model) {
            return {
              ...row,
              dctModalOne: ModelMake[topMatches[0].string].Model,
              dctMakeOne: ModelMake[topMatches[0].string].Make,
              accuracyOne: parseFloat(topMatches[0].similarity).toFixed(2),
              ObjectOne: ModelMake[topMatches[0].string].ObjectType,
              dctModalTwo: ModelMake[topMatches[1].string].Model,
              dctMakeTwo: ModelMake[topMatches[1].string].Make,
              accuracyTwo: parseFloat(topMatches[1].similarity).toFixed(2),
              ObjectTwo: ModelMake[topMatches[1].string].ObjectType,
              dctModalThree: ModelMake[topMatches[2].string].Model,
              dctMakeThree: ModelMake[topMatches[2].string].Make,
              accuracyThree: parseFloat(topMatches[2].similarity).toFixed(2),
              ObjectThree: ModelMake[topMatches[2].string].ObjectType,
              OrginOrder: index,
            };
          }
          return row;
        });
      });
    });
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
                  fillMatches();
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
          <table id="ProcessedTable" className="overflow-auto">
            <tbody className="overflow-auto">
              <tr className="overflow-auto">
                <td className="font-bold border-2 px-1 w-auto text-nowrap">Input Model</td>
                <td className="font-bold border-2 px-1 w-auto text-nowrap">dcT Make 1</td>
                <td className="font-bold border-2 px-1 w-auto text-nowrap">dcT Model 1</td>
                <td className="font-bold border-2 px-1 w-auto text-nowrap">Accuracy 1</td>
                <td className="font-bold border-2 px-1 w-auto text-nowrap">Object 1</td>
                <td className="font-bold border-2 px-1 w-auto text-nowrap">dcT Make 2</td>
                <td className="font-bold border-2 px-1 w-auto text-nowrap">dcT Model 2</td>
                <td className="font-bold border-2 px-1 w-auto text-nowrap">Accuracy 2</td>
                <td className="font-bold border-2 px-1 w-auto text-nowrap">Object 2</td>
                <td className="font-bold border-2 px-1 w-auto text-nowrap">dcT Make 3</td>
                <td className="font-bold border-2 px-1 w-auto text-nowrap">dcT Model 3</td>
                <td className="font-bold border-2 px-1 w-auto text-nowrap">Accuracy 3</td>
                <td className="font-bold border-2 px-1 w-auto text-nowrap">Object 3</td>
              </tr>
              {tableData
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
                      return bValue.localeCompare(aValue);
                    } else if (SortedOrder === -1) {
                      return aValue.localeCompare(bValue);
                    }
                  }
                  return 0;
                })
                .map((row, index) => (
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
                    <td className="border-b-2 px-1 w-auto text-nowrap border-r-2">{row.Model}</td>
                    <td className="border-b-2 px-1 w-auto text-nowrap ">{row.dctMakeOne || "..."}</td>
                    <td className="border-b-2 px-1 w-auto text-nowrap ">{row.dctModalOne || "..."}</td>
                    <td className="border-b-2 px-1 w-auto text-nowrap ">{row.accuracyOne || "..."}</td>
                    <td className="border-b-2 px-1 w-auto text-nowrap border-r-2">{row.ObjectOne || "..."}</td>
                    <td className="border-b-2 px-1 w-auto text-nowrap ">{row.dctMakeTwo || "..."}</td>
                    <td className="border-b-2 px-1 w-auto text-nowrap ">{row.dctModalTwo || "..."}</td>
                    <td className="border-b-2 px-1 w-auto text-nowrap ">{row.accuracyTwo || "..."}</td>
                    <td className="border-b-2 px-1 w-auto text-nowrap border-r-2">{row.ObjectTwo || "..."}</td>
                    <td className="border-b-2 px-1 w-auto text-nowrap ">{row.dctMakeThree || "..."}</td>
                    <td className="border-b-2 px-1 w-auto text-nowrap ">{row.dctModalThree || "..."}</td>
                    <td className="border-b-2 px-1 w-auto text-nowrap ">{row.accuracyThree || "..."}</td>
                    <td className="border-b-2 px-1 w-auto text-nowrap border-r-2">{row.ObjectThree || "..."}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {loading ? <LoadingSpinner /> : null}
    </div>
  );
}
