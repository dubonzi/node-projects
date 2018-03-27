const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const yargsCfg = require('./yargs-config');
const notes = require('./notes');

var command = yargsCfg._[0];

if (command === 'add') {
  let newNote = notes.addNote(yargsCfg.title, yargsCfg.body);
  if (newNote) {
    console.log('Note created');
    notes.logNote(newNote);
  } else {
    console.log('Note already exists.');
  }
} else if (command === 'list') {
  let allNotes = notes.getAll();
  console.log(`Printing ${allNotes.length} note(s).`);
  allNotes.forEach(nt => notes.logNote(nt));

} else if (command === 'read') {
  let noteRead = notes.readNote(yargsCfg.title);
  if (noteRead) {
    notes.logNote(noteRead);
  } else {
    console.log('Note not found.');
  }
} else if (command === 'remove') {
  let noteRemoved = notes.removeNote(yargsCfg.title);
  console.log(noteRemoved ? `Note ${yargsCfg.title} was removed` : 'Note not found.');
} else {
  console.log(`Command ${command} not recognized.`);
}