const http = require("http");
const { Wechaty } = require("wechaty");
const ScheduleHandler = require("./handler/scheduleHandler");

const scheduleHandler = new ScheduleHandler();

let started = false;
const printURLOnPage = (url) => {
  if (started) return;
  const requestListener = (req, res) => {
    res.writeHead(200);
    res.end(`<script>location.href='${url}'</script>`);
  };

  const server = http.createServer(requestListener);
  server.listen(80);
  console.log("Server started at: http://localhost");
  started = true;
};

Wechaty.instance() // Singleton
  .on("scan", (qrcode, status) => {
    const url = `https://wechaty.js.org/qrcode/${encodeURIComponent(qrcode)}`;
    console.log(`Scan QR Code to login: ${status}\n${url}`);

    printURLOnPage(url);
  })
  .on("login", (user) => console.log(`User ${user} logined`))
  .on("message", async (message) => {
    const room = message.room();
    if (room) {
      const topic = await room.topic();
      if (topic === "软件匠艺结对直播主播群")
        await scheduleHandler.handle(message);
    }
  })
  .start();
