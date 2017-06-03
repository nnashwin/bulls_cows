(function () {
	function ready (fn) {
		if (document.readyState !== 'loading') {
			fn();
		} else {
			document.addEventListener('DOMContentLoaded', fn);
		}
	}

	function clearFormInputs (formEl) {
		var formElInputArray = Array.prototype.slice.call(formEl.getElementsByTagName('input'));
		return formElInputArray.map((input) => {
			input.value = '';
		});
	}

	function calcBucksAndNannies (inputStr, playerStr) {
		
	}

	function showLoginScreen (currentPlayer, gameForm) {
		gameForm.style.display = 'none';

		const playerInput = document.getElementById('player-input');
		const playerString = currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1, currentPlayer.length - 1) + ' ' + currentPlayer.slice(currentPlayer.length - 1)

		playerInput.innerHTML = `The current player is ${playerString}, please enter your nickname and passcode`;
	}

	function showGameScreen (currentPlayerObj) {
		const playerNick = document.getElementById('player-nickname');
		playerNick.innerHTML = `${currentPlayerObj.nickname}`;
	}

	function changePlayer (playerStr) {
		if (playerStr === 'player1') {
			return 'player2';
		} else {
			return 'player1';
		}
	}

	function onReady () {
		const gameStates = ['login1', 'login2', 'play', 'gameOver'];
		let currentPlayer = 'player1';

		var playerInfo = {};

		var gameState = 0;

		const loginForm = document.getElementById('login-form');
		const gameForm = document.getElementById('game-form');
		

		let currentState = gameStates[gameState];

		showLoginScreen(currentPlayer, gameForm);

		loginForm.addEventListener('submit', () => {
			const playerObj = {};

			// convert array-like object to array
			let inputs = Array.prototype.slice.call(loginForm.getElementsByTagName('input'));
			inputs.map((input) => {
				const keyStr = input.id.split('-')[0];
				playerObj[keyStr] = input.value
			});

			playerInfo[currentPlayer] = playerObj;

			gameState += 1;
			currentState = gameStates[gameState];

			if (currentState === 'play') {
				gameForm.style.display = 'block';
				loginForm.style.display = 'none';
				currentPlayer = changePlayer(currentPlayer);
				showGameScreen(playerInfo[currentPlayer]);
			} else if (currentState !== 'play') {
				clearFormInputs(loginForm);
				currentPlayer = changePlayer(currentPlayer);
				showLoginScreen(currentPlayer, gameForm);
			}
		});

		gameForm.addEventListener('submit', () => {
			gameState += 1;
			currentState = gameStates[gameState];
			showGameScreen(playerInfo[currentPlayer]);
			const otherPlayer = playerInfo[players[(playerIdx + 1) % 2]]
			const buckNannObj = calcBucksAndNannies();
		});
	}

	ready(onReady);
})();
