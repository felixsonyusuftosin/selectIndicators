/**
 * @file this file implements a generic action
 * This file will typically not require updates or edits unless it for maintainance reasons
 * It unifies all action creators that will be called
 */

// third party imports
import { Dispatch } from "redux";

// local imports
import { IrequestAction } from "src/types";
import { HttpError } from '../api/http-errors';
import { errorDefs } from "../types/enum";
import { IactionFunctionType } from "../types/index";
import { ActionObjects } from "../types/types";
import { actionDictionary } from "./action-types";

/**
 * @function dispatch the appropriate action type , loads the actionDictionary
 * and maps the param with the appropriate dictionary value
 * @param { ActionObjects } - actionDictionaryKey -
 */
export const callActionType = (
  actionDictionaryKey: ActionObjects
): IrequestAction => {
  // Get reference to the appropriate action type
  const actionSet = actionDictionary()[actionDictionaryKey];
  if (!actionSet) {
    throw new Error(
      `The dictKey ${actionDictionaryKey} does not match any parameter of the actionDictionary object `
    );
  }
  // return appropriate action types
  const returnSet: IrequestAction = {
    request() {
      return {
        fail: null,
        payload: {},
        pending: true,
        type: actionSet.request
      };
    },
    recieve<T>(data: T) {
      return {
        fail: null,
        payload: data,
        pending: false,
        type: actionSet.recieve
      };
    },
    fail<T>(error: T) {
      return {
        fail: error,
        payload: null,
        pending: false,
        type: actionSet.fail
      };
    }
  };
  return returnSet;
};

/**
 * @function a generic action creator that calls the appropriate actions as required
 * @param { string } dictKey - the actionDictionary key that is being called
 * @param { ActionFunctionType } the parameter passed could either
 * be a function or an object
 * -------------------------------------------------------------------
 *  This function updates the store and calls the appropriate
 * reducer
 * -------------------------------------------------------------------
 */

export const dispatchActions = (
  dictKey: ActionObjects,
  eventAction: IactionFunctionType
) => {
  // set actions
  const actions: IrequestAction = callActionType(dictKey);
  return async <T>(dispatch: Dispatch<any>) => {
    // dispatch a request action
    dispatch(actions.request());
    const { func, value } = eventAction;
    if ((!func && !value) || !dictKey) {
      dispatch(actions.fail(errorDefs.PARAMETERS_INCOMPLETE));
      return false;
    } else {
      // Check if eventAction type
      if (func) {
        // Run block if func is promiselike
        try {
          func()
            .then((resolved: {}) => {
              dispatch(actions.recieve(resolved));
              return true;
            })
            .catch((err: HttpError) => {
              dispatch(actions.fail(err));
              return true;
            });
        } catch (err) {
          // func is no promiselike
          try {
            dispatch(actions.recieve(func()));
            return false;
          } catch (err) {
            dispatch(actions.fail(err));
            return true;
          }
        }
        // else blocks runs for normal objects  or values
      } else {
        dispatch(actions.recieve(value));
        return false;

      }
    }
    return false;
  };
};
