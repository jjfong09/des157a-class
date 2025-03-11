(function(){
    'use strict'
    console.log('reading JS');


	// ----------------- OVERLAY CONTROLS -----------------
    window.addEventListener('load', function () {
        const overlay = document.querySelector('#overlay');
        const dimmer = document.querySelector('#dimmer');

        setTimeout(function(){
            overlay.className = 'shown';
            dimmer.style.visibility = 'visible';
        },500);

	    overlay.addEventListener('click', function(){
		    overlay.className = 'hidden';
            dimmer.style.visibility = 'hidden';
	    });
    });

	// ----------------- GAME CONTROLS -----------------

    const startGame = document.querySelector('#startgame');
    const gameControl = document.querySelector('#gamecontrol');
    const game = document.querySelector('#game'); // main box
    const p1score = document.querySelector('#score1');
	const p2score = document.querySelector('#score2'); 
    const actionArea = document.querySelector('#actions'); // playing buttons

    const gameData = {
        // dice: ['1die.jpg', '2die.jpg', '3die.jpg', 
        //        '4die.jpg', '5die.jpg', '6die.jpg'],
        // players: ['player 1', 'player 2'],
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

        gameControl.innerHTML = '<h2>Game Start!</h2>'
        gameControl.innerHTML += '<button id="quit">Restart Game</button>';

        document.querySelector('#quit').addEventListener('click', function(){
            location.reload();
        });

        // console.log('set up the turn');

        setUpTurn();
    });

    // ----------------- GAME HELPER FUNCTIONS -----------------

    function setUpTurn(){
        game.innerHTML = `<p>Roll the dice for the ${gameData.players[gameData.index]}</p>`;
        actionArea.innerHTML = '<button id="roll">Roll the Dice</button>';
        
        document.querySelector('#roll').addEventListener('click', function(){
            // console.log('Roll the Dice!')
            throwDice();
        });
    }
    
    function throwDice(){
        actionArea.innerHTML = "";
        gameData.roll1 = Math.floor(Math.random() * 6 + 1);
        gameData.roll2 = Math.floor(Math.random() * 6 + 1);
        console.log(gameData.roll1);
        console.log(gameData.roll2);
        game.innerHTML = `<p>Roll the dice for ${gameData.players[gameData.index]}</p>`;
        game.innerHTML += `<img src="images/${gameData.dice[gameData.roll1-1]}"> <img src="images/${gameData.dice[gameData.roll2-1]}">`;
        gameData.rollSum = gameData.roll1 + gameData.roll2; // calc sum
        console.log(gameData.rollSum);

        // for testing
        // gameData.roll1 = 1;

         // if two 1's are rolled 
         if (gameData.rollSum === 2) {
            console.log('snake eyes');
            game.innerHTML += '<p>Oh no snake eyes!</p>';

            // sero out score
            gameData.score[gameData.index] = 0;

            //switch player
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);

            // we will add show current score() function here

            // wait 2 secs then reset
            setTimeout(setUpTurn,2000);
        }

        // if eithe die is a 1
       else if (gameData.roll1 === 1 || gameData.roll2 === 1 ) {
            console.log('one of the two dice is a 1');
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            game.innerHTML += `<p>Sorry, one of your rolls was a one, switching to ${gameData.players[gameData.index]}</p>`;
            setTimeout(setUpTurn,2000);
        }

        // if neither die is a 1
        else {
            console.log('neither was a 1 game continues')
            // update score
            //add sum to curr players score
            gameData.score[gameData.index] += gameData.rollSum;
            gameData.rollSum;
            actionArea.innerHTML = '<button id="rollagain">Roll Again</button> or <button id="pass">Pass</button>'; 

            document.querySelector("#rollagain").addEventListener('click', function(){
               throwDice();
            });
            document.querySelector("#pass").addEventListener('click', function(){
                gameData.index ? (gameData.index = 0) : (gameData.index = 1);
                setUpTurn();
            });

            checkWinningCondition();
        }
    }

    function checkWinningCondition(){
        if (gameData.score[gameData.index] > gameData.gameEnd) {
            score.innerHTML = `<h2>${gameData.players[gameData.index]} wins with ${gameData.score[gameData.index]} points!</h2>`

            actionArea.innerHTML = '';
            document.querySelector("#quit").innerHTML = 'Start a New Game?';
        }
        else {
            showCurrentScore();
        }
    }

    function showCurrentScore(){
        score.innerHTML = `<p>The score is currently <strong>${gameData.players[0]}:
	    ${gameData.score[0]}</strong> and <strong>${gameData.players[1]}: 
	    ${gameData.score[1]}</strong></p>`;
    }

})();