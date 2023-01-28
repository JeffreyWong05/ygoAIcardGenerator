
import './AppJeff.css';
import './App.css';
import React, { useEffect, useRef } from 'react';

function EffectText({className, text}) {

	const ref = useRef();

	useEffect(() => {
		console.log(text)
		let fontSize = 28;
		console.log(ref.current.clientHeight)
		console.log(ref.current.scrollHeight)
		while (37 < ref.current.scrollHeight) {
			fontSize--;
			console.log('reducing font size');
			console.log(ref.current.style.fontSize);
			ref.current.style.fontSize = fontSize + 'px';
			console.log(ref.current.style.fontSize);
		}
	  }, [text]);
	  
	return (
		<div
			ref={c => { ref.current = c; }}>
			{text}
		</div>
	);

}



export default EffectText;
