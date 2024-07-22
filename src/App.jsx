// import { useCountStore } from "../Store/Store";
// import { useAppleState } from "../Store/Store";
import ExcelInputNew from "./Comp/Inputs/ExcelInputNew";
import ExcelInputOrigin from "./Comp/Inputs/ExcelInputOrigin";
import Table from "./Comp/Table/Table";
import { CompareColumnStore } from "../Store/Store";
import Modal from "./Comp/Modal/Modal";
import Header from "./Comp/Header/Header";
import { FileNameStore } from "../Store/Store";
import SOP from "./SOP/SOP";
import SOPButton from "./Comp/Buttons/SOPButton";
import SOPModal from "./Comp/Modal/SOPModal";
import Footer from "./Comp/Footer/Footer";
import { CurrentStepStore } from "../Store/Store";

function App() {
  const setCurrentStep = CurrentStepStore((state) => state.setCurrentStep);
  const fileName = FileNameStore((state) => state.data.FileName);
  const SelectedColumn = CompareColumnStore((state) => state.data.CompareColumn);

  // const count = useCountStore((state) => state.data.count);
  // const apples = useAppleState((state) => state.data.apples);

  // console.log(count, apples);

  // function increase() {
  //   const upOne = useCountStore((state) => state.increase);
  //   return (
  //     <button className="bg-green-400" onClick={upOne}>
  //       Up 1
  //     </button>
  //   );
  // }

  // function moreApples() {
  //   const upOneApple = useAppleState((state) => state.increaseApples);
  //   return (
  //     <button className="bg-red-400" onClick={upOneApple}>
  //       Up 1
  //     </button>
  //   );
  // }

  return (
    <>
      <Header />
      {fileName != "" ? <SOPButton /> : null}
      <div className="flex flex-col">
        {/* <div className="flex flex-row gap-2">
          <button>count is {count}</button>
          {increase()}
        </div>
        <div className="flex flex-row gap-2">
          <button>apples is {apples}</button>
          {moreApples()}
        </div> */}
        <div className="flex flex-row justify-center gap-5 py-2">
          <ExcelInputOrigin />
          <div className="flex flex-row gap-5 justify-center">
            {/* {fileName !== "" ? ( */}
            <div
              className={`px-3 flex flex-row items-center rounded-md font-bold ${
                fileName == "" ? "bg-gray-200" : SelectedColumn != "" ? "bg-gray-200" : "bg-orange-400 text-white"
              }`}
            >
              <p>Select The Model Column Below</p>
            </div>
            {/* ) : null} */}
            <div>
              {/* {SelectedColumn !== "" ? ( */}
              <button
                className={`px-3 h-[3rem] flex flex-row items-center rounded-md font-bold ${SelectedColumn != "" ? "bg-orange-400 text-white" : "bg-gray-200"}`}
                disabled={SelectedColumn == "" ? true : false}
                onClick={() => {
                  setCurrentStep(4);
                  document.getElementById("ProcessModal").style.display = "block";
                }}
              >
                Open Process
              </button>
              {/* ) : null} */}
            </div>
          </div>
        </div>
        <div className="px-5 flex flex-row justify-center">
          <Table />
        </div>
        {fileName == "" ? (
          <div className="flex flex-row justify-center pt-5">
            <SOP />
          </div>
        ) : null}
        <Modal />
        <SOPModal />

        <Footer />
      </div>
    </>
  );
}

export default App;
