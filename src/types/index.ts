
/**
 * @file - Define all types here
 */

// Local imports
import {
  ActionObjects,
  CacheTypes,
  CredentialTypes,
  HeaderTypes,
  HTTPMethodTypes,
  ModeTypes,
  queryStringFormat,
  RoutesParam
} from "./types";
// Interfaces
export interface IkeyValuePair {
  // Generic interface that handles objects of unknown types
  [Key: string]: any;
}

export interface Idata {
  name: string;
  [key: string]: string | number | IkeyValuePair[];
}

export interface IsimpleObject {
  // Defines interface for simple objects
  // whose keys are strings and values are string | number
  [key: string]: number | string;
}

export interface Itree {
  // Interface defination for class Tree

  nodeLabel: string; // The label of the field
  keys: string[]; // The fields within this tree
  category: string; // The category of this tree e.g indicators
  selected: boolean; // A flag to define if this tree is selected
  data: IsimpleObject; // All the Data stored on the fields asides that holding an array
  previousTree: string; // A flag that links to the previous tree - in the heirachy
  childLabel: string; // The label of the array field
  children: IkeyValuePair[]; // Children of this tree
  position: number; // Position on the block
  parentPosition: number; // previous tree position on the blovks
  getFields(data: IkeyValuePair, getArray: boolean): IkeyValuePair;
  getKeys(data: IkeyValuePair): string[];
}

export interface IcontainerNodes {
  // Interface defination for containers of children nodes in
  // Ibuild tree
  [key: string]: Itree[];
}

export interface IbuildTree {
  // Interface definition for buildtreee class
  childrenNodes: IcontainerNodes;
  populateTree(node: Idata, parent: Itree | null): void;
  incrementer(): string;
}

export interface IsearchTerm {
  // interface declaration for searching for element inecis within
  // an  array
  searchItem: string; // Item to searchfor
  searchCategory: string; // category to search for
}

export interface IactionObjects {
  // Interface  declaration for action objects
  [key: string]: ActionObjects;
}

export interface IactionDict {
  // @interface defination for actions
  //  all actions will have three possible sub fields
  [key: string]: {
    request: string;
    recieve: string;
    fail: string;
  };
}

export interface IdispatchParam<T> {
  // interface for dispatching actions
  type: string;
  pending: boolean;
  payload?: T; // Payload is dependent on the value passed
  fail?: T;
}

export interface IactionFunctionType {
  // Function passed on to actions called with dispatch
  value?: { [key: string]: any };
  func?<T>(param?: T): T | any;
}

export interface IrequestAction {
  // interface for requesting for an action
  request(): IdispatchParam<{}>;
  recieve<T>(data: T): IdispatchParam<T>;
  fail<T>(error: T): IdispatchParam<T>;
}

export interface IactionType<T> extends IdispatchParam<T> {
  // interface defination for reducers
  payload: T;
}

export interface IapplicationRoutes {
  // interface declaration for application routes
  homePage: RoutesParam;
  errorPage: RoutesParam;
  ontologyPage: RoutesParam;
  pageNotFound: RoutesParam;
}
export interface IstoreState {
  // state of the redux store
  ontologyBlock: IdispatchParam<Idata[]>;
  chain: IdispatchParam<IbuildTree>;
}

export interface IqueryStringFormat {
  // QueryStringFormat interface
  arrayFormat: queryStringFormat;
}

export interface Indicators {
  // inderface defination for indicatoo parametes on string
  [key: string]: string[];
}

export interface IfetchOptions extends RequestInit {
  // Fetchoptions interface
  method: HTTPMethodTypes;
  mode?: ModeTypes;
  cache?: CacheTypes;
  credentials?: CredentialTypes;
  headers: { "Content-Type": HeaderTypes };
  body?: any;
}
export interface ItreeStructureCount {
  themes: Itree[];
  subtheme?: Itree[];
  categories: Itree[];
  indicators: Itree[];
  [key: string]: Itree[];
}
