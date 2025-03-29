(function(){
    'use strict'
    console.log('reading JS');

    // ----------------- SOUNDS -----------------
    const pop = new Audio('audio/pop.mp3');
    const click = new Audio('audio/click.mp3');
    const bg = new Audio('audio/bg-music.mp3');
    let isPlaying = false;
    const score = new Audio('audio/pop.mp3');
    const win = new Audio('audio/winning.mp3');

    // ----------------- OTHER VARIABLES -----------------
    const controlButtons = document.querySelectorAll('#gamecontrol button');
    // Select all buttons
    const overlayButton = document.querySelector('#overlay button');
    const startButton = document.querySelector('#startGame');


    function scoreSound() {
        score.play();
        score.currentTime = 0;
        score.volume = 0.5;
    }

   function winSound() {
        win.play();
        win.volume = 0.5;
    }

    function bgMusic() {
        if (!isPlaying) {
            bg.play();
            bg.loop = true;  // Ensures continuous playback
            bg.volume = 0.5;
            isPlaying = true;  // Set flag to indicate music is playing
        }
    }

    function clickSound() {
        click.play();
        click.currentTime = 0;
        click.volume = 0.5;
    }

    function handleClick() {
        clickSound();
    };

    overlayButton.addEventListener('click', handleClick);
    startButton.addEventListener('click', handleClick);

      // ----------GAME CONTROLS ---------------

    // open overlay for info icon
    const volume = document.querySelector('#volume');
    const info = document.querySelector('#info');
    const overlay = document.querySelector('#overlay');
    const dimmer = document.querySelector('#dimmer');


    info.addEventListener('click', function() {
        pop.play();
        overlay.className = 'shown';
        dimmer.style.visibility = 'visible';
    })

    // ----------------- OVERLAY CONTROLS -----------------
    window.addEventListener('load', function () {
        setTimeout(function(){
            overlay.className = 'shown';
            dimmer.style.visibility = 'visible';    
            
        },500);

	    overlay.addEventListener('click', function(){
		    overlay.className = 'hidden';
            dimmer.style.visibility = 'hidden';
            clickSound();
            bgMusic(); // play music
	    });
    });

	// ----------------- GAME CONTROLS -----------------

    const startGame = document.querySelector('#startGame');
    const gameControl = document.querySelector('#gamecontrol');
    const game = document.querySelector('#game'); // game descriptions
    const score1 = document.querySelector('#score1');
	const score2 = document.querySelector('#score2'); 
    const actionArea = document.querySelector('#actionArea'); // playing buttons
    const gameWrapper = document.querySelector('#game-wrapper');

    const gameData = {
        dice: ['1die.png', '2die.png', '3die.png', 
               '4die.png', '5die.png', '6die.png'],
        players: ['Player 1', 'Player 2'],
        score: [0, 0],
        roll1: 0,
        roll2: 0,
        rollSum: 0,
        index: 0, // index of players
        gameEnd: 29
    }

    startGame.addEventListener('click', function(){
        // set index to random player start
        gameData.index = Math.round(Math.random());
        console.log(gameData.index);

        // gameControl.innerHTML = '<h2>Game Start!</h2>'
        gameControl.innerHTML += '<button id="quit">Restart Game</button>'

        document.querySelector('#quit').addEventListener('click', function(){
            location.reload();
        });

        setUpTurn();
        console.log('set up the turn');

    });

    // ----------------- GAME HELPER FUNCTIONS -----------------

    function setUpTurn(){
        game.innerHTML = `<p class="game-text-js" >Roll the dice for the ${gameData.players[gameData.index]}</p>`;
        actionArea.innerHTML = '<button id="roll">Roll the Dice</button>';
        gameWrapper.className = "visible"

        
        document.querySelector('#roll').addEventListener('click', function(){
            throwDice();
        });
    }
    
    function throwDice(){
        actionArea.innerHTML = "";
        gameData.roll1 = Math.floor(Math.random() * 6 + 1);
        gameData.roll2 = Math.floor(Math.random() * 6 + 1);
        console.log(gameData.roll1);
        console.log(gameData.roll2);

        game.innerHTML = `<p class="game-text-js">Roll the dice for ${gameData.players[gameData.index]}</p>`;
        game.innerHTML += `<img class="dice" src="images/${gameData.dice[gameData.roll1-1]}"> <img class="dice" src="images/${gameData.dice[gameData.roll2-1]}">`;
        gameData.rollSum = gameData.roll1 + gameData.roll2; // calc sum
        console.log(gameData.rollSum);

        // for testing
        // gameData.roll1 = 1;
        // gameData.roll2 = 1;
        // gameData.rollSum = 2;


         // if two 1's are rolled 
         if (gameData.rollSum === 2) {
            console.log('snake eyes');
            game.innerHTML += '<p class="game-text-js">Oh no snake eyes!</p>';

            // zero out score
            gameData.score[gameData.index] = 0;

            showCurrentScore();
            changeImage();

            //switch player
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);    

            // wait 2 secs then reset
            setTimeout(setUpTurn,2000);
        }

        // if eithe die is a 1
       else if (gameData.roll1 === 1 || gameData.roll2 === 1 ) {
            console.log('one of the two dice is a 1');
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            game.innerHTML += `<p class="game-text-js">Oh no! One of your rolls was a one, It's ${gameData.players[gameData.index]}'s turn now.</p>`;
            setTimeout(setUpTurn,2000);
        }

        // if neither die is a 1
        else {
            console.log('neither was a 1 game continues')
            // update score
            //add sum to curr players score
            gameData.score[gameData.index] += gameData.rollSum;
            gameData.rollSum;
            actionArea.innerHTML = '<button id="rollagain">Roll Again</button> <span class="js-text" >or</span> <button id="pass">Pass</button>'; 

            document.querySelector("#rollagain").addEventListener('click', function(){
               throwDice();
            });
            document.querySelector("#pass").addEventListener('click', function(){
                gameData.index ? (gameData.index = 0) : (gameData.index = 1);
                setUpTurn();
            });

            checkWinningCondition();
            changeImage();
        }
    }

    function checkWinningCondition(){
        if (gameData.score[gameData.index] > gameData.gameEnd) {
            showCurrentScore();
            game.innerHTML = `<p>${gameData.players[gameData.index]} wins with ${gameData.score[gameData.index]} points!</p>`
            winSound();

            actionArea.innerHTML = '';
            document.querySelector("#quit").innerHTML = 'Start a New Game?';
        }
        else {
            showCurrentScore();
        }
    }

    function showCurrentScore(){
        score1.innerHTML = `${gameData.score[0]}`;
        score2.innerHTML = `${gameData.score[1]}`;
        scoreSound();
    }

    // --------- IMAGE CHANGE ---------------
    function changeImage(){
        const bucketID = `#p${gameData.index + 1}-bucket`; // getting player num
        const bucketImage = document.querySelector(bucketID); // selecting img id
    
        if (gameData.score[gameData.index] > 0 && gameData.score[gameData.index] < 8) {
            // Show picture 2
            bucketImage.src = 'images/second.png';
        } else if (gameData.score[gameData.index] >= 8 && gameData.score[gameData.index] < 20) {
            // Show picture 3
            bucketImage.src = 'images/third.png';
        } else if (gameData.score[gameData.index] >= 20 && gameData.score[gameData.index] < 29) {
            // Show picture 4
            bucketImage.src = 'images/fourth.png';
        } else if (gameData.score[gameData.index] >= gameData.gameEnd) {
            // Show picture 5 - Winning
            bucketImage.src = 'images/fifth.png';
        } else if (gameData.score[gameData.index] == 0){
            // Empty bucket (1)
            bucketImage.src = 'images/first.png';
        }
    }    

    // controlButtons.forEach(button => {
    //     button.addEventListener('click', function(){
    //         if (button.id === 'volume') {
    //             volume.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#AF6A32" viewBox="0 0 256 256"><path d="M165.27,21.22a12,12,0,0,0-12.64,1.31L83.88,76H40A20,20,0,0,0,20,96v64a20,20,0,0,0,20,20H83.88l68.75,53.47A12,12,0,0,0,172,224V32A12,12,0,0,0,165.27,21.22ZM148,199.46,95.37,158.53A12,12,0,0,0,88,156H44V100H88a12,12,0,0,0,7.37-2.53L148,56.54ZM212,104v48a12,12,0,0,1-24,0V104a12,12,0,0,1,24,0Z"></path></svg>'
                
    //         }
    //     });
    // });
    

    const myVolume = document.querySelector('#volume');

    // add code for toggle switch for bg
    myVolume.addEventListener('click', function() {
        console.log('volume change');
        if(isPlaying) { // mute
            bg.pause();
            volume.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#654021" viewBox="0 0 256 256"><path d="M165.27,21.22a12,12,0,0,0-12.64,1.31L83.88,76H40A20,20,0,0,0,20,96v64a20,20,0,0,0,20,20H83.88l68.75,53.47A12,12,0,0,0,172,224V32A12,12,0,0,0,165.27,21.22ZM148,199.47,95.37,158.53A12,12,0,0,0,88,156H44V100H88a12,12,0,0,0,7.37-2.53L148,56.54Zm108.49-55.95a12,12,0,0,1-17,17L224,145l-15.51,15.52a12,12,0,0,1-17-17L207,128l-15.52-15.51a12,12,0,0,1,17-17L224,111l15.51-15.51a12,12,0,0,1,17,17L241,128Z"></path></svg>'

            
        } else { // play music
            bg.play(); 
            volume.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#654021" viewBox="0 0 256 256"><path d="M165.27,21.22a12,12,0,0,0-12.64,1.31L83.88,76H40A20,20,0,0,0,20,96v64a20,20,0,0,0,20,20H83.88l68.75,53.47A12,12,0,0,0,172,224V32A12,12,0,0,0,165.27,21.22ZM148,199.47,95.37,158.53A12,12,0,0,0,88,156H44V100H88a12,12,0,0,0,7.37-2.53L148,56.54ZM212,104v48a12,12,0,0,1-24,0V104a12,12,0,0,1,24,0Zm36-16v80a12,12,0,0,1-24,0V88a12,12,0,0,1,24,0Z"></path></svg>'
        }
        // toggle the switch of playing
        isPlaying = !isPlaying;
    });
   

})();