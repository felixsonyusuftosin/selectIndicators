/**
 * @file define types here
 */
// Local imports
import {
  actionClasses,
  cacheTypeEnum,
  credentialsEnum,
  eQueryStringParam,
  errorDefs,
  headersEnum,
  httpTypeEnum,
  modeEnum,
  routes,
  treeStructure
} from "./enum";

// types for action-objects
export type ActionObjects = actionClasses.ONTOLOGY_BLOCK | actionClasses.CHAIN;

// types for routes
export type RoutesParam =
  | routes.ERROR
  | routes.HOME
  | routes.NOT_FOUND
  | routes.ONTOLOGY;

// types for query string format

export type queryStringFormat =
  | eQueryStringParam.bracket
  | eQueryStringParam.index
  | eQueryStringParam.none;

export type CacheTypes =
  | cacheTypeEnum.forceCache
  | cacheTypeEnum.reload
  | cacheTypeEnum.onlyIfCached
  | cacheTypeEnum.noCache;

export type CredentialTypes =
  | credentialsEnum.include
  | credentialsEnum.sameOrigin
  | credentialsEnum.include
  | credentialsEnum.omit;

export type ModeTypes = modeEnum.cors | modeEnum.noCors;

export type HeaderTypes = headersEnum.json | headersEnum.formEncoded;

export type HTTPMethodTypes =
  | httpTypeEnum.POST
  | httpTypeEnum.GET
  | httpTypeEnum.PATCH
  | httpTypeEnum.DELETE;

export type HTTPErrorTypes =
  | errorDefs.ERROR_404
  | errorDefs.ERROR_4XX
  | errorDefs.ERROR_5XX;

export type treeStructureType =
  | treeStructure.CATEGORIES
  | treeStructure.INDICATORS
  | treeStructure.SUBTHEMES
  | 'sub_themes'
  | treeStructure.THEMES;
