import React, { Component } from 'react'

export default class Locations extends Component {
    render() {
        return (
            this.props.myLocations.map( (location, index) =>{
                return (
                    <div key={index}>
                        <p className="name">{location.city}</p>
                        {location.image ? (
                            <img src='smthn'></img>
                        ): (
                            <></>
                        )}
                        <p>Latitude: {location.latitude}, Longitude: {location.longitude}</p>
                    </div>
                )
            })
        )
    }
}
