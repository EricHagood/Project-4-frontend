import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'

const AnyReactComponent = ({text}) => <div>{text}</div>;

export default class SimpleMap extends Component {
    constructor(props){
        super(props)
        this.state = {
            center:{
                lat: 0,
                lng: 0
            },
            zoom: 11
        }
    }

    componentDidMount(){
        if (this.props.lat && this.props.lng){
            this.setState({
                center:[this.props.lat, this.props.lng]
            })
        }
    }

    componentDidUpdate(prevProps){
        if (prevProps.lat !== this.props.lat){
            this.setState({
                center:{
                    lat: this.props.lat,
                    lng: this.props.lng
                }
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
                    ref={(ref)=>{
                        this.mapRef = ref;
                    }}
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
