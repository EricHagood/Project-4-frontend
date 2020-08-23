import React, { Component } from 'react'

export default class Nav extends Component {
    render() {
        return (
            <nav className="navBar">
                <span onClick={() => {this.props.HomePage()}} className="nav-item">Home</span>
                <span onClick={() => {this.props.MyLocations()}} className="nav-item">My Locations</span>
            </nav>
        )
    }
}
