import React, { Component } from 'react'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      BaseURL: "https://maps.googleapis.com/maps/api/js?key=",
      API_KEY: process.env.GOOGLE_MAPS_API_KEY,
      endURL: "&callback=initMap"
    }
  }
  render() {
    return (
      <div>
          <nav className="navBar">
            <ul className='navList'>
              <li>Home</li>
              <li>My Locations</li>
            </ul>
          </nav>
      </div>
    );
  }
}
