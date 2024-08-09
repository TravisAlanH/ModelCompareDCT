import React from "react";
// import { SortedStore } from "../../../../Store/Store";
import { DuplicateSearchStore } from "../../../../Store/Store";

export default function SortFinishedTable() {
  const SortedBy = DuplicateSearchStore((state) => state.data.sortedby);
  const SortedOrder = DuplicateSearchStore((state) => state.data.sortedOrder);
  const setSorted = DuplicateSearchStore((state) => state.setSorted);
  const removeSorted = DuplicateSearchStore((state) => state.removeSorted);
  const [SortName, setSortName] = React.useState(`Sort Table`);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  const handleOptionClick = (value) => {
    // let convertedValue;
    // if (value === "Input Model") {
    //   convertedValue = "Model";
    // } else if (value === "dcT Make 1") {
    //   convertedValue = "dctMakeOne";
    // } else if (value === "dcT Model 1") {
    //   convertedValue = "dctModalOne";
    // } else if (value === "Accuracy 1") {
    //   convertedValue = "accuracyOne";
    // } else if (value === "Object 1") {
    //   convertedValue = "ObjectOne";
    // }

    if (value === "N/A") {
      return;
    } else if (SortedOrder === 0 && value === SortedBy) {
      setSorted(value, 1);
      setSortName(value);
    } else if (SortedOrder === 1 && value === SortedBy) {
      setSorted(value, -1);
      setSortName(value);
    } else if (SortedOrder === -1 && value === SortedBy) {
      setSortName(`Sort Table`);
      removeSorted();
    } else {
      setSorted(value, 1);
      setSortName(value);
    }
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative inline-flex items-center text-left">
      {/* Dropdown Button */}
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Toggles dropdown visibility
        className={`flex flex-row justify-between items-center w-[9rem] h-[3rem] px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 ${
          SortedBy ? "outline-none ring-2 ring-offset-2 ring-orange-500" : "" // Adds ring effect if SortedBy is not empty
        }`}
      >
        {SortName} {/* Displays the current sorting name */}
        <svg className="w-5 h-5 ml-2 -mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Clear Sorting Button */}
      <button
        className="w-[9rem] h-[3rem] px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 ml-2" // Added ml-2 for margin
        onClick={() => {
          setSorted("", 0); // Clears the sorting
          setSortName(`Sort Table`);
          setIsDropdownOpen(false);
        }}
      >
        Clear Sorting
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <ul className="absolute left-0 top-full mt-2 w-[10rem] bg-white border border-gray-300 rounded-md shadow-lg z-10">
          {/* Dropdown Items */}
          {["Duplicate"].map((item) => (
            <li
              key={item}
              onClick={() => handleOptionClick(item)} // Handles option click
              className={`flex justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer ${
                SortName === item ? "bg-gray-200" : "" // Highlights selected item
              }`}
            >
              {item}
              {/* Displaying the sort direction indicator */}
              {SortName === item ? <span>{SortedOrder === 1 ? `▲` : SortedOrder === -1 ? `▬` : ""}</span> : <span>{`▽`}</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
