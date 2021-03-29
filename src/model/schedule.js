const Event = require("./event");
class Schedule {
  constructor(calendar) {
    const commingEventDates = calendar.getComingEventDates(5);
    this.events = commingEventDates.map((date) => new Event(date, []));
  }

  toString() {
    return this.title() + this.eventsString();
  }

  eventsString() {
    return this.events.map((e, index) => e.toString(index + 1)).join("\n");
  }

  title() {
    return "#排期接龙\n";
  }

  book(dateOrIndex, name) {

    const index = Number(dateOrIndex);
    if (index >= 1 && index <= 5) {
      this.events[index - 1].appendHost(name);
      return true;
    }

    const event = this.events.find((e) => e.date === dateOrIndex);
    if (event) {
      event.appendHost(name);
      return true;
    }

    return false;
  }

  travelTo(calendar) {
    const eventDates = calendar.getComingEventDates(5);
    this.removeOutdatedEvents(eventDates);
    this.addComingEvents(eventDates);
  }

  removeOutdatedEvents(eventDates) {
    this.events = this.events.filter((e) => eventDates.includes(e.date));
  }

  addComingEvents(eventDates) {
    eventDates.forEach((date) => {
      if (!this.events.find((e) => e.date === date))
        this.events.push(new Event(date, []));
    });
  }
}

module.exports = Schedule;
