import logo from './logo.svg';
import AppJeff from './AppJeff';
import './AppJeff.css';
import level from './images/ygolevel.png';
import './App.css';
import yugi from './images/yamiyugi.png';
import React, { useState } from 'react';
import { Configuration, OpenAIApi } from 'openai';
import TextShrinker from './TextShrinker';
import EffectText from './EffectText';

function App() {

  const [cardName, setCardName] = useState('');
  const [synchro, setSynchro] = useState("");
  const [results, setResults] = useState({
    image: '',
		effect: '',
		level: '1',
    type: '',
		attribute: '',
    atk: '',
    def:''
	});
	const [loading, setLoading] = useState(false);

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

  const quickAttributeMap = (attribute) => {
    if (attributeDict[attribute.toLowerCase().trim()] === undefined) {
      return attributeDict["divine"]
    }
    return attributeDict[attribute.toLowerCase().trim()]
  }

  const prompts = {
    image: `${cardName}, digital art`,
		effect: `Write a YuGiOh effect for a card named "${cardName}"
        Effect:`,
		level: `Write the level of the YuGiOh card.
    Desired format: <number between 1 and 12>
    YuGiOh card:"${cardName}"`,
		type: `Write the monster type of the YuGiOh card. 
		Example:Warrior
		YuGiOh card:"${cardName}"
		Type:`,
		attribute: `Write the attribute of the YuGiOh card.
		Example:Fire
		YuGiOh card:"${cardName}"
		Attribute:`,
    atk:`Write the attack value for the YuGiOh card.
		YuGiOh card:"${cardName}"
		Attack:`,
		def:`Write the defense value for the YuGiOh card.
		YuGiOh card:"${cardName}"
		Defense:`
	};
	const configuration = new Configuration({
		apiKey: `${process.env.REACT_APP_API_KEY}`
	});

  const openai = new OpenAIApi(configuration);

  const generateDetails = async () =>
  {
    console.log("generate");
    setResults({
      image: '',
      effect: '',
      level: '1',
      type: '',
      attribute: '',
      atk: '',
      def:''
    });
		setLoading(true);
		let response;

		for (let key in prompts) {
			if (key == 'image') {
				response = await openai.createImage({
					prompt: prompts.image,
					n: 1,
					size: '512x512'
				});
				setResults((prevResults) => ({
					...prevResults,
					image: response.data.data[0].url
				}));
			} else {
				response = await openai.createCompletion({
					model: 'text-davinci-003',
					prompt: prompts[key],
					temperature: 0.6,
					max_tokens: 150,
					top_p: 1,
					frequency_penalty: 1,
					presence_penalty: 1
        });
        if (key == 'level')
        {
          if (isNaN(response.data.choices[0].text) || parseInt(response.data.choices[0].text) < 1 || parseInt(response.data.choices[0].text) > 12)
          {
            setResults((prevResults) => ({
              ...prevResults,
              ['level']: Math.floor(Math.random() * 12 + 1)
            }))
          }
        }
				setResults((prevResults) => ({
					...prevResults,
					[key]: response.data.choices[0].text
				}));
			}
		}
		setLoading(false);
	};

	const displayResults = () => {
		return Object.keys(results).map((key) => (
			<div>
				{key}
				{results[key]}
				<br />
				<br />
			</div>
		));
	};

  const createLevelImage = (numlevel) => {

    let levelArray = [];

    for (
      let i = 1;
      i <= numlevel;
      i++
    ) {
      levelArray.push(<img src={level} alt="level image" className='levelIcon'/>)
    }

    return levelArray.map((e) => (e))

  }

  const monsterBackground = () => {

  }

 const someFunc = () =>
 {
  console.log("tuner called");
  let isTuner = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
  
  let sync = "";

  if(synchro != false) {
	sync="/ SYNCHRO "
  }

  if(isTuner === 2){
    return sync + "/ TUNER";
  }
  return sync;
 }

  return (
    <div className="page">
      <h1 className="title">Yugioh Card Generator</h1>
      <div className="entry">
        <label>Enter Card Name:</label>
        <input disabled={loading} className="monsterName" type="text" maxLength="33" onChange={(e) => setCardName(e.target.value)}/>
        <button disabled={loading} className='button' onClick={generateDetails}>
					Generate Card
				</button>
      </div>

	  <div className="entry">
        <label>Make this a synchro?:</label>
        <input disabled={loading} className="monsterName" type="checkbox" onChange={(e) => setSynchro(e.target.checked)}/>
        
      </div>

      <div className="lcol">
        <div className={synchro !== true ? "yugiohTemplate": "synchroTemplate"}>
          <div className="nameAndAttribute">
		  	<TextShrinker className="yugName" text={cardName} />
            {results.attribute.trim() === ""
            ? null
            : <img src={quickAttributeMap(results.attribute)} className="attribute"></img>}
          </div>
		  <div class="level-container">
            {createLevelImage(parseInt(results.level))}
          </div>
		  {results.image === "" 
            ? <div className='cardImage'/> 
            : <img src={results.image} className="cardImage"></img>}
      	  {results.type === ""
            ? <div className='cardType'/>
            : <div className='cardType'>{`[${results.type.toUpperCase()} ${someFunc()} / EFFECT ]`}</div>}

		  {synchro !== true ? <div className='effectMon'/>
		  : <div className='synchron'>1 tuner + 1 or more non-tuner monsters</div>}

		   <EffectText className= {synchro !== true ? "effectText": "syncText" } text={results.effect} />
       <div className='attackDefense'>
        <div className='attack'>{results.atk}</div>
        <div>{results.def}</div>
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
