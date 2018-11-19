
/**
 * @file - This file constructs the tree and links them as an array from the input file
 * an object contains an array of every subtheme, and its children with each child linking to its parent via
 * a flag { previousTree }
 */

// Local imports
import { errorDefs } from '../types/enum';
import {
  Idata,
  IkeyValuePair,
  IsimpleObject,
  Itree
} from "../types/index";

// third party imports
// N/A

// class  - Tree  (Structure the data that holds our linked array of objects)
export class Tree implements Itree {

  // Class properties
  public nodeLabel: string;
  public keys: string[];
  public category: string = '';
  public selected: boolean = false;
  public data: IsimpleObject;
  public previousTree: string = '';
  public childLabel: string;
  public children: Idata[];
  public position: number = null;
  public parentPosition: number = null;

  constructor(data: Idata) {
    if (!data.name) {
      throw new TypeError(errorDefs.MUST_CONTAIN_NAME_KEY);
    }
    // Define public properties
    this.nodeLabel = data.name;
    this.keys = this.getKeys(data);
    this.data = this.getFields(data);
    this.childLabel = this.getFields(data, true).children;
    this.children = data[this.childLabel] as Idata[];
  }

  /**
   * @method getFields -  Get All the fields
   * if we need the array  field we pass getArrayField
   * otherwise we just pass in the data
   * @param { Object } data  - to be parsed by the method
   * @param { boolean } getArray - false gets non array fields while true gets array fields
   * @return { Object } - returns the appropriate object as required
   */
  public getFields = (data: IkeyValuePair, getArray = false): IkeyValuePair => {
    // constants
    const keys = Object.keys(data);
    let returnObj = {};
    keys.map((key: string) => {
      const item = data[key];
      if (!getArray && !Array.isArray(item)) {
        returnObj = { ...returnObj, [key]: item };
      } else if (getArray && Array.isArray(item)) {
        returnObj = {
          children: key
        };
      }
    });
    return returnObj;
  };

  /**
   * @method getKeys Get all the data value keys within the key value pair of the object
   * of the tree
   * @param {Object} data - parsed data
   * @return { string[]}
   */
  public getKeys = (data: IkeyValuePair) => {
    return Object.keys(data);
  };
}


