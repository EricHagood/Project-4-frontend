import React, { Component } from 'react'
import SimpleMap from './SimpleMap'

export default class Map extends Component {
    constructor(props){
        super(props)
        this.state = {
            latitude: 0,
            longitude: 0,
            city: '',
            mileLimit: 0
        }
        this.handleChange = this.handleChange.bind(this)
        this.generateCoordinates = this.generateCoordinates.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value,
        });
    }

    handleSubmit(event){
        event.preventDefault();
        this.generateCoordinates(this.state.mileLimit)
    }


    generateCoordinates(mileLimit){
        let lng;
        let lat;
        if (mileLimit === 0){
            lng = (Math.random() * 360 - 180).toFixed(6)
            lat = (Math.random() * 180 - 90).toFixed(6)
        }else{

        }
        let latlng = lat.toString() + ',' + lng.toString()
        this.setState({
            latitude: lat,
            longitude: lng
        })
        // this.setState({latlng: latlng})
        fetch("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latlng + "&key=" + this.props.API_KEY).then(response =>{
            return response.json()
        }).then (data => {
            this.props.sendData(data)
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label  htmlFor="city">Limit to a city:</label>
                    <input type="text" id="city" onChange={ (evt) => this.handleChange(evt) }
                            value={ this.state.city } />
                    <label htmlFor="mileLimit">Mile Limit</label>
                    <input type="number" id='mileLimit' onChange={ (evt) => this.handleChange(evt) }
                            value={ this.state.mileLimit } />

                    <input type="submit" value="Generate Location" />
                </form>
                <SimpleMap lat={this.state.latitude} lng={this.state.longitude} API_KEY={this.props.API_KEY} />
            </div>
            
        )
    }
}
