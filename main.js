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
let placeholderImg = document.querySelector('.empty-info');
let inputFields = document.querySelectorAll('input');
let editMode;
let noteIndex;
let filteredSearch;
let notes = [];
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

window.addEventListener('DOMContentLoaded', () => {
  if(localStorage.getItem('notes')){
    storedNotesString = localStorage.getItem('notes');
    notes = JSON.parse(storedNotesString);
    displayAddedNote(notes);
  } else {
    null
  }
});

editMode = false;

function generateId(){
  let values = [0,1,2,3,4,5,6,7,8,9, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
 
  for(let i = values.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      [values[i], values[j]] = [values[j], values[i]];
  }

  let selectedValues = values.slice(0, 15);
  let id = selectedValues.join('');

  return id;
}

function generateUniqueId(){
  let idExists = notes.some(obj => obj.id === generateId);
  if(idExists){
    let uniqueId;
    do {
      uniqueId = generateId();
    } while (notes.some(obj => obj.id === uniqueId));
    return uniqueId;
  }
  return generateId();
}


function search(){
  searchBox.addEventListener('focus', () => {
    placeholderImg.classList.add('hide');
    addBtn.classList.add('dontShow');
    document.addEventListener('keyup', checkKeyPressed)
  });

  searchBox.addEventListener('blur', () => {
    addBtn.classList.remove('dontShow');
    if(localStorage.getItem('notes')){
      storedNotesString = localStorage.getItem('notes');
      notes = JSON.parse(storedNotesString);
      if(notes.length == 0){
        placeholderImg.classList.remove('hide');
      }
    } else {
      placeholderImg.classList.remove('hide');
    }

    if(searchBox.value == ""){
      addBtn.classList.remove('dontShow');
    }
  })
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
      // displayAddedNote(notes);
      notePad.classList.add('hide');
    }
  }
})

let correctTime = () => {
  switch (true) {
    case updatedTime.getMinutes() < 10:
      return `${updatedTime.getHours()}:0${updatedTime.getMinutes()}, ${months[0][updatedTime.getMonth()]} ${updatedTime.getDate()}, ${updatedTime.getFullYear()}`
    case updatedTime.getHours() < 10:
      return `0${updatedTime.getHours()}:${updatedTime.getMinutes()}, ${months[0][updatedTime.getMonth()]} ${updatedTime.getDate()}, ${updatedTime.getFullYear()}`  
    case updatedTime.getHours() < 10 && updatedTime.getMinutes() < 10:
      return `0${updatedTime.getHours()}:0${updatedTime.getMinutes()}, ${months[0][updatedTime.getMonth()]} ${updatedTime.getDate()}, ${updatedTime.getFullYear()}`
    default:
      return `${updatedTime.getHours()}:${updatedTime.getMinutes()}, ${months[0][updatedTime.getMonth()]} ${updatedTime.getDate()}, ${updatedTime.getFullYear()}`
  }
}

function addNewNote(){
  updatedTime = new Date();
  let newNote = {
    id: generateUniqueId(),
    title: `${titleHeader.value}`,
    body: `${bodyHeader.value}`,
    time: correctTime()
  }
  notes.push(newNote);
  notes.unshift(notes.splice(notes.indexOf(newNote), 1)[0]);
  updatedNotes = JSON.stringify(notes);
  localStorage.setItem('notes', updatedNotes);
  storedNotesString = localStorage.getItem('notes');
  notes = JSON.parse(storedNotesString);
  displayAddedNote(notes);
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

// displayAddedNote(notes);

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

        document.addEventListener('click', (event) => {
          if(event.target.id !== 'fa-ellipsis' && event.target.id !== 'delete-btn'){
            deleteBtnArray[clickedIndex].classList.add('hide');
          }
        })
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
              notes[noteIndex].time = correctTime();
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
                  searchNotes[noteIndex].time = correctTime();
                  notes[notes.indexOf(i)].title = titleHeader.value;
                  notes[notes.indexOf(i)].body = bodyHeader.value;
                  notes[notes.indexOf(i)].time = correctTime();
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
  // let placeholderImg = document.querySelector('.empty-info');
  if(notes.length == 0){
    placeholderImg.classList.remove('hide')
  }
  else {
    placeholderImg.classList.add('hide')
  }
}

function checkKeyPressed(event){
  if(localStorage.getItem('notes')){
    storedNotesString = localStorage.getItem('notes');
    notes = JSON.parse(storedNotesString);
    if(event.keyCode){
      addBtn.classList.add('dontShow');
      searchNotes.splice(0, searchNotes.length)
        const target = searchBox.value.toLowerCase();
        isFilter = true;
  
          filteredSearch = notes.filter(item => (item.title.toLowerCase().includes(target) && item.body.toLowerCase().includes(target)) || (item.title.toLowerCase().includes(target) || item.body.toLowerCase().includes(target)))
          searchNotes = searchNotes.concat(filteredSearch);
          displayAddedNote(searchNotes);
          placeholderImg.classList.add('hide');
  
        if(target.length == 0){
          addBtn.classList.remove('dontShow');
          displayAddedNote(notes);
          placeholderImg.classList.add('hide');
          isFilter = false;
        }
    }
  } else {
    null
  }
}
