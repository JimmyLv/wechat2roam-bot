const Event = require('./event');
const Storager = require('./storager');
const storager = new Storager();

class Events {

	constructor(calendar) {
		if (!this.getEvents()) {
			let events = calendar.getComingEventDates(5).map((date) => new Event(date, []));
			this.saveEvents(events);
		}
	}

	getEvents() {
		let events = storager.get('events');
		return events ? events.map((e) => parse(e.date, e.hosts)) : null;
	}

	eventsString() {
		let events = this.getEvents();
		return events.map((e, index) => e.toString(index + 1)).join('\n');
	}

	book(dateOrIndex, name) {
		const index = Number(dateOrIndex);
		if (index >= 1 && index <= 5) {
			let eventsData = this.getEvents();
			eventsData[index - 1].appendHost(name);
			this.saveEvents(eventsData);
			return true;
		}

		let eventsData = this.getEvents();
		const event = eventsData.find((e) => e.date === dateOrIndex);
		if (event) {
			event.appendHost(name);
			this.saveEvents(eventsData);
			return true;
		}

		return false;
	}

	saveEvents(events) {
		storager.set('events', events.map((e) => new Event(e.date, e.hosts)));
	}

	travelTo(calendar) {
		const eventDates = calendar.getComingEventDates(5);
		let events = this.getEvents();
		this.removeOutdatedEvents(events, eventDates);
		this.addComingEvents(events, eventDates);
		this.saveEvents(events);
	}

	removeOutdatedEvents(events, eventDates) {
		events.filter((e) => eventDates.includes(e.date));
	}

	addComingEvents(events, eventDates) {
		eventDates.forEach((date) => {
			if (!events.find((e) => e.date === date))
				events.push(new Event(date, []));
		});
	}
}

function parse(date, hosts) {
	return new Event(date, hosts);
}

module.exports = Events;
