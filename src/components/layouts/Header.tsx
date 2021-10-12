import { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutAction } from "../../redux/actions/auth";

class Header extends Component<any, any> {
  render() {
    return (
      <div id="header">
        <ul>
          <li>
            <Link to="/check-country">Check Country By Name</Link>
          </li>
          <li>
            <Link to="/all-countries">All Countries</Link>
          </li>
          <li>
            <Link to="/slot-machine">Slot Machine</Link>
          </li>
          {this.props.isLoggedIn && (
            <>
              <li style={{ float: "right" }}>
                <a href="#">Hi, {this.props.user.name}</a>
              </li>
              <li style={{ float: "right" }}>
                <button onClick={this.props.logoutAction}>Logout</button>
              </li>
            </>
          )}
          {!this.props.isLoggedIn && (
            <>
              <li style={{ float: "right" }}>
                <Link className="active" to="/register">
                  Register
                </Link>
              </li>
              <li style={{ float: "right" }}>
                <Link className="active" to="/login">
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  user: state.user,
  isLoggedIn: state.isLoggedIn,
});

const mapDispatchToProps = () => ({
  logoutAction,
});

export default connect(mapStateToProps, mapDispatchToProps())(Header);
