const express = require('express');
const PORT = process.env.PORT || 3001;
const fs = require('fs');
const path = require('path');
const app = express(); 
const db = require('./db/db.json');


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
        console.log(db);
    });
})

// post notes to file 
// app.post('/api/notes', (req, res) => {
//     // const note = createNewNote(req.body, db);
//     // res.json(note);
//     const note = req.body; 

//     // receive a new note to save on the request body
//     // add note to db.json file
//     // return new note to client
//     // each note will need a unique id 
// })

// open home page
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
});

// function createNewNote
// function createNewNote(body, dbArray) {
//     const note = body;
//     dbArray.push(note);

//     fs.writeFileSync(
//         path.join(__dirname, './db/db.json'),
//         JSON.stringify([ dbArray ], null, 2)
//     );

//     return note; 
// }


// to delete
// pull out what they send
// build new note with an id attached
// send back new note with id 
// filter out specific ids 

// req.params.id './api/animals:id' 


app.listen(PORT, () => {
    console.log(`Note Taker server now on port ${PORT}!`);
});