import {
  SET_CAMPAIGN_FORM_ORGRANIZATION,
  SET_CAMPAIGN_FORM_EMAIL,
  SET_CAMPAIGN_FORM_TITLE,
  SET_CAMPAIGN_FORM_DESCRIPTION,
  SET_CAMPAIGN_FORM_AMOUNT,
  SET_CAMPAIGN_FORM_BADGE1,
  SET_CAMPAIGN_FORM_BADGE2,
  SET_CAMPAIGN_FORM_BADGE3,
  SET_CAMPAIGN_FORM_RESET,
  SET_CAMPAIGN_FORM_TNC,
} from "../actionType";
import { InitialAppContextState, IAppContextState } from ".";

export interface IAction {
  type:
    | typeof SET_CAMPAIGN_FORM_ORGRANIZATION
    | typeof SET_CAMPAIGN_FORM_EMAIL
    | typeof SET_CAMPAIGN_FORM_TITLE
    | typeof SET_CAMPAIGN_FORM_DESCRIPTION
    | typeof SET_CAMPAIGN_FORM_AMOUNT
    | typeof SET_CAMPAIGN_FORM_BADGE1
    | typeof SET_CAMPAIGN_FORM_BADGE2
    | typeof SET_CAMPAIGN_FORM_BADGE3
    | typeof SET_CAMPAIGN_FORM_RESET
    | typeof SET_CAMPAIGN_FORM_TNC;
  value: any;
}

const CampaignContext = (
  state: IAppContextState,
  action: IAction
): IAppContextState => {
  switch (action.type) {
    case SET_CAMPAIGN_FORM_ORGRANIZATION:
      return {
        ...state,
        organization: action.value,
      };
    case SET_CAMPAIGN_FORM_EMAIL:
      return {
        ...state,
        contactPersonEmail: action.value,
      };
    case SET_CAMPAIGN_FORM_TITLE:
      return {
        ...state,
        title: action.value,
      };
    case SET_CAMPAIGN_FORM_DESCRIPTION:
      return {
        ...state,
        description: action.value,
      };
    case SET_CAMPAIGN_FORM_AMOUNT:
      return {
        ...state,
        amount: action.value,
      };
    case SET_CAMPAIGN_FORM_BADGE1:
      return {
        ...state,
        badge1: action.value,
      };
    case SET_CAMPAIGN_FORM_BADGE2:
      return {
        ...state,
        badge2: action.value,
      };
    case SET_CAMPAIGN_FORM_BADGE3:
      return {
        ...state,
        badge3: action.value,
      };
    case SET_CAMPAIGN_FORM_TNC:
      return {
        ...state,
        tnc: action.value,
      };
    case SET_CAMPAIGN_FORM_RESET:
      return InitialAppContextState;
    default:
      return state;
  }
};

export default CampaignContext;
