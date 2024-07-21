import React from "react";
import Step1 from "../SOP/Step1.png";
import Step2 from "../SOP/Step2.png";
import Step3 from "../SOP/Step3.png";
import Step4 from "../SOP/Step4.png";
import Step5 from "../SOP/Step5.png";
import Step6 from "../SOP/Step6.png";

export default function SOP() {
  return (
    <div className="flex flex-col">
      <img src={Step1} />
      <img src={Step2} />
      <img src={Step3} />
      <img src={Step4} />
      <img src={Step5} />
      <img src={Step6} />
    </div>
  );
}
