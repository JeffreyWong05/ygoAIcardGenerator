
import './AppJeff.css';
import './App.css';
import React, { useEffect, useRef } from 'react';

function TextShrinker({className, text}) {

	const ref = useRef();

	useEffect(() => {
		console.log(text)
		let fontSize = 28;
		ref.current.style.fontSize = fontSize + 'px';
		console.log(ref.current.clientHeight)
		console.log(ref.current.scrollHeight)
		while (ref.current.clientHeight < ref.current.scrollHeight) {
			fontSize--;
			console.log('reducing font size');
			console.log(ref.current.style.fontSize);
			ref.current.style.fontSize = fontSize + 'px';
			console.log(ref.current.style.fontSize);
		}
	  }, [text]);
	  
	return (
		<div
			ref={c => { ref.current = c; }}
			className={className}
			>
			{text}
		</div>
	);

}



export default TextShrinker;
