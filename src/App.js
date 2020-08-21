import React, { Component } from 'react'
// import axios from 'axios'
import Location from './components/Locations'
import Map from './components/Map'
import Submit from './components/SubmitLocation'
import View from './components/LocationView'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      BaseURL: "https://maps.googleapis.com/maps/api/js?key=",
      API_KEY: process.env.REACT_APP_API_KEY,
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

  handleDelete(deletedLocation, index){
    fetch('http://localhost:8000/api/v1/locations/' + deletedLocation.id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response =>{
        return response.json()
    }).then(data =>{
      const copyLocations = [...this.state.locations]
      copyLocations.splice(index, 1)
      this.setState({
        locations: copyLocations
      })
    })
}

  ChangeLocation(location){
    this.setState({
      home: false,
      myLocations: false,
      location: false,
      view: true,
      submit: false,
      viewLocation: location
    })
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
  SubmitPage(loc){
    this.setState({
      home: false,
      myLocations: false,
      location: false,
      view: false,
      submit: true,
      submitLocation: loc,
    })
  }

  sendData(data, lat, lng){
    console.log(data)
    if (data.results[0]){
      fetch('http://localhost:8000/api/v1/locations/', {
        method: 'POST',
        body: JSON.stringify({
          city: data.results[0].formatted_address,
          latitude: data.results[0].geometry.location.lat,
          longitude: data.results[0].geometry.location.lng,
          visited: 'False'
        }),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:3000'
        }
      }).then(response=>{
        return response.json()
      }).then(data =>{
        const copyLocation = [...this.state.locations]
        copyLocation.push(data)
        this.setState({
          locations: copyLocation
        })
      })
    }else{
      fetch('http://localhost:8000/api/v1/locations/', {
        method: 'POST',
        body: JSON.stringify({
          city: 'No name given from API',
          latitude: lat,
          longitude: lng,
          visited: 'false'
        }),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:3000'
        }
      }).then(response=>{
        return response.json()
      }).then(data =>{
        const copyLocation = [...this.state.locations]
        copyLocation.push(data)
        this.setState({
          locations: copyLocation
        })
      })
    }

    // axios.post('http://localhost:8000/api/v1/locations/',{
    //   city: 'No name given from API',
    //   latitude: lat,
    //   longitude: lng,
    //   visited: 'false'
    // }).then(
    //   res =>{
    //     return res.json()
    //   }
    // ).then(data=>{
    //   const copyLocation = [...this.state.locations]
    //   copyLocation.push(data)
    //   this.setState({
    //     locations: copyLocation
    //     })
    // })
    



  }

  render() {
    return (
      <div>
          <nav className="navBar">
            <span onClick={this.HomePage} className="nav-item">Home</span>
            <span onClick={this.MyLocations} className="nav-item">My Locations</span>
          </nav>
          {this.state.home ? (
            <Map API_KEY={this.state.API_KEY} sendData={this.sendData} />
          ) : (
            <></>
          )}
          {this.state.myLocations ? (
              <Location myLocations={this.state.locations} ChangeLocation={this.ChangeLocation} SubmitPage={this.SubmitPage} deletedLocation={this.deletedLocation} />
          ): (
            <> </>
          )}
          {this.state.view ? (
            <View location={this.state.viewLocation} />
          ):(
            <></>
          )}
          {this.state.submit ? (
            <Submit location={this.state.submitLocation} />
          ): (
            <></>
          )}
          {/* {this.state.location ? (
            <Location location={this.state.viewLocation} API_KEY={this.state.API_KEY} />
          ): (
            <></>
          )} */}
          
      </div>
    );
  }
}
