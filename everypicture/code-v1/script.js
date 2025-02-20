(function () {
	console.log('reading js')

	// hover event listener
	const flower = document.querySelector('#flower');
	const blue = document.querySelector('#blue');
	const forever = document.querySelector('#forever');
	const silence = document.querySelector('#silence');

	const sheets = [flower, blue, forever, silence];
	const sheetsContainer = document.querySelector("#sheets-container");

	sheetsContainer.addEventListener('mouseover', function(event){
		if (sheets.includes(event.target)){
			console.log(`Hovered over: ${event.target.id}`);
			event.target.className = 'reset-rotate';
		}
	});

})();