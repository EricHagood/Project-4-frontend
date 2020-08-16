import React, { Component } from 'react'
import Location from './components/Locations'
import Map from './components/Map'
import Submit from './components/SubmitLocation'
import View from './components/LocationView'

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
      location: false,
      view: false,
      submit: false
    }
    this.HomePage = this.HomePage.bind(this)
    this.MyLocations = this.MyLocations.bind(this)
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
    this.setState({
      home: true,
      myLocations: false,
      location: false,
      view: false,
      submit: false
    })
  }
  ViewPage(){
    this.setState({
      home: false,
      myLocations: false,
      location: false,
      view: true,
      submit: false
    })
  }
  MyLocations(){
    this.setState({
      home: false,
      myLocations: true,
      location: false,
      view: false,
      submit: false
    })
  }
  SubmitPage(){
    this.setState({
      home: false,
      myLocations: false,
      location: false,
      view: false,
      submit: true
    })
  }

  sendData(data){

  }

  render() {
    return (
      <div>
          <nav className="navBar">
            <ul className='navList'>
              <li onClick={this.HomePage}>Home</li>
              <li onClick={this.MyLocations}>My Locations</li>
            </ul>
          </nav>
          {this.state.home ? (
            <Map API_KEY={this.state.API_KEY} sendData={this.sendData} />
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
