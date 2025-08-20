const taskTableBody = document.querySelector("tbody");
const footerRow = document.querySelector("tfoot tr");
const addTaskForm = document.getElementById("addTaskForm");
const taskInput = document.getElementById("taskInput");
let taskIdCounter = 1000; // start number for new tasks

// Load tasks from localStorage or fetch from API
async function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  if (tasks.length === 0) {
    // fetch tasks from API only if localStorage is empty
    const response = await fetch("https://dummyjson.com/todos");
    const data = await response.json();
    tasks = data.todos.map((task) => ({
      id: task.id,
      todo: task.todo,
      userId: task.userId,
      completed: task.completed,
    }));
    saveTasks(tasks); // save to localStorage
  }

  tasks.forEach((task) =>
    addTaskRow(task.id, task.todo, task.userId, task.completed)
  );

  // update footer counters
  updateFooter();
}

loadTasks();

/* Filter logic */
const search = document.querySelector(".search-input");
search.addEventListener("input", function () {
  const filter = search.value.toLowerCase().trim();
  const rows = document.querySelectorAll("tbody tr");

  let visibleTasks = 0;
  let completedTasks = 0;
  let pendingTasks = 0;

  rows.forEach((row) => {
    const todoText = row
      .querySelector(".todo-cell")
      .textContent.toLowerCase()
      .trim();
    const status = row.dataset.status;

    if (todoText.includes(filter)) {
      row.style.display = "";
      visibleTasks++;
      if (status === "Completed") completedTasks++;
      else pendingTasks++;
    } else {
      row.style.display = "none";
    }
  });

  updateFooter(visibleTasks, completedTasks, pendingTasks);
});

/* Add New Task */
addTaskForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const taskText = taskInput.value.trim();
  if (!taskText) return;

  const task = { id: Date.now(), todo: taskText, userId: 1, completed: false };
  addTaskRow(task.id, task.todo, task.userId, task.completed);

  // Save task to localStorage
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  saveTasks(tasks);

  // 3️Send POST request to DummyJSON
  fetch("https://dummyjson.com/todos/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      todo: task.todo,
      userId: task.userId,
      completed: task.completed,
    }),
  })
    .then((res) => res.json())
    .then((newTaskFromServer) => {
      console.log("Task added on server:", newTaskFromServer);

      // task.id = newTaskFromServer.id;
      //     saveTasks(tasks);
    })
    .catch((err) => {
      console.error("Failed to add task on server:", err);
      alert("Failed to add task on server");
    });

  updateFooter();
  taskInput.value = "";
});

function addTaskRow(id, todo, userId, completed) {
  const tr = document.createElement("tr");
  tr.setAttribute("data-id", id); 
  tr.setAttribute("data-status", completed ? "Completed" : "Pending"); 

  // Only show Complete button if task is not completed
  const completeButton = completed
    ? "" 
    : `<button class="btnn btn-done " onclick="openCompleteModal(this.closest('tr'))">
         <span title="done">&#10003;</span>
       </button>`;

  // Only show Edit button if task is not completed
  const editButton = completed
    ? "" 
    : `<button class="btnn btn-edite" onclick="editTask(this.closest('tr'))">
         <span title="edit">&#9998;</span>
       </button>`;

const onlyDelete = !completeButton && !editButton;

  tr.innerHTML = `
        <td>${id}</td>
        <td class="todo-cell ${completed ? "line-through" : ""}">${todo}</td>
        <td>${userId}</td>
        <td data-status=${completed ? "Completed" : "Pending"}>${
    completed ? "&#10004;" : "&#10008;"
  }</td>
        <td>
        <section class="btn-group ${onlyDelete ? "only-delete" : ""}">
                ${completeButton}
                <button class="btnn btn-del" onclick="openModal(this.closest('tr'))">
                  <span title="delete"> ${completed?"Delete":"&#10007;"}</span>
                </button>
                ${editButton}
            </section>
        </td>
    `;
  taskTableBody.appendChild(tr);
}



// Function to update footer counters
function updateFooter(total = null, completed = null, pending = null) {
  const rows = document.querySelectorAll("tbody tr");
  let totalTasks = total ?? rows.length;
  let completedTasks = completed ?? 0;
  let pendingTasks = pending ?? 0;

  if (total === null) {
    rows.forEach((row) => {
      const statusCell = row.querySelector("[data-status]");
      const status = statusCell.dataset.status;
      if (status === "Completed") completedTasks++;
      else pendingTasks++;
    });
  }

  footerRow.innerHTML = `
       <td colspan="3">Total tasks: ${totalTasks}</td>
       <td>Completed: ${completedTasks}</td>
       <td>Pending: ${pendingTasks}</td>
    `;
}

// Function to save tasks to localStorage
function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
