// Select elements
const addNoteBtn = document.getElementById('add-note-btn');
const saveNotesBtn = document.getElementById('save-notes-btn');
const notesContainer = document.getElementById('notes-container');

// Function to create a new note
function createNote(content = "") {
  // Create note elements
  const noteCard = document.createElement('div');
  noteCard.className = 'note-card';

  const textArea = document.createElement('textarea');
  textArea.value = content;
  textArea.placeholder = 'Write your note here...';

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';

  // Delete note on button click
  deleteBtn.addEventListener('click', () => {
    notesContainer.removeChild(noteCard);
    saveNotes();
  });

  // Save notes on text change
  textArea.addEventListener('input', saveNotes);

  // Append elements
  noteCard.appendChild(textArea);
  noteCard.appendChild(deleteBtn);
  notesContainer.appendChild(noteCard);

  saveNotes(); // Save notes to local storage
}

// Function to save notes to local storage
function saveNotes() {
  const notes = [];
  const textAreas = document.querySelectorAll('.note-card textarea');
  textAreas.forEach((textarea) => {
    notes.push(textarea.value);
  });
  localStorage.setItem('notes', JSON.stringify(notes));
}

// Function to load notes from local storage
function loadNotes() {
  const savedNotes = JSON.parse(localStorage.getItem('notes') || '[]');
  savedNotes.forEach((note) => createNote(note));
}
function downloadNotes() {
  const notes = [];
  const textAreas = document.querySelectorAll('.note-card textarea');
  textAreas.forEach((textarea) => {
    if (textarea.value.trim()) {
      notes.push(textarea.value);
    }
  });

  const blob = new Blob([notes.join('\n\n')], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = 'MyNotes.txt';
  link.click();

  URL.revokeObjectURL(url); // Clean up the URL object
}
// Add a new note when clicking the "Add Note" button
addNoteBtn.addEventListener('click', () => createNote());
saveNotesBtn.addEventListener('click', downloadNotes);
// Load existing notes on page load
loadNotes();
