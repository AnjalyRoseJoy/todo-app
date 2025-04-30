// To store the tasks in local storage and retrieve them when the page loads
function SaveTask() {
   const task = [];

   taskList.querySelectorAll("li").forEach((li) => {
      const Text = li.querySelector("span")?.textContent || "";
      const completed = li.querySelector("span")?.classList.contains("completed") || false;

      task.push({ Text, completed });
   });

   localStorage.setItem("task", JSON.stringify(task)); // Save the task array to local storage
}

const input = document.getElementById("taskInput");
const addButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");
const clearButton = document.getElementById("clearAllButton");

// Function to create a task item
function createTaskItem(taskText, completed = false) {
   const li = document.createElement("li");
   const taskSpan = document.createElement("span");
   taskSpan.textContent = taskText;

   if (completed) {
      taskSpan.classList.add("completed"); // Mark as completed if the task is already completed
   }

   const btnContainer = document.createElement("div");
   btnContainer.classList.add("btn-container");

   // Edit button
   const editButton = document.createElement("button");
   editButton.textContent = "✏️";
   editButton.classList.add("editbtn");
   editButton.addEventListener("click", function () {
      const newText = prompt("Edit your task:", taskSpan.textContent);
      if (newText !== null && newText.trim() !== "") {
         taskSpan.textContent = newText.trim();
         SaveTask();
      }
   });

   // Complete button
   const completeButton = document.createElement("button");
   completeButton.textContent = "✅";
   completeButton.style.background = "none";
   completeButton.style.border = "none";
   completeButton.style.cursor = "pointer";
   completeButton.addEventListener("click", function () {
      taskSpan.classList.toggle("completed");
      SaveTask();
   });

   // Delete button
   const deleteButton = document.createElement("button");
   deleteButton.textContent = "🗑️";
   deleteButton.classList.add("delbtn");
   deleteButton.addEventListener("click", function (e) {
      e.stopPropagation(); // Prevent the click event from bubbling up to the li element
      taskList.removeChild(li); // Remove the task item
      SaveTask();
   });

   // Append buttons to the container
   btnContainer.appendChild(editButton);
   btnContainer.appendChild(deleteButton);

   // Append elements to the task item
   li.appendChild(completeButton);
   li.appendChild(taskSpan);
   li.appendChild(btnContainer);

   return li;
}

// Add task event
addButton.addEventListener("click", function () {
   const textTask = input.value.trim();

   if (textTask === "") {
      alert("You didn't set a task 🤥");
      return;
   }

   const taskItem = createTaskItem(textTask);
   taskList.appendChild(taskItem);
   input.value = ""; // Clear the input field
   SaveTask(); // Save the task to local storage
});
input.addEventListener("keypress", function (event) {
   if (event.key === "Enter") {
      addButton.click(); // Trigger the add button click event
   }
});

// Load tasks from local storage when the page loads
window.addEventListener("load", function () {
   const savedTasks = JSON.parse(localStorage.getItem("task")) || []; // Get saved tasks or an empty array

   savedTasks.forEach(function (task) {
      const taskItem = createTaskItem(task.Text, task.completed);
      taskList.appendChild(taskItem);
   });
});

// Clear all tasks
clearButton.addEventListener("click", function () {
   localStorage.removeItem("task"); // Remove tasks from local storage
   taskList.innerHTML = ""; // Clear the task list in the UI
});