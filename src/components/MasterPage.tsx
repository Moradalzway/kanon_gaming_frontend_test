import React from "react";
import CheckCountry from "../pages/CheckCountry";
import { Switch, Route } from "react-router-dom";
import AllCountries from "../pages/AllCountries";

class MasterPage extends React.Component {
  render() {
    return (
      <div className="container-full">
        <div>
          <div className="page-content">
            <Switch>
              <Route path="/check-country" exact component={CheckCountry}></Route>
              <Route path="/check-country" exact component={CheckCountry}></Route>
              <Route path="/all-countries" exact component={AllCountries}></Route>
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export { MasterPage };
