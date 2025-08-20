let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function editTask(tr) {
  const todoCell = tr.cells[1];
  // const width = todoCell.clientWidth; // Adjust width to fit within cell
  const originalText = todoCell.textContent.trim();

  // Create input 
  const input = document.createElement("input");
  input.type = "text";
  input.value = originalText;
  input.classList.add("edit-input");
  todoCell.textContent = "";
  todoCell.appendChild(input);
  // input.style.width = `${width}px`;
  input.focus();


  function save() {
    const newText = input.value.trim() || originalText;
    todoCell.textContent = newText;

      // Only update if changed
    if (newText === originalText || newText === "") {
      todoCell.textContent = originalText;
      return; // exit if nothing changed
    }

    // get task id
    const taskId = parseInt(tr.cells[0].textContent);

    // Update in localStorage
    const task = tasks.find((t) => t.id === taskId);
    if (task) task.todo = newText;
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Update on DummyJSON API
    fetch(`https://dummyjson.com/todos/${taskId}`, {
      method: "PUT", 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        todo: newText,
      }),
    })
      .then((res) => res.json())
      .then((updatedTask) => {
        console.log("Updated on server:", updatedTask);
      })
      .catch((err) => console.error("Update failed:", err));
  }

  // Event listeners
input.addEventListener("blur", save, { once: true });

input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") save();
  //{ once: true }  This makes the listener auto-remove after firing once:
}, { once: true });

}