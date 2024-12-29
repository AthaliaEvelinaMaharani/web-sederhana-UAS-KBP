// To-Do List
const taskInput = document.getElementById("task-input");
const addTaskButton = document.getElementById("add-task");
const tasksList = document.getElementById("tasks");

// Load tasks from localStorage
const loadTasks = () => {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach((task) => {
    const taskItem = createTaskElement(task.text, task.completed);
    tasksList.appendChild(taskItem);
  });
};

// Save tasks to localStorage
const saveTasks = () => {
  const tasks = [];
  document.querySelectorAll("#tasks li").forEach((taskItem) => {
    tasks.push({
      text: taskItem.firstChild.textContent,
      completed: taskItem.style.textDecoration === "line-through",
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Create task element
const createTaskElement = (text, completed = false) => {
  const taskItem = document.createElement("li");
  taskItem.textContent = text;

  // Add Done Button
  const doneButton = document.createElement("button");
  doneButton.textContent = "Done";
  doneButton.addEventListener("click", () => {
    taskItem.style.textDecoration = "line-through";
    saveTasks(); // Save state
  });

  // Add Delete Button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => {
    tasksList.removeChild(taskItem);
    saveTasks(); // Save state
  });

  taskItem.append(doneButton, deleteButton);

  // Set initial completed state
  if (completed) {
    taskItem.style.textDecoration = "line-through";
  }

  return taskItem;
};

// Add new task
addTaskButton.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText) {
    const taskItem = createTaskElement(taskText);
    tasksList.appendChild(taskItem);
    saveTasks(); // Save new task
    taskInput.value = "";
  }
});

// Load tasks on page load
window.addEventListener("DOMContentLoaded", loadTasks);

// Pomodoro Timer
let timerInterval;
const timerDisplay = document.getElementById("timer-display");
const startButton = document.getElementById("start-timer");
const pauseButton = document.getElementById("pause-timer");
const resetButton = document.getElementById("reset-timer");
const workInput = document.getElementById("work-time");
const breakInput = document.getElementById("break-time");

let isRunning = false;
let timeLeft = parseInt(workInput.value) * 60;

const updateTimerDisplay = () => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  // Change color when time is up
  if (timeLeft === 0) {
    timerDisplay.style.color = "red"; // Indicate time is up
  } else {
    timerDisplay.style.color = ""; // Reset color
  }
};

startButton.addEventListener("click", () => {
  if (!isRunning) {
    isRunning = true;
    timerInterval = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateTimerDisplay();
      } else {
        clearInterval(timerInterval);
        isRunning = false;
        alert("Time's up!");
      }
    }, 1000);
  }
});

pauseButton.addEventListener("click", () => {
  clearInterval(timerInterval);
  isRunning = false;
});

resetButton.addEventListener("click", () => {
  clearInterval(timerInterval);
  isRunning = false;
  timeLeft = parseInt(workInput.value) * 60;
  updateTimerDisplay();
});

// Initialize Timer Display
updateTimerDisplay();
