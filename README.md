# 📝 TODO List Web Application

A simple and interactive TODO List web application that allows users to manage their tasks efficiently. The app supports adding, editing, deleting, marking tasks as completed, searching, and persisting data using LocalStorage.


## 🚀 Features

- Retrieve initial TODO list from a dummy API.
- Add new TODO items.
- Delete TODO items with confirmation.
- Mark TODO items as done.
- Display count of total, completed, and pending tasks in the footer.
- Search/filter TODOs dynamically.
- Data persistence using browser LocalStorage.
- Inline edit for tasks.

## 🌐 Live Demo

[Live Demo](https://mayarqasrawi.github.io/Todo-List/)

## 💻 Technologies Used

* HTML5
* CSS3
* JavaScript (ES6+)
* LocalStorage for data persistence
* Fetch API for retrieving initial tasks
  

## 🛠 Usage Instructions

### Fetch and Display TODOs

The app fetches tasks from the dummy API endpoint:
`https://dummyjson.com/todos`
Tasks are displayed in a table on the page.

### Add New TODO

* Enter a task in the input field.
* Click **Add** or press **Enter**.
* Empty tasks are not allowed.
* New tasks are saved in LocalStorage.

### Delete TODO

* Click the delete button ❌ next to a task.
* Confirm deletion in the popup.
* Task is removed from both the table and LocalStorage.

### Mark as Done

* Click the "done" button ✅ next to a task.
* Completed tasks are visually distinguished (strikethrough).
* Status updates are saved in LocalStorage.

### Inline Edit

* Click the edit icon ✏️ next to a task.
* Edit the task text directly in the table.
* Press **Enter** or click outside to save.
* Changes are updated in LocalStorage.


## 📝 Notes

* The app is fully responsive for smaller screens.
* LocalStorage ensures tasks persist across page refreshes.


## 👩‍💻 Author

**Mayar Qasarwa**
[LinkedIn](https://www.linkedin.com/in/mayar-qasarwa-971556219/)


