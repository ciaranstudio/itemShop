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

interface IDashboardContext {
  contextVal: boolean;
  setContextVal: Dispatch<SetStateAction<IDashboardContext["contextVal"]>>;
}

export const DashContext = createContext<IDashboardContext | null>(null);

export const useDashContext = () =>
  useContextWrapper(DashContext, {
    contextName: useDashContext.name,
    providerName: DashContextProvider.name,
  });

export const DashContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const [contextVal, setContextVal] =
    useState<IDashboardContext["contextVal"]>(false);

  const value = useMemo(() => ({ contextVal, setContextVal }), [contextVal]);

  return <DashContext.Provider value={value}>{children}</DashContext.Provider>;
};
