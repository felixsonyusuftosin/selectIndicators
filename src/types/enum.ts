/**
 * @file - define enumerations here
 */

// Enumeration for selection test suites
/**
 * @enum selectionTests enumeration for different values for testing selections
 */
export enum selectionTests {
  TEST_CATEGORIES_SELECTION = "Check if categories are selected on the block efficiently",
  TEST_PROPAGATION_SELECTION = "Check if selections are propagated along the tree efficiently",
  TEST_MULTIPLE_SELECTIONS = "Check if multiple selections are propagated efficiently"
}

/**
 * @enum linkedTests 
 */
export enum linkedTests {
  TEST_ALL_KEYS = "Check The trees keys if it gets all the keys of the object",
  TEST_ARRAY_MANAGEMENT = "Check if array is managed effectively by the tree class within the fields",
  TEST_INCREMENTER = "check the correctness of the  build tree class and the incrementer function"
}
// Enumeration for Errors
export enum errorDefs {
  MUST_CONTAIN_NAME_KEY = "Objects must contain the name attribute",
  WRONG_CONFIGURATIONS = "Wrong configuration settings",
  PARAMETERS_INCOMPLETE = "Sorry you didnt provide the full parameters required for loading this action",
  ERROR_4XX = "There was a problem with your request, please ensure the request url is well formed ",
  ERROR_404 = "The request URL was not found",
  ERROR_5XX = "There was a server error, the service hosting the request errored out"
}

// Enumeration for actionObjects
export enum actionClasses {
  ONTOLOGY_BLOCK = "ONTOLOGY_BLOCK",
  CHAIN = "CHAIN",
}

// Enumeration for action types
export enum actionTypesTest {
  CONSTRUCT_ACTIONS = "Test if actions are constructed effectively"
}

// Routes for the application
export enum routes { 
  ONTOLOGY = "/ontology",
  HOME  = "/",
  NOT_FOUND = "/notfound",
  ERROR = "/error"
}

// Query string params enum
export enum eQueryStringParam { 
  bracket = 'bracket',
  index = 'index',
  none = 'none'
}
export enum cacheTypeEnum { 
  noCache= "no-cache",
  reload = "reload",
  forceCache = "force-cache",
  onlyIfCached = "only-if-cached"
}
export enum credentialsEnum { 
  sameOrigin = "same-origin",
  include = 'include',
  omit = 'omit'
}
export enum modeEnum { 
  noCors = 'no-cors',
  cors = 'cors'
}
export enum headersEnum { 
  json = 'application/json; charset=utf-8',
  formEncoded = 'application/x-www-form-urlencoded'
}
/**
 * @enum - httpTypeEnum 
 */
 export enum httpTypeEnum { 
   POST = 'POST', 
   GET = 'GET',
   PATCH = 'PATCH',
   DELETE = 'DELETE'
 }

// enumeration types for structures of selection
export enum treeStructure { 
  THEMES =  'themes',
  SUBTHEMES = 'sub_themes',
  CATEGORIES = 'categories',
  INDICATORS = 'indicators'
}

// Test for table view component
export enum tableViewTests { 
  renderTests = 'It should render the table view correctly when appropriate props are passed',
  renderOntology = "It should shallowly render the ontology component"
}