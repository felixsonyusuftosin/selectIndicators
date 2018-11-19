/**
 * @file - linked.js tests
 */
// tslint:disable:object-literal-sort-keys
// Local imports
import { linkedTests } from '../types/enum';
import { BuildTree } from './build-tree';
import { Tree } from './tree-structure';

/**
 * @abstract tests the tree class
 */
// Create objects to pass into our tree class  and use for test
// Test object 1
const abit1 = {
  // This class is defined without the name attribute
  one: "one",
  two: "two",
  three: "three",
  four: "four",
  name: "abit1"
};
// Test object 2
const abit2 = {
  // This class is defined with the name attribure
  one: "one",
  name: "abit2",
  two: "two",
  three: "three",
  four: "four",
  five: [
    {
      one: " one",
      name: "XXX",
      sub: [
        { two: "two", name: "XXX" },
        { three: "three", name: "XXX" },
        { four: "four", name: "XXX" }
      ]
    },
    { two: "two", name: "XXX" },
    { three: "three", name: "XXX" },
    {
      four: "four",
      name: "YYYY",
      last: [
        { twol: "twol", name: "XXX" },
        { threel: "threel", name: "XXX" },
        { fourl: "fourl", name: "XXX" }
      ]
    }
  ]
};
test(linkedTests.TEST_ALL_KEYS, () => {
  const tree = new Tree(abit1);
  expect(tree.keys).toEqual(["one", "two", "three", "four", "name"]);
  expect(tree.data).toEqual({
    one: "one",
    two: "two",
    three: "three",
    four: "four",
    name: "abit1"
  });
});
test(linkedTests.TEST_ARRAY_MANAGEMENT, () => {
  const tree = new Tree(abit2);
  expect(tree.data).toEqual({
    one: "one",
    name: "abit2",
    two: "two",
    three: "three",
    four: "four"
  });
  expect(tree.childLabel).toEqual("five");
  expect(tree.children.length).toEqual(4);
});

/**
 * @abstract tests the build tree class
 */
test(linkedTests.TEST_INCREMENTER, () => {
  // Tes with empty chldren node
  const buildTree = new BuildTree();
  const incrementByOne = buildTree.incrementer();
  
  expect(buildTree.childrenNodes).toEqual({});
  // Populate and test with children node
  buildTree.childrenNodes = { "0": [] };
  const incrementByTwo = buildTree.incrementer();
  expect(incrementByOne).toEqual("0");
  expect(incrementByTwo).toEqual("1");

  // Check the correctness of the buildtree method populateTree
  const newBuildTree = new BuildTree();
  newBuildTree.populateTree(abit2);
  const { childrenNodes } = newBuildTree;
  // get the length of items in children nodes
  expect(Object.keys(childrenNodes).length).toEqual(1);
  // test for  the last element must be equal to XXX
  expect(childrenNodes["0"][childrenNodes["0"].length - 1].nodeLabel).toEqual(
    "XXX"
  );
  // Test if the last element is the last cild of the linked tree
  expect(childrenNodes["0"][childrenNodes["0"].length - 1].category).toEqual(
    "last"
  );
  // Test if the last element reference its parent within the  previousTree flag
  expect(
    childrenNodes["0"][childrenNodes["0"].length - 1].previousTree
  ).toEqual("YYYY");
  // Test if the element reference null as its  parent within the  previousTree flag
  expect(childrenNodes["0"][0].previousTree).toEqual("");
});
