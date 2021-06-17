document.addEventListener('DOMContentLoaded', function () {
	// ****************
	// GLOBAL VARIABLES
	// ****************
	const openModal = document.querySelectorAll('[data-open]');
	const closeModal = document.querySelectorAll('[data-close]');

	const isVisible = 'is-visible';

	const btnTask = document.querySelector('#add__task');
	const taskTitle = document.querySelector('#todo1');

	const containerAlert = document.querySelector('#alert__empty');

	const todoContainer = document.querySelector('.to-do');

	const containerDrop = document.querySelectorAll('.dropzone');
	const all = document.querySelectorAll('.container__todo, .card');
	let draggableTodo = null;

	let tasks = [];

	// *********
	// FUNCTIONS
	// *********
	const TodoTaskContainer = (task) => {
		const $div = document.createElement('div');
		const $p = document.createElement('p');
		const $button = document.createElement('button');

		$div.classList.add('container__todo');
		$div.classList.add('card');
		$div.setAttribute('id', task.getId());

		// Drag an drop events
		$div.setAttribute('draggable', 'true');

		$div.addEventListener('dragstart', dragStart);
		$div.addEventListener('dragend', dragEnd);

		function dragStart() {
			draggableTodo = this;
		}

		function dragEnd() {
			draggableTodo = null;
		}

		containerDrop.forEach((status) => {
			status.addEventListener('dragover', dragOver);
			status.addEventListener('dragenter', dragEnter);
			status.addEventListener('dragleave', dragLeave);
			status.addEventListener('drop', dragDrop);
		});

		function dragOver(e) {
			e.preventDefault();
		}

		function dragEnter() {
			this.style.border = '5px solid yellow';
		}

		function dragLeave() {
			this.style.border = 'none';
		}

		function dragDrop() {
			if (this.classList.contains('doing')) {
				draggableTodo.style.background = 'red';
			} else if (this.classList.contains('done')) {
				draggableTodo.style.background = 'green';
			} else {
				draggableTodo.style.background = '#457b9d';
			}

			this.style.border = 'none';
			this.appendChild(draggableTodo);
		}

		$p.innerHTML = `${task.getName()}`;

		$button.innerHTML = 'X';
		$button.classList.add('remove__button');

		// Remove task when press X button
		$button.addEventListener('click', () => {
			removeTodo($div.getAttribute('id'));
		});

		/*
		for (let container of containerDrop) {
			container.addEventListener('dragover', (e) => {
				// Avoid default behaviour of browser
				e.preventDefault();
			});
		}

		for (let container of containerDrop) {
			container.addEventListener('drop', function (e) {
				this.setAttribute('draggable', 'true');
				this.appendChild($div);
			});
		}
		*/

		$div.appendChild($p);
		$div.appendChild($button);

		return $div;
	};

	const removeTodo = (id) => {
		document.getElementById(id).remove();
	};

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

	// *********************
	// CREATE TASK AND APPEND
	// *********************
	// Retrieving value and error management
	btnTask.addEventListener('click', function (e) {
		e.preventDefault();

		if (taskTitle.value === '') {
			containerAlert.classList.add('alert');
			containerAlert.innerHTML = 'The input value cannot be empty';
			containerAlert.style.display = 'block';

			setTimeout(() => {
				containerAlert.style.display = 'none';
			}, 2000);
			return;
		} else {
			document.querySelector('.modal.is-visible').classList.remove(isVisible);

			// Create a new instance of Task
			const task = new Task(taskTitle.value);

			// Adding the task to the array to control the number of tasks
			tasks.push(task);

			// Show the task into To-Do container
			todoContainer.appendChild(TodoTaskContainer(task));
		}
	});
});
