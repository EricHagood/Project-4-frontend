import React, { Component } from 'react'

export default class Locations extends Component {
    
    
    

    render() {
        return (
            this.props.myLocations.map( (location, index) =>{
                return (
                    <div key={index} className="locationbox">
                        <h3 className="name" >{location.city}</h3>
                        <p >X</p>
                        {location.image ? (
                            <img src="data:image/jpeg;base64, {this.props.location.image}" alt={location.city}></img>
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
//{this.props.ChangeLocation(location)}