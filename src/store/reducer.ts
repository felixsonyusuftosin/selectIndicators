/**
 * @file define generic reducers for the FTS APP
 */

// Local imports 
import { IactionType } from '../types/index';
import { actionDictionary } from './action-types';

// initial default state 
const initialState = {};

/**
 * @function returns reducers that represents the variables defined in the actionDictionary Constants 
 * @return  { Object } - return values 
 */
export const reducerObject = ():{} => {
    const reducers = {};
    Object.keys(actionDictionary()).map((actionKey: string) => {
        reducers[actionKey] = (state = initialState, action: IactionType<{}>) => {
            switch (action.type) {
                case actionDictionary()[actionKey].request:
                    {
                        return {
                            ...state,
                            fail: false,
                            payload: null,
                            pending: true
                        };
                    }
                case actionDictionary()[actionKey].recieve:
                    {
                        return {
                            ...state,
                            fail: false,
                            payload: action.payload,
                            pending: false
                        };
                    }
                case actionDictionary()[actionKey].fail:
                    {
                        return {
                            ...state,
                            fail: action.fail,
                            payload: null,
                            pending: false
                        };
                    }
                default:
                    return state;
            }
        };
    });
    return reducers;
}
