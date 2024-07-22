import { create } from "zustand";
import { devtools } from "zustand/middleware";

// Initial state data
// let initialState = {
//   count: 0,
//   apples: 0,
// };

// // Zustand store for count
// export const useCountStore = create(
//   devtools((set) => ({
//     data: initialState,
//     increase: () =>
//       set((state) => ({
//         data: { ...state.data, count: state.data.count + 1 },
//       })),
//     decrease: () =>
//       set((state) => ({
//         data: { ...state.data, count: state.data.count - 1 },
//       })),
//   }))
// );

// // Zustand store for apples
// export const useAppleState = create(
//   devtools((set) => ({
//     data: initialState,
//     increaseApples: () =>
//       set((state) => ({
//         data: { ...state.data, apples: state.data.apples + 1 },
//       })),
//     decreaseApples: () =>
//       set((state) => ({
//         data: { ...state.data, apples: state.data.apples - 1 },
//       })),
//   }))
// );

let initState = {
  originData: {},
  newData: {},
  CompareColumn: "",
  FileName: "",
  CurrentStep: 0,
};

export const CurrentStepStore = create(
  devtools((set) => ({
    data: initState,
    setCurrentStep: (Step) => {
      set((state) => ({
        data: { ...state.data, CurrentStep: Step },
      }));
    },
    removeCurrentStep: () => {
      set((state) => ({
        data: { ...state.data, CurrentStep: 0 },
      }));
    },
  }))
);

export const FileNameStore = create(
  devtools((set) => ({
    data: initState,
    setFileName: (data) => {
      set((state) => ({
        data: { ...state.data, FileName: data },
      }));
    },
    removeFileName: () => {
      set((state) => ({
        data: { ...state.data, FileName: "" },
      }));
    },
  }))
);

export const CompareColumnStore = create(
  devtools((set) => ({
    data: initState,
    setCompareColumn: (data) => {
      set((state) => ({
        data: { ...state.data, CompareColumn: data },
      }));
    },
    resetCompareColumn: () => {
      set((state) => ({
        data: { ...state.data, CompareColumn: "" },
      }));
    },
  }))
);

export const originDataStore = create(
  devtools((set) => ({
    data: initState,
    setOriginData: (data) => {
      set((state) => ({
        data: { ...state.data, originData: data },
      }));
    },
    removeOriginData: () => {
      set((state) => ({
        data: { ...state.data, originData: {} },
      }));
    },
  }))
);

export const newDataStore = create(
  devtools((set) => ({
    data: initState,
    setNewData: (data) => {
      console.log(data);
      set((state) => ({
        data: { ...state.data, newData: data },
      }));
    },
    removeNewData: () => {
      set((state) => ({
        data: { ...state.data, newData: {} },
      }));
    },
  }))
);
