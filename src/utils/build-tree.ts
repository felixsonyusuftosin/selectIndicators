/**
 * @file - define build tree class
 */

// local imports
import { IbuildTree, IcontainerNodes, Idata, Itree } from "../types/index";
import { Tree } from "./tree-structure";

// class Build-Tree - Builds an object with an array of trees
export class BuildTree implements IbuildTree {
  public childrenNodes: IcontainerNodes;
  constructor() {
    // Public properties
    this.childrenNodes = {}; // this will hold our tree objects as array of blocks
  }

  /**
   * @method - utility function that builds the key in the object
   * that is returned as our linked tree
   */
  public incrementer = (): string => {
    const items = Object.keys(this.childrenNodes);
    if (items.length < 1) {
      return "0";
    } else {
      const newLength = String(items.length);
      return newLength;
    }
  };

  /**
   * @Method - Populates the linked trees as an array within an object
   * hence each sub_item becomes an array - while the items within this array represents
   * the tree , linked together
   * @param {Object} node  - Dataset to convert to linked tree
   * @param {Tree} parent  - Parent of the item,if we are on  the first item it  has no parent hence it is assigned null
   */
  public populateTree = (node: Idata, parent: Itree = null) => {
    if (!parent) {
      const key = this.incrementer();
      this.childrenNodes = { ...this.childrenNodes, [key]: [] };
    }

    // Constants
    const currentKeyLength = Object.keys(this.childrenNodes).length - 1;
    const tree = new Tree(node);
    tree.nodeLabel = node.name;
    if (parent) {
      tree.category = parent.childLabel;
      tree.previousTree = parent.nodeLabel;
      tree.parentPosition = parent.position;
    } else {
      tree.parentPosition = null;
    }
    let currentTreePosition = this.childrenNodes[currentKeyLength].length;
    if (currentTreePosition > 0) {
      currentTreePosition = currentTreePosition;
    } else {
      currentTreePosition = 0;
    }
    tree.position = currentTreePosition;
    this.childrenNodes[currentKeyLength].push(tree);
    if (tree.children && tree.children.length > 0) {
      for (const i of tree.children) {
        const newNode = i;
        this.populateTree(newNode, tree);
      }
    }
  };
}
/**
 * @method calls the build tree class and builds a tree accordinly 
 * @param { Idata } input  - input tree 
 */
export const buildTreeFromInput = (input: Idata[]) => {
  const chain = new BuildTree();
  input.forEach((element: Idata) => {
    chain.populateTree(element);
  });
  return chain.childrenNodes;
};
