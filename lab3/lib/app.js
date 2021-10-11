const dbChannels = require("./dbChannels");
const dbUsers = require("./dbUsers");

const express = require("express");
const app = express();

app.use(require("body-parser").json());

app.get("/", (req, res) => {
  res.send(["<h1>ECE DevOps Chat</h1>"].join(""));
});
// for channels
app.get("/channels", async (req, res) => {
  const channels = await dbChannels.channels.list();
  res.json(channels);
});

app.post("/channels", async (req, res) => {
  const channel = await dbChannels.channels.create(req.body);
  res.status(201).json(channel);
});

app.get("/channels/:id", (req, res) => {
  const channel = dbChannels.channels.get(req.body);
  res.json(channel);
});

app.put("/channels/:id", (req, res) => {
  const channel = dbChannels.channels.update(req.body);
  res.json(channel);
});

// for users
app.get("/users", async (req, res) => {
  const users = await dbUsers.users.list();
  res.json(users);
});

app.post("/users", async (req, res) => {
  const user = await dbUsers.users.create(req.body);
  res.status(201).json(user);
});

app.get("/users/:id", (req, res) => {
  const user = dbUsers.users.get(req.body);
  res.json(user);
});

app.put("/users/:id", (req, res) => {
  const user = dbUsers.users.update(req.body);
  res.json(user);
});

// for messages

//get all messages from a channel
app.get("/channels/:id/messages", async (req, res) => {
  const message = await dbChannels.channels.get(req.body).messages.list(req.body);
  res.json(message);
});

app.post("/channels/:id/messages", async (req, res) => {
  const message = await dbChannels.channels[req.body].messages.create(req.body);
  res.status(201).json(message);
});

app.get("/channels/:id/messages", (req, res) => {
  const message = dbChannels.channels[req.body].messages.get(req.body);
  res.json(message);
});

app.put("/users/:id", (req, res) => {
  const message = dbChannels.channels[req.body].messages.update(req.body);
  res.json(message);
});

module.exports = app;
