const router = require('express').Router();
const notes = require('../db/db.json');
const fs = require('fs');
const uuid = require('../helpers/uuid');
const path = require('path');
// get route

router.get('*', (req, res) =>
res.sendFile(path.join(__dirname, '../public/index.html')));

router.get('/notes', (req,res) => 
res.sendFile(path.join(__dirname, '../public/notes.html')));


router.get('/api/notes', (req, res) => {
res.send(notes)
});

router.post('/api/notes', (req, res) => {
const { title, text } = req.body;

if(title && text) {
    const newNote = {
        title,
        text,
        note_id: uuid(),
    }
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if(err) {
            console.error(err)
        } else {
            const parsedNotes = JSON.parse(data);

            parsedNotes.push(newNote);

            fs.writeFile(
            './db/db.json',
            JSON.stringify(parsedNotes, null, 4),
            (writeErr) =>
            writeErr
            ? console.error(writeErr)
            : console.info('Successfully updated notes!')
            );
        }
    });

    const response = {
        status: 'success',
        body: newNote,
    };

    console.log(response);
    res.status(201).json(response)
} else {
    res.status(500).json('Error in posting note');
}
});
    
// delete req

module.exports = router;