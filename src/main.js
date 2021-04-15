const { Wechaty, log } = require("wechaty");
const RoamHandler = require("./handler/roamHandler");
const RoomNameMatcher = require("./roomNameMatcher");
const sendToRoam = require("./services/roam");

const roomNameMatcher = new RoomNameMatcher([new RoamHandler()]);

function onEasyScan(qrcode, status) {
  require("qrcode-terminal").generate(qrcode); // 在console端显示二维码
  const qrcodeImageUrl = [
    "https://wechaty.js.org/qrcode/",
    encodeURIComponent(qrcode),
  ].join("");
  console.log(qrcodeImageUrl);
}

Wechaty.instance({ name: "wechat2roam-bot" }) // Singleton
  .on("scan", onEasyScan)
  .on("login", (user) => console.log(`User ${user} logined`))
  .on("message", async (message) => {
    // 微信群，根据条件保存
    /*
    const handlers = await roomNameMatcher.match(message);
    handlers.forEach((h) => h.handle(message));
    */

    // 自己发给自己，直接保存
    const talker = message.talker();
    if (message.self() || talker.name().includes("吕立青@JimmyLv")) {
      log.info("RoamBot", message.toString());

      await sendToRoam(message);
    }
  })
  .start();
