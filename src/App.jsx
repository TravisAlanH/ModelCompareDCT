import React from "react";
import ModelCompareHome from "./Model_Compare/ModelCompareHome";
import HomePage from "./HomePage";
import SheetCompareHome from "./Sheet_Compare/SheetCompareHome";
import DuplicateSearchHome from "./Duplicate_Search/DuplicateSearchHome";
import PythonInputHome from "./PytonInput/PythonInputHome";

function App() {
  const [viewPage, setViewPage] = React.useState(0);

  const CurrentPage = [
    <HomePage setViewPage={setViewPage} />,
    <ModelCompareHome setViewPage={setViewPage} />,
    <SheetCompareHome setViewPage={setViewPage} />,
    <DuplicateSearchHome setViewPage={setViewPage} />,
    <PythonInputHome setViewPage={setViewPage} />,
  ];

  return <>{CurrentPage[viewPage]}</>;
}

export default App;
