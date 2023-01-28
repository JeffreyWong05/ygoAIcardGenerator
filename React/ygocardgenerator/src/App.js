import logo from './logo.svg';
import AppJeff from './AppJeff';
import './App.css';
import yugi from './images/yamiyugi.png';
import React, { useState } from 'react';

function App() {

  const [cardName, setCardName] = useState('');
  const [cardAttribute, setCardAttribute] = useState("")

  const attributeDict = {
    "dark": require('./images/Dark.webp'),
    "divine": require('./images/Divine.webp'),
    "earth": require('./images/Earth.webp'),
    "fire": require('./images/Fire.webp'),
    "light": require('./images/Light.webp'),
    "water": require('./images/Water.png'),
    "wind": require('./images/Wind.webp'),
    "": null,
  }

  return (
    <div className="page">
      <h1 className="title">Yugioh Card Generator</h1>
      <div className="entry">
        <label>Enter Card Name:</label>
        <input className="monsterName" type="text" onChange={(e) => setCardName(e.target.value)}/>
        <input type="submit" value="Submit"/>
      </div>

      <div className="lcol">
        <div className="yugiohTemplate">
          <div className="nameAndAttribute">
          <div className="yugName">
            {cardName}
          </div>
          {cardAttribute === "" 
          ? null 
          : <img src={attributeDict[cardAttribute]} className="attribute"></img>}
          </div>
        </div>
      </div>
      <img className="yugiImg" 
        src={yugi} 
        alt="Uncle Yugi wants you!"></img>
    </div>
  );
}

export default App;
