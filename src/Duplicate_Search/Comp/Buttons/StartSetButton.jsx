import React from "react";
import { DuplicateSearchStore } from "../../../../Store/Store";

export default function StartSetButton({ Setting }) {
  const { originData, CompareStartOne, CompareStartTwo, CompareEndOne, CompareEndTwo, currentCompareColumns } = DuplicateSearchStore((state) => state.data);
  const { setCompareStartOne, setCompareStartTwo, setCompareEndOne, setCompareEndTwo, setCurrentCompareColumns } = DuplicateSearchStore((state) => state);

  const [ShownCompare, setShownCompare] = React.useState([CompareStartOne, CompareStartTwo, CompareEndOne, CompareEndTwo]);
  const setCompareColumns = [setCompareStartOne, setCompareStartTwo, setCompareEndOne, setCompareEndTwo];
  const [reload, setReload] = React.useState(false);

  React.useEffect(() => {
    setShownCompare([CompareStartOne, CompareStartTwo, CompareEndOne, CompareEndTwo]);
  }, [CompareStartOne, CompareStartTwo, CompareEndOne, CompareEndTwo]);

  return (
    <div className={`${Setting === currentCompareColumns ? "outline outline-4 outline-orange-400 outline-offset-2 rounded-sm mb-2" : ""}`}>
      <button
        className={`bg-orange-400 text-white font-bold py-1 px-4 rounded w-full`}
        disabled={Setting == 1 ? (ShownCompare[0] == "" ? true : false) : Setting == 3 ? (ShownCompare[2] == "" ? true : false) : false}
        onClick={() => {
          setCurrentCompareColumns(Setting);
        }}
      >
        {Setting == 0 || Setting == 2
          ? `*First (${Setting == 0 ? ShownCompare[0] : ShownCompare[2]})`
          : `Second (${Setting == 1 ? ShownCompare[1] : ShownCompare[3]})`}
      </button>
      <div id="previewStart" className="flex flex-row justify-center">
        <input type="text" className="w-[8rem] px-1" disabled={true} value={ShownCompare[Setting] != "" ? originData[`${ShownCompare[Setting]}1`] : ""} />
        <div className="w-[2rem]">
          {ShownCompare[Setting] != "" ? (
            <button
              className="flex flex-row justify-center h-full items-center bg-red-400 w-[2rem] rounded-sm text-white font-bold"
              onClick={() => {
                setCompareColumns[Setting]("");
                if (Setting == 3 || Setting == 1) {
                  setCurrentCompareColumns(Setting - 1);
                } else {
                  setCurrentCompareColumns(Setting);
                }
                setReload(!reload);
              }}
            >
              X
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
