const noteList=document.querySelector('#note-list')
eventLisener()
function eventLisener(){
    document.querySelector('#form').addEventListener('submit',newNote)
    document.querySelector('#note-list').addEventListener('click',removeNote)
    document.addEventListener('DOMContentLoaded',localStorageOnLoad)
}

function newNote(e){
    e.preventDefault()
    let note=document.querySelector('#note').value

    const removeText=document.createElement('a')
    removeText.textContent="X"
    removeText.classList="remove-note"
    const li=document.createElement('li')
    li.appendChild(document.createTextNode(note))
    li.appendChild(removeText)
    noteList.appendChild(li)
    
    
    addNoteToLocalStroge(note)
}

function removeNote(e){
    if(e.target.classList.contains('remove-note')){
        e.target.parentElement.remove()
    }
    removeNoteLs(e.target.parentElement.textContent)
}
function getNotesFromLocalStorage(){
    let note;
    let getFromLs=localStorage.getItem('noteS')
    if(getFromLs===null){

        note=[]
    }else{
        note=JSON.parse(getFromLs)
    }
    return note
}
function addNoteToLocalStroge(Note){
const notes=getNotesFromLocalStorage()
notes.push(Note)

    localStorage.setItem('noteS',JSON.stringify(notes))
}
function localStorageOnLoad(){
    const notes=getNotesFromLocalStorage()

    notes.forEach(note => {
        const removeText=document.createElement('a')
        removeText.textContent="X"
        removeText.classList="remove-note"
        const li=document.createElement('li')
        li.appendChild(document.createTextNode(note))
        li.appendChild(removeText)
        noteList.appendChild(li)
        
    });
}

function removeNoteLs(noteContent){
    let noteClickDelete=noteContent.substring(0,noteContent.length -1)
    let noteLs=getNotesFromLocalStorage()

    noteLs.forEach((note,index) => {
        if(note===noteClickDelete){
            noteLs.splice(index,1)
        }
    });
    localStorage.setItem('noteS',JSON.stringify(noteLs))

    console.log(noteClickDelete);
}