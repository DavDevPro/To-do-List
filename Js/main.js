// Minimizing querySelector:
function $(selector) {
  return document.body.querySelector(selector);
}
// Minimizing createElement:
function c(selector) {
  return document.createElement(selector);
}

// Selecting:
let elForm = $(".form");
let elFormInput = $(".form__input");
let elBox = $(".box");
let elFormSelect = $(".form__select");
// modal
let elModal = $(".modal");
// let elModalBox = $(".modal__box");
let elModalBtn = $(".modal__btn");
let elModalInput = $(".modal__input");
let elModalSelect = $(".modal__select");
let elModalSave = $(".modal__save--btn");

// Sort and filter:
let sortSelect = $(".sort__select");
let filterSelect = $(".filter__select");

let tasksArr = [];

elForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const task = elFormInput.value.trim();
  const priority = elFormSelect.value;

  if (task.length === 0) {
    return;
  }

  tasksArr.push({
    id: new Date().getTime(),
    task: task,
    priority: priority,
    isCompleted: false,
  });

  render(tasksArr);

  elFormInput.value = "";
  elFormSelect.value = "";
  elFormInput.focus();
});
elFormInput.focus();

function render(arr) {
  elBox.innerHTML = "";

  arr.forEach((task) => {
    const taskDiv = createElWithTaskText(task);
    elBox.appendChild(taskDiv);
  });
}

function createElWithTaskText(elementObj) {
  const taskInput = c("input");
  taskInput.checked = elementObj.isCompleted;
  taskInput.type = "checkbox";
  taskInput.className = "task__input";
  taskInput.onclick = function (event) {
    const taskId = +event.target.parentNode.dataset.id;

    tasksArr = tasksArr.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          isCompleted: !task.isCompleted,
        };
      }
      return task;
    });
    render(tasksArr);
  };

  let taskDesc = c("div");

  taskDesc.textContent = elementObj.task;
  taskDesc.className = "task__desc";

  const taskPriority = c("div");
  taskPriority.textContent = elementObj.priority;
  taskPriority.className = "task__priority";

  const taskEdit = c("button");
  taskEdit.textContent = "Edit";
  taskEdit.className = "task__btn task__edit";
  // modal bilan edit qilish:
  taskEdit.onclick = function (event) {
    // bu modal bilan edit qilish usuli edi:
    elModal.style.display = "flex";
    const taskId = +event.target.parentNode.dataset.id;
    let task = tasksArr.find((task) => task.id === taskId);
    elModalInput.value = task.task;
    elModalSelect.value = task.priority;
    elModalSave.dataset.id = task.id;
  };

  const taskDelete = c("button");
  taskDelete.textContent = "X";
  taskDelete.className = "task__btn";
  console.log(taskDelete);

  taskDelete.onclick = function (event) {
    let parent = event.target.parentNode;
    let parentId = +parent.dataset.id;
    console.log(parentId);

    tasksArr = tasksArr.filter((element) => element.id !== parentId);
    parent.remove();

    render(tasksArr);
  };
  // taskDelete.addEventListener("click", () => {
  //   taskDiv.className = "task close";
  // });

  const taskDiv = c("div");
  taskDiv.dataset.id = elementObj.id;
  taskDiv.className = elementObj.isCompleted ? "task task__done" : "task";

  taskDiv.append(taskInput, taskDesc, taskPriority, taskEdit, taskDelete);

  return taskDiv;
}

Array.prototype.sorted = function (selectValue) {
  return this.sort((a, b) => {
    let value1 = a.task.toLowerCase();
    let value2 = b.task.toLowerCase();

    if (selectValue == "a-z") {
      if (value1 > value2) return 1;
      else if (value1 < value2) return -1;
      return 0;

      // return a.task.toLowerCase().localeCompare(b.task.toLowerCase());
    } else {
      if (value1 > value2) return -1;
      else if (value1 < value2) return 1;
      return 0;
      // return b.task.toLowerCase().localeCompare(a.task.toLowerCase());
    }
  });
};

sortSelect.addEventListener("change", (event) => {
  const sortingType = event.target.value;
  tasksArr.sorted(sortingType);

  render(tasksArr);
});

filterSelect.addEventListener("change", (event) => {
  const filterType = event.target.value;
  console.log(filterType);
  let filteredArr = tasksArr.filter((task) => task.priority == filterType);

  render(filteredArr);
});

elModal.addEventListener("click", (ev) => {
  if (ev.target.getAttribute("class") === "modal") {
    elModal.style.display = "none";
  }
});

elModalBtn.addEventListener("click", (ev) => {
  elModal.style.display = "none";
});

elModalSave.addEventListener("click", (event) => {
  const taskId = +event.target.dataset.id;
  const editedTask = elModalInput.value;
  const editedPriority = elModalSelect.value;

  tasksArr = tasksArr.map((oldTask) => {
    if (oldTask.id === taskId) {
      return {
        ...oldTask,
        task: editedTask,
        priority: editedPriority,
      };
    }
    return oldTask;
  });
  render(tasksArr);
  elModal.style.display = "none";
});

// taskDesc ga ikki marta bosganda ishlaydigan edit:
/* 
taskDesc.ondblclick = function (event) {
  const element = event.target;

  const newInput = c("input");
  newInput.onkeydown = function (event) {
    if (event.key === "Enter") {
      const editedTask = event.target.value;
      const parent = event.target.parentNode;
      event.target.remove();
      parent.textContent = editedTask;
    }
  };

  newInput.value = element.textContent;
  element.innerHTML = "";
  element.append(newInput);
  newInput.focus();
}; */

// SEARCH

search.addEventListener("input", (event) => {
  let keyword = event.target.value.trim().toLowerCase();

  let foundTasks = tasksArr.filter((element) => {
    if (element.task.toLowerCase().includes(keyword)) {
      return element;
    }
  });
  render(foundTasks);
});

let lang = {
  night: {
    uz: "Tun",
    en: "Kun",
  },
  light: {
    uz: "Kun",
    en: "Light",
  },
};

let themeBtn2 = document.createElement("button");
