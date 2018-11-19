/**
 * @file - tests for actions-types
 */
// local imports
import { IactionObjects } from "src/types";
import { actionClasses, actionTypesTest } from "../types/enum";
import { actionDictionary } from "./action-types";

test(actionTypesTest.CONSTRUCT_ACTIONS, () => {
  const actionSet: IactionObjects = {
    ONTOLOGY_BLOCK: actionClasses.ONTOLOGY_BLOCK
  };
  const actions = actionDictionary(actionSet);
  const expectedObject = {
    ONTOLOGY_BLOCK: {
      fail: "FAIL_ONTOLOGY_BLOCK",
      recieve: "RECIEVE_ONTOLOGY_BLOCK",
      request: "REQUEST_ONTOLOGY_BLOCK"
    }
  };
  expect(actions).toEqual(expectedObject);
});
