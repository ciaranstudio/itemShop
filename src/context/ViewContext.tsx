import React from "react";
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useMemo,
  useState,
} from "react";
import useContextWrapper from "../hooks/useContextWrapper";
import { State, useOptionStore } from "../store/useOptionStore";
// import { Action } from "../store/useOptionStore";

interface IDashboardContext {
  contextVal: State | undefined;
  setContextVal: Dispatch<SetStateAction<IDashboardContext["contextVal"]>>;
}

export const DashContext = createContext<IDashboardContext | null>(null);

export const useDashContext = () =>
  useContextWrapper(DashContext, {
    contextName: useDashContext.name,
    providerName: DashContextProvider.name,
  });

export const DashContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const storeState = useOptionStore((state) => state);
  console.log("storeState: ", storeState);
  const [contextVal, setContextVal] =
    useState<IDashboardContext["contextVal"]>(storeState);
  // get state values for State and Action props from zustand store hook
  const value = useMemo(() => ({ contextVal, setContextVal }), [contextVal]);

  return <DashContext.Provider value={value}>{children}</DashContext.Provider>;
};
