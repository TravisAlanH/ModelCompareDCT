import React, { useState, useEffect, useRef, useCallback } from "react";
import { SheetCompareStore } from "../../../../Store/Store";
import OldTableNav from "../Inputs/OldTableNav";

export default function OldTable() {
  const initialData = SheetCompareStore((state) => state.data.oldData);
  const compareColumn = SheetCompareStore((state) => state.data.oldColumnCompare);
  const setCompareColumn = SheetCompareStore((state) => state.setOldColumnCompare);
  const removeCompareColumn = SheetCompareStore((state) => state.removeOldColumnCompare);
  const showColumns = SheetCompareStore((state) => state.data.oldVisableTableShow);

  const [data, setData] = useState({});
  const [visibleRows, setVisibleRows] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = 20; // Number of rows to load per page
  const observer = useRef();

  useEffect(() => {
    const loadData = () => {
      const newData = { ...data };
      const start = (page - 1) * pageSize;
      const end = page * pageSize;
      const keysToLoad = Object.keys(initialData).slice(start, end);

      keysToLoad.forEach((key) => {
        newData[key] = initialData[key];
      });

      setData(newData);
    };

    loadData();
  }, [page]);

  useEffect(() => {
    const updatedRows = Array.from(new Set(Object.keys(data).map((key) => key.match(/\d+/)[0])));
    setVisibleRows((prevRows) => [...prevRows, ...updatedRows]);
  }, [data]);

  const columns = Array.from(new Set(Object.keys(initialData).map((key) => key.match(/[A-Z]+/)[0])));

  const lastElementRef = useCallback((node) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prevPage) => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, []);

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
          {visibleRows.map((row, index) => (
            <tr
              key={`${row}-${index}`} // Ensure unique key for each row
              ref={index === visibleRows.length - 1 ? lastElementRef : null}
            >
              {columns.slice(showColumns, showColumns + 6).map((col) => {
                return (
                  <td
                    key={`${col}-${row}`} // Ensure unique key for each cell
                    className={`border-2 text-nowrap px-2 ${compareColumn === col.toString() ? "bg-gray-300" : ""}`}
                  >
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
