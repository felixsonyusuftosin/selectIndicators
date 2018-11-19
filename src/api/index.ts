/**
 * @file - make api requests using
 */

// Third party imports
// N/A

// Local imports
import { IkeyValuePair } from "src/types";
import { headersEnum, httpTypeEnum } from "../types/enum";
import { IfetchOptions } from "../types/index";
import { HttpError } from "./http-errors";

// Global contants
const fetchOptions: IfetchOptions = {
  headers: {
    "Content-Type": headersEnum.json
  },
  method: httpTypeEnum.GET
  // mode: modeEnum.noCors,
  // cache: cacheTypeEnum.noCache
  // credentials: credentailsEnum.sanmeOrigin,
};

/**
 * @function makeGetRequest makes an http request
 * @param  { string } url
 * @param  { httpTypeEnum }  context
 * @return { Promise<{Object}>}
 */
export const makeGetRequest = (
  url: string,
  context = httpTypeEnum.GET
): Promise<IkeyValuePair> => {
  return new Promise((resolve, reject) => {
    if (context === httpTypeEnum.GET) {
      fetch(url, fetchOptions)
        .then((data: Response) => {
          const { statusText, status } = data;
          if (!data.ok) {
            const errorObject = new HttpError(status);
            errorObject.otherMessage = `Request encountered an error of status -  ${statusText}`;
            reject(errorObject);
          }
          data
            .json()
            .then((val: IkeyValuePair) => {
              resolve(val);
            })
            .catch(err => reject(err));
        })
        .catch(err => {
          const errorObject = new HttpError(500);
          errorObject.otherMessage = `The server encountered an error of status ${err}`;
          reject(errorObject);
        });
    } else {
      throw new Error("Only get request are supported at the moment");
    }
  });
};
