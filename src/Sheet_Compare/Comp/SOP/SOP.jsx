import React from "react";
import StepZero from "../SOP/Step0_0.png";
import StepOne from "../SOP/Step1_1.png";
import StepTwo from "../SOP/Step2_2.png";
import StepThree from "../SOP/Step3_3.png";
import StepFour from "../SOP/Step4_4.png";
import StepFive from "../SOP/Step5_5.png";
import StepSix from "../SOP/Step6_6.png";
// import { CurrentStepStore } from "../../../Store/Store";
// import { FileNameStore } from "../../../Store/Store";

export default function SOP() {
  const SOPData = [
    {
      Step: 1,
      Header: ".xlsx File Comparison Tool",
      BulletPoints: [
        { Main: "Create Compare Data between two .xlsx (Excel Format) data sets", Additional: "" },
        { Main: `Test for "Altered", "Added", "Removed" data points`, Additional: "" },
        { Main: "Export of data for future review", Additional: "" },
      ],
      Note: "*Note: Large data sets may require removing excess sheets from your workbook, before processing. Making these changes greatly reduces processing time.",
      img: StepZero,
      imgNote: `**This SOP is available for reference at any time by selecting the "?" in the top right corner of the tool.`,
    },
    {
      Step: 2,
      Header: "Select Sheet Compare Button",
      BulletPoints: [
        {
          Main: `Redirects to the working compare page where .xlsx documents can be uploaded for processing`,
          Additional: "",
        },
      ],
      Note: "*Note: No data is saved or maintained after closing this tool",
      img: StepOne,
      imgNote: "",
    },
    {
      Step: 3,
      Header: "Load the Old Data",
      BulletPoints: [
        {
          Main: `Select the "Open Old File" Button to load the first .xlsx file for comparison`,
          Additional: [`This should be the oldest data set for comparison`],
        },
        { Main: "Document MUST be in .xlsx format", Additional: [`Resave the data using excel to .xlsx format as required`] },
      ],
      Note: "*Note: Depending on Data size this may take up to 10 Seconds for column to highlight",
      img: StepTwo,
      imgNote: "",
    },
    {
      Step: 4,
      Header: "Load the New Data",
      BulletPoints: [
        {
          Main: `Select the "Open New File" Button to load the first .xlsx file for comparison`,
          Additional: [`This should be the oldest data set for comparison`],
        },
        { Main: "Document MUST be in .xlsx format", Additional: [`Resave the data using excel to .xlsx format as required`] },
      ],
      Note: "*Note: Depending on Data size this may take up to 10 Seconds for column to highlight",
      img: StepThree,
      imgNote: "",
    },
    {
      Step: 5,
      Header: "Select the Unique Columns within both data sets (Old and New)",
      BulletPoints: [
        {
          Main: `Select the Columns that are unique to the data set for comparison`,
          Additional: ["This will be usied to compare the two documents", `Each row of the selected column must be unique`],
        },
        { Main: "Select the Orange Column Letter to set the unique column", Additional: "" },
      ],
      Note: "*Note: look for Unique Identifiers for each row (Name, Serial Number, Asset Number, etc.)",
      img: StepFour,
      imgNote: "",
    },
    {
      Step: 6,
      Header: `Select "Open Process"`,
      BulletPoints: [
        { Main: "Loads the compare data for review", Additional: "" },
        {
          Main: `"Changed?" (Header)`,
          Additional: [`Altered - Data Changes`, `Added - Data Added in New Docuemnt`, `Removed - Data removed from New Document`],
        },

        {
          Main: `"Original" (Header)`,
          Additional: [`The Data from the Original Document`, `** Note: This is the data that was loaded first`],
        },
        {
          Main: `"Original + (new)" (Header)`,
          Additional: [`The Data from the New Document`, `** Note: This is the data that was loaded second`],
        },
      ],
      Note: "",
      img: StepFive,
      imgNote: "",
    },
    {
      Step: 7,
      Header: "Optional: Sort and Export the Data",
      BulletPoints: [
        {
          Main: `Export will create an Export .xlsx file of all provided data for use.`,
          Additional: [`File Name: Compare_(Your Provided File Name).xlsx`, `Will be saved to your Downloads Folder`],
        },
      ],
      Note: "",
      img: StepSix,
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
