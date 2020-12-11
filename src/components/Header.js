import React, {Component} from 'react';
import startlink_logo from "../assets/images/startlink_logo.svg";

class Header extends Component {
    render() {
        return (
            <header className="App-header">
                <img src={startlink_logo} className="App-logo" alt="logo" />
                <p className="title">
                    StarLink Tracker
                </p>
            </header>


        );
    }
}

export default Header;