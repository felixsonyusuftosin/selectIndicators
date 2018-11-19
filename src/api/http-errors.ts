/**
 * @file -define http Errors and its status message
 */
// Local imports
import { errorDefs } from "src/types/enum";
import { HTTPErrorTypes } from "../types/types";

export interface IhttpError {
  status: number;
  statusMessage: HTTPErrorTypes;
  otherMessage: string;
  getStatusMessage(status: number): HTTPErrorTypes;
}

export class HttpError {
  public status: number;
  public statusMessage: HTTPErrorTypes;
  public otherMessage: string;
  constructor(status: number, otherMessage: string = 'No other information') {
    this.status = status;
    this.statusMessage = this.getStatusMessage(status);
    this.otherMessage = otherMessage;
  }
  private getStatusMessage = (status: number) => {
    if (status >= 400 && status !== 404 && status < 500) {
      return errorDefs.ERROR_4XX;
    } else if (status === 404) {
      return errorDefs.ERROR_404;
    }
    return errorDefs.ERROR_5XX;
  };
}
