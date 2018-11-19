import { Itree } from "src/types/index.js";
import { BuildTree } from "./build-tree";
/**
 * @file - provide selections functions
 */

/**
 * @method - return the count of selected tree pointing to the same parent
 * @param { Itree } - tree - value to search
 * @param { itree[] } - block - the current block
 * @return { number }
 */
export const getCountSelectedCategories = (
  tree: Itree,
  block: Itree[]
): number => {
  const { parentPosition } = tree;
  const treeCountArray = block.filter((value: Itree) => {
    return value.parentPosition === parentPosition && value.selected;
  });
  return treeCountArray.length;
};

/**
 * @method propagate selections along the tree
 * @param  { Itree[] } block
 * @param  { boolean } status
 * @param  { Itree } tree
 * @return { Itree[] }
 */
export const propagateSelections = (
  block: Itree[],
  status: boolean,
  tree: Itree
): Itree[] => {
  block[tree.position].selected = status;
  let { parentPosition, position } = tree;
  while (position >= 0) {
    const parent = block[parentPosition];
    block[position].selected = status;
    parentPosition = parent ? parent.parentPosition : null;
    position = parent ? parent.position : -1;
  }
  return block;
};

/**
 * @method selects an indicator and checks if its parent has being selected before
 * propagating events
 * @param  { Itree[] } block
 * @param  { boolean } status
 * @param  { Itree } tree
 * @return { Itree[] }
 */
export const selectionEvent = (
  block: Itree[],
  status: boolean,
  tree: Itree
): Itree[] => {
  if (status) {
    block = propagateSelections(block, status, tree);
    return block;
  } else {
    let { position } = tree;
    block[position].selected = status;
    while(position > 0){
      const treeSelectedCount = getCountSelectedCategories(block[position], block);
      if(treeSelectedCount < 1){
        block[block[position].parentPosition].selected = status;
      }
      position = block[position].parentPosition;
    }
   return block;
  }
};

/**
 * @method - select a block from a chain and return the chain
 * @param { string } - level
 * @param { BuildTree } - chain
 * @param { boolean } - status
 * @param { treeIndex } - number
 * @return { BuildTree}
 */
export const selectChain = (
  level: string,
  chain: BuildTree,
  status: boolean,
  treeIndex: number
) => {
  chain = { ...chain };
  const block = chain[level];
  const tree = block[treeIndex];
  const newBlock = selectionEvent(block, status, tree);
  chain[level] = newBlock;
  return chain;
};
