document.addEventListener("DOMContentLoaded", () => {
  const newTaskInput = document.getElementById("new-task");
  const addTaskBtn = document.getElementById("add-task-btn");
  const taskList = document.getElementById("task-list");

  // Function to add a new task
  const addTask = () => {
    const taskText = newTaskInput.value.trim();
    if (taskText === "") return;

    const taskItem = document.createElement("li");
    taskItem.className = "task-item";

    const taskTextSpan = document.createElement("span");
    taskTextSpan.className = "task-text";
    taskTextSpan.textContent = taskText;
    taskItem.appendChild(taskTextSpan);

    // Left click to toggle strikethrough
    taskTextSpan.addEventListener("click", () => {
      taskTextSpan.classList.toggle("completed");
    });

    // Right click to delete task
    taskTextSpan.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      taskItem.remove();
    });

    // Edit button
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "edit-btn";
    editBtn.addEventListener("click", () => {
      const editInput = document.createElement("input");
      editInput.type = "text";
      editInput.value = taskTextSpan.textContent;
      editInput.className = "edit-input";
      taskItem.replaceChild(editInput, taskTextSpan);

      editInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          taskTextSpan.textContent = editInput.value;
          taskItem.replaceChild(taskTextSpan, editInput);
        }
      });

      editInput.addEventListener("blur", () => {
        taskTextSpan.textContent = editInput.value;
        taskItem.replaceChild(taskTextSpan, editInput);
      });

      editInput.focus();
    });

    taskItem.appendChild(editBtn);
    taskList.appendChild(taskItem);

    newTaskInput.value = ""; // Clear the input
  };

  // Event listener for the add task button
  addTaskBtn.addEventListener("click", addTask);

  // Event listener for pressing 'Enter' key in the input field
  newTaskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  });
});
