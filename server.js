const express = require('express');
const PORT = process.env.PORT || 3001;
const fs = require('fs');
const app = express(); 


// middleware
// parse incoming data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// allow public folder to be served
app.use(express.static('public'));


// import routes 
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './notes.html'))
});

// read and return notes from file 
app.get('/api/notes', (req, res) => {
    fs.readFile('./Develop/db/db.json', (err, data) => {
        var readData = JSON.parse(data); 
        res.json(readData); 
    });
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'))
});


// to delete
// pull out what they send
// build new note with an id attached
// send back new note with id 
// filter out specific ids 

// req.params.id './api/animals:id' 


app.listen(PORT, () => {
    console.log('its working');
});