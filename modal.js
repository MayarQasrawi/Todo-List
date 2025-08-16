/* Modal Code */
const modalOverlay = document.getElementById("modalOverlay");



function freezeScroll() {
  const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
  console.log("Scrollbar width:", scrollBarWidth);

  const currentPadding = parseInt(window.getComputedStyle(document.body).paddingRight, 10) || 0;
  document.body.style.overflow = "hidden";
  document.body.style.paddingRight = (currentPadding + scrollBarWidth) + "px";
}
let taskToDelete = null;

function openModal(taskToDeleteRow) {
       freezeScroll();
  modalOverlay.classList.add("active");
  taskToDelete = taskToDeleteRow;
}



function unfreezeScroll() {
  document.body.style.overflow = "";
  document.body.style.paddingRight = "";
}

function closeModal(event) {
  if (
    !event ||
    event.target === modalOverlay ||
    event.target.classList.contains("modal-close")
  ) {
    modalOverlay.classList.remove("active");
    taskToDelete = null;
    unfreezeScroll();
  }
}

function confirmDelete() {
    let id = parseInt(taskToDelete.cells[0].textContent);
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
tasks = tasks.filter(task => task.id !== id);
taskToDelete.remove();

 saveTasks(tasks)
  closeModal();
  updateFooter
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modalOverlay.classList.contains("active"))
    closeModal();
});

document
  .querySelector(".modal")
  .addEventListener("click", (e) => e.stopPropagation());



  

  const completeModalOverlay = document.getElementById("completeModalOverlay");
let taskToComplete = null;

// Open Complete Modal
function openCompleteModal(taskRow) {
    taskToComplete = taskRow;
    freezeScroll();
    completeModalOverlay.classList.add("active");
}

// Close Complete Modal
function closeCompleteModal(event) {
    if (!event || event.target === completeModalOverlay || event.target.classList.contains("modal-close")) {
        completeModalOverlay.classList.remove("active");
        unfreezeScroll();
        taskToComplete = null;
    }
}


// Close modal on ESC key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && completeModalOverlay.classList.contains("active"))
    closeCompleteModal();
});

// Prevent click propagation
completeModalOverlay.querySelector(".modal").addEventListener("click", (e) => e.stopPropagation());


function confirmComplete() {
    if (taskToComplete) {
        // 1️⃣
        const statusCell = taskToComplete.querySelector('td:nth-child(4)');
        statusCell.textContent = 'Completed';
        const todoCell = taskToComplete.querySelector('td:nth-child(2)');
        todoCell.classList.add('line-through');

        // 2️⃣
        const taskId = parseInt(taskToComplete.cells[0].textContent); // ID من الصف
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

        const task = tasks.find(t => t.id === taskId);
            task.completed = true; 
            saveTasks(tasks); 
    }

    // 3️⃣ 
    closeCompleteModal();
    updateFooter(); 
}

