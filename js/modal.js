document.addEventListener('DOMContentLoaded', function () {
	const openModal = document.querySelectorAll('[data-open]');
	const isVisible = 'is-visible';
	const closeModal = document.querySelectorAll('[data-close]');

	for (const elem of openModal) {
		elem.addEventListener('click', function () {
			const modalId = this.dataset.open;
			document.getElementById(modalId).classList.add(isVisible);
		});
	}

	for (const elem of closeModal) {
		elem.addEventListener('click', function () {
			this.parentElement.parentElement.parentElement.classList.remove(isVisible);
		});
	}

	document.addEventListener('click', (e) => {
		if (e.target == document.querySelector('.modal.is-visible')) {
			document.querySelector('.modal.is-visible').classList.remove(isVisible);
		}
	});

	document.addEventListener('keyup', (e) => {
		if (e.key == 'Escape' && document.querySelector('.modal.is-visible')) {
			document.querySelector('.modal.is-visible').classList.remove(isVisible);
		}
	});
});
