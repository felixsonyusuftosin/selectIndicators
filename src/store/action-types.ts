/**
 * @file defines a unified action type for all the actions used in the FTS Platform
 * This file does not need to be updated if the config file `redux-variables.ts` is properly configured
 * and updated
 */


 // Local imports
import { IactionObjects } from "src/types";
import { errorDefs } from "../types/enum";
import { IactionDict } from "../types/index";
import { ActionObjects } from "../types/types";
import { actionObjects } from "./action-objects";


// Configure action structure
const REQUEST_ITEM = (PARAM: ActionObjects) => `REQUEST_${PARAM}`;
const RECIEVE_ITEM = (PARAM: ActionObjects) => `RECIEVE_${PARAM}`;
const FAIL_ITEM = (PARAM: ActionObjects) => `FAIL_${PARAM}`;

/**
 * @method - constructs action dictionary
 * @param { IactionObjects }
 */
export const actionDictionary = (
  actionStructure: IactionObjects = actionObjects
): IactionDict => {
  const actions: IactionDict = {};
  Object.keys(actionStructure).map((key: ActionObjects) => {
    const actionLayer = actionStructure[key];
    if (!actionLayer) {
      throw new Error(errorDefs.WRONG_CONFIGURATIONS);
    }
    actions[actionLayer] = {
      fail: FAIL_ITEM(actionLayer),
      recieve: RECIEVE_ITEM(actionLayer),
      request: REQUEST_ITEM(actionLayer)
    };
  });
  return actions;
};
