import React, { Component } from 'react'
import Location from './components/Locations'
import Map from './components/Map'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      BaseURL: "https://maps.googleapis.com/maps/api/js?key=",
      API_KEY: process.env.GOOGLE_MAPS_API_KEY,
      endURL: "&callback=initMap",
      locations: [],
      home: true,
      myLocations: false,
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

  ChangeLocation(){

  }

  HomePage(){

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
          {this.state.home ? (
            <Map API_KEY={this.state.API_KEY} />
          ) : (
            <></>
          )}
          {this.state.locations ? (
              <Location />
          ): (
            <> </>
          )}
          
      </div>
    );
  }
}
