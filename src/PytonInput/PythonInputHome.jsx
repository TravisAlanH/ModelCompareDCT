import React from "react";
import Header from "./Comp/Header/Header";
import PytonInput from "./Inputs/PytonInput";

export default function PythonInputHome({ setViewPage }) {
  return (
    <div>
      <Header setViewPage={setViewPage} />
      <PytonInput />
    </div>
  );
}
