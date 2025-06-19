let taskForm = document.getElementById("taskForm");
let taskList = document.getElementById("taskList");

window.onload = loadTasks;

taskForm.onsubmit = function (e) {
  e.preventDefault();
  let taskText = document.getElementById("taskInput").value;
  addTask(taskText);
  document.getElementById("taskInput").value = "";
};

function addTask(text) {
  let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  tasks.push({ text: text, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}

function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    let li = document.createElement("li");
    li.className = task.completed ? "completed" : "";
    li.innerHTML = `
      ${task.text}
      <span>
        <button onclick="toggleComplete(${index})">✔</button>
        <button onclick="deleteTask(${index})">🗑</button>
      </span>
    `;
    taskList.appendChild(li);
  });
}

function toggleComplete(index) {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}

function deleteTask(index) {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}