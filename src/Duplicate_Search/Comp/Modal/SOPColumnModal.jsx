import React from "react";
import SOPColumn from "../../SOP/SOPColumn";

export default function SOPColumnModal() {
  return (
    <div id="SOPDuplicateColumnSelection" className="modal">
      <div className="modal-content-sop flex flex-col">
        <div className="flex flex-row justify-end">
          <span
            className="close"
            onClick={() => {
              document.getElementById("SOPDuplicateColumnSelection").style.display = "none";
            }}
          >
            &times;
          </span>
        </div>
        <div className="flex flex-row justify-center pt-5 overflow-auto">
          <SOPColumn />
        </div>
      </div>
    </div>
  );
}
