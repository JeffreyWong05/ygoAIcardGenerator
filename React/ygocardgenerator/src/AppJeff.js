import level from './images/ygolevel.png';
import './AppJeff.css';
import React from 'react';
import { useState } from 'react';

function AppJeff() {

  return ( //All 12 levels to be decided to be displayed
    <div>
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
