// daty
const terazTimestamp = Date.now()
const teraz = new Date(terazTimestamp)
console.log(teraz.toLocaleString())

// localStorage
// zapisywanie
// localStorage.setItem(key, value)
// pobieranie
// localStorage.getItem(key)
const notesContainer = document.getElementById('notes-container');
const noteForm = document.getElementById('note-form');

let notes = JSON.parse(localStorage.getItem('notes')) || [];

function displayNotes() {
    notesContainer.innerHTML = '';
    notes.forEach((note, index) => {
        const noteDiv = document.createElement('div');
        noteDiv.style.backgroundColor = note.color;
        noteDiv.innerHTML = `
            <h3>${note.title} ${note.pinned ? '📌' : ''}</h3>
            <p>${note.content}</p>
            <button onclick="deleteNote(${index})">Delete</button>
        `;
        notesContainer.appendChild(noteDiv);
    });
}

noteForm.addEventListener('submit', (e) => {
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const color = document.getElementById('color').value;
    const pinned = document.getElementById('pin').checked;

    const newNote = {
        title,
        content,
        color,
        pinned,
        createdAt: new Date().toISOString(),
    };

    notes.push(newNote);
    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes();
    noteForm.reset();
});

function deleteNote(index) {
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes();
}

displayNotes();