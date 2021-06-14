document.addEventListener('DOMContentLoaded', function () {
	// Getting all the data attributes to open and close
	const openModal = document.querySelectorAll('[data-open]');
	const closeModal = document.querySelectorAll('[data-close]');

	const isVisible = 'is-visible';

	const btnTask = document.querySelector('#add__task');
	const getInput = document.querySelector('#todo1');
	let valueTask = '';

	// iterate all the open datasets and set the 'is-visible' class
	for (let elem of openModal) {
		elem.addEventListener('click', function () {
			const modalId = this.dataset.open;
			document.getElementById(modalId).classList.add(isVisible);
		});
	}

	// iterate all the close datasets and remove the 'is-visible' class
	for (let elem of closeModal) {
		elem.addEventListener('click', function () {
			this.parentElement.parentElement.parentElement.classList.remove(isVisible);
		});
	}

	// Adding event to X button to close the modal (make invisible)
	document.addEventListener('click', (e) => {
		if (e.target == document.querySelector('.modal.is-visible')) {
			document.querySelector('.modal.is-visible').classList.remove(isVisible);
		}
	});

	// Adding the key 'Esc' to close de modal too
	document.addEventListener('keyup', (e) => {
		if (e.key === 'Escape' && document.querySelector('.modal.is-visible')) {
			document.querySelector('.modal.is-visible').classList.remove(isVisible);
		}
	});

	// Retrieving value
	btnTask.addEventListener('click', function (e) {
		e.preventDefault();

		if (getInput.value == '') {
			alert('Empty');
		} else {
			document.querySelector('.modal.is-visible').classList.remove(isVisible);
			valueTask = getInput.value;
		}
		console.log(valueTask);
	});
});
