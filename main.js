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
let updatedTime = new Date();
const months = [{
  0: 'January',
  1: 'February',
  2: 'March',
  3: 'April',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'August',
  8: 'September',
  9: 'October',
  10: 'November',
  11: 'December'
}]

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
  updatedTime = new Date();
  notes.push({
    id: notes.length,
    title: `${titleHeader.value}`,
    body: `${bodyHeader.value}`,
    time: `${updatedTime.getHours()}:${updatedTime.getMinutes()}, ${months[0][updatedTime.getMonth()]} ${updatedTime.getDate()}, ${updatedTime.getFullYear()}`
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
    <p>${noteItem.time}</p>
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
            updatedTime = new Date();
            notes[noteIndex].title = titleHeader.value;
            notes[noteIndex].body = bodyHeader.value;
            notes[noteIndex].time = `${updatedTime.getHours()}:${updatedTime.getMinutes()}, ${months[0][updatedTime.getMonth()]} ${updatedTime.getDate()}, ${updatedTime.getFullYear()}`;
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
