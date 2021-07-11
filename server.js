const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express(); 
const PORT = process.env.PORT || 3001;


// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


// serve notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
});

// read and return all notes from file 
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        var readData = JSON.parse(data); 
        res.json(readData); 
    });
})

// read and return specific note from file 
app.get('/api/notes/:id', (req, res) => {
    const currentNotes = JSON.parse(fs.readFileSync('./db/db.json'));
    // use Number to parse from string
    res.json(currentNotes[(Number(req.params.id) - 1)])
});

// post notes to file 
app.post('/api/notes', (req, res) => {
    // receive a new note to save on the request body
    // each note will need a unique id 
    const currentNotes = JSON.parse(fs.readFileSync('./db/db.json'));
    // set id based on what the next index of the array will be
    req.body.id = currentNotes.length.toString();
    const newNote = req.body; 
    console.log(req.body);
    
    currentNotes.push(newNote);

    // add note to db.json file
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify( currentNotes, null, 2)
    );
    
    // return new note to client
    res.json(currentNotes);
})

// to delete note
app.delete('/api/notes/:id', (req, res) => {
    const currentNotes = JSON.parse(fs.readFileSync('./db/db.json'));
    console.log(currentNotes);
    const id = req.params.id;
    console.log(id);
    
    // find note with current id 
    const newNotes = currentNotes.filter(note => note.id === Number(req.params.id));
    console.log(newNotes);
});

// serve index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
});



// to delete
// pull out what they send
// build new note with an id attached
// send back new note with id 
// filter out specific ids 

// req.params.id './api/animals:id' 


app.listen(PORT, () => {
    console.log(`Note Taker server now on port ${PORT}!`);
});