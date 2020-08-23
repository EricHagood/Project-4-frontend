import React, { Component } from 'react'

export default class Locations extends Component {
    
    
    

    render() {
        return (
            this.props.myLocations.map( (location, index) =>{
                return (
                    <div>
                        <div key={index} className="locationbox">
                            <div className='itemDisplay'>
                                <h3 className="name" onClick={() => {this.props.ChangeLocation(location)}} >{location.city}</h3>
                                <button className="deleteItem" onClick={() => {this.props.handleDelete(location, index)}}>X</button>
                            </div>
                            {location.image ? (
                                <img src={"data:image/jpeg;base64,"  + location.image} alt={location.city}></img>
                            ): (
                                <></>
                            )}
                            <p>Latitude: {location.latitude}, Longitude: {location.longitude}</p>
                            <button onClick={() =>{this.props.SubmitPage(location)}}>Edit Location</button>
                        </div>
                    </div>
                )
            })
        )
    }
}
//{this.props.ChangeLocation(location)}