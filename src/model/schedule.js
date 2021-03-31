const Events = require('./events');

class Schedule {
	constructor(calendar) {
		const commingEventDates = calendar.getComingEventDates(5);
		this.events = new Events(commingEventDates);
	}

	toString() {
		return this.title() + this.events.eventsString();
	}

	title() {
		return '#排期接龙\n';
	}

	book(dateOrIndex, name) {
		return this.events.book(dateOrIndex, name);
	}

	travelTo(calendar) {
		this.events.travelTo(calendar);
	}

}

module.exports = Schedule;
