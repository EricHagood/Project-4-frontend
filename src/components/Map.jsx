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

    generateCoordinates(){
        let lng = (Math.random() * 360 - 180).toFixed(6)
        let lat = (Math.random() * 180 - 90).toFixed(6)
        let latlng = lat.toString() + ',' + lng.toString()
        this.setState({
            latitude: lat,
            longitude: lng
        })
        // this.setState({latlng: latlng})
        fetch("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latlng + "&key=" + process.env.GOOGLE_MAPS_API_KEY).then(response =>{
            return response.json()
        }).then (data => {
            console.log(data)
        })
    }

    render() {
        return (
            <div>
                <form>
                    
                </form>
                <SimpleMap lat={this.state.latitude} lng={this.state.longitude}/>
            </div>
            
        )
    }
}
