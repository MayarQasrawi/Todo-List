let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function editTask(tr) {

    const todoCell = tr.cells[1];
    const originalText = todoCell.textContent.trim();

    // Create input element
    const input = document.createElement("input");
    input.type = "text";
    input.value = originalText;
    input.classList.add("edit-input");
    todoCell.textContent = "";
    todoCell.appendChild(input);
    input.focus();

    // Save function
    function save() {
        const newText = input.value.trim() || originalText; 
        todoCell.textContent = newText;

        // Update in localStorage
        const taskId = parseInt(tr.cells[0].textContent);
        const task = tasks.find(t => t.id === taskId);
        if (task) task.todo = newText;
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Event listeners
    input.addEventListener("blur", save);
    input.addEventListener("keydown", function(event) {
        if (event.key === "Enter") save();
    });
}
