const inputText = document.querySelector<HTMLInputElement>(".input")!;
const formBtn = document.querySelector<HTMLButtonElement>(".form-btn")!;
const item = document.querySelector<HTMLDivElement>(".item")!;
let todoList: Todo[] = [];
const storedData = localStorage.getItem("todo");
if (storedData) {
  todoList = JSON.parse(storedData);
}

window.onload = () => {
  todoList.forEach((item) => {
    addTodoToList(item);
  });
};

let id = todoList.length > 0 ? todoList[todoList.length - 1].id + 1 : 1;

type Todo = {
  readonly id: number;
  task: string;
  isDone: boolean;
};

const inputClick = () => {
  const taskValue = inputText.value.trim();
  if (taskValue !== "") {
    const newTask = {
      id: id++,
      task: taskValue,
      isDone: false,
    };
    if (todoList.length === 5) {
      window.alert(
        "To do count cannot be more than 5. Update or delete done todos."
      );
      return;
    }
    addToTask(newTask);
    inputText.value = "";
  } else {
    window.alert("Input can't be empty");
  }
};

const addToTask = (task: Todo) => {
  todoList.push(task);
  addTodoToList(task);
  store();
  console.log(todoList);
};

const removeTodoTask = (task: Todo, listDiv: HTMLDivElement) => {
  if (window.confirm("Do you want to delete the task?")) {
    if (task.isDone) {
      const id = findTaskIndexById(todoList, task.id);
      if (id !== -1) {
        todoList.splice(id, 1);
        listDiv.remove();
        store();
      }
    } else {
      window.alert("Task cannot be deleted!!!");
    }
  }
};

const addTodoToList = (task: Todo) => {
  const list = document.createElement("li");
  list.textContent = task.task;
  list.className = task.isDone ? "done" : "";

  const itemBtn = document.createElement("button");
  itemBtn.className = "btn item-btn";
  itemBtn.innerText = "X";

  const updateBtn = document.createElement("button");
  updateBtn.className = "btn item-btn";
  updateBtn.innerText = "update";

  const listDiv = document.createElement("div");
  listDiv.className = "content";
  listDiv.appendChild(list);
  listDiv.appendChild(itemBtn);
  listDiv.appendChild(updateBtn);

  list.addEventListener("click", () => {
    task.isDone = !task.isDone;
    list.classList.toggle("done");

    store();
  });

  itemBtn.addEventListener("click", () => {
    removeTodoTask(task, listDiv);
  });

  updateBtn.addEventListener("click", () => {
    const newItem = window.prompt("Enter the update: ", task.task);
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

window.addEventListener("beforeunload", () => {
  store();
});

function findTaskIndexById(todoList: Todo[], taskId: number): number {
  for (let i = 0; i < todoList.length; i++) {
    if (todoList[i].id === taskId) {
      return i;
    }
  }
  return -1;
}
