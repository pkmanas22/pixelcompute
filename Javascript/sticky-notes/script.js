const form = document.getElementById('form');

const notesContainer = document.getElementById('notes-container');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const noteInpElem = document.getElementById('note-input');
  const noteValue = noteInpElem.value;

  if (!noteValue) {
    alert('Please write the note.');
    return;
  }
  // alert(noteValue)

  const newNote = document.createElement('div');
  newNote.classList.add('note');
  const noteElem = document.createElement('p');
  noteElem.innerText = noteValue;
  const delBtn = document.createElement('button');
  delBtn.innerText = 'x';
  delBtn.classList.add('deleteBtn');
  newNote.append(noteElem);
  newNote.appendChild(delBtn);
  notesContainer.appendChild(newNote);
  noteInpElem.value = '';
});

notesContainer.addEventListener('click', (e) => {
  e.stopPropagation();
  const targetElem = e.target;
  const deleteBtn = targetElem.classList.contains('deleteBtn');
  if (!deleteBtn) {
    return;
  }
  const noteElem = targetElem.parentElement;
  noteElem.remove();
});
