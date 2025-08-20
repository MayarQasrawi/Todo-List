/* 

 This code handles a confirmation modal for deleting tasks from a table.
 It integrates UI updates, 
 localStorage,
and a fake API call (DummyJSON) for practice.

*/
const modalOverlay = document.getElementById("modalOverlay");

function freezeScroll() {
  //Calculates the scrollbar width to avoid content jump when hiding overflow.
  const scrollBarWidth =
    window.innerWidth - document.documentElement.clientWidth;
  console.log("Scrollbar width:", scrollBarWidth);

  const currentPadding =
    parseInt(window.getComputedStyle(document.body).paddingRight, 10) || 0;
  document.body.style.overflow = "hidden";
  document.body.style.paddingRight = currentPadding + scrollBarWidth + "px";
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
  if (!taskToDelete) return;

  console.log("Deleting task:", taskToDelete);

  const buttons = modalOverlay.querySelectorAll("button");

  buttons.forEach((btn) => (btn.disabled = true));
  let id = parseInt(taskToDelete.dataset.id);
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter((task) => task.id !== id);
  taskToDelete.remove();

  fetch(`https://dummyjson.com/todos/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((updatedTask) => console.log("Deleted on server:", updatedTask))
    .catch((err) => console.error("Delete failed:", err))
    .finally(() => {
      buttons.forEach((btn) => (btn.disabled = false));

      saveTasks(tasks);
      closeModal();
      updateFooter();
    });
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
  if (
    !event ||
    event.target === completeModalOverlay ||
    event.target.classList.contains("modal-close")
  ) {
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
completeModalOverlay
  .querySelector(".modal")
  .addEventListener("click", (e) => e.stopPropagation());

function confirmComplete() {
  if (!taskToComplete) return;

  // Disable the confirm button to prevent double clicks
  const confirmBtn = completeModalOverlay.querySelector(".btn-confirm");
  if (confirmBtn) confirmBtn.disabled = true;

  // 1️⃣ Update UI
  const statusCell = taskToComplete.querySelector("[data-status]");
  statusCell.textContent = "Completed";
  statusCell.dataset.status = "completed";

  const todoCell = taskToComplete.querySelector(".todo-cell");
  todoCell.classList.add("line-through");

  // 2️⃣ Update localStorage
  const taskId = parseInt(taskToComplete.dataset.id);
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const task = tasks.find((t) => t.id === taskId);
  if (task) {
    task.completed = true;
    saveTasks(tasks);
  }

  // 3️⃣ Send PATCH request to DummyJSON API
  fetch(`https://dummyjson.com/todos/${taskId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed: true }),
  })
    .then(res => res.json())
    .then(updatedTask => console.log("Updated on server:", updatedTask))
    .catch(err => {
      console.error("Failed to update task on server:", err);
      alert("Failed to mark task as completed on server."); // show user feedback
    })
    .finally(() => {
      // Re-enable confirm button after request finishes
      if (confirmBtn) confirmBtn.disabled = false;

      // 4️⃣ Close modal and update footer
      closeCompleteModal();
      updateFooter();
    });
}
