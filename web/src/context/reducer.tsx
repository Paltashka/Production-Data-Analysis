import { AppStateInterface, AppActionInterface } from "../interfaces/ReducerInterface"
import { SET_ACTIVE_TAB_INDEX, SET_ACTIVE_TAB } from "./types.js"

export const AppReducer = (state: AppStateInterface, action: AppActionInterface) => {
  switch (action.type) {
    case SET_ACTIVE_TAB_INDEX:
      return {
        ...state,
        activeTabId: action.payload,
      }
    case SET_ACTIVE_TAB:
      return {
        ...state,
        activeTab: action.payload,
      }
    default: {
      return state
    }
  }
}