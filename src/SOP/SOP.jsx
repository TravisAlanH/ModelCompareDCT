import React from "react";
import Step1 from "../SOP/Step1.png";
import Step2 from "../SOP/Step2.png";
import Step3 from "../SOP/Step3.png";
import Step4 from "../SOP/Step4.png";
import Step5 from "../SOP/Step5.png";
import Step6 from "../SOP/Step6.png";
import { CurrentStepStore } from "../../Store/Store";
import { FileNameStore } from "../../Store/Store";

export default function SOP() {
  const Step = CurrentStepStore((state) => state.data.CurrentStep);
  const fileName = FileNameStore((state) => state.data.FileName);

  return (
    <div className="flex flex-col">
      {Step == 0 ? StepMarker() : null}
      <img src={Step1} />
      {Step == 1 ? StepMarker() : null} <img src={Step2} />
      {Step == 2 ? StepMarker() : null} <img src={Step3} />
      {Step == 3 ? StepMarker() : null} <img src={Step4} />
      {Step == 4 ? StepMarker() : null} <img src={Step5} />
      {Step == 5 ? StepMarker() : null} <img src={Step6} />
    </div>
  );

  function StepMarker() {
    return (
      <div className="bg-orange-400 rounded-lg px-3 min-h-[3rem] flex flex-col justify-center">
        {fileName != "" ? <p className="text-lg font-bold text-white ">Current Step:</p> : null}
      </div>
    );
  }
}
