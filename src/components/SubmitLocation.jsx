import React, { Component } from 'react'

export default class SubmitLocation extends Component {
    constructor(props){
        super(props)
        this.state = {
            baseURL: 'https://blooming-lake-12475.herokuapp.com/api/v1/locations/',
            image: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.fileChange = this.fileChange.bind(this)
    }

    componentDidMount(){
        this.setState({
            city: this.props.location.city
        })
    }

    fileChange(event){
        this.setState({
            image: event.target.files[0]
        })
    }

    handleChange(event){
        this.setState({
            [event.target.id]: event.target.value,
        });
    }

    handleSubmit(event, index){
        event.preventDefault()
        let imgstring = btoa(this.state.image)
        console.log(imgstring)
        fetch(this.state.baseURL + this.props.location.id, {
            method:'PUT',
            body: JSON.stringify({
                city: this.state.city,
                latitude: this.props.location.latitude,
                longitude: this.props.location.longitude,
                image: imgstring,
                description: '',
                visited: false
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response =>{
            return response.json()
        }).then (data =>{
            const copyLocations = [...this.state.locations]
            copyLocations.splice(index, 1, data)
            this.setState({
                locations: copyLocations
            })
        })
    }

    render() {
        return (
            <div className="submitform">
                <form className="submitform" onSubmit={this.handleSubmit}>
                    <label htmlFor="city">City:</label>
                    <input type="text" id="city" onChange={this.handleChange} value={this.state.city} />
                    <label htmlFor="description"> Write a brief description of the location:</label>
                    <input type='textarea' id="description" onChange={this.handleChange} value={this.state.description} />
                    <label htmlFor="image">Upload image of location</label>
                    <input type="file" name="image" onChange={this.fileChange} />
                    <input type='submit' value="Update Location" />
                </form>
            </div>
        )
    }
}
