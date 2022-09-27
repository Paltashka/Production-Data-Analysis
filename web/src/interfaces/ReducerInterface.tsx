import { DataItemInterface } from "./DataItemInterface";

export interface AppStateInterface {
  activeTabId?: number;
  activeTab?: DataItemInterface[];
}

export interface AppActionInterface {
  type: string;
  payload?: any;
}