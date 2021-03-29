const Schedule = require("./model/schedule");
const Calendar = require("./model/calendar");

class Handler {
  constructor() {
    const now = new Date();
    const today = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
    const calendar = new Calendar(today);
    this.schedule = new Schedule(calendar);
  }

  async handle(message) {
    const text = message.text();
    if (text === "排期") {
      await message.say(this.schedule.toString());
    } else if (text.match(/^\d{4}$/)) {
      if (calendar.validate(text)) {
        this.schedule.book(text, message.from().name());
        await message.say(this.schedule.toString());
      }
    }
  }
}

module.exports = Handler;
