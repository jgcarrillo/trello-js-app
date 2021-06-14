class Task {
	static id = 0;

	constructor(name) {
		this.id = Task.id++;
		this.name = name;
	}

	setName(name) {
		this.name = name;
	}

	getName() {
		return this.name;
	}
}
