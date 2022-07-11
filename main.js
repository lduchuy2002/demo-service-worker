const express = require("express");
const webPush = require("web-push");
const path = require("path");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

const webPushKey = {
  publicKey:
    "BPB7bpmLjdplP4XHIKDEFESrpH5MW8pFAC0zin8wQvZOZWY9M2Ni1IVMDa1lLPprHf2tjOavlyV0im577Yo9jWI",
  privateKey: "g8JyIH0W9N01jvVK_dU7S80-Nvs4ePAz6uBigrkCbDQ",
};

console.log({ webPushKey });
webPush.setVapidDetails(
  "mailto:ldhuy0102work@gmail.com",
  webPushKey.publicKey,
  webPushKey.privateKey
);

app.use(express.static(path.join(__dirname, "client")));
app.get("/gen-key", (req, res) => {
  return res.json(webPushKey);
});

app.post("/subscribe", async (req, res) => {
  const subscription = req.body;
  console.log({ subscription });
  console.log({ subscription });
  await webPush.sendNotification(subscription, "Hello").catch(console.log);
  res.json({ subscription });
});

app.listen(8000, () => {
  console.log("Port 800 on live");
});