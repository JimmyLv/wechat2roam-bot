const { Wechaty } = require("wechaty");
const RoamHandler = require("./handler/roamHandler");
const RoomNameMatcher = require("./roomNameMatcher");

const roomNameMatcher = new RoomNameMatcher([new RoamHandler()]);

function onEasyScan(qrcode, status) {
  console.log(
    `Scan QR Code to login: ${status}\nhttps://wechaty.js.org/qrcode/${encodeURIComponent(
      qrcode
    )}`
  );
}

Wechaty.instance({ name: "wechat2roam-bot" }) // Singleton
  .on("scan", onEasyScan)
  .on("login", (user) => console.log(`User ${user} logined`))
  .on("message", async (message) => {
    const handlers = await roomNameMatcher.match(message);
    handlers.forEach((h) => h.handle(message));
  })
  .start();
