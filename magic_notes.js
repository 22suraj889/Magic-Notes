showNotes();
// showingImportantNotes();
let add_btn = document.getElementById("addBtn");

// setting localStorage
add_btn.addEventListener("click", () => {

    //creating key-value pair for notes in local storage
    let notes = localStorage.getItem("notes");
    let add_txt = document.getElementById("text_area");
    let title_area = document.getElementById("title_area");
    if (notes === null) {
        notes_obj = []; //creating new notes object if not their in local storage
    } else {
        notes_obj = JSON.parse(notes); //parsing the existing notes in local storage
    }
    //notes object will content array of element title and your_note
    let myObj = {
        title: title_area.value,
        your_note: add_txt.value
    }
    notes_obj.push(myObj); //pushing the text area typed note in the notes object 
    localStorage.setItem("notes", JSON.stringify(notes_obj)); //stringify the notes object
    add_txt.value = "";
    title_area.value = "";
    showNotes();

});

//show-notes
function showNotes() {

    //showing notes
    let note_heading = document.getElementById('note_heading');
    let notes = localStorage.getItem("notes");
    if (notes === null) {
        notes_obj = [];
    } else {
        notes_obj = JSON.parse(notes);
    }

    //showing if notes is present or not according to the length of the notes object
    if (notes_obj.length === 0) {
        note_heading.innerText = "Nothing to show";
    } else {
        note_heading.innerText = "Your Notes";
    }

    let noteCard = document.getElementById("noteCard");
    let html = "";

    //adding the element from notes object to html and then adding html to innerhtml
    notes_obj.forEach(function(element, index) {
        html += `
            <div class="card_note card my-2 mx-1 col-lg-4" style="width: 16rem;">
                <div class="card-body">
                    <h5 class="card-title">${element.title}</h5>
                    <pre class="card-text">${element.your_note}</pre>
                    <div class="btn-group" role="group" aria-label="Basic mixed styles example" id="button-group">
                        <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-success" type="button">Delete</button>
                    </div>
                </div>   
            </div>         `
    });

    noteCard.innerHTML = html;
}

// deleting notes
function deleteNote(index) {

    //deleting notes object element
    let notes = localStorage.getItem("notes");
    if (notes === null) {
        notes_obj = [];
    } else {
        notes_obj = JSON.parse(notes);
    }
    notes_obj.splice(index, 1); //delete one note element from that index
    localStorage.setItem("notes", JSON.stringify(notes_obj)); //stringify the remaining element of notes object
    showNotes();
}

//deleting all notes
let delete_all_notes = document.getElementById('delete_all_btn');
delete_all_notes.addEventListener('click', () => {
    localStorage.clear();
    showNotes();
});

//searching 
let search = document.getElementById('search');
search.addEventListener("input", () => {
    let cards = document.getElementsByClassName('card_note');
    let input_val = search.value;
    Array.from(cards).forEach(element => {
        let notes_content = element.getElementsByTagName("pre")[0].innerText;
        if (notes_content.includes(input_val)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    })
});