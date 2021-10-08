import React, { Component } from 'react';
import { Link } from "react-router-dom";
class Header extends Component {
    render() {
        return (
            <div id="header">
                <ul>
                    <li><Link to="/check-country">Check Country By Name</Link></li>
                    <li><Link to="/all-countries">All Countries</Link></li>
                    <li><Link to="/home">Contact</Link></li>
                    <li><Link to="/home">About</Link></li>
                    <li style={{float:'right'}}><Link className="active" to="/clients">About</Link></li>
                </ul>
            </div>
        );
    }
}

export default Header;