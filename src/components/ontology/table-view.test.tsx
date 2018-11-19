/**
 * @file - tests for table view
 */
// tslint:disable:no-angle-bracket-type-assertion
import { mount, render, shallow } from "enzyme";
import * as enzyme from 'enzyme';
import * as React from "react";
import { tableViewTests, treeStructure } from "../../types/enum";
import { Itree, ItreeStructureCount } from '../../types/index';
import { treeStructureType } from "../../types/types";
import { BuildTree } from '../../utils/build-tree';
import * as testData from '../../utils/data.json'
import { TableView } from "./table-view";

// tslint:disable-next-line:no-var-requires
const Adapter = require('enzyme-adapter-react-16');
enzyme.configure({ adapter: new Adapter() });

const chain = new BuildTree();
chain.populateTree(testData[0]);
const testBlock = chain.childrenNodes["0"];

const getTreeStructure = (block: Itree[]): ItreeStructureCount => {
  const treeClass: ItreeStructureCount = {
    [treeStructure.THEMES]: [],
    ["sub_themes"]: [],
    [treeStructure.CATEGORIES]: [],
    [treeStructure.INDICATORS]: []
  };
  block.map((tree: Itree) => {
    let { category = treeStructure.THEMES } = tree;
    if (!category) {
      category = treeStructure.THEMES;
    }
    treeClass[category] = [...treeClass[category], tree];
  });
  return treeClass;
};

const newChain = getTreeStructure(testBlock);


it(tableViewTests.renderTests, () => {
  const component = shallow(
    // tslint:disable-next-line:jsx-no-lambda
    <TableView level={'1'} selectIndicator={()=> null} treeStructureClass={newChain} />
  );
  expect(component).toMatchSnapshot();
});
