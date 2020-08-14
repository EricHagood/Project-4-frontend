import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'

const AnyReactComponent = ({text}) => <div>{text}</div>;

export default class SimpleMap extends Component {
    constructor(props){
        super(props)
        this.state = {
            center: [0.000000, 0.000000],
            zoom: 11
        }
    }

    componentDidMount(){
        this.setState({
            center:[this.props.lat, this.props.lng]
        })
    }

    render() {
        return (
            <div className='map' style={{ height: '40vh', width: '60%'}}>
                <GoogleMapReact
                bootstrapURLKeys={this.props.API_KEY}
                    defaultCenter={this.state.center}
                    defaultZoom={this.state.zoom}
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
