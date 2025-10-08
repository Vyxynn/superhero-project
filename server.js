const express = require("express");
const fs = require("fs").promises;
const path = require("path");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
app.use(express.json());
app.set("view engine", "ejs");

// i love hornet silksong <3

const { MongoClient } = require("mongodb");
const mongoURI = `mongodb+srv://${process.env.mongoUser}:${process.env.mongoPass}@cluster0.jnfy9vk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const mongoClient = new MongoClient(mongoURI);
const PORT = 3000;

mongoClient
  .connect(mongoURI)
  .then((client) => {
    console.log("✅ Connected to MongoDB Atlas!");
  })
  .catch((error) => console.error("❌ MongoDB Connection Error", error));

app.get("/superDB", (req, res) => {});


app.get("/", (req, res) => {
    res.json({
      message: 'hi',
    });
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


// https://drive.google.com/drive/folders/1IpERF6FZZMfgGDMkdX7jEBL56da0-3uW
