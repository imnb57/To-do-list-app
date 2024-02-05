// script.js

// Function to add a new task
function addTask() {
    const taskText = document.getElementById('newTaskInput').value;

    if (taskText.trim() === '') {
        alert('Please enter a task.');
        return;
    }

    const taskList = document.getElementById('taskList');
    const newTask = document.createElement('li');
    newTask.className = 'task';
    newTask.innerHTML = `
        <input type="checkbox" onchange="toggleTaskStatus(this)">
        <span>${taskText}</span>
        <button onclick="editTask(this)">Edit</button>
        <button onclick="removeTask(this)">Remove</button>
    `;

    taskList.appendChild(newTask);
    document.getElementById('newTaskInput').value = '';

    // Save tasks to local storage
    saveTasksToLocalStorage();
}

// Function to edit a task
function editTask(button) {
    const taskItem = button.parentElement;
    const taskText = taskItem.querySelector('span');
    const taskInput = document.getElementById('newTaskInput');

    // Set the input field value to the current task text
    taskInput.value = taskText.innerText;

    // Set edit mode to true
    editMode = true;
    editedTaskIndex = Array.from(taskItem.parentElement.children).indexOf(taskItem);

    // Focus on the input field for editing
    taskInput.focus();

    // Update the "Add Task" button to indicate editing mode
    const addButton = document.getElementById('addTaskButton');
    addButton.innerText = 'Save Edited Task';
    addButton.onclick = saveEditedTask;
}

// Function to save the edited task
function saveEditedTask() {
    const taskInput = document.getElementById('newTaskInput');
    const editedTaskText = taskInput.value.trim();

    if (editedTaskText === '') {
        alert('Please enter a task.');
        return;
    }

    // Update the task text
    const taskList = document.getElementById('taskList');
    const editedTask = taskList.children[editedTaskIndex];
    const editedTaskTextElement = editedTask.querySelector('span');
    editedTaskTextElement.innerText = editedTaskText;

    // Reset edit mode and the "Add Task" button
    editMode = false;
    editedTaskIndex = undefined;
    taskInput.value = '';
    const addButton = document.getElementById('addTaskButton');
    addButton.innerText = 'Add Task';
    addButton.onclick = addTask;

    // Save tasks to local storage
    saveTasksToLocalStorage();
}

// Function to remove a task
function removeTask(button) {
    const taskList = document.getElementById('taskList');
    const taskItem = button.parentElement;
    taskList.removeChild(taskItem);

    // Save tasks to local storage
    saveTasksToLocalStorage();
}

// Function to toggle task status (completed/incomplete)
function toggleTaskStatus(checkbox) {
    const taskText = checkbox.nextElementSibling; // Get the span element next to the checkbox
    taskText.style.textDecoration = checkbox.checked ? 'line-through' : 'none';

    // Save tasks to local storage
    saveTasksToLocalStorage();
}

// Function to clear all tasks
function clearAllTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; // Clear all tasks from the list
    // Save tasks to local storage after clearing
    saveTasksToLocalStorage();
}

// Function to load tasks from local storage
function loadTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem('tasks');

    if (storedTasks) {
        const tasks = JSON.parse(storedTasks);

        const taskList = document.getElementById('taskList');
        taskList.innerHTML = '';

        tasks.forEach(task => {
            const newTask = document.createElement('li');
            newTask.className = 'task';
            newTask.innerHTML = `
                <input type="checkbox" onchange="toggleTaskStatus(this)" ${task.completed ? 'checked' : ''}>
                <span style="text-decoration: ${task.completed ? 'line-through' : 'none'}">${task.text}</span>
                <button onclick="editTask(this)">Edit</button>
                <button onclick="removeTask(this)">Remove</button>
            `;

            taskList.appendChild(newTask);
        });
    }
}

// Load tasks from local storage on page load
window.onload = loadTasksFromLocalStorage;
