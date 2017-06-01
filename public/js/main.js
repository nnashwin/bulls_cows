(function () {
	function ready (fn) {
		if (document.readyState !== 'loading') {
			fn();
		} else {
			document.addEventListener('DOMContentLoaded', fn);
		}
	}

	ready(() => {
		const gameStates = ['login', 'play', 'gameOver'];
		const playerInfo = [];
		let currentState = gameStates[0];

		const loginForm = document.getElementById('login-form');
		const gameForm = document.getElementById('game-form');
		if (currentState === 'login') {
			gameForm.style.display = 'none';
		}
	});
})();
