import React from "react";
import { DuplicateSearchStore } from "../../../../Store/Store";

export default function StartSetButton({ Setting }) {
  const { originData, CompareStartOne, CompareStartTwo, CompareEndOne, CompareEndTwo, currentCompareColumns } = DuplicateSearchStore((state) => state.data);
  const { setCurrentCompareColumns } = DuplicateSearchStore((state) => state);

  const [ShownCompare, setShownCompare] = React.useState([CompareStartOne, CompareStartTwo, CompareEndOne, CompareEndTwo]);
  const [reload, setReload] = React.useState(false);

  React.useEffect(() => {
    setShownCompare([CompareStartOne, CompareStartTwo, CompareEndOne, CompareEndTwo]);
  }, [CompareStartOne, CompareStartTwo, CompareEndOne, CompareEndTwo]);

  return (
    <div>
      <button
        className="bg-orange-400 text-white font-bold py-2 px-4 rounded w-full"
        onClick={() => {
          setCurrentCompareColumns(Setting);
        }}
      >
        {Setting == 0 || Setting == 2
          ? `First (${Setting == 0 ? ShownCompare[0] : ShownCompare[2]})`
          : `Second (${Setting == 1 ? ShownCompare[1] : ShownCompare[3]})`}
      </button>
      <div id="previewStart" className="flex flex-row justify-center">
        <input
          type="text"
          className="w-[8rem] px-1"
          value={
            ShownCompare[Setting] != ""
              ? originData[`${ShownCompare[Setting]}1`].length > 10
                ? originData[`${ShownCompare[Setting]}1`].splice(0, 10) + "..."
                : originData[`${ShownCompare[Setting]}1`]
              : ""
          }
        />
        <div>
          <button className="flex flex-row justify-center h-full items-center bg-red-400 w-[2rem] rounded-sm text-white font-bold" onClick={() => {}}>
            X
          </button>
        </div>
      </div>
    </div>
  );
}
