import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  constructor(props){
    super(props)
    this.state = {
      BaseURL = "https://maps.googleapis.com/maps/api/js?key=",
      API_KEY = process.env.GOOGLE_MAPS_API_KEY,
      endURL = "&callback=initMap"
    }
  }
  
  return (
    <div>
        <nav className="navBar">
          <ul className='navList'>
            <li>Home</li>
            <li>My Locations</li>
          </ul>
        </nav>
    </div>
  );
}

export default App;
