const express = require('express');
const PORT = process.env.PORT || 3001;
const fs = require('fs');
const path = require('path');
const app = express(); 


// middleware
// parse incoming data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// allow public folder to be served
app.use(express.static('public'));


// import routes 
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
});

// read and return notes from file 
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        var readData = JSON.parse(data); 
        res.json(readData); 
    });
})

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

// open home page
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