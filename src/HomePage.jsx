import React, { useState } from "react";
import Logo from "./Assets/Logo.png";
import { MdCompareArrows } from "react-icons/md";
import { MdCompare } from "react-icons/md";
import { AiOutlineColumnHeight, AiOutlinePython } from "react-icons/ai";

export default function HomePage({ setViewPage }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [Pages, setPages] = useState({
    "Model Compare": {
      page: 1,
      title: "Model Compare and Objects",
      discription: "Generates Model Compare with Accuracy and Object typing from .xlsx data and dcTrack Model Libary.",
      icon: <MdCompareArrows className="text-[3.5rem] text-white" />,
      index: 0,
    },
    "Multiple Sheet": {
      page: 2,
      title: "Multiple Sheet Compare",
      discription: "Generate Multiple Sheet Compare output from old and New .xlsx data. Provides Adds, Removes, and Changes in single file output.",
      icon: <MdCompare className="text-[3.5rem] text-white" />,
      index: 1,
    },
    "Duplicates Compare": {
      page: 3,
      title: "Duplicates in Column Compare",
      discription: "Generates Duplicate comparisons between Single, Multiple, and Combined Columns from .xlsx data.",
      icon: <AiOutlineColumnHeight className="text-[3.5rem] text-white" />,
      index: 2,
    },
    "Python Input": {
      page: 4,
      title: "**** Python Input **** (Work in Progress)",
      discription: "Create and Use Python tools from .py provided files.",
      icon: <AiOutlinePython className="text-[3.5rem] text-white" />,
      index: 3,
    },
  });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const highlightText = (text, highlight) => {
    if (!highlight.trim()) {
      return text;
    }
    const regex = new RegExp(`(${highlight})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="bg-orange-500">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const relevanceScore = (page) => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    const titleIncludes = page.title.toLowerCase().includes(lowerSearchTerm);
    const descriptionIncludes = page.discription.toLowerCase().includes(lowerSearchTerm);

    let score = 0;

    // Prioritize pages where the search term is in both title and description
    if (titleIncludes && descriptionIncludes) {
      score = 1;
    } else if (titleIncludes || descriptionIncludes) {
      score = 2;
    } else {
      score = 3;
    }

    // Further prioritize by the position where the search term first appears
    const titleIndex = page.title.toLowerCase().indexOf(lowerSearchTerm);
    const descriptionIndex = page.discription.toLowerCase().indexOf(lowerSearchTerm);

    if (titleIndex !== -1) {
      score -= 0.1 * titleIndex; // Earlier positions are better
    }

    if (descriptionIndex !== -1) {
      score -= 0.1 * descriptionIndex; // Earlier positions are better
    }

    return score;
  };

  const sortedPages = Object.keys(Pages).sort((a, b) => relevanceScore(Pages[a]) - relevanceScore(Pages[b]));

  return (
    <div>
      <div className="w-[full] h-[3.5rem] bg-[#000000dc] flex flex-row items-center justify-between px-4">
        <img src={Logo} className="h-[2.8rem]" />
      </div>
      <div className="flex flex-col items-center pt-4">
        <div className="flex flex-col gap-3 items-center w-[53rem] border-2 p-4 rounded-lg" id="HomePageToolCards">
          <div className="flex flex-row justify-between w-full">
            <p className="text-2xl text-orange-400 font-bold">Tools</p>
            <input type="text" className="border-2" id="SearchAndFilterInput" placeholder="Search..." value={searchTerm} onChange={handleSearchChange} />
          </div>
          <div className="flex flex-wrap justify-center gap-3 w-[70rem]">
            {sortedPages.map((pageKey, index) => {
              const page = Pages[pageKey];
              return (
                <div key={index} className="mx-3 flex flex-col justify-between rounded-lg w-[15.5rem] shadow-lg hover:shadow-2xl border-2">
                  <div>
                    <div className="bg-orange-400 rounded-t-lg hover:cursor-pointer" onClick={() => setViewPage(page.page)}>
                      <div className="flex flex-row justify-center pt-4">{page.icon}</div>
                    </div>
                    <div className="bg-orange-400 h-[5rem] flex flex-col justify-center shadow-lg hover:cursor-pointer" onClick={() => setViewPage(page.page)}>
                      <button className="text-white font-bold py-2 px-4 rounded w-full" onClick={() => setViewPage(page.page)}>
                        {highlightText(page.title, searchTerm)}
                      </button>
                    </div>
                    <div className="p-3 ">
                      <p className="text-[.8rem] text-justify">{highlightText(page.discription, searchTerm)}</p>
                    </div>
                  </div>
                  <div className="w-full flex flex-row justify-end p-3  rounded-b-lg">
                    <button className="bg-orange-400 text-white font-bold py-2 px-4 rounded w-[5rem]" onClick={() => setViewPage(page.page)}>
                      Open
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
