import { create } from "zustand";
import { devtools } from "zustand/middleware";

let initState = {
  originData: {},
  newData: {},
  CompareColumn: "",
  FileName: "",
  CurrentStep: 0,
  sortedby: "",
  sortedOrder: 0,
};

export const SortedStore = create(
  devtools((set) => ({
    data: initState,
    setSorted: (sortedby, sortedOrder) => {
      set((state) => ({
        data: { ...state.data, sortedby: sortedby, sortedOrder: sortedOrder },
      }));
    },
    removeSorted: () => {
      set((state) => ({
        data: { ...state.data, sortedby: "", sortedOrder: 0 },
      }));
    },
  }))
);

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
