const fs = require('fs');
const _ = require('lodash')
const yargs = require('yargs');

const notes = require('./notes')

const argv = yargs.argv;
var command = argv._[0];

if (command === 'add') {
  let newNote = notes.addNote(argv.title, argv.body);
  if (newNote) {
    console.log('Note created');
    notes.logNote(newNote);
  } else {
    console.log('Note already exists.');
  }
} else if (command === 'list') {
  console.log(notes.getAll());
} else if (command === 'read') {
  let noteRead = notes.readNote(argv.title);
  if (noteRead) {
    notes.logNote(noteRead);
  } else {
    console.log('Note not found.');
  }
} else if (command === 'remove') {
  let noteRemoved = notes.removeNote(argv.title);
  console.log(noteRemoved ? `Note ${argv.title} was removed` : 'Note not found.');
} else {
  console.log(`Command ${command} not recognized.`);
}