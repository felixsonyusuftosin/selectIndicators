/**
 * @file test-suites for selection
 */
// Local imports
import { selectionTests } from "../types/enum";
import { Itree } from "../types/index.js";
import { BuildTree } from './build-tree';
import * as testData from "./data.json";
import {
  getCountSelectedCategories,
  propagateSelections,
  selectionEvent
} from "./selection";

test(selectionTests.TEST_CATEGORIES_SELECTION, () => {
  const chain = new BuildTree();
  chain.populateTree(testData[0]);
  const block = chain.childrenNodes["0"];
  const lastTree =
    block[
      block.findIndex((value: Itree) => value.previousTree === "Administrative")
    ];
  const secondLastTree =
    block[
      block.findIndex(
        (value: Itree) =>
          value.previousTree === "Administrative" &&
          value.position !== lastTree.position
      )
    ];
  block[lastTree.position].selected = true;
  block[secondLastTree.position].selected = true;
  const countOfCategories = getCountSelectedCategories(lastTree, block);
  expect(countOfCategories).toEqual(2);
});

test(selectionTests.TEST_PROPAGATION_SELECTION, () => {
  const chain = new BuildTree();
  chain.populateTree(testData[0]);
  let block = chain.childrenNodes["0"];
  const lastTree =
    block[
      block.findIndex((value: Itree) => value.previousTree === "Administrative")
    ];

  block = propagateSelections(block, true, lastTree);
  let { parentPosition } = lastTree;
  while (parentPosition) {
    const parent = block[parentPosition];
    expect(parent.selected).toBeTruthy();
    parentPosition = parent.parentPosition;
  }
  block = propagateSelections(block, false, lastTree);
  let parentPosition2 = lastTree.parentPosition;
  while (parentPosition2) {
    const parent = block[parentPosition2];
    expect(parent.selected).toBeFalsy();
    parentPosition2 = parent.parentPosition;
  }
});

test(selectionTests.TEST_MULTIPLE_SELECTIONS, () => {
  const chain = new BuildTree();
  chain.populateTree(testData[0]);
  let block = chain.childrenNodes["0"];
  const lastTree =
    block[
      block.findIndex((value: Itree) => value.previousTree === "Administrative")
    ];
  const secondLastTree =
    block[
      block.findIndex(
        (value: Itree) =>
          value.previousTree === "Administrative" &&
          value.position !== lastTree.position
      )
    ];
  block = selectionEvent(block, true, lastTree);
  block = selectionEvent(block, true, secondLastTree);
  expect(block[lastTree.parentPosition].selected).toBeTruthy();
  block = selectionEvent(block, false, lastTree);
  expect(block[lastTree.parentPosition].selected).toBeTruthy();
  block = selectionEvent(block, false, secondLastTree);
  expect(block[lastTree.parentPosition].selected).toBeFalsy();
});
