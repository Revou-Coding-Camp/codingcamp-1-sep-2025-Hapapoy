const taskInput = document.getElementById("task-input");
const dueDateInput = document.getElementById("due-date-input");
const addBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("tasklist");
const deleteAllBtn = document.getElementById("delete-all-btn");
const filterBtn = document.getElementById("filter-btn");

let tasks = [];

function renderTasks() {
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    taskList.innerHTML = `<tr><td colspan="4" class="no-task">No task found</td></tr>`;
    return;
  }

  tasks.forEach((task, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${task.name}</td>
      <td>${task.dueDate}</td>
      <td>${task.completed ? "✓" : "◌"}</td>
      <td>
        <button onclick="toggleTask(${index})">✓</button>
        <button onclick="deleteTask(${index})">✗</button>
      </td>
    `;

    taskList.appendChild(row);
  });
}

function addTask() {
  const name = taskInput.value.trim();
  const dueDate = dueDateInput.value;

  if (name === "" || dueDate === "") {
    alert("Please enter both task and due date.");
    return;
  }

  const newTask = {
    name,
    dueDate,
    completed: false
  }

  tasks.push(newTask)
  taskInput.value = "";
  dueDateInput.value = "";

  renderTasks();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function deleteAllTasks() {
  if (confirm("Are you sure you want to delete all tasks?")) {
    tasks = [];
    renderTasks();
  }
}

addBtn.addEventListener("click", addTask);
deleteAllBtn.addEventListener("click", deleteAllTasks);


taskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") addTask();
});

renderTasks();
