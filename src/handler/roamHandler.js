const sendToRoam = require("../services/roam");
const { log } = require("wechaty");

class RoamHandler {
  constructor() {
    this.roomName = "roam/cn";
  }

  async handle(message) {
    const talker = message.talker();
    if (
      talker.name().includes("吕立青@JimmyLv") &&
      message.text().startsWith("#RR")
    ) {
      await sendToRoam(message);
    }

    if (message.text() === "ding") {
      await message.say("dong");
    }
  }
}

module.exports = RoamHandler;
