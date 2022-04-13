import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './Nav';
import Ski from './Ski';
import Snowboard from './Snowboard';
import EquipmentContainer from './EquipmentContainer/EquipmentContainer';

function App() {
  return (
    <Router>
      <div className="App">
        <h1 className="Header">SnowShelves</h1>
        <Nav />
        <div className="container">
          <Routes>
            <Route path="/ski" element={<Ski />} />
            <Route path="/snowboard" element={<Snowboard />} />
            <Route path="/" element={<EquipmentContainer />} />
          </Routes>
        </div>
        <footer className="footer">SnowShelves</footer>
      </div>
    </Router>
  );
}

export default App;
