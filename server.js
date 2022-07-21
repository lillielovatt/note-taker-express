// all required packages
const express = require("express");
const fs = require("fs");
const path = require("path");

// notes data file
const notes = require("./db/db.json");

// initialize server
const app = express();
const PORT = process.env.PORT || 3001;

// middleware for our server
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// populates the webpage with all notes 
app.get("/api/notes", (req, res) => {
    let results = notes; //this line is solely for readability
    res.json(results);
});

// route to redirect to notes.html file
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// route to redirect to index.html file, added last because * is a catch-all route
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

// route to post notes
app.post("/api/notes", ({ body }, res) => {
    // assigns the unique id of each new note as the length of the notes file, then pushes object into array
    body.id=notes.length.toString();
    notes.push(body);
    fs.writeFileSync(path.join(__dirname, '/db/db.json'),
        JSON.stringify(notes, null, 2)
    );
    //rewrites the file in db/db.json, and returns the new notes array

    res.json(notes);
});

// route to delete notes
app.delete("/api/notes/:id", (req,res)=>{
    const id=req.params.id; // captures the id the user wishes to delete
   
    notes.splice(id,1); // cuts only that position note out of the array of notes, because id and index are the same.
    for(i=0;i<notes.length;i++){
        notes[i]['id']=i.toString(); //this rewrites the id for each note once a note is deleted, to avoid 2 notes having the same ID later
    };
    fs.writeFileSync(path.join(__dirname, '/db/db.json'),
        JSON.stringify(notes, null, 2)
    );
    //rewrites the file in db/db.json, and returns the new notes array

    res.json(notes);
});

app.listen(PORT, () => {
    console.log(`Server now available at http://localhost:${PORT}/`);
});