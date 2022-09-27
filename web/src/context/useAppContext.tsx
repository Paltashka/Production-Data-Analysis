import { useAppDispatch, useAppState } from "./index";
import { SET_ACTIVE_TAB_INDEX, SET_ACTIVE_TAB } from "./types";
import { DataItemInterface } from "../interfaces/DataItemInterface";

export const useAppContext = () => {
  const context = useAppDispatch();
  const { activeTabId, activeTab } = useAppState()

  const setActiveTabId = (payload: number) => {
    context({
      type: SET_ACTIVE_TAB_INDEX,
      payload 
    })
  }

  const setActiveTab = (payload: DataItemInterface[]) => {
    context({
      type: SET_ACTIVE_TAB,
      payload 
    })
  }

  return {
    activeTabId,
    setActiveTabId,
    activeTab,
    setActiveTab
  }
}