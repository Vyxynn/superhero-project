const express = require('express');
const app = express();
const {writeFile,readFile,deleteFile} = require("./fileHelpers.js");
const PORT = 4000;

async function readHeroes() {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

app.post("heroes/list", (req, res) => {
const heroes=JSON.parse(fs.readFileSync('./heroes.json', 'utf8'));
    console.log(heroes);
    res.json({
message: hi
    })
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});