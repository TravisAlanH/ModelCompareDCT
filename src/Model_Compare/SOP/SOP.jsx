import React from "react";
import StepZero from "../SOP/Step0_0.png";
import StepOne from "../SOP/Step1_1.png";
import StepTwo from "../SOP/Step2_2.png";
import StepThree from "../SOP/Step3_3.png";
import StepFour from "../SOP/Step4_4.png";
import Step5_5 from "../SOP/Step5_5.png";
import { ModelCompareStore } from "../../../Store/Store";
// import { CurrentStepStore } from "../../../Store/Store";
// import { FileNameStore } from "../../../Store/Store";

export default function SOP() {
  const Step = ModelCompareStore((state) => state.data.CurrentStep);
  const fileName = ModelCompareStore((state) => state.data.FileName);
  const SOPData = [
    {
      Step: 1,
      Header: "dcTrack Model Compare Guide",
      BulletPoints: [
        { Main: "Create Model Comparisons based on Customer Data and dcTrack Data", Additional: "" },
        { Main: "Top 3 Best Matches are Provided", Additional: "" },
        { Main: "Object Typing is Provided for dcTrack Mached Data", Additional: "" },
      ],
      Note: "*Note: Large data sets may require isolating the Model column, or removing excess sheets from your workbook, before processing. Making these changes greatly reduces processing time.",
      img: StepZero,
      imgNote: `**This SOP is available for reference at any time by selecting the "?" in the top right corner of the tool.`,
    },
    {
      Step: 2,
      Header: "Select the .xlsx file to open",
      BulletPoints: [
        {
          Main: `Sheet being processed MUST be the "Active" Sheet in the workbook.`,
          Additional: [
            `"Active" Sheet is the sheet you were last using when the workbook was last saved.`,
            `If workbook contains only one worksheet the "Active" Sheet is defaulted to that single worksheet`,
          ],
        },
        { Main: "Only works with .xlsx file extensions", Additional: "" },
        { Main: "Resave your Excel file using .xlsx as needed", Additional: "" },
      ],
      Note: "*Note: No data is saved or maintained after closing this tool",
      img: StepOne,
      imgNote: "",
    },
    {
      Step: 3,
      Header: "Select the Column that contains the Model Data",
      BulletPoints: [
        {
          Main: `Select the Orange Column Letter to Select the Column`,
          Additional: "",
        },
        { Main: "The Selected Column will Highlight.", Additional: "" },
      ],
      Note: "*Note: Depending on Data size this may take up to 10 Seconds for column to highlight",
      img: StepTwo,
      imgNote: "",
    },
    {
      Step: 4,
      Header: "Select Open Process",
      BulletPoints: [
        {
          Main: `All duplicate Entries are removed from the process at this time.`,
          Additional: "",
        },
        { Main: "A new Window will open containing the Model data with duplicates removed", Additional: "" },
      ],
      Note: "*Note: Duplicate Entries are only removed from the Preview Window, the original data is not altered.",
      img: StepThree,
      imgNote: "",
    },
    {
      Step: 5,
      Header: "After Reviewing, Select Begin Process",
      BulletPoints: [
        { Main: "This will do comparisons to the most recent Models Library and provide the best 3 matches to the provided model.", Additional: "" },
        { Main: "Depending on Data Size there may be a delay in processing.", Additional: "" },
        {
          Main: `The provided Data is as follows:`,
          Additional: [
            `Make: The Manufacturer of the Model`,
            `Model: The Model Number or Name`,
            `Accuracy: The Percentage of Match to the Model`,
            `Object Type: dcTrack Object Type for the Matched Model`,
          ],
        },
      ],
      Note: "",
      img: StepFour,
      imgNote: "",
    },
    {
      Step: 6,
      Header: "Optional: Export the Data",
      BulletPoints: [
        {
          Main: `Export will create an Export .xlsx file of all provided data for use.`,
          Additional: [`File Name: Model_(Your Provided File Name).xlsx`, `Will be saved to your Downloads Folder`],
        },
      ],
      Note: "",
      img: Step5_5,
      imgNote: "",
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
