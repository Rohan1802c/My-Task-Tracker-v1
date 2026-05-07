var allTasks = [];
var taskIdCounter = 1;

function addTask() {
    var nameInput = document.getElementById("taskName");
    var subjectInput = document.getElementById("taskSubject");
    var priorityInput = document.getElementById("taskPriority");
    var errorMsg = document.getElementById("errorMsg");

    var taskName = nameInput.value;
    var taskSubject = subjectInput.value;
    var taskPriority = priorityInput.value;

    if (taskName == "" || taskSubject == "") {
        errorMsg.innerHTML = "Please fill in both fields!";
        return;
    }

    errorMsg.innerHTML = "";

    var newTask = {
        id: taskIdCounter,
        name: taskName,
        subject: taskSubject,
        priority: taskPriority
    };

    allTasks.push(newTask);
    taskIdCounter = taskIdCounter + 1;

    nameInput.value = "";
    subjectInput.value = "";

    showTasks();
}

function deleteTask(taskId) {
    var newList = [];

    for (var i = 0; i < allTasks.length; i++) {
        if (allTasks[i].id != taskId) {
            newList.push(allTasks[i]);
        }
    }

    allTasks = newList;
    showTasks();
}

function showTasks() {
    var taskListDiv = document.getElementById("taskList");

    if (allTasks.length == 0) {
        taskListDiv.innerHTML = "<p>No tasks yet. Add one!</p>";
        return;
    }

    taskListDiv.innerHTML = "";

    for (var i = 0; i < allTasks.length; i++) {
        var currentTask = allTasks[i];

        var card = document.createElement("div");
        card.className = "task-card priority-" + currentTask.priority;

        var taskNamePara = document.createElement("p");
        taskNamePara.innerHTML = "<strong>Task:</strong> " + currentTask.name;

        var taskSubjectPara = document.createElement("p");
        taskSubjectPara.innerHTML = "<strong>Subject:</strong> " + currentTask.subject;

        var taskPriorityPara = document.createElement("p");
        taskPriorityPara.innerHTML = "<strong>Priority:</strong> " + currentTask.priority;

        var deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Delete";
        deleteButton.onclick = function(id) {
            return function() {
                deleteTask(id);
            };
        }(currentTask.id);

        card.appendChild(taskNamePara);
        card.appendChild(taskSubjectPara);
        card.appendChild(taskPriorityPara);
        card.appendChild(deleteButton);

        taskListDiv.appendChild(card);
    }
}
