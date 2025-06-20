const form = document.getElementById("taskForm");
const input = document.getElementById("taskInput");
const priorityInput = document.getElementById("priorityInput");
const list = document.getElementById("taskList");
const themeSwitch = document.getElementById("themeSwitch");

window.onload = () => {
  loadTasks();
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeSwitch.checked = true;
  }
};
form.onsubmit = function (e) {
  e.preventDefault();
  const taskText = input.value.trim();
  const priority = priorityInput.value;

  if (taskText && priority) {
    addTask(taskText, priority);
    input.value = "";
    priorityInput.value = "";
  }
};
function addTask(text, priority) {
  let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  const newTask = {
    id: Date.now(),
    text,
    done: false,
    priority
  };
  tasks.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}

function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  const priorityOrder = { High: 1, Medium: 2, Low: 3 };
  tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  list.innerHTML = "";
  tasks.forEach(displayTask);
  updateProgress();
}
function toggleTask(id) {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  const index = tasks.findIndex(task => task.id === id);
  if (index !== -1) {
    tasks[index].done = !tasks[index].done;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
  }
}
function deleteTask(id) {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks = tasks.filter(task => task.id !== id);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}
function displayTask(task) {
    const li = document.createElement("li");
    if (task.done) li.classList.add("completed");
  
    li.innerHTML = `
      <span style="display: flex; align-items: center;">
        <span class="priority ${task.priority}">${task.priority}</span>
        <span>${task.text}</span>
      </span>
      <span style="display: flex; align-items: center; gap: 10px;">
        <label class="switch">
          <input type="checkbox" onchange="toggleTask(${task.id})" ${task.done ? 'checked' : ''}>
          <span class="slider"></span>
        </label>
        <button class="delete-btn" onclick="deleteTask(${task.id})" title="Delete Task">
          🗑
        </button>
      </span>
    `;
    list.appendChild(li);
  }
  

function updateProgress() {
  let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  const total = tasks.length;
  const done = tasks.filter(task => task.done).length;
  const percent = total > 0 ? (done / total) * 100 : 0;

  document.getElementById("progressText").textContent = `${done} of ${total} tasks completed`;
  document.getElementById("progressFill").style.width = `${percent}%`;
}

themeSwitch.addEventListener("change", () => {
  if (themeSwitch.checked) {
    document.body.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
});
function deleteTask(id) {
    const confirmDelete = confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) return;
  
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
  }