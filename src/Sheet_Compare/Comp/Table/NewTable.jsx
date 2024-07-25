import React, { useState, useRef } from "react";
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

  const [counter, setCounter] = useState(0);
  const lastScrollTop = useRef(0);
  const scrollableDivRef = useRef(null);

  React.useEffect(() => {
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
      <div className="py-2">{columns.length > 0 ? <NewTableNav columns={columns} /> : null}</div>

      <table className="border-2 mb-10 h-[70rem]">
        <thead className="border-2">
          <tr className="border-2">
            {columns.slice(showColumns, showColumns + 6).map((col) => (
              <th key={col} className="border-2">
                <button
                  className="w-full h-full bg-orange-400 rounded-md"
                  onClick={() => {
                    if (compareColumn === col) {
                      removeCompareColumn();
                    } else {
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
          {rows.slice(0, counter * 2 + 50).map((row) => (
            <tr key={row}>
              {columns.slice(showColumns, showColumns + 6).map((col) => (
                <td key={col + row} className={`border-2 text-nowrap px-2 h-[1.5rem] ${compareColumn === col.toString() ? "bg-gray-300" : ""}`}>
                  {String(data[col + row]).length > 20 ? String(data[col + row]).substring(0, 20) + "..." : data[col + row]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
