import { useState } from 'react';
import { Configuration, OpenAIApi } from 'openai';

function DetailsGenerator() {
	const [name, setName] = useState('');
	const [results, setResults] = useState({
		effect: '',
		image: '',
		level: '',
		type: '',
		attribute: ''
	});
	const [loading, setLoading] = useState(false);

	const prompts = {
		effect: `Write a YuGiOh effect for a card named "${name}"
        Effect:`,
		image: `${name}, digital art`,
		level: `Rate the YuGiOh card\'s strength from 1 to 12
        YuGiOh card:"${name}"
        Strength:`,
		type: `Write the monster type of the YuGiOh card. 
		Example:Warrior
		YuGiOh card:"${name}"
		Type:`,
		attribute: `Write the attribute of the YuGiOh card.
		Example:Fire
		YuGiOh card:"${name}"
		Attribute:`,
	};
	const configuration = new Configuration({
		apiKey: `${process.env.REACT_APP_API_KEY}`
	});

	const openai = new OpenAIApi(configuration);

	const generateDetails = async () => {
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
				{results[key]}
				<br />
				<br />
			</div>
		));
	};

	return (
		<div>
		<div className='app'>
			<h1>YuGiOh Card Generator</h1>
			{loading ? (
				<h2> Generation in progress ... Please wait!</h2>
			) : (
				<></>
			)}
			<div className='card'>
				<textarea
					className='text-input'
					placeholder="Enter the YuGiOh monster's name"
					onChange={(e) => setName(e.target.value)}
					row='5'
					cols='50'
				/>
				<button className='button' onClick={generateDetails}>
					Generate Card
				</button>
			</div>
			{displayResults()}
			<p className='footer'>Powered by OpenAI</p>
		</div>
			<img src={results.image} width="100%" />
			</div>
	);
}

export default DetailsGenerator;
