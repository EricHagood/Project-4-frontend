import React, { Component } from 'react'

export default class Locations extends Component {
    

    

    render() {
        return (
            this.props.myLocations.map( (location, index) =>{
                return (
                    <div key={index} className="locationbox">
                        <h3 className="name" onClick={this.props.ChangeLocation(location)} >{location.city}</h3>
                        <p onClick={this.props.handleDelete(location, index)}>X</p>
                        {location.image ? (
                            <img src={atob(location.image)} alt={location.city}></img>
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
