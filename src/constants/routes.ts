/**
 * @file - define routes for the app
 */

 // local imports 
import { routes } from 'src/types/enum';
import { IapplicationRoutes } from '../types/index';

// routes within the application
 export const applicationRoutes: IapplicationRoutes = { 
    errorPage: routes.ERROR,
    homePage: routes.HOME,
    ontologyPage: routes.ONTOLOGY,
    pageNotFound: routes.NOT_FOUND

 }

