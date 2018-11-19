// third party imports
import * as React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

// Local imports
import Ontology from "./components/ontology/index";
import { NotFoundComponent } from "./components/static-pages/404";
import { ErrorComponent } from "./components/static-pages/500";
import { applicationRoutes } from "./constants/routes";
import "./styles/App.css";
import "./styles/main.css";
import "./styles/util.css";

class App extends React.Component {
  public render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            path={applicationRoutes.homePage}
            exact={true}
            // component={Welcome}
            render={
              // tslint:disable-next-line:jsx-no-lambda
              () => (
                <Redirect
                  to={{
                    pathname: `${applicationRoutes.ontologyPage}/input`
                  }}
                />
              )
            }
          />
          <Route
            path={`${applicationRoutes.ontologyPage}/:unit`}
            component={Ontology}
          />
          <Route
            path={applicationRoutes.errorPage}
            component={ErrorComponent}
          />
          <Route component={NotFoundComponent} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
