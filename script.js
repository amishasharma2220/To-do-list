const form = document.getElementById("taskForm");
const input = document.getElementById("taskInput");
const list = document.getElementById("taskList");

window.onload = loadTasks;

form.onsubmit = function (e) {
  e.preventDefault();
  const taskText = input.value.trim();
  if (taskText) {
    addTask(taskText);
    input.value = "";
  }
};

function addTask(text) {
  let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  tasks.push({ text: text, done: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  // Instantly display the newly added task on screen
  displayTask({ text: text, done: false }, tasks.length - 1);
}

function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  list.innerHTML = "";
  tasks.forEach((task, index) => {
    displayTask(task, index);
  });
}

function toggleTask(index) {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks[index].done = !tasks[index].done;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}

function deleteTask(index) {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}

function displayTask(task, index) {
  const li = document.createElement("li");
  if (task.done) li.classList.add("completed");

  li.innerHTML = `
    <span onclick="toggleTask(${index})">${task.text}</span>
    <button onclick="deleteTask(${index})">🗑</button>
  `;
  list.appendChild(li);
}
