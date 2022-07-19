const express = require("express");
const fs = require("fs");
const notes = require("./db/db.json");
console.log(notes);

const app = express();
const path = require("path");

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get("/api/notes", (req, res) => {
    let results = notes;
    res.json(results);
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.post("/api/notes", ({ body }, res) => {
    body.id=notes.length.toString();
    notes.push(body);
    fs.writeFileSync(path.join(__dirname, '/db/db.json'),
        JSON.stringify(notes, null, 2)
    );

    res.json(notes);
});

app.delete("/api/notes", (req,res)=>{
    
})







app.listen(PORT, () => {
    console.log(`Server now available at http://localhost:${PORT}/`);
});
