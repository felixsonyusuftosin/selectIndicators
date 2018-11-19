/**
 * @file - index ontology class
 */

// third party imports
import * as lodash from "lodash";
import * as queryString from "query-string";
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { bindActionCreators, Dispatch } from "redux";

// local imports
import { eQueryStringParam } from "src/types/enum";
import { IbuildTree, Itree } from "src/types/index.js";
import { HttpError } from "../../api/http-errors";
import { makeGetRequest } from "../../api/index";
import { defaultEndpoint } from "../../constants/end-points";
import { dispatchActions } from "../../store/action";
import { actionClasses, errorDefs, treeStructure } from '../../types/enum';
import {
  IdispatchParam,
  IkeyValuePair,
  Indicators,
  IstoreState
} from "../../types/index";
import { Idata, IqueryStringFormat } from "../../types/index";
import { buildTreeFromInput } from "../../utils/build-tree";
import { selectChain } from "../../utils/selection";
import { RequestErrorComponent } from "../static-pages/400";
import { NotFoundComponent } from "../static-pages/404";
import { ErrorComponent } from "../static-pages/500";
import { Header } from "../static-pages/header";
import { TableView } from "./table-view";
import { ItreeStructureCount } from "../../types/index";

// Interface
interface IontologyStates {
  hasError: boolean;
  loading: boolean;
  indicators?: Indicators;
  rawQueryString: string;
}
interface IontologyProps extends RouteComponentProps {
  chain: IbuildTree;
  ontologyBlock: Idata[];
  error: IkeyValuePair | HttpError;
  chainError: any;
  pending: boolean;
  dispatchActions: typeof dispatchActions;
}

// Default states
const defaultState: IontologyStates = {
  hasError: false,
  loading: true,
  rawQueryString: ""
};

// Array format for query string
const arrayFormat: IqueryStringFormat = {
  arrayFormat: eQueryStringParam.bracket
};
const headers = [
  treeStructure.THEMES,
  treeStructure.SUBTHEMES,
  treeStructure.CATEGORIES,
  treeStructure.INDICATORS
];
/**
 * ----------------------------------------------
 * LIFE_CYCLE METHODS
 * { constructor (props: IonologyStates) }
 * { componentDidlMount() }
 * { getSnapshotBeforeUpdate(prevProps: IontologyProps, prevState: IontologyStates) }
 * { componentDidUpdate(prevProps: IontologyProps, prevState: IontologyStates, snapshot? : any) }
 * { componentDidCatch(error: any, info: string) }
 * { render() }
 * ----------------------------------------------
 */
class Ontology extends React.Component<IontologyProps, IontologyStates> {
  // constructor
  constructor(props: IontologyProps) {
    super(props);
    this.state = defaultState;
  }

  // componentJustMounted
  public componentDidMount() {
    const { props } = this;
    const { search } = location;
    const urlLocation = queryString.parse(search, arrayFormat);
    if (Object.keys(urlLocation).length > 0) {
      this.setState(() => {
        return {
          rawQueryString: search
        };
      });
    }
    const { params } = props.match;
    const { unit } = params as any;
    // Fetch the data set
    const getInputTree = () => {
      return makeGetRequest(`${defaultEndpoint}/${unit}`);
    };
    // get the input tree
    this.props.dispatchActions(actionClasses.ONTOLOGY_BLOCK, {
      func: getInputTree
    });
  }

  // componentDidUpdate
  public componentDidUpdate(prevProps: IontologyProps) {
    const { ontologyBlock, chain } = this.props;
    const { rawQueryString } = this.state;
    // If new input tree comes in , construct chain from this input trees
    if (
      ontologyBlock &&
      !prevProps.ontologyBlock &&
      ontologyBlock &&
      !lodash.isEqual(prevProps.ontologyBlock, ontologyBlock)
    ) {
      const constructChain = () => {
        return buildTreeFromInput(ontologyBlock);
      };
      // Call the function to construct the train
      this.props.dispatchActions(actionClasses.CHAIN, { func: constructChain });
    }
    // If ontologyBlock is loaded and chain is loaded check if we have query string and
    // dispatch actions to update the store
    if (ontologyBlock && chain && rawQueryString) {
      this.decodeQueryString(rawQueryString);
    }
  }

  public componentDidCatch(error: any, info: React.ErrorInfo) {
    // Run to display error boundaries when error occours
    this.setState(() => {
      return {
        hasError: true
      };
    });
  }

  /**
   * ----------------------------------------------
   * Class methods
   * render error layer
   * select Indicator
   * decode query string
   * getTreeStructure 
   * ----------------------------------------------
   */

