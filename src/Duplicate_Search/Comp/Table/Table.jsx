import React, { useState, useRef, useEffect } from "react";
// import { originDataStore, CompareColumnStore } from "../../../../Store/Store";
import { DuplicateSearchStore } from "../../../../Store/Store";
import TableNav from "../Inputs/TableNav";
import StartSetButton from "../Buttons/StartSetButton";
import SettingColumnsButtonMessage from "./SettingColumnsButtonMessage";
import { FaArrowsAltH } from "react-icons/fa";
// import { CurrentStepStore } from "../../../../Store/Store";

export default function Table() {
  const data = DuplicateSearchStore((state) => state.data.originData);
  const { CompareStartOne, CompareStartTwo, CompareEndOne, CompareEndTwo, currentCompareColumns } = DuplicateSearchStore((state) => state.data);
  const { setCompareStartOne, setCompareStartTwo, setCompareEndOne, setCompareEndTwo, setCurrentCompareColumns } = DuplicateSearchStore((state) => state);
  // const compareColumn = DuplicateSearchStore((state) => state.data.CompareColumn);
  // const setCompareColumn = DuplicateSearchStore((state) => state.setCompareColumn);
  // const removeCompareColumn = DuplicateSearchStore((state) => state.resetCompareColumn);
  const rows = Array.from(new Set(Object.keys(data).map((key) => key.match(/\d+/)[0])));
  const columns = Array.from(new Set(Object.keys(data).map((key) => key.match(/[A-Z]+/)[0])));
  const showColumns = DuplicateSearchStore((state) => state.data.visableTableShow);

  const [counter, setCounter] = useState(0);
  const lastScrollTop = useRef(0);
  const scrollableDivRef = useRef(null);

  const SettingColumnsArray = [setCompareStartOne, setCompareStartTwo, setCompareEndOne, setCompareEndTwo];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = scrollableDivRef.current.scrollTop;

      if (scrollTop > lastScrollTop.current) {
        // Scrolling down
        if (counter < rows.length / 10 - 5) {
          setCounter((prevCounter) => prevCounter + 1);
        } else {
          setCounter(Math.floor(rows.length / 10) - 5);
        }
      } else if (scrollTop < lastScrollTop.current) {
        // Scrolling up
        if (counter > 0) {
          setCounter((prevCounter) => prevCounter - 1);
        } else if (scrollTop === 0) {
          setCounter(0);
        }
      }

      lastScrollTop.current = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
    };

    const scrollableDiv = scrollableDivRef.current;
    scrollableDiv.addEventListener("scroll", handleScroll);

    return () => {
      scrollableDiv.removeEventListener("scroll", handleScroll);
    };
  }, [counter, rows.length]);

  return (
    <div className="w-full overflow-auto flex flex-col" ref={scrollableDivRef}>
      <div id="ColumnSetAndPreview" className="flex flex-col items-center">
        <SettingColumnsButtonMessage />
        <div className="flex flex-row gap-2 justify-center pt-2">
          <div className="flex flex-row gap-2">
            <StartSetButton Setting={0} />
            <StartSetButton Setting={1} />
          </div>
          <div className="pt-3">
            <FaArrowsAltH className="text-xl" />
          </div>
          <div className="flex flex-row gap-2">
            <StartSetButton Setting={2} />
            <StartSetButton Setting={3} />
          </div>
        </div>
      </div>
      <div className="py-2">{columns.length > 0 ? <TableNav columns={columns} /> : null}</div>
      <table className="border-2 mb-10">
        <thead className="border-2">
          <tr className="border-2">
            {columns.slice(showColumns, showColumns + 10).map((col) => (
              <th key={col} className="border-2">
                <button
                  className="w-full h-full bg-orange-400 rounded-md"
                  onClick={() => {
                    SettingColumnsArray[currentCompareColumns](col);
                  }}
                >
                  {col}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.slice(0, counter * 2 + 50).map((row, index) => (
            <tr key={row} className="h-[1.5rem]">
              {columns.slice(showColumns, showColumns + 10).map((col) => (
                <td
                  key={col + row}
                  className={`border-2 text-nowrap px-2 h-[1.5rem] ${
                    CompareStartOne === col.toString()
                      ? "bg-gray-300"
                      : CompareStartTwo === col.toString()
                      ? "bg-gray-300"
                      : CompareEndOne === col.toString()
                      ? "bg-gray-400"
                      : CompareEndTwo === col.toString()
                      ? "bg-gray-400"
                      : ""
                  }`}
                >
                  {/* // <td key={col + row} className="border-2 text-nowrap px-2 h-[1.5rem]"> */}
                  {String(data[col + row]).length > 20 ? String(data[col + row]).substring(0, 20) + "..." : data[col + row]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        {/* <tbody>
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
        </tbody> */}
      </table>
    </div>
  );
}
