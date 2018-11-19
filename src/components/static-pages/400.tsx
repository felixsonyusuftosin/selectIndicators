/**
 * @file - display when a network request can not find resource
 */

// third party imports
import * as React from "react";
import { HTTPErrorTypes } from "src/types/types";

export interface IrequestErrorComponent {
  statusMessage: HTTPErrorTypes;
  otherMessage: string;
}
// local imports
// N/A

export const RequestErrorComponent = (props: IrequestErrorComponent) => {
  const { statusMessage, otherMessage } = props;
  return (
    <div className="body-message">
      <div className = "bh1"> 400 </div>
      <div className ="bh2">{statusMessage}</div>
      <div className ="bh2">{otherMessage}</div>
    </div>
  );
};
