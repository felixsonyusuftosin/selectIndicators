/**
 * @file - display when a network request can not find resource
 */

// third party imports
import * as React from "react";

// local imports
import { Itree } from "src/types/index.js";
import { treeStructure } from "../../types/enum";
import { ItreeStructureCount } from "../../types/index";

// interface declaration
interface ItableView {
  treeStructureClass: ItreeStructureCount;
  level: string;
  selectIndicator(
    tree: Itree,
    level: string,
    status: boolean,
    treeName: string
  ): void;
}
/**
 * @function TableView - functional component that renders the table 
 * accordingly 
 */
export const TableView = (props: ItableView) => {
  const { selectIndicator, level, treeStructureClass } = props;

  return (
    <tr className="row200 body">
      <td
        className={
          treeStructureClass[treeStructure.THEMES][0].selected
            ? "selected cell100 column1 themes"
            : "cell100 column1 themes"
        }
      >
        {" "}
        {treeStructureClass[treeStructure.THEMES][0] ? (
          <div>{treeStructureClass[treeStructure.THEMES][0].nodeLabel}</div>
        ) : null}
      </td>
      <td className="cell100 column1 sub_themes">
        {treeStructureClass[treeStructure.SUBTHEMES].map(
          (subtheme: Itree, key: number) => {
            const { selected } = subtheme;
            return (
              <tr className={selected ? "selected" : ""} key={key}>
                <div>{subtheme.nodeLabel}</div>
              </tr>
            );
          }
        )}
      </td>
      <td className="cell100 column1 categories">
        {treeStructureClass[treeStructure.CATEGORIES].map(
          (category: Itree, key: number) => {
            const { selected } = category;
            return (
              <tr className={selected ? "selected" : ""} key={key}>
                <div> {category.nodeLabel}</div>
              </tr>
            );
          }
        )}
      </td>
      <td className="cell100 column1 indicators">
        {treeStructureClass[treeStructure.INDICATORS].map(
          (indicators: Itree, key: number) => {
            const { selected } = indicators;
            const treeName = treeStructureClass[treeStructure.THEMES][0]
              ? treeStructureClass[treeStructure.THEMES][0].nodeLabel
              : "None";
            const status = !selected;
            return (
              <tr
                key={key}
                // tslint:disable-next-line:jsx-no-lambda
                onClick={() =>
                  selectIndicator(indicators, level, status, treeName)
                }
                className={selected ? "selected" : ""}
              >
                {" "}
                <div>{indicators.nodeLabel}</div>
              </tr>
            );
          }
        )}
      </td>
    </tr>
  );
};
