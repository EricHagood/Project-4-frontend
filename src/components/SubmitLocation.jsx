import React, { Component } from 'react'

export default class SubmitLocation extends Component {
    constructor(props){
        super(props)
        this.state = {
            baseURL: 'http://localhost:8000/api/v1/locations/',
            image: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.fileChange = this.fileChange.bind(this)
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

    handleSubmit(event){
        event.preventDefault()
        let imgstring = btoa(this.state.image)
        fetch(this.state.baseURL + this.props.location.id, {
            method:'POST',
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
            return response.json
        })
    }

    render() {
        return (
            <div className="submitform">
                <form className="submitform">
                    <label htmlFor="city">City:</label>
                    <input type="text" id="city" value={this.props.location.city} />
                    <label htmlFor="description"> Write a brief description of the location:</label>
                    <input type='textarea' id="description" onChange={this.handleChange} />
                    <label htmlFor="image">Upload image of location</label>
                    <input type="file" name="image" onChange={this.fileChange} />
                    <input type='submit' value="Update Location" />
                </form>
            </div>
        )
    }
}
