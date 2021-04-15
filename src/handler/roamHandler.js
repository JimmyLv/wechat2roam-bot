const { log } = require("wechaty");
const RoamPrivateApi = require("roam-research-private-api");

const roamApi = new RoamPrivateApi(
  process.env.ROAM_API_GRAPH,
  process.env.ROAM_API_EMAIL,
  process.env.ROAM_API_PASSWORD,
  {
    headless: true,
  }
);

class RoamHandler {
  constructor() {
    this.roomName = "roam/cn";
  }

  async handle(message) {
    log.info("StarterBot", message.toString());
    const bot = message.wechaty.userSelf();

    const talker = message.talker();
    if (talker.name().includes("吕立青@JimmyLv.info") || bot === talker) {
      log.info("sending to RoamResearch...", message.text());
      const dailyNoteUid = roamApi.dailyNoteUid();
      const input = `${message.text()} #WeChat`;
      await roamApi.logIn();
      await roamApi.createBlock(input, dailyNoteUid);
      // await roam.close();
      // await roam.quickCapture('测试一下');

      log.info("sent to RoamResearch...", input);
      await message.say("保存成功！");
    }

    if (message.text() === "ding") {
      await message.say("dong");
    }
  }
}

module.exports = RoamHandler;
