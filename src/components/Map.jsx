import React, { Component } from 'react'
import SimpleMap from './SimpleMap'

export default class Map extends Component {
    constructor(props){
        super(props)
        this.state = {
            latitude: 0,
            longitude: 0,
        }
    }


    handleSubmit(event){
        event.preventDefault();

    }


    generateCoordinates(){
        let lng = (Math.random() * 360 - 180).toFixed(6)
        let lat = (Math.random() * 180 - 90).toFixed(6)
        // let latlng = lat.toString() + ',' + lng.toString()
        this.setState({
            latitude: lat,
            longitude: lng
        })
        // this.setState({latlng: latlng})
        // fetch("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latlng + "&key=" + this.props.API_KEY).then(response =>{
        //     return response.json()
        // }).then (data => {
        //     console.log(data)
        // })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label  htmlFor="city">Limit to a city:</label>
                    <input type="text" id="city" />
                    <label htmlFor="mileLimit">Mile Limit</label>
                    <input type="number" id='mileLimit' />

                    <input type="submit" value="Generate Location" />
                </form>
                <SimpleMap lat={this.state.latitude} lng={this.state.longitude} API_KEY={this.props.API_KEY} />
            </div>
            
        )
    }
}
