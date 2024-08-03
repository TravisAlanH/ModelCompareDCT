import React from "react";
import { FaAngleRight, FaAngleLeft, FaAngleDoubleRight, FaAngleDoubleLeft, FaRegDotCircle, FaDotCircle } from "react-icons/fa";
import { ModelCompareStore } from "../../../../Store/Store";

export default function TableNav({ columns }) {
  const setShowColumns = ModelCompareStore((state) => state.setVisableTableShow);
  const showColumns = ModelCompareStore((state) => state.data.visableTableShow);
  const [page, setPage] = React.useState(0);

  return (
    <div className="flex flex-row gap-5 justify-center">
      <button
        className="border-2 border-black rounded-md h-[2rem] px-3 flex flex-row items-center"
        onClick={() => {
          if (showColumns > 0) {
            setShowColumns(0);
            setPage(0);
          }
        }}
      >
        <FaAngleDoubleLeft />
      </button>
      <button
        className="border-2 border-black rounded-md h-[2rem] px-3 flex flex-row items-center"
        onClick={() => {
          if (showColumns > 0) {
            if (showColumns - 10 < 0) {
              setShowColumns(0);
              setPage(0);
            } else {
              setShowColumns(showColumns - 10);
              setPage(page - 1);
            }
          }
        }}
      >
        <FaAngleLeft />
      </button>
      <div className="flex flex-row items-center gap-2">
        {columns.length > 0
          ? new Array(Math.ceil(columns.length / 10)).fill("0").map((_, index) => {
              return (
                <button
                  key={index}
                  onClick={() => {
                    setShowColumns(index * 10);
                    setPage(index);
                  }}
                >
                  {index == page ? <FaDotCircle /> : <FaRegDotCircle />}
                </button>
              );
            })
          : null}
      </div>
      <button
        className="border-2 border-black rounded-md h-[2rem] px-3 flex flex-row items-center"
        onClick={() => {
          if (showColumns + 10 < columns.length) {
            if (showColumns + 12 > columns.length) {
              setShowColumns(columns.length - 10);
              setPage(Math.ceil(columns.length / 10) - 1);
            } else {
              setShowColumns(showColumns + 10);
              setPage(page + 1);
            }
          }
        }}
      >
        <FaAngleRight />
      </button>
      <button
        className="border-2 border-black rounded-md h-[2rem] px-3 flex flex-row items-center"
        onClick={() => {
          if (showColumns + 10 < columns.length) {
            setShowColumns(columns.length - 10);
            setPage(Math.ceil(columns.length / 10) - 1);
          }
        }}
      >
        <FaAngleDoubleRight />
      </button>
    </div>
  );
}
