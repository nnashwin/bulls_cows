(function () {
	function ready (fn) {
		if (document.readyState !== 'loading') {
			fn();
		} else {
			document.addEventListener('DOMContentLoaded', fn);
		}
	}

	ready(() => {
		const loginForm = document.getElementById('login-form');
	});
})();
