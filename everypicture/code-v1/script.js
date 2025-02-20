// (function () {
// 	'use strict';
	
// 	console.log('reading js');

// 	// ----- VARIABLES -----
// 	const flower = document.querySelector('#flower');
// 	const blue = document.querySelector('#blue');
// 	const forever = document.querySelector('#forever');
// 	const silence = document.querySelector('#silence');

// 	const sheets = [flower, blue, forever, silence];
// 	console.log(sheets);

// 	const sheetsContainer = document.querySelector("#sheets-container");

// 	const wrapper = document.querySelectorAll("#img-wrapper");


// 	// ----- EVENT LISTENERS -----
// 	sheetsContainer.addEventListener('mouseover', function(event){
// 		if (sheets.includes(event.target)){
// 			resetRotate(event);
// 			appearElement(event);
// 		}
// 	});

// 	sheetsContainer.addEventListener('mouseleave', function(event){
// 		if (sheets.includes(event.target)){
// 			defaultState(event);
// 		}
// 	});


// 	// ----- FUNCTIONS -----
// 	function resetRotate(event) {
// 		console.log(`Hovered over: ${event.target.id}`);
// 		event.target.classList.add('reset-rotate');
// 	} 

// 	function defaultState(event){
// 		console.log(`Mouse left: ${event.target.id}`);
// 		event.target.classList.remove('reset-rotate');
// 	}

// 	function appearElement(event) {
// 		const id = event.target.id;
// 		const respectiveVideo = document.querySelector(`#${id}-vid`);
// 		const respectiveTag = document.querySelector(`#${id}-tag`);


// 		if (respectiveVideo) {
// 			respectiveVideo.style.opacity = 1;
// 		}

// 		if (respectiveTag) {
// 			respectiveTag.style.opacity = 1;
// 		}
// 	}

// })();