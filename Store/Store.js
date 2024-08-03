import { create } from "zustand";
import { devtools } from "zustand/middleware";

let initState = {
  ModelCompareState: {
    originData: {},
    newData: {},
    CompareColumn: "",
    FileName: "",
    CurrentStep: 0,
    sortedby: "",
    sortedOrder: 0,
    visableTableShow: 0,
  },
  SheetCompareState: {
    oldData: {},
    newData: {},
    oldColumnCompare: "",
    newColumnCompare: "",
    oldFileName: "",
    newFileName: "",
    CurrentStep: 0,
    sortedby: "",
    sortedOrder: 0,
    oldVisableTableShow: 0,
    newVisableTableShow: 0,
  },
};

export const SheetCompareStore = create(
  devtools((set) => ({
    data: initState.SheetCompareState,
    setOldData: (data) => {
      set((state) => ({
        data: { ...state.data, oldData: data },
      }));
    },
    removeOldData: () => {
      set((state) => ({
        data: { ...state.data, oldData: {} },
      }));
    },
    setNewData: (data) => {
      console.log("setting new data");
      set((state) => ({
        data: { ...state.data, newData: data },
      }));
    },
    removeNewData: () => {
      set((state) => ({
        data: { ...state.data, newData: {} },
      }));
    },
    setOldColumnCompare: (data) => {
      set((state) => ({
        data: { ...state.data, oldColumnCompare: data },
      }));
    },
    removeOldColumnCompare: () => {
      set((state) => ({
        data: { ...state.data, oldColumnCompare: "" },
      }));
    },
    setNewColumnCompare: (data) => {
      set((state) => ({
        data: { ...state.data, newColumnCompare: data },
      }));
    },
    removeNewColumnCompare: () => {
      set((state) => ({
        data: { ...state.data, newColumnCompare: "" },
      }));
    },
    setOldFileName: (data) => {
      set((state) => ({
        data: { ...state.data, oldFileName: data },
      }));
    },
    removeOldFileName: () => {
      set((state) => ({
        data: { ...state.data, oldFileName: "" },
      }));
    },
    setNewFileName: (data) => {
      set((state) => ({
        data: { ...state.data, newFileName: data },
      }));
    },
    removeNewFileName: () => {
      set((state) => ({
        data: { ...state.data, newFileName: "" },
      }));
    },
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
    setOldVisableTableShow: (data) => {
      set((state) => ({
        data: { ...state.data, oldVisableTableShow: data },
      }));
    },
    setNewVisableTableShow: (data) => {
      set((state) => ({
        data: { ...state.data, newVisableTableShow: data },
      }));
    },
  }))
);

export const ModelCompareStore = create(
  devtools((set) => ({
    data: initState.ModelCompareState,
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
    setOriginData: (data) => {
      console.log("setting origin data");
      set((state) => ({
        data: { ...state.data, originData: data },
      }));
    },
    removeOriginData: () => {
      set((state) => ({
        data: { ...state.data, originData: {} },
      }));
    },
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
    setVisableTableShow: (data) => {
      set((state) => ({
        data: { ...state.data, visableTableShow: data },
      }));
    },
  }))
);
