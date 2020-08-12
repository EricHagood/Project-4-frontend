import React, { Component } from 'react'
import Location from './components/Locations'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      BaseURL: "https://maps.googleapis.com/maps/api/js?key=",
      API_KEY: process.env.GOOGLE_MAPS_API_KEY,
      endURL: "&callback=initMap",
      locations: [],
    }
  }

  componentDidMount(){
    this.getLocations();
  }

  getLocations(){
    fetch('http://localhost:8000/api/v1/locations/').then(response => {
      return response.json();
    }).then(data => {
      this.setState({
        locations: data
      })
    }).catch(err => {
      console.log('error', err)
    })
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


          <Location />
      </div>
    );
  }
}