  /**
   * @method - renders the appropriate error layers depending on the HPP status
   * @param  { HttpError, IkeyValuePair } - the error being parsed
   * @return { ReacElement }
   */
  public renderErrorLayer = (error: HttpError | IkeyValuePair) => {
    const { statusMessage, otherMessage } = error as HttpError;
    switch (statusMessage) {
      case errorDefs.ERROR_404:
        return (
          <NotFoundComponent
            statusMessage={statusMessage}
            otherMessage={otherMessage}
          />
        );
      case errorDefs.ERROR_4XX:
        return (
          <RequestErrorComponent
            statusMessage={statusMessage}
            otherMessage={otherMessage}
          />
        );
      default:
        return (
          <ErrorComponent
            statusMessage={statusMessage}
            otherMessage={otherMessage}
          />
        );
    }
  };

  /**
   * @method - selects an indicator and propagate selections along parents
   * dispatches an action and updates the store with the selection
   * @param { Itree } - tree
   * @param { string } - level
   * @param { boolean } - status
   * @param { string } - treeName
   */
  public selectIndicator = (
    tree: Itree,
    level: string,
    status: boolean,
    treeName: string
  ) => {
    const { chain } = this.props;
    const getSelections = () => {
      return selectChain(level, chain, status, tree.position);
    };
    const { search, pathname } = location;
    let currentSearch = queryString.parse(search, arrayFormat);
    const keyIndex = `${tree.position.toString()}-${level}`;
    if (status) {
      currentSearch = { ...currentSearch, [keyIndex]: treeName };
    } else {
      delete currentSearch[keyIndex];
    }
    const query = queryString.stringify(currentSearch, arrayFormat);
    this.props.history.push({
      pathname,
      search: query
    });
    this.props.dispatchActions(actionClasses.CHAIN, { func: getSelections });
  };

  /**
   * @method - decodes the query string and dispatch actions to update the store with selected chain
   * @param { string } - rawQueryString
   */
  public decodeQueryString = (rawQueryString: string) => {
    const parsed = queryString.parse(rawQueryString, arrayFormat);
    const keys = Object.keys(parsed);
    keys.map((key: string) => {
      const splittedString = key.split("-");
      const getSelections = () => {
        const level = splittedString[1];
        const { chain } = this.props;
        const postion = parseInt(splittedString[0], 10);
        return selectChain(level, chain, true, postion);
      };
      this.props.dispatchActions(actionClasses.CHAIN, { func: getSelections });
    });
    this.setState(() => {
      return {
        rawQueryString: ""
      };
    });
  };

  /**
   * @method get delineations of items turn every tree in the array of trees to a structure according to its categories
   * @param { Itree }
   * @return { ItreeStructureCount}
   */
  public getTreeStructure = (block: Itree[]): ItreeStructureCount => {
    const treeClass: ItreeStructureCount = {
      [treeStructure.THEMES]: [],
      ["sub_themes"]: [],
      [treeStructure.CATEGORIES]: [],
      [treeStructure.INDICATORS]: []
    };
    block.map((tree: Itree) => {
      let { category = treeStructure.THEMES } = tree;
      if (!category) {
        category = treeStructure.THEMES;
      }
      treeClass[category] = [...treeClass[category], tree];
    });
    return treeClass;
  };

  // Render the component 
  public render() {
    const { error, chain, pending, chainError } = this.props;
    const { hasError } = this.state;
    if (error) {
      return (
        <div className="main-body">
          <Header />
          <div className="limiter" />
          {this.renderErrorLayer(error)}
        </div>
      );
    } else if (pending) {
      return <div className="loading"> Loading ...</div>;
    } else if (hasError || chainError) {
      return (
        <div className="main-body">
          <Header />
          <div className="limiter" />
          <div className="loading">
            {" "}
            Hey I wasnt expectiing that will you mind refreshing your browser
            ...
          </div>
        </div>
      );
    } else {
      return (
        <div className="main-body">
          <Header />
          <div className="limiter" />
          {chain ? (
            <div className="container-table100">
              <div className="wrap-table100">
                <div className="table100 ver1">
                  <div className="table100-firstcol">
                    <table>
                      <thead>
                        <tr className="row100 head">
                          {headers.map((head: string, key: number) => {
                            return (
                              <th className="cell100 column1" key={key}>
                                {head}
                              </th>
                            );
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        {Object.keys(chain).map(
                          (level: string, index: number) => {
                            const block = chain[level];
                            const treeStructureClass = this.getTreeStructure(block);
                            return (
                              <TableView
                                key={index}
                                selectIndicator={this.selectIndicator}
                                level={level}
                                treeStructureClass={treeStructureClass}
                              />
                            );
                          }
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      );
    }
  }
}
const matchDispathToProps = (
  dispatch: Dispatch<IdispatchParam<Itree[] | Idata | IbuildTree>>
) => {
  return bindActionCreators(
    {
      dispatchActions
    },
    dispatch
  );
};
const mapStateToProps = (state: IstoreState) => {
  const { chain, ontologyBlock } = state;
  return {
    chain: chain.payload,
    chainError: chain.fail,
    error: ontologyBlock.fail,
    ontologyBlock: ontologyBlock.payload,
    pending: ontologyBlock.pending || chain.pending
  };
};

export default connect(
  mapStateToProps,
  matchDispathToProps
)(withRouter<IontologyProps>(Ontology));
