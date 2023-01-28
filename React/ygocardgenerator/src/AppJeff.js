import level from './images/ygolevel.png';
import './AppJeff.css';
import React from 'react';
import { useState } from 'react';

function AppJeff() {
    const [name, setName] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        //alert(`The name you entered was: ${name}`)
        this.setState({ number: name });
      }

  return (
    <div>
        <form onSubmit={handleSubmit}>
      <label>Enter your name:
        <input 
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <input type="submit" />
    </form>

    <div class="flex-container">
        <div className="level1">
            <img src={level} alt="level image" />
        </div>
        <div className="level2">
            <img src={level} alt="level image" />
        </div>
        <div className="level3">
            <img src={level} alt="level image" />
        </div>
        <div className="level4">
            <img src={level} alt="level image" />
        </div>
        <div className="level5">
            <img src={level} alt="level image" />
        </div>
        <div className="level6">
            <img src={level} alt="level image" />
        </div>
        <div className="level7">
            <img src={level} alt="level image" />
        </div>
        <div className="level8">
            <img src={level} alt="level image" />
        </div>
        <div className="level9">
            <img src={level} alt="level image" />
        </div>
        <div className="level10">
            <img src={level} alt="level image" />
        </div>
        <div className="level11">
            <img src={level} alt="level image" />
        </div>
        <div className="level12">
            <img src={level} alt="level image" />
        </div>
    </div>
    </div>
  );
}

export default AppJeff;
