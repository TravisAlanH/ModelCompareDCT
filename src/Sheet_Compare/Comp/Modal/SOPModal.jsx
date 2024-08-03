import React from "react";
import SOP from "../SOP/SOP";

export default function SOPModal() {
  return (
    <div id="SOPSheetCompare" className="modal">
      <div className="modal-content-sop flex flex-col">
        <div className="flex flex-row justify-end">
          <span
            className="close"
            onClick={() => {
              document.getElementById("SOPSheetCompare").style.display = "none";
            }}
          >
            &times;
          </span>
        </div>
        <div className="flex flex-row justify-center pt-5 overflow-auto">
          <SOP />
        </div>
      </div>
    </div>
  );
}
