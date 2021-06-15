document.addEventListener('DOMContentLoaded', function () {
	// Getting all the data attributes to open and close
	const openModal = document.querySelectorAll('[data-open]');
	const closeModal = document.querySelectorAll('[data-close]');

	const isVisible = 'is-visible';

	const btnTask = document.querySelector('#add__task');
	const getInput = document.querySelector('#todo1');
	let valueTask = '';

	const containerAlert = document.querySelector('#alert__empty');

	const btnTodo = document.querySelector('.add-todo');
	const containerToDo = document.querySelector('.container__todo');

	// *************************
	// MODAL *******************
	// *************************

	// Iterate all the open datasets and set the 'is-visible' class
	for (let elem of openModal) {
		elem.addEventListener('click', function () {
			const modalId = this.dataset.open;
			document.getElementById(modalId).classList.add(isVisible);
		});
	}

	// Iterate all the close datasets and remove the 'is-visible' class
	for (let elem of closeModal) {
		elem.addEventListener('click', function () {
			this.parentElement.parentElement.parentElement.classList.remove(isVisible);
		});
	}

	// Adding event to X button to close the modal (make invisible)
	document.addEventListener('click', (e) => {
		if (e.target == document.querySelector('.modal.is-visible')) {
			document.querySelector('.modal.is-visible').classList.remove(isVisible);

			containerAlert.classList.remove('alert');
		}
	});

	// Adding the key 'Esc' to close de modal too
	document.addEventListener('keyup', (e) => {
		if (e.key === 'Escape' && document.querySelector('.modal.is-visible')) {
			document.querySelector('.modal.is-visible').classList.remove(isVisible);
			containerAlert.classList.remove('alert');
		}
	});

	// Retrieving value and error management
	btnTask.addEventListener('click', function (e) {
		e.preventDefault();

		if (getInput.value === '') {
			containerAlert.classList.add('alert');
			containerAlert.innerHTML = 'The input value cannot be empty';
			containerAlert.style.display = 'block';

			setTimeout(() => {
				containerAlert.style.display = 'none';
			}, 2000);
			return;
		} else {
			// *********************
			// CREATE TASK AND APPEND
			// *********************
			document.querySelector('.modal.is-visible').classList.remove(isVisible);
			const task = new Task(getInput.value);

			const $p = document.createElement('p');
			$p.innerHTML = task.getName();

			containerToDo.appendChild($p);

			console.log(task);
		}
	});

	const containerTask = ({ task }) => {
		const $div = document.createElement('div');
		$div.innerHTML = task.getName();

		return $div;
	};
});
