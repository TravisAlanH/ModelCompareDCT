import React from "react";
import StepZero from "../SOP/StepC_0.png";
import StepOne from "../SOP/StepC_1.png";
import StepTwo from "../SOP/StepC_2.png";
import StepThree from "../SOP/StepC_3.png";
import StepFour from "../SOP/Step4_4.png";
import StepSOP from "../SOP/Step0_0.png";
// import { DuplicateSearchStore } from "../../../Store/Store";
// import { CurrentStepStore } from "../../../Store/Store";
// import { FileNameStore } from "../../../Store/Store";

export default function SOPColumn() {
  // const Step = DuplicateSearchStore((state) => state.data.CurrentStep);
  // const fileName = DuplicateSearchStore((state) => state.data.FileName);
  const SOPData = [
    {
      Step: 1,
      Header: "Column Selection Guide",
      BulletPoints: [
        {
          Main: "Setting Columns for Duplicate Search comparisons",
          Additional: [`Single Column (Step 2)`, `Two Columns (Step 3)`, `Four Columns (Step 4)`],
        },
        { Main: `Return original data with new column (A) with duplicate flag "Yes"`, Additional: "" },
        { Main: "Sorting and Exporting as Required", Additional: "" },
      ],
      Note: "*Note: Large data sets may require isolating the Checking Column(s) column, or removing excess sheets from your workbook, before processing. Making these changes greatly reduces processing time.",
      img: StepZero,
      imgNote: `**This SOP is available for reference at any time by selecting the gray "?" as referanced below.`,
    },
    {
      Step: 2,
      Header: "Single Column Duplicate Checking",
      BulletPoints: [
        {
          Main: `For use to check if a single column has duplicates`,
          Additional: [
            `- Locate the unique column (i.e., Name, Serial Number, Asset tag, ect.).`,
            `1. Ensure that the "*First" (Red Box) in the first set (Blue Box) is selected.`,
            `2. Select the Column to be checked (Orange Letter in the table).`,
            `3. Review the Selected Column (Red Box).`,
          ],
        },
        { Main: "No other options are needed for Single Column Selection", Additional: "" },
        { Main: "Open Process Contine from Tool SOP", Additional: "" },
      ],
      Note: "*Note: No data is saved or maintained after closing this tool",
      img: StepOne,
      imgNote: "",
    },
    {
      Step: 3,
      Header: "Double Column Duplicate Checking",
      BulletPoints: [
        {
          Main: `For use to check if a single column has duplicates in a differnt column`,
          Additional: "",
        },
        {
          Main: `Set First Column`,
          Additional: [
            `- Locate the unique columns (i.e., Name, Serial Number, Asset tag, ect.).`,
            `1. Ensure that the "*First" (Red Box) in the first set (Blue Box) is selected.`,
            `2. Select the origin Column to be checked (Orange Letter in the table).`,
            `5. Review the Selected Column (Red Box).`,
          ],
        },
        {
          Main: `Set Second Column`,
          Additional: [
            `- Locate the unique columns (i.e., Name, Serial Number, Asset tag, ect.).`,
            `1. Ensure that the "*First" (Green Box) in the second set (Black Box) is selected.`,
            `2. Select the compare Column to be checked (Orange Letter in the table).`,
            `3. Review the Selected Column (Green Box).`,
          ],
        },
        { Main: "No other options are needed for Two Column Selection", Additional: "" },
        { Main: "Open Process Contine from Tool SOP", Additional: "" },
      ],
      Note: "",
      img: StepTwo,
      imgNote: "",
    },
    {
      Step: 4,
      Header: "Four Column Duplicate Checking",
      BulletPoints: [
        {
          Main: `For use to check if a Set of two columns has duplicates in a differnt set of two columns`,
          Additional: "",
        },
        {
          Main: `Set First Columns`,
          Additional: [
            `- Locate the unique columns (i.e., Device Name, Port, ect.).`,
            `1. Ensure that the "*First" in the first set (Blue Box) is selected.`,
            `--- Set the first column to be checked (Orange Letter in the table).`,
            `2. Ensure that the "Second" in the first set (Blue Box) is selected.`,
            `--- Set the second column to be checked (Orange Letter in the table).`,
            `3. Review the Selected Columns (Blue Box).`,
          ],
        },
        {
          Main: `Set Second Columns`,
          Additional: [
            `- Locate the unique columns (i.e., Device Name, Port, ect.).`,
            `1. Ensure that the "*First" in the second set (Black Box) is selected.`,
            `--- Set the first column to be checked (Orange Letter in the table).`,
            `2. Ensure that the "Second" in the second set (Black Box) is selected.`,
            `--- Set the second column to be checked (Orange Letter in the table).`,
            `3. Review the Selected Columns (Black Box).`,
          ],
        },
        { Main: "No other options are needed for Four Column Selection", Additional: "" },
        { Main: "Open Process Contine from Tool SOP", Additional: "" },
      ],
      Note: "",
      img: StepThree,
      imgNote: "",
    },
    {
      Step: 5,
      Header: "Conitue Standard SOP",
      BulletPoints: [{ Main: "After Selections are Made Contine processing as Normal", Additional: "" }],
      Note: "",
      img: StepSOP,
      imgNote: `**Stardard SOP is available for reference at any time by selecting the "?" in the top right corner of the tool.`,
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      {SOPData.map((data, index) => {
        return <div key={index}>{StepLayout(index, data)}</div>;
      })}
    </div>
  );

  function StepLayout(index, data) {
    return (
      <div className="w-50rem bg-[#f1f5f9] rounded-xl flex flex-col gap-5 p-3 shadow-md">
        <div className="flex flex-row gap-3 items-center">
          {StepNumber(data.Step)}
          {StepHeader(data)}
        </div>
        <div>
          {data.BulletPoints.length > 0 ? (
            <div className="flex flex-col gap-2">
              {data.BulletPoints.map((line, index) => {
                return (
                  <div key={index}>
                    {StepBulletPoints(line.Main)}
                    {line.Additional != "" ? StepBulletAddition(line.Additional) : null}
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
        <div>{data.Note != "" ? <div className="flex flex-col gap-2">{StepNote(data.Note)}</div> : null}</div>
        {data.imgNote != "" ? <div>{StepImageNote(data.imgNote)}</div> : null}
        <div className="flex flex-row justify-center">{data.img != "" ? StepImage(data.img) : null}</div>
      </div>
    );
  }

  function StepNumber(number) {
    return (
      <div className="w-[3rem] h-[3rem] rounded-full bg-white flex flex-row justify-center items-center m-5">
        <p className="text-2xl font-bold">{number}</p>
      </div>
    );
  }

  function StepHeader(data) {
    return (
      <div className="bg-[#f1f5f9] h-[3rem] rounded-t-xl flex flex-row items-center">
        <p className="text-xl font-bold">{data.Header}</p>
      </div>
    );
  }

  function StepBulletPoints(line) {
    return (
      <div className="flex flex-row items-center gap-2 pl-[4rem]">
        <div className="w-[.5rem] h-[.5rem] bg-black rounded-full"></div>
        <p>{line}</p>
      </div>
    );
  }

  function StepNote(line) {
    return (
      <div className="flex flex-row items-center gap-2 pl-[4rem] w-[44rem]">
        <p>{line}</p>
      </div>
    );
  }

  function StepImageNote(line) {
    return (
      <div className="flex flex-row items-center gap-2 pl-[4rem] w-[44rem]">
        <p className="text-sm">{line}</p>
      </div>
    );
  }

  function StepImage(img) {
    return (
      <div className="">
        <img className="rounded-lg w-[40rem]" src={img} />
      </div>
    );
  }

  function StepBulletAddition(Additional) {
    return (
      <div className="w-[40rem]">
        {Additional.map((line, index) => {
          return (
            <div key={index} className="flex flex-row items-center gap-4 pl-[6rem] pt-2">
              <div className="w-[.3rem] h-[.3rem] bg-[#918787] rounded-full"></div>
              <p>{line}</p>
            </div>
          );
        })}
      </div>
    );
  }
}
