const fs = require('fs');

var fetchNotes = () => {
  try {
    let notesString = fs.readFileSync('notes-data.json');
    return JSON.parse(notesString);
  } catch (e) {
    return [];
  }
};

var saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes, null, 2));
};

var addNote = (title, body) => {
  let notes = fetchNotes();
  let note = {
    title,
    body
  };

  let duplicateNotes = notes.filter((note) => note.title === title);

  if (duplicateNotes.length == 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  }

};

var getAll = () => {
  return fetchNotes();
};

var readNote = (title) => {
  let notes = fetchNotes();

  let searchedNote = notes.filter((note) => note.title === title);
  return searchedNote[0];
};

var removeNote = (title) => {
  let notes = fetchNotes();
  let resultNotes = notes.filter((note) => note.title !== title);

  saveNotes(resultNotes);

  return notes.length !== resultNotes.length;
};

var logNote = (note) => {
  console.log('----');
  console.log(` Title: ${note.title}`);
  console.log(` Body: ${note.body}`);
}

module.exports = {
  addNote,
  getAll,
  readNote,
  removeNote,
  logNote
}