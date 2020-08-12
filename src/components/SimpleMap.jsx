import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'

const AnyReactComponent = ({text}) => <div>{text}</div>

export default class SimpleMap extends Component {
    render() {
        return (
            <div>
                <GoogleMapReact
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                >
                    <AnyReactComponent 
                        lat = {this.props.lat}
                        lng = {this.props.lng}
                        text = "Marker"
                    />
                </GoogleMapReact>
            </div>
        )
    }
}
