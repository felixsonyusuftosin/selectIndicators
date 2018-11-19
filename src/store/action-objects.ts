
/**
 * @file Determines all the variables we will be needing for the redux store
 * The redux store promises to have only one implementation for action creators and action types 
 * and reducers hence all the variables are preset 
 * All defined variables will come with a doc that represents what they do  
 */


//  Third Party Imports 
// N/A

 // Local Imports 
 import { IactionObjects } from "src/types";
import { actionClasses } from '../types/enum';


/**
 * @const - this will populate the redux store with the required actions 
 * ****************************************
 * TO UPDATE THIS CONFIG VARIABLE 
 * ****************************************
 * *** Key Represents the reference to the layer ***
 * *** Values should be a string of type ActionObjects 
 */
const { ONTOLOGY_BLOCK, CHAIN } = actionClasses;

export const actionObjects: IactionObjects = {
    CHAIN,
    ONTOLOGY_BLOCK
};