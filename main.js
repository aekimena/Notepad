let addBtn = document.querySelector('.add-btn');
let notePad =document.querySelector('.notepad');
let backBtn = document.querySelector('.back-button');
let saveBtn = document.querySelector('.save-btn');
let titleHeader = document.getElementById('search-field-h1');
let bodyHeader = document.getElementById('search-field-p');
let displaynotes = document.querySelector('.notes-sec');
let displaynotesItems = document.querySelectorAll('.note-box');
let editMode;
let noteIndex;
let notes = [];
let todos = [];

editMode = false;

addBtn.addEventListener('click', () => {
  notePad.classList.remove('hide');
  titleHeader.value = "";
  bodyHeader.value = "";
})

backBtn.addEventListener('click', () => {
  notePad.classList.add('hide');
})

saveBtn.addEventListener('click', () => {
  if(editMode === false){
    if(titleHeader.value == "" && bodyHeader.value == ""){
      notePad.classList.add('hide');
    } 
    // else if(titleHeader.value == "" && bodyHeader.value !== ""){
    //   addNewNote();
    //   displayAddedNote();
    //   notePad.classList.add('hide');
    // } else if(titleHeader.value !== "" && bodyHeader.value == ""){
    //   addNewNote();
    //   displayAddedNote();
    //   notePad.classList.add('hide');
    // }
     else {
      addNewNote();
      displayAddedNote();
      notePad.classList.add('hide');
    }
  }
})

function addNewNote(){
  notes.push({
    id: notes.length,
    title: `${titleHeader.value}`,
    body: `${bodyHeader.value}`,
    time: ""
  })
}

function displayAddedNote(){
  while (displaynotes.firstChild){
    displaynotes.removeChild(displaynotes.firstChild);
  }
  notes.forEach(noteItem => {
    let newNoteDiv = document.createElement('div');
    newNoteDiv.classList.add('note-box', 'col-xl-3', 'col-lg-3', 'col-md-3');
    newNoteDiv.innerHTML = `<div class="note p-2" style="height: 100%">
    <p class="h2">${noteItem.title}</p>
    <p class="h6">${noteItem.body}</p>
    <p>12:18, July 2, 2023</p>
  </div>`;
    displaynotes.appendChild(newNoteDiv);
});
noteClick();
}

function noteClick(){
  document.querySelectorAll('.note-box').forEach(item => {
    item.addEventListener('click', () => {
      editMode = true;
      let noteArray = Array.from(item.parentNode.children);
      console.log(notes[noteArray.indexOf(item)]);
      noteIndex = noteArray.indexOf(item);
      titleHeader.value = notes[noteIndex].title;
      bodyHeader.value = notes[noteIndex].body;
      notePad.classList.remove('hide');

      saveBtn.addEventListener('click', () => {
        if(editMode === true){
          if(titleHeader.value == "" && bodyHeader.value == ""){
            notes.splice(noteIndex, 1);
            displayAddedNote();
            notePad.classList.add('hide');
            editMode = false;
          } else if(titleHeader.value == notes[noteIndex].title && bodyHeader.value == notes[noteIndex].body){
            displayAddedNote();
            notePad.classList.add('hide');
            editMode = false;
          }
           else {
            notes[noteIndex].title = titleHeader.value;
            notes[noteIndex].body = bodyHeader.value;
            let itemToMove = notes.splice(noteIndex, 1)[0];
            notes.unshift(itemToMove);
            displayAddedNote();
            notePad.classList.add('hide');
            console.log(notes);
            editMode = false;
        }
        }
      })
    })
  })
}
