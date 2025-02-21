(function () {
	'use strict';
	
	console.log('reading js');

	// ----- VARIABLES -----
	const flower = document.querySelector('#flower');
	const blue = document.querySelector('#blue');
	const forever = document.querySelector('#forever');
	const silence = document.querySelector('#silence');

	const sheets = [flower, blue, forever, silence];
	console.log(sheets);


	// ---------- MAIN EVENT LISTENER ----------
	
	const wrapper = document.querySelectorAll("#sheets-container .img-wrapper"); // get each wrapper within the container

	wrapper.forEach(function (eachSheet) {
		eachSheet.addEventListener('mouseover', focusSheet);
		eachSheet.addEventListener('mouseout', defaultState);
	});

	// main function
	function focusSheet(event){
		resetRotate(event);
		appearElement(event);
		event.target.style.zIndex = "1";
		playVideo(event);
	}


	// ---------- HELPER FUNCTIONS ----------

	function defaultState(event){
		// reset rotate
		event.target.classList.remove('reset-rotate');

		// make elements disappear
		const id = event.target.id;
		const respectiveVideo = document.querySelector(`#${id}-vid`);
		const respectiveTag = document.querySelector(`#${id}-tag`);
		respectiveVideo.style.opacity = 0;
		respectiveTag.style.opacity = 0;

		// reset z-index
		event.target.style.zIndex = "0";

		// video
		pauseVideo(event);
	}

	function resetRotate(event) {
		console.log(`Hovered over: ${event.target.id}`);
		event.target.classList.add('reset-rotate');
	} 

	function appearElement(event) {
		const id = event.target.id;
		const respectiveVideo = document.querySelector(`#${id}-vid`);
		const respectiveTag = document.querySelector(`#${id}-tag`);

		// make elements appear
		respectiveVideo.style.opacity = 1;
		respectiveTag.style.opacity = 1;
	}

	function playVideo(event) {
		const id = event.target.id;
		const video = document.querySelector(`#${id}-vid`);
		video.autoplay = true;
		video.play();
	}

	function pauseVideo(event) {
		const id = event.target.id;
		const video = document.querySelector(`#${id}-vid`);
		video.pause(); 
		video.currentTime = 0;
	}

})();