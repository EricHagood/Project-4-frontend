import React, { Component } from 'react'
// import axios from 'axios'
import Location from './components/Locations'
import Map from './components/Map'
import Submit from './components/SubmitLocation'
import View from './components/LocationView'
import Nav from './components/Nav'

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
    this.ViewPage = this.ViewPage.bind(this)
    this.SubmitPage = this.SubmitPage.bind(this)
    this.ChangeLocation = this.ChangeLocation.bind(this)
    this.sendData = this.sendData.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount(){
    this.getLocations();
  }

  getLocations(){
    fetch('http://localhost:33507/api/v1/locations/').then(response => {
      return response.json();
    }).then(data => {
      this.setState({
        locations: data.data
      })
      // console.log(data)
      console.log(this.state.locations)
    }).catch(err => {
      console.log('error', err)
    })
  }

  handleDelete(deletedLocation, index){
    fetch('https://blooming-lake-12475.herokuapp.com/api/v1/locations/' + deletedLocation.id, {
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
    console.log('making it here')
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
      fetch('https://blooming-lake-12475.herokuapp.com/api/v1/locations/', {
        method: 'POST',
        body: JSON.stringify({
          city: data.results[0].formatted_address,
          latitude: data.results[0].geometry.location.lat,
          longitude: data.results[0].geometry.location.lng,
          image: '',
          description: '',
          visited: 'False'
        }),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }).then(response=>{
        return response.json()
      }).then(data =>{
        console.log(this.state.locations)
        const copyLocation = [...this.state.locations]
        copyLocation.push(data.data)
        this.setState({
          locations: copyLocation
        })
      })
    }else{
      fetch('https://blooming-lake-12475.herokuapp.com/api/v1/locations/', {
        method: 'POST',
        body: JSON.stringify({
          city: 'No name given from API',
          latitude: lat,
          longitude: lng,
          image: '',
          description: '',
          visited: 'false'
        }),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }).then(response=>{
        return response.json()
      }).then(data =>{
        const copyLocation = [...this.state.locations]
        copyLocation.push(data)
        this.setState({
          locations: copyLocation
        })
        console.log(this.state.locations)
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
          <Nav HomePage={this.HomePage} MyLocations={this.MyLocations} />

          {this.state.home ? (
            <Map API_KEY={this.state.API_KEY} sendData={this.sendData} HomePage={this.HomePage} MyLocations={this.MyLocations} />
          ) : (
            <></>
          )}
          {this.state.myLocations ? (
              <Location myLocations={this.state.locations} ChangeLocation={this.ChangeLocation} SubmitPage={this.SubmitPage} handleDelete={this.handleDelete} />
          ): (
            <> </>
          )}
          {this.state.view ? (
            <View location={this.state.viewLocation} homePage={this.homePage} myLocations={this.myLocations} />
          ):(
            <></>
          )}
          {this.state.submit ? (
            <Submit location={this.state.submitLocation} homePage={this.homePage} myLocations={this.myLocations} />
          ): (
            <></>
          )}
      </div>
    );
  }
}
