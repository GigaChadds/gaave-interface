import AppReducer, { IAction } from "./reducer";
import React, { Dispatch, createContext, useReducer } from "react";
import { allowedStatusCodes } from "next/dist/lib/load-custom-routes";

export interface IAppContextState {
  organization: string;
  contactPersonEmail: string;
  title: string;
  description: string;
  amount: number;
  tnc: boolean;
  badge1: File | null;
  badge2: File | null;
  badge3: File | null;
}

export interface InitialContextProps {
  appState: IAppContextState;
  appDispatch: Dispatch<IAction>;
}

export const InitialAppContextState: IAppContextState = {
  organization: "",
  contactPersonEmail: "",
  title: "",
  description: "",
  amount: 0,
  tnc: false,
  badge1: null,
  badge2: null,
  badge3: null,
};

export const CampaignContext = createContext({} as InitialContextProps);

const CampaignContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [appState, appDispatch] = useReducer(
    AppReducer,
    InitialAppContextState
  );

  return (
    <CampaignContext.Provider value={{ appState, appDispatch }}>
      {children}
    </CampaignContext.Provider>
  );
};

export default CampaignContextProvider;
