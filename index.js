var inputText = document.querySelector(".input");
var formBtn = document.querySelector(".form-btn");
var item = document.querySelector(".item");
var todoList = [];
var storedData = localStorage.getItem("todo");
if (storedData) {
    todoList = JSON.parse(storedData);
}
window.onload = function () {
    todoList.forEach(function (item) {
        addTodoToList(item);
    });
};
var id = todoList.length > 0 ? todoList[todoList.length - 1].id + 1 : 1;
var inputClick = function () {
    var taskValue = inputText.value.trim();
    if (taskValue !== "") {
        var newTask = {
            id: id++,
            task: taskValue,
            isDone: false,
        };
        if (todoList.length === 5) {
            window.alert("To do count cannot be more than 5. Update or delete done todos.");
            return;
        }
        addToTask(newTask);
        inputText.value = "";
    }
    else {
        window.alert("Input can't be empty");
    }
};
var addToTask = function (task) {
    todoList.push(task);
    addTodoToList(task);
    store();
    console.log(todoList);
};
var removeTodoTask = function (task, listDiv) {
    if (window.confirm("Do you want to delete the task?")) {
        if (task.isDone) {
            var id_1 = findTaskIndexById(todoList, task.id);
            if (id_1 !== -1) {
                todoList.splice(id_1, 1);
                listDiv.remove();
                store();
            }
        }
        else {
            window.alert("Task cannot be deleted!!!");
        }
    }
};
var addTodoToList = function (task) {
    var list = document.createElement("li");
    list.textContent = task.task;
    list.className = task.isDone ? "done" : "";
    var itemBtn = document.createElement("button");
    itemBtn.className = "btn item-btn";
    itemBtn.innerText = "X";
    var updateBtn = document.createElement("button");
    updateBtn.className = "btn item-btn";
    updateBtn.innerText = "update";
    var listDiv = document.createElement("div");
    listDiv.className = "content";
    listDiv.appendChild(list);
    listDiv.appendChild(itemBtn);
    listDiv.appendChild(updateBtn);
    list.addEventListener("click", function () {
        task.isDone = !task.isDone;
        list.classList.toggle("done");
        store();
    });
    itemBtn.addEventListener("click", function () {
        removeTodoTask(task, listDiv);
    });
    updateBtn.addEventListener("click", function () {
        var newItem = window.prompt("Enter the update: ", task.task);
        if (newItem !== null) {
            task.task = newItem.trim();
            list.textContent = task.task;
            store();
        }
    });
    item.appendChild(listDiv);
};
formBtn.addEventListener("click", inputClick);
function store() {
    localStorage.setItem("todo", JSON.stringify(todoList));
}
window.addEventListener("beforeunload", function () {
    store();
});
function findTaskIndexById(todoList, taskId) {
    for (var i = 0; i < todoList.length; i++) {
        if (todoList[i].id === taskId) {
            return i;
        }
    }
    return -1;
}
