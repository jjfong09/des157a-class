(function () {
	'use strict';
	console.log('reading JS');

	// VARIABLES
	const form = document.querySelector('form');
	// const madlib = document.querySelector('#madlibs-questions');
	const formData = document.querySelectorAll('input[type=text]');

	// vars for th fields
	const name = document.querySelector('#name');
	const intro = document.querySelector('#intro');
	const motto = document.querySelector('#motto');
	const firstExp = document.querySelector('#first-exp');
	const secondExp = document.querySelector('#second-exp');
	const thirdExp = document.querySelector('#third-exp');



	// BUILDING MADLIBS OVERLAY
	form.addEventListener("submit", function(e) {
		e.preventDefault();
		processFormData(formData);

	});

	function processFormData(formData) {
		const words = [];
		const emptyFields = [];
		let counter = 0;
		
		for (const eachWord of formData) {
			if(eachWord.value){  // if there is data
				words.push(eachWord.value); // put words in array
			}
			else{
				emptyFields.push(counter); // track empty fields
			}
			counter++; // increment
		}
		if (emptyFields.length > 0) {
			showErrors();
		}
		else{
			makeMadLib(words);
		}
	}

	function showErrors() {
		let myText; // Variable for error messages
		const errorMessage = document.querySelector('#error-message'); // Assuming an element for displaying errors
	
		// Retrieve values of all inputs
		const fullName = document.querySelector('#fullName');
		const dreamJob = document.querySelector('#dreamJob');
		const verb1 = document.querySelector('#verb1');
		const plural1 = document.querySelector('#plural1');
		const plural2 = document.querySelector('#plural2');
		const noun1 = document.querySelector('#noun1');
		const plural3 = document.querySelector('#plural3');
		const noun2 = document.querySelector('#noun2');
		const noun3 = document.querySelector('#noun3');
		const adj1 = document.querySelector('#adj1');
		const plural4 = document.querySelector('#plural4');
		const number = document.querySelector('#number');
	
		switch (true) {
			case (fullName.value === ''):
				myText = "Please provide your Full Name.";
				errorMessage.innerHTML = myText;
				fullName.focus();
				return; // Exit the function after displaying the error
	
			case (dreamJob.value === ''):
				myText = "Please provide your Dream Job.";
				errorMessage.innerHTML = myText;
				dreamJob.focus();
				return;
	
			case (verb1.value === ''):
				myText = "Please provide a Verb ending in -ing.";
				errorMessage.innerHTML = myText;
				verb1.focus();
				return;
	
			case (plural1.value === ''):
				myText = "Please provide a Plural Noun.";
				errorMessage.innerHTML = myText;
				plural1.focus();
				return;
	
			case (plural2.value === ''):
				myText = "Please provide another Plural Noun.";
				errorMessage.innerHTML = myText;
				plural2.focus();
				return;
	
			case (noun1.value === ''):
				myText = "Please provide a Noun.";
				errorMessage.innerHTML = myText;
				noun1.focus();
				return;
	
			case (plural3.value === ''):
				myText = "Please provide another Plural Noun.";
				errorMessage.innerHTML = myText;
				plural3.focus();
				return;
	
			case (noun2.value === ''):
				myText = "Please provide a Fun Noun.";
				errorMessage.innerHTML = myText;
				noun2.focus();
				return;
	
			case (noun3.value === ''):
				myText = "Please provide another Noun.";
				errorMessage.innerHTML = myText;
				noun3.focus();
				return;
	
			case (adj1.value === ''):
				myText = "Please provide an Adjective.";
				errorMessage.innerHTML = myText;
				adj1.focus();
				return;
	
			case (plural4.value === ''):
				myText = "Please provide another Plural Noun.";
				errorMessage.innerHTML = myText;
				plural4.focus();
				return;
	
			case (number.value === ''):
				myText = "Please provide a Number.";
				errorMessage.innerHTML = myText;
				number.focus();
				return;
	
			default:
				// If no fields are empty, proceed to make the MadLib
				makeMadLib();
		}
	}

	function makeMadLib(words){
		const nameText = `<span>${words[0]}</span>`;
		const introText = `I'm an innovative <span>${words[1]}</span> known for my ability to efficiently turn ordinary tasks into extraordinary achievements. With a passion for <span>${words[2]}</span> and a love for <span>${words[3]}</span>, I bring a lively vibe to every project.`;
		const mottoText = `The secret to happiness is <span>${words[4]}</span> and well-placed <span>${words[5]}</span>`;
		const firstExpText = `Led a team of <span>${words[6]}</span>s, designers, engineers, and UX researchers, to design the first viral <span>${words[7]}</span> in the United States.`;
		const secondExpText = `Launched a <span>${words[8]}</span> by leveraging agile methods and executing content strategy resulting in <span>${words[9]}</span> outcomes.`;
		const thirdExpText = `Delegated tasks to a team of <span>${words[10]}</span> utilizing cross-functional collaboration and stakeholder management to boost profits by <span>${words[11]}</span>%.`;

		name.innerHTML = nameText;
		intro.innerHTML = introText;
		motto.innerHTML = mottoText;
		firstExp.innerHTML = firstExpText;
		secondExp.innerHTML = secondExpText;
		thirdExp.innerHTML = thirdExpText;

	
		document.querySelector('#madlibs-overlay').className = 'showing';	

		// reset fields
		for(const eachField of formData){
			eachField.value = '';
		}

		errorMessage.innerHTML = "";
	}


	// VISIBILITY CLASSES
    document.querySelector('#redo-button').addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector('#madlibs-overlay').className = 'hidden'
    });
	
})();