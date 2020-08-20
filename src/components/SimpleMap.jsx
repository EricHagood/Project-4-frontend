import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'

const AnyReactComponent = ({text}) => <div>{text}</div>;

export default class SimpleMap extends Component {
    constructor(props){
        super(props)
        this.state = {
            center:[0, 0],
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
            const latLng = maps.LatLng(lat, lng)
            map.panTo(latLng)
        }
    }

    componentDidUpdate(prevProps){
        if (prevProps.lat !== this.props.lat){
            this.setState({
                center:[this.props.lat, this.props.lng]
            })
        }
    }

    render() {
        return (
            <div className='map' style={{ height: '40vh', width: '60%'}}>
                <GoogleMapReact
                    bootstrapURLKeys={this.props.API_KEY}
                    center={this.state.center}
                    defaultZoom={this.state.zoom}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({map, maps})=>this.apiIsLoaded(map, maps, this.props.lat, this.props.lng)}
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
