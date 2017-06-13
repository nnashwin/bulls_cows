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

	function calcBucksAndNannies (playerStr, inputStr) {
		let bucks = 0;
		let nannies = 0;
		const playerHash = {}

		for (let i = 0; i < playerStr.length; i++) {
			const playerChar = playerStr.charAt(i);

			typeof playerHash[playerChar] === 'undefined' ? playerHash[playerChar] = 1 : playerHash[playerChar] += 1;
		}

		for (let i = 0; i < playerStr.length; i += 1) {
			const playerChar = playerStr.charAt(i);
			const inputChar = inputStr.charAt(i);
			if (playerChar === inputChar) {
				bucks += 1;
				playerHash[playerChar] -= 1;
			} else if (playerHash[inputChar]) {
				nannies += 1;
				playerHash[inputChar] -= 1;
			}

		}

		return {bucks, nannies};
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
	function endGame (winningPlayer) {
		const winDiv = document.createElement('h1');
		const winMsg = document.createTextNode(`${winningPlayer['nickname']}, you win!`);
		winDiv.appendChild(winMsg);
		document.getElementsByTagName('body')[0].appendChild(winDiv);
	}

	function onReady () {
		let currentPlayer = 'player1';

		var playerInfo = {};

		const loginForm = document.getElementById('login-form');
		const gameForm = document.getElementById('game-form');
		const switchPlayerDiv = document.getElementById('switch-players');
		
		switchPlayerDiv.style.display = 'none';


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

			if (typeof playerInfo['player1'] !== 'undefined' && typeof playerInfo['player2'] !== 'undefined') {
				gameForm.style.display = 'block';
				loginForm.style.display = 'none';
				currentPlayer = changePlayer(currentPlayer);
				showGameScreen(playerInfo[currentPlayer]);
			} else {
				clearFormInputs(loginForm);
				currentPlayer = changePlayer(currentPlayer);
				showLoginScreen(currentPlayer, gameForm);
			}
		});

		gameForm.addEventListener('submit', () => {
			const guessInputVal = gameForm.getElementsByTagName('input')[0].value;
			const guessResult = document.getElementById('guess-result');
			const otherPlayer = playerInfo[changePlayer(currentPlayer)]
			const buckNannObj = calcBucksAndNannies(otherPlayer.passcode, guessInputVal);

			if (buckNannObj.bucks === otherPlayer.passcode.length) {
				gameForm.style.display = 'none';
				return endGame(playerInfo[currentPlayer]);
			} else {
				switchPlayerDiv.style.display = 'block';
				let frag = document.createDocumentFragment();
				let textDiv = frag.appendChild(document.createElement('div'));
				textDiv.appendChild(document.createTextNode(`${currentPlayer} guessed ${buckNannObj.bucks} bucks and ${buckNannObj.nannies} nannies`));
				switchPlayerDiv.appendChild(frag);
			}
			
		});

		switchPlayerDiv.addEventListener('click', (e) => {
			currentPlayer = changePlayer(currentPlayer);
			clearFormInputs(gameForm);
			showGameScreen(playerInfo[currentPlayer]);
		});
	}

	ready(onReady);
})();
