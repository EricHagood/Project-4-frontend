import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'

const AnyReactComponent = ({text}) => <div>{text}</div>

export default class SimpleMap extends Component {
    constructor(props){
        super(props)
        this.state = {
            center: {
                lat: 0,
                lng: 0
            },
            zoom: 11
        }
    }

    componentDidMount(){
        this.setState({
            center:{
                lat: this.props.lat,
                lng: this.props.lng
            }
        })
    }

    render() {
        return (
            <div>
                <GoogleMapReact
                    defaultCenter={this.center}
                    defaultZoom={this.zoom}
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
