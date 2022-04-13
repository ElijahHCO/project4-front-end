import React from 'react';
import './App.css';
import SnowboardContainer from './SnowboardContainer/SnowboardContainer';

function Snowboard() {
    return (
      <div className="App">
        <h2 className="snowboard-header">Snowboards</h2>        
        <SnowboardContainer></SnowboardContainer>
      </div>
    );
  }
export default Snowboard
