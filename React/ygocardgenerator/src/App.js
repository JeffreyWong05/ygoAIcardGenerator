import './App.css';
import yugi from './images/yamiyugi.png';

function App() {
  return (
    <div className="page">
      <h1 className="title">Yugioh Card Generator</h1>
      <div className="entry">
        <label>Enter Card Name:</label>
        <input className="monsterName" type="text"/>
        <input type="submit" value="Submit" />
      </div>

      <div className="lcol">
        <div className="yugiohTemplate">
          <div className="nameAndAttribute">
          <div className="yugName">
            Zexi the Invoker
          </div>

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
