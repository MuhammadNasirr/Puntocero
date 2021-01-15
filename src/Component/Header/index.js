import React, { Component } from 'react';
import './index.css';
class Header extends Component {
    componentDidMount() {
        window.scrollTo(0, 0)
    }
    render() {
        return (
            <div className="HeaderMain">
                <div className="headerrow">
                </div>
            </div>
        );
    }
}

export default Header;