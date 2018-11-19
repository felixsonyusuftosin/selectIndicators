// third party imports
import * as humps from "humps";
import { applyMiddleware, combineReducers, createStore } from "redux";
import logger from "redux-logger";
import * as promise from 'redux-promise';
import thunk from "redux-thunk";

// local imports
import { IkeyValuePair } from "src/types";
import { reducerObject } from "./reducer";

/**
 * @method convertToCamelCase  converts  any object fields to camel case
 * @param { object } obj input object that fields needs to  be converted
 * @return { object | string } then pobject returned after fields has being converted to camelcase
 */
export const convertToCamelCase = (
  obj: IkeyValuePair | string
): IkeyValuePair | string => {
  if (typeof obj === "object") {
    return humps.camelizeKeys(obj);
  } else {
    return humps.camelize(obj);
  }
};

/**
 * @method merge reducers and return object
 */
export const updateReducersObject = (): {} => {
  const mergedReducers = {};
  const objectDict = reducerObject();
  Object.keys(objectDict).map((key: string, index: number) => {
    mergedReducers[String(convertToCamelCase(key.toLocaleLowerCase()))] =
      objectDict[key];
  });
  return mergedReducers;
};
// Combine reducers
const allReducers = combineReducers({
  ...updateReducersObject()
});

let store: any;
// Ensure logger will not show in production
if (process.env.NODE_ENV === "development") {
  store = createStore(allReducers, applyMiddleware(thunk, logger, promise.default));
} else { 
    store = createStore(allReducers, applyMiddleware(thunk, promise.default)); 
}
export default store;
