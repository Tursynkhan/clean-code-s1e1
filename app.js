//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

var newTaskInput = document.querySelector('.todo__add-section .todo__input');
var addButton = document.querySelector('.todo__button--add');
var incompleteTaskHolder = document.querySelector('.todo__section--incomplete .todo__list');
var completedTasksHolder = document.querySelector('.todo__section--completed .todo__list');


//New task list item
var createNewTaskElement = function(taskString) {
  var listItem = document.createElement("li");
  listItem.classList.add("todo__item");

  // Create elements
  var checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.classList.add("todo__checkbox");

  var label = document.createElement("label");
  label.classList.add("todo__task-label");
  label.innerText = taskString;

  var editInput = document.createElement("input");
  editInput.type = "text";
  editInput.classList.add("todo__input", "todo__input--edit");

  var editButton = document.createElement("button");
  editButton.innerText = "Edit";
  editButton.classList.add("todo__button", "todo__button--edit");

  var deleteButton = document.createElement("button");
  deleteButton.classList.add("todo__button", "todo__button--delete");
  var deleteImg = document.createElement("img");
  deleteImg.src = "./remove.svg";
  deleteImg.alt = "Delete Task";
  deleteImg.classList.add("task-item__icon");
  deleteButton.appendChild(deleteImg);

  // Append elements
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
};




var addTask = function() {
  if (!newTaskInput.value.trim()) return;
  var listItem = createNewTaskElement(newTaskInput.value.trim());
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  newTaskInput.value = "";
};


//Edit an existing task.

var editTask = function() {
  var listItem = this.parentNode;
  var editInput = listItem.querySelector(".todo__input--edit");
  var label = listItem.querySelector(".todo__task-label");
  var editBtn = listItem.querySelector(".todo__button--edit");
  var isEditMode = listItem.classList.contains("todo__item--edit-mode");

  if (isEditMode) {
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  listItem.classList.toggle("todo__item--edit-mode");
};


//Delete task.
var deleteTask = function() {
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  ul.removeChild(listItem);
};



//Mark task completed
var taskCompleted = function() {
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};


var taskIncomplete = function() {
  var listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};




var ajaxRequest=function(){
  console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  var checkBox = taskListItem.querySelector(".todo__checkbox");
  var editButton = taskListItem.querySelector(".todo__button--edit");
  var deleteButton = taskListItem.querySelector(".todo__button--delete");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
};

//cycle over incompleteTaskHolder ul list items
//for each list item
var initialIncompleteItems = incompleteTaskHolder.querySelectorAll(".todo__item");
for (var i = 0; i < initialIncompleteItems.length; i++) {
  bindTaskEvents(initialIncompleteItems[i], taskCompleted);
}

var initialCompletedItems = completedTasksHolder.querySelectorAll(".todo__item");
for (var i = 0; i < initialCompletedItems.length; i++) {
  bindTaskEvents(initialCompletedItems[i], taskIncomplete);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.