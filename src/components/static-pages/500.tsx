/**
 * @file - display when an error occour either through a network request or
 * if there is an error w
 */

// third party imports
import * as React from "react";
import { HTTPErrorTypes } from "src/types/types";

// local imports
// N/A
export interface IerrorComponentProps {
  statusMessage: HTTPErrorTypes;
  otherMessage: string;
}
export const ErrorComponent = (props: IerrorComponentProps) => {
  const { statusMessage, otherMessage } = props;
  return (
    <div className="body-message">
      <div className = "bh1"> 500 </div>
      <div className ="bh2">{statusMessage}</div>
      <div className ="bh2">{otherMessage}</div>
    </div>
  );
};
