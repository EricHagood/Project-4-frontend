import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'

const AnyReactComponent = ({text}) => <div>{text}</div>;

export default class SimpleMap extends Component {
    constructor(props){
        super(props)
        this.state = {
            center:{
                lat: 0.000000,
                lng: 0.000000
            },
            zoom: 11
        }
    }

    // componentDidMount(){
    //     if (this.props.lat && this.props.lng){
    //         this.setState({
    //             center:[this.props.lat, this.props.lng]
    //         })
    //     }
    // }

    apiIsLoaded(map, maps, lat, lng){
        if(map){
            const latLng = maps.LatLng(parseFloat(lat), parseFloat(lng))
            map.panTo(latLng)
        }
    }

    componentDidUpdate(prevProps){
        if (prevProps.lat !== this.props.lat){
            this.setState({
                center:{
                    lat: this.props.latitude,
                    lng: this.props.longitude
                }
            })
        }
    }

    render() {
        return (
            <div className='map' style={{ height: this.props.height, width: this.props.width}}>
                <GoogleMapReact
                    bootstrapURLKeys={this.props.API_KEY}
                    center={this.state.center}
                    defaultZoom={this.state.zoom}
                    yesIWantToUseGoogleMapApiInternals
                    // onGoogleApiLoaded={({map, maps})=>this.apiIsLoaded(map, maps, this.props.lat, this.props.lng)}
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
