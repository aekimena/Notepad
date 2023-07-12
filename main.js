let addBtn = document.querySelector('.add-btn');
let notePad =document.querySelector('.notepad');
let backBtn = document.querySelector('.back-button');
let saveBtn = document.querySelector('.save-btn');
let titleHeader = document.getElementById('search-field-h1');
let bodyHeader = document.getElementById('search-field-p');
let searchBox = document.getElementById('search-field');
let displaynotes = document.querySelector('.notes-sec');
let displaynotesItems = document.querySelectorAll('.note-box');
let pageBody = document.getElementsByTagName('body')[0];
let editMode;
let noteIndex;
let filteredSearch;
let notes;
let storedNotesString;
let updatedNotes;
let searchNotes = [];
let updatedTime = new Date();
let isFilter;
isFilter = false;
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

storedNotesString = localStorage.getItem('notes');
notes = JSON.parse(storedNotesString);

editMode = false;


function search(){
  searchBox.addEventListener('focus', () => {
    document.addEventListener('keyup', checkKeyPressed)
  });
}
search();

addBtn.addEventListener('click', () => {
  notePad.classList.remove('hide');
  titleHeader.value = "";
  bodyHeader.value = "";
  searchBox.value = "";
})

backBtn.addEventListener('click', () => {
  notePad.classList.add('hide');
  editMode = false;
})

