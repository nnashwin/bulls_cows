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

		const playerNumber = document.getElementById('player-number')
		playerNumber.innerHTML = `The current player is Player ${currentPlayer}, please enter your nickname and passcode`;
	}

	function onReady () {
		var gameStates = ['login1', 'login2', 'play', 'gameOver'];
		var playerInfo = {};
		let currentPlayer = 1;
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

			playerInfo[`Player${currentPlayer}`] = playerObj;

			gameState += 1;
			currentState = gameStates[gameState];

			if (currentState === 'play') {
				gameForm.style.display = 'block';
				loginForm.style.display = 'none';
			} else if (currentState !== 'play') {
				clearFormInputs(loginForm);
				currentPlayer = (currentPlayer % 2) + 1
				showLoginScreen(currentPlayer, gameForm);
			}
		});

		gameForm.addEventListener('submit', () => {
			gameState += 1;
			currentPlayer = (currentPlayer % 2) + 1;
			currentState = gameStates[gameState];
		});
	}

	ready(onReady);
})();
