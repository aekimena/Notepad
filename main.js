let addBtn = document.querySelector('.add-btn');
let notePad =document.querySelector('.notepad');
let backBtn = document.querySelector('.back-button');
let saveBtn = document.querySelector('.save-btn');
let titleHeader = document.getElementById('search-field-h1');
let bodyHeader = document.getElementById('search-field-p');
let displaynotes = document.querySelector('.notes-sec');
let displaynotesItems = document.querySelectorAll('.note-box');
let notes = [];
let todos = [];

addBtn.addEventListener('click', () => {
  notePad.classList.remove('hide');
  titleHeader.value = "";
  bodyHeader.value = "";
})

backBtn.addEventListener('click', () => {
  notePad.classList.add('hide');
})

saveBtn.addEventListener('click', () => {
  if(titleHeader.value == "" && bodyHeader.value == ""){
    notePad.classList.add('hide');
  } else if(titleHeader.value == "" && bodyHeader.value !== ""){
    titleHeader.value = 'Untitled';
    addNewNote();
    displayAddedNote();
    notePad.classList.add('hide');
  } else if(titleHeader.value !== "" && bodyHeader.value == ""){
    bodyHeader.value = '-';
    addNewNote();
    displayAddedNote();
    notePad.classList.add('hide');
  }
   else {
    addNewNote();
    displayAddedNote();
    notePad.classList.add('hide');
  }
})

function addNewNote(){
  notes.push({
    'title': `${titleHeader.value}`,
    'body': `${bodyHeader.value}`,
    'time': ""
  })
}

function displayAddedNote(){
  while (displaynotes.firstChild){
    displaynotes.removeChild(displaynotes.firstChild);
  }
  notes.forEach(noteItem => {
    let newNoteDiv = document.createElement('div');
    newNoteDiv.classList.add('note-box', 'col-xl-3', 'col-lg-3', 'col-md-3');
    newNoteDiv.innerHTML = `<div class="note p-2">
    <p class="h2">${noteItem.title}</p>
    <p class="h6">${noteItem.body}</p>
    <p>12:18, July 2, 2023</p>
  </div>`;
    displaynotes.appendChild(newNoteDiv);
});
}