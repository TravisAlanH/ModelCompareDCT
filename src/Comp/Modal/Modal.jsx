import React from "react";
import "./Modal.css";
import { originDataStore } from "../../../Store/Store";
import { CompareColumnStore } from "../../../Store/Store";
import { ModelMake } from "../../MLT";
import { FileNameStore } from "../../../Store/Store";
import LoadingSpinner from "../LoadingSpinner/Spinner";
import findTopMatches from "../../Functions/LenenshteinDistance";
import { startName } from "../../Functions/StartName";

export default function Modal() {
  const data = originDataStore((state) => state.data.originData);
  const fileName = FileNameStore((state) => state.data.FileName);
  const compareColumn = CompareColumnStore((state) => state.data.CompareColumn);
  const [loading, setLoading] = React.useState(false);
  console.log(loading);

  const [selectedRow, setSelectedRow] = React.useState(null);

  console.log(data);

  const [tableData, setTableData] = React.useState(
    Array.from(
      new Map(
        Object.keys(data)
          .filter((key) => key.includes(compareColumn))
          .map((key) => ({
            Modal: data[key],
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
          .map((item) => [item.Modal, item]) // Convert each item to a key-value pair
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
              Modal: data[key],
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
            .map((item) => [item.Modal, item]) // Convert each item to a key-value pair
        ).values() // Extract unique values from the Map
      )
    );
  }, [data, compareColumn]);

  console.log("tableData", tableData);

  // function levenshteinDistance(str1, str2) {
  //   if (typeof str1 !== "string" || typeof str2 !== "string") {
  //     throw new TypeError("Both arguments must be strings.");
  //   }
  //   str1 = str1.toLowerCase();
  //   str2 = str2.toLowerCase();

  //   const lenStr1 = str1.length + 1;
  //   const lenStr2 = str2.length + 1;

  //   const matrix = Array.from({ length: lenStr1 }, () => Array(lenStr2).fill(0));

  //   for (let i = 0; i < lenStr1; i++) {
  //     matrix[i][0] = i;
  //   }
  //   for (let j = 0; j < lenStr2; j++) {
  //     matrix[0][j] = j;
  //   }

  //   for (let i = 1; i < lenStr1; i++) {
  //     for (let j = 1; j < lenStr2; j++) {
  //       const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
  //       matrix[i][j] = Math.min(
  //         matrix[i - 1][j] + 1, // Deletion
  //         matrix[i][j - 1] + 1, // Insertion
  //         matrix[i - 1][j - 1] + cost // Substitution
  //       );
  //     }
  //   }

  //   return matrix[lenStr1 - 1][lenStr2 - 1];
  // }

  // function similarityPercentage(str1, str2) {
  //   const levDistance = levenshteinDistance(str1, str2);
  //   const maxLen = Math.max(str1.length, str2.length);
  //   const similarity = (1 - levDistance / maxLen) * 100;
  //   return similarity;
  // }

  // function findTopMatches(target, strings, topN = 3) {
  //   const matches = strings.map((s) => {
  //     const sim = similarityPercentage(target, s);
  //     return { string: s, similarity: sim };
  //   });

  //   matches.sort((a, b) => b.similarity - a.similarity);

  //   return matches.slice(0, topN);
  // }

  function createModelStringArray() {
    let modelStringArray = [];
    Object.keys(ModelMake).forEach((key) => {
      modelStringArray.push(key);
    });
    return modelStringArray;
  }

  function createMakeRemovedModelStringArray() {
    let makeRemovedStringArray = [];
    Object.keys(ModelMake).forEach((key) => {
      if (key in startName) {
      }
    });
  }

  // export const ModelMake = {
  //   "ActivSpan 4200 RS": {
  //     "Make": "Ciena",
  //     "ObjectType": "NETWORK-CHASSIS-RACKABLE"
  //   },

  function fillMatches() {
    const ModelString = createModelStringArray();
    tableData.forEach((element) => {
      let topMatches = findTopMatches(String(element.Modal), ModelString, 3);
      setTableData((prev) => {
        return prev.map((row) => {
          if (row.Modal === element.Modal) {
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
            };
          }
          return row;
        });
      });
    });
    setLoading(false);
  }

  console.log("tableData", tableData);

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
                <td className="font-bold border-2 px-1 w-auto text-nowrap">dct Make 1</td>
                <td className="font-bold border-2 px-1 w-auto text-nowrap">dcT Model 1</td>
                <td className="font-bold border-2 px-1 w-auto text-nowrap">Accuracy 1</td>
                <td className="font-bold border-2 px-1 w-auto text-nowrap">Object 1</td>
                <td className="font-bold border-2 px-1 w-auto text-nowrap">dct Make 2</td>
                <td className="font-bold border-2 px-1 w-auto text-nowrap">dcT Model 2</td>
                <td className="font-bold border-2 px-1 w-auto text-nowrap">Accuracy 2</td>
                <td className="font-bold border-2 px-1 w-auto text-nowrap">Object 2</td>
                <td className="font-bold border-2 px-1 w-auto text-nowrap">dct Make 3</td>
                <td className="font-bold border-2 px-1 w-auto text-nowrap">dcT Model 3</td>
                <td className="font-bold border-2 px-1 w-auto text-nowrap">Accuracy 3</td>
                <td className="font-bold border-2 px-1 w-auto text-nowrap">Object 3</td>
              </tr>
              {tableData
                // .sort((a, b) => b.accuracyOne - a.accuracyOne)
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
                    <td className="border-b-2 px-1 w-auto text-nowrap border-r-2">{row.Modal}</td>
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
