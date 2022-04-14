import React from 'react';
import './App.css';
import LocationsContainer from './LocationsContainer/LocationsContainer';

function Locations() {
    return (
      <div className="App">
        <h2 className="snowboard-header">Store Locations</h2>        
        <LocationsContainer></LocationsContainer>
      </div>
    );
  }
export default Locations