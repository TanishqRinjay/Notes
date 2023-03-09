const main = document.querySelector("#main");
const addBtn = document.querySelector("#addBtn");
addBtn.addEventListener("click", () => {
  addNote();
});

(() => {
  const LSnotes = JSON.parse(localStorage.getItem("notes"));
  if (LSnotes === null) {
    addNote();
  } else {
    LSnotes.forEach((LSnote) => {
      addNote(LSnote);
    });
  }
})();

function saveNotes() {
  const notes = document.querySelectorAll(".note textarea");
  const data = [];
  notes.forEach((note) => {
    data.push(note.value);
  });
  if (data.length === 0) {
    localStorage.removeItem("notes");
  } else {
    localStorage.setItem("notes", JSON.stringify(data));
  }
}

function addNote(text = "") {
  const note = document.createElement("div");
  note.classList.add("note");
  note.innerHTML = `
    <div class="tool">
        <i class="save fa-solid fa-floppy-disk"></i>
        <i class="delete fa-solid fa-trash"></i>
    </div>
    <textarea>${text}</textarea>
    <button id="copy"><i class="fa-solid fa-copy"></i></button>
    `;
  note.querySelector(".delete").addEventListener("click", () => {
    note.remove();
    saveNotes();
  });
  note.querySelector(".save").addEventListener("click", saveNotes);
  note.addEventListener("focusout", () => {
    saveNotes();
  });
  note.querySelector("#copy").addEventListener("click", () => {
    navigator.clipboard.writeText(note.querySelector("textarea").value);
  });
  main.appendChild(note);
  saveNotes();
}
