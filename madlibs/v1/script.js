(function () {
	'use strict';
	console.log('reading JS');

	// VARIABLES
	const form = document.querySelector('form');
	const madlib = document.querySelector('madlibs-questions');
	const formdData = document.querySelector('input[type=text]');





	// BUILDING MADLIBS OVERLAY
	form.addEventListener("submit", function(e) {
		e.preventDefault();
		processFormData(formData);

		// const fullName =document.querySelector('#fullName').value;
		// const dreamJob =document.querySelector('#dreamJob').value;
		// const verb1 =document.querySelector('#verb1').value;
		// const plural1 = document.querySelector('#plural1').value;
		// const plural2 = document.querySelector('#plural2').value;
		// const noun1 =document.querySelector('#noun1').value;

		// const plural3 = document.querySelector('#plural3').value;
		// const noun2 = document.querySelector('#noun2').value;
		// const noun3 = document.querySelector('#noun3').value;
		// const adj1 = document.querySelector('#adj1').value;
		// const plural4 = document.querySelector('#plural4').value;
		// const number = document.querySelector('#number').value;
	});

	function processFormData(formData) {
		const words = [];
		const emptyFields = [];
		let counter = 0;
		
		for (const eachWord of formData) {
			if(eachWord.value){  // if there is data
				words.push(eachWord.value);
			}
			else{
				emptyFields.push(counter); // track empty fields
			}
			counter++; // increment
		}

		
	}



	// VISIBILITY CLASSES
	document.querySelector('form').addEventListener('submit', function(e) {
        e.preventDefault();
        document.querySelector('#madlibs-overlay').className = 'showing';
    });

    document.querySelector('#redo-button').addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector('#madlibs-overlay').className = 'hidden';
    });
	
})();