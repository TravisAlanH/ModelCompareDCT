import React from "react";
import "./Modal.css";
import { SheetCompareStore } from "../../../../Store/Store";
import { ModelMake } from "../../../Functions/LenenshteinDistance/MLT";
// import SortFinishedTable from "../Sort/SortFinishedTable";
import LoadingSpinner from "../LoadingSpinner/Spinner";
import findTopMatches from "../../../Functions/LenenshteinDistance/LenenshteinDistance";

export default function Modal() {
  const data = SheetCompareStore((state) => state.data);
  const { newData, oldData, newFileName, oldFileName, oldColumnCompare, newColumnCompare, sortedby, sortedOrder } = data;
  const [loading, setLoading] = React.useState(false);
  const rowsNewData = Array.from(new Set(Object.keys(newData).map((key) => key.match(/\d+/)[0])));
  const columnsNewData = Array.from(new Set(Object.keys(newData).map((key) => key.match(/[A-Z]+/)[0])));
  const rowsOldData = Array.from(new Set(Object.keys(oldData).map((key) => key.match(/\d+/)[0])));
  const columnsOldData = Array.from(new Set(Object.keys(oldData).map((key) => key.match(/[A-Z]+/)[0])));

  const [reload, setReload] = React.useState(false);

  React.useEffect(() => {
    setReload(!reload);
  }, [sortedOrder, sortedby]);

  const oldTruthColumn = oldData[Object.keys(oldData).filter((item) => item.includes(oldColumnCompare))[0]];
  const newTruthColumn = newData[Object.keys(newData).filter((item) => item.includes(newColumnCompare))[0]];

  const combineData = () => {
    let combinedTableData = [];

    // Filter and map newData keys
    const newDataMapped = Object.keys(newData)
      .filter((key) => key.includes(newColumnCompare)) // Filter keys based on the criterion
      .map((key) => ({
        [`${newTruthColumn} (new)`]: newData[key], // Dynamically set the key to the value of newTruthColumn
      }));

    // Filter and map oldData keys
    const oldDataMapped = Object.keys(oldData)
      .filter((key) => key.includes(oldColumnCompare)) // Filter keys based on the criterion
      .map((key) => ({
        [`${oldTruthColumn}`]: oldData[key], // Dynamically set the key to the value of oldTruthColumn
      }));

    if (rowsNewData.length > rowsOldData.length) {
      const diff = rowsNewData.length - rowsOldData.length;
      for (let index = 0; index < diff; index++) {
        oldDataMapped.push({
          [`${oldTruthColumn}`]: "",
        });
      }
    } else if (rowsNewData.length < rowsOldData.length) {
      const diff = rowsOldData.length - rowsNewData.length;
      for (let index = 0; index < diff; index++) {
        newDataMapped.push({
          [`${newTruthColumn} (new)`]: "",
        });
      }
    }
    // Combine newDataMapped and oldDataMapped into combinedTableData
    newDataMapped.forEach((newEntry, index) => {
      combinedTableData.push({
        ...oldDataMapped[index],
        ...newEntry,
      });
    });

    return combinedTableData;
  };

  const [tableData, setTableData] = React.useState(combineData());
  console.log("tableData", tableData);

  React.useEffect(() => {
    setTableData(combineData());
  }, [newData, oldData, newColumnCompare, oldColumnCompare]);

  // React.useEffect(() => {
  //   setTableData(
  //     Array.from(
  //       new Map(
  //         Object.keys(newData)
  //           .filter((key) => key.includes(compareColumn))
  //           .map((key) => ({
  //             Model: data[key],
  //           }))
  //           .map((item) => [item.Model, item]) // Convert each item to a key-value pair
  //       ).values() // Extract unique values from the Map
  //     )
  //   );
  // }, [data, compareColumn]);

  // async function fillMatches() {
  //   for (let index = 0; index < tableData.length; index++) {
  //     const element = tableData[index];

  //     // Update the table data
  //     setTableData((prev) => {
  //       return prev.map((row) => {
  //         if (row.Model === element.Model) {
  //           return {
  //             ...row,

  //             OrginOrder: index,
  //           };
  //         }
  //         return row;
  //       });
  //     });

  //     // Force a page update (React will handle re-rendering)
  //     await new Promise((resolve) => setTimeout(resolve, 0));
  //   }

  //   setLoading(false);
  // }

  // console.log("tableData", tableData);

  return (
    <div id="ProcessModal" className="modal">
      {loading ? <LoadingSpinner /> : null}
    </div>
  );
}
