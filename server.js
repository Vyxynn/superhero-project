const express = require("express");
const fs = require("fs").promises;
const path = require("path");
// const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
const DATA_FILE = path.join(__dirname, "data", "heroes.json");
const heroFields = require("./config/heroInputs.config.js");

// const { MongoClient } = require("mongodb");
// const mongoURI = `mongodb+srv://${process.env.mongoUser}:${process.env.mongoPass}@cluster0.jnfy9vk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// const mongoClient = new MongoClient(mongoURI);
const PORT = 3000;

async function readHeroes() {
  try {
    const data = await fs.readFile(DATA_FILE, "utf8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

async function writeHeroes(heroes) {
  await fs.writeFile(DATA_FILE, JSON.stringify(heroes, null, 2));
}

async function initDataFile() {
  try {
    await fs.access(DATA_FILE);
  } catch (err) {
    await writeHeroes([]);
  }
}
// mongoClient
//   .connect(mongoURI)
//   .then((client) => {
//     console.log("✅ Connected to MongoDB Atlas!");
//   })
//   .catch((error) => console.error("❌ MongoDB Connection Error", error));

app.get("/superDB", (req, res) => {});

// GETs

// app.get("/", async (req, res) => {
//   const fileData = await readHeroes();
//   res.json({
//     message: fileData,
//     success: "true",
//   });
// });

//this is where the client adds a new hero
app.get("/", (req, res) => {
  res.render("heroForm", { heroFields });
});

//returns a list of heros to clien
app.get("/heroesList", async (req, res) => {
  try {
    const heroes = await readHeroes();

    if (req.accepts("html")) { //checks if client accepts html
      res.render("heroList", { heroes });
    } else {
      res.json({ success: true, count: heroes.length, data: heroes });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

//this would work if you gave the heroDB file dta
// app.get("/form", (req, res) => {
//   res.render(path.join(__dirname, "views", "heroList.ejs"));
// });

// POSTs

//post route for form page, not a route for client
app.post("/heroes", async (req, res) => {
  try {
    const heroes = await readHeroes();
    const newHero = {
      id: Date.now().toString(),
      superName: req.body.superName,
      realName: req.body.realName,
      superpower: req.body.superpower,
      powerLevel: parseInt(req.body.powerLevel),
      secretIdentity: req.body.secretIdentity === "true",
      createdAt: new Date().toISOString(),
    };

    heroes.push(newHero);
    await writeHeroes(heroes);

    // reason for comment: res.json only returns json data. Doesn't give redirect command to browser
    //res.status.json should be used for errors
    // res.status(201).json({
    //   success: true,
    //   message: "Hero successfully created",
    //   redirectTo: "/heroesList",
    // });

    res.redirect('/heroesList');
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUTs/Update

app.put("/heroes/:id", async (req, res) => {
  try {
    const heroes = await readHeroes();
    const heroIndex = heroes.findIndex((hero) => hero.id === req.params.id);

    if (heroIndex === -1) {
      return res.status(404).json({ success: false, error: "hero not found" });
    }

    heroes[heroIndex] = {
      ...heroes[heroIndex],
      superName: req.body.superName,
      realName: req.body.realName,
      superpower: req.body.superpower,
      powerLevel: parseInt(req.body.powerLevel),
      secretIdentity: req.body.secretIdentity === "true",
      updatedAt: new Date().toISOString(),
    };

    await writeHeroes(heroes);
    res.json({ sucess: true, data: heroes[heroIndex] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETEs

app.delete("/heroes/:id", async (req, res) => {
  try {
    const heroes = await readHeroes();
    const filteredHeroes = heroes.filter((hero) => hero.id !== req.params.id);

    if (heroes.length === filteredHeroes.length) {
      return res.status(404).json({ success: false, error: "Hero not found" });
    }

    await writeHeroes(filteredHeroes);
    res.json({ success: true, message: "hero deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
