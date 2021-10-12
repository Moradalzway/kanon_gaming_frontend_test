import React from "react";
import CheckCountry from "../pages/CheckCountry";
import { Switch, Route } from "react-router-dom";
import AllCountries from "../pages/AllCountries";
import SlotMachine from "../pages/SlotMachine";
import Register from "../pages/Register";
import Login from "../pages/Login";
import PrivateRoute from "../helpers/PrivateRoute";
import { connect } from "react-redux";

class MasterPage extends React.Component<any, any> {
  render() {
    return (
      <div className="container-full">
        <div>
          <div className="page-content">
            <Switch>
              <Route path="/" exact component={CheckCountry}></Route>
              <Route
                path="/check-country"
                exact
                component={CheckCountry}
              ></Route>
              <Route
                path="/all-countries"
                exact
                component={AllCountries}
              ></Route>
              <PrivateRoute
                path="/slot-machine"
                exact
                component={SlotMachine}
                isSignedIn={this.props.isLoggedIn}
              ></PrivateRoute>
              <Route path="/register" exact component={Register}></Route>
              <Route path="/login" exact component={Login}></Route>
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  isLoggedIn: state.isLoggedIn,
});

export default connect(mapStateToProps)(MasterPage);
