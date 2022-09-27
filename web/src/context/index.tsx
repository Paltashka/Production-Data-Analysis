import React, { createContext, Dispatch, useContext, useReducer  } from "react"
import { AppStateInterface } from "../interfaces/ReducerInterface"
import { AppReducer } from "./reducer"
import { AppActionInterface } from "../interfaces/ReducerInterface"

const AppStateContext = createContext<AppStateInterface>({})
const AppDispatchContext = createContext<Dispatch<AppActionInterface> | undefined>(undefined)

interface ProviderProps {
  children: JSX.Element | JSX.Element[];
}

const AppProvider = ({ children }: ProviderProps) => {
  const [state, dispatch] = useReducer(AppReducer, {
    activeTabId: 0,
    activeTab: null,
  })

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  )
}

const useAppState = () => {
  const context = useContext(AppStateContext)

  if (context === undefined) {
    throw new Error("useTopLevelState must be used within a TopLevelProvider")
  }
  return context
}

const useAppDispatch = () => {
  const context = useContext(AppDispatchContext)

  if (context === undefined) {
    throw new Error(
      "useTopLevelDispatch must be used within a TopLevelProvider"
    )
  }
  return context
}

export { AppProvider, useAppState, useAppDispatch }