saveBtn.addEventListener('click', () => {
  if(editMode === false){
    if(titleHeader.value == "" && bodyHeader.value == ""){
      notePad.classList.add('hide');
    } 
     else {
      addNewNote();
      displayAddedNote(notes);
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
  });
  updatedNotes = JSON.stringify(notes);
  localStorage.setItem('notes', updatedNotes);
}

function displayAddedNote(Arr){
  while (displaynotes.firstChild){
    displaynotes.removeChild(displaynotes.firstChild);
  }
  Arr.forEach(noteItem => {
    let newNoteDiv = document.createElement('div');
    newNoteDiv.classList.add('note-box', 'col-xl-3', 'col-lg-3', 'col-md-3');
    newNoteDiv.innerHTML = `<div class="note p-2 d-flex flex-column" style="height: 100%">
    <div class="d-flex justify-content-between flex-column">
      <p class="h2">${noteItem.title}</p>
      <p class="h6">
        ${noteItem.body}
      </p>
      <p>${noteItem.time}</p>
    </div>
    <div class="menu-ellipse">
      <i class="fa-solid fa-ellipsis" id="fa-ellipsis"></i>
      <button class="delete-btn hide" id="delete-btn">Delete</button>
    </div>
  </div>`;
    displaynotes.appendChild(newNoteDiv);
});
noteClick(Arr);
checkEmptyNotes();
}

storedNotesString = localStorage.getItem('notes');
notes = JSON.parse(storedNotesString);
displayAddedNote(notes);

function noteClick(Arr){
  document.querySelectorAll('.note-box').forEach(item => {
    item.addEventListener('click', (event) => {
      let noteArray = Array.from(item.parentNode.children);
      noteIndex = noteArray.indexOf(item);
      if(event.target.id === 'fa-ellipsis'){
        let deleteBtnArray = Array.from(document.querySelectorAll('.delete-btn'));
        let menuArray = Array.from(document.querySelectorAll('.fa-ellipsis'));
        let clickedIndex = menuArray.indexOf(event.target);
        deleteBtnArray[clickedIndex].classList.toggle('hide');
          let filteredDelete = deleteBtnArray.filter((element) => {
            return element !== deleteBtnArray[clickedIndex];
        })
        filteredDelete.forEach(del => {
          del.classList.add('hide')
        });
      } 
      else  if(event.target.id === 'delete-btn'){
        let deleteBtnArray = Array.from(document.querySelectorAll('.delete-btn'));
        let clickedIndex = deleteBtnArray.indexOf(event.target);
            storedNotesString = localStorage.getItem('notes');
            notes = JSON.parse(storedNotesString);
            if(!isFilter){
              notes.splice(clickedIndex, 1);
              updatedNotes = JSON.stringify(notes);
              localStorage.setItem('notes', updatedNotes);
              displayAddedNote(notes)
            } else if(isFilter){
              for(let i of notes){
                if(i.id == Arr[clickedIndex].id){
                  notes.splice(notes.indexOf(i), 1);
                  updatedNotes = JSON.stringify(notes);
                  localStorage.setItem('notes', updatedNotes);
                  Arr.splice(clickedIndex, 1)
                  displayAddedNote(Arr);
                  editMode = false;
                  break;
                }
              }
            }
      } else {
        editMode = true;
        titleHeader.value = Arr[noteIndex].title;
        bodyHeader.value = Arr[noteIndex].body;
        notePad.classList.remove('hide');
      }

      saveBtn.addEventListener('click', () => {
        storedNotesString = localStorage.getItem('notes');
        notes = JSON.parse(storedNotesString);
        if(editMode === true){
          if(!isFilter){
            if(titleHeader.value == "" && bodyHeader.value == ""){
              notes.splice(noteIndex, 1);
              updatedNotes = JSON.stringify(notes);
              localStorage.setItem('notes', updatedNotes);
              displayAddedNote(notes);
              notePad.classList.add('hide');
              editMode = false;
            }else if(titleHeader.value === notes[noteIndex].title && bodyHeader.value === notes[noteIndex].body){
              notePad.classList.add('hide');
              editMode = false;
            }else {
              updatedTime = new Date();
              notes[noteIndex].title = titleHeader.value;
              notes[noteIndex].body = bodyHeader.value;
              notes[noteIndex].time = `${updatedTime.getHours()}:${updatedTime.getMinutes()}, ${months[0][updatedTime.getMonth()]} ${updatedTime.getDate()}, ${updatedTime.getFullYear()}`;
              let itemToMove = notes.splice(noteIndex, 1)[0];
              notes.unshift(itemToMove);
              updatedNotes = JSON.stringify(notes);
              localStorage.setItem('notes', updatedNotes);
              displayAddedNote(notes);
              notePad.classList.add('hide');
              editMode = false;
            }
          } 
          else if (isFilter){
            console.log('noooooo');
            for(let i of notes){
              if(i.id == searchNotes[noteIndex].id){
                if(titleHeader.value == "" && bodyHeader.value == ""){
                  searchNotes.splice(noteIndex, 1);
                  notes.splice(notes.indexOf(i), 1)
                  updatedNotes = JSON.stringify(notes);
                  localStorage.setItem('notes', updatedNotes);
                  displayAddedNote(searchNotes);
                  notePad.classList.add('hide');
                  editMode = false;
                  break;
                }else if(titleHeader.value === notes[notes.indexOf(i)].title && bodyHeader.value === notes[notes.indexOf(i)].body){
                  notePad.classList.add('hide');
                  editMode = false;
                  break;
                }else {
                  updatedTime = new Date();
                  searchNotes[noteIndex].title = titleHeader.value;
                  searchNotes[noteIndex].body = bodyHeader.value;
                  searchNotes[noteIndex].time = `${updatedTime.getHours()}:${updatedTime.getMinutes()}, ${months[0][updatedTime.getMonth()]} ${updatedTime.getDate()}, ${updatedTime.getFullYear()}`;
                  notes[notes.indexOf(i)].title = titleHeader.value;
                  notes[notes.indexOf(i)].body = bodyHeader.value;
                  notes[notes.indexOf(i)].time = `${updatedTime.getHours()}:${updatedTime.getMinutes()}, ${months[0][updatedTime.getMonth()]} ${updatedTime.getDate()}, ${updatedTime.getFullYear()}`;
                  let itemToMove = searchNotes.splice(noteIndex, 1)[0];
                  searchNotes.unshift(itemToMove);
                  let itemToMove2 = notes.splice(notes.indexOf(i), 1)[0];
                  notes.unshift(itemToMove2);
                  updatedNotes = JSON.stringify(notes);
                  localStorage.setItem('notes', updatedNotes);
                  displayAddedNote(searchNotes);
                  notePad.classList.add('hide');
                  editMode = false;
                  break;
                }
              }
            }
          }
        }
      })
    })
  })
}

function checkEmptyNotes(){
  storedNotesString = localStorage.getItem('notes');
  notes = JSON.parse(storedNotesString);
  let placeholderImg = document.querySelector('.empty-info');
  if(notes.length == 0){
    placeholderImg.classList.remove('hide')
  }
  else {
    placeholderImg.classList.add('hide')
  }
}

function checkKeyPressed(event){
  storedNotesString = localStorage.getItem('notes');
  notes = JSON.parse(storedNotesString);
  if(event.keyCode){
    addBtn.classList.add('dontShow');
    searchNotes.splice(0, searchNotes.length)
      const target = searchBox.value;
      isFilter = true;

        filteredSearch = notes.filter(item => (item.title.includes(target) && item.body.includes(target)) || (item.title.includes(target) || item.body.includes(target)))
        searchNotes = searchNotes.concat(filteredSearch);
        displayAddedNote(searchNotes);

      if(target.length == 0){
        addBtn.classList.remove('dontShow');
        displayAddedNote(notes);
        isFilter = false;
      }
  }
}
