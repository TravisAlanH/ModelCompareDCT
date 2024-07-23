import React from "react";
import ModelCompareHome from "./Model_Compare/ModelCompareHome";
import HomePage from "./HomePage";

function App() {
  const [viewPage, setViewPage] = React.useState(0);

  const CurrentPage = [<HomePage setViewPage={setViewPage} />, <ModelCompareHome />];

  return <>{CurrentPage[viewPage]}</>;
}

export default App;
