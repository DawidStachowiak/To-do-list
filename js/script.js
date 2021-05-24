{
  let tasks = [];

  const bindEvents = () => {
    const removeButtons = document.querySelectorAll(".js-remove__button");

    removeButtons.forEach((removeButton, index) => {
      removeButton.addEventListener("click", () => {
        removeTask(index);
      });
    });

    const toggleDoneButtons = document.querySelectorAll(".js-done__button");

    toggleDoneButtons.forEach((toggleDoneButton, index) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(index);
      });
    });
  };0

  const render = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
    <li class="list__item">
    <button class="done__button js-done__button">${task.done ? "&#10003;" : ""}
    </button>
    <span class="taskList__span${task.done ? " taskList__span--done" : ""}">
    ${task.content}
    </span>
    <button class="remove__button js-remove__button">&#128465;</button>
    </li>
    `;
    }

    document.querySelector(".js-unorderList").innerHTML = htmlString;

    bindEvents();
  };

  const toggleTaskDone = (taskIndex) => {
    tasks[taskIndex].done = !tasks[taskIndex].done;
    render();
  };

  const addNewTask = (newTaskContent) => {
    tasks = [
      ...tasks,
      { content: newTaskContent, done:false },
    ];

    render();
  };

  const removeTask = (taskIndex) => {
    tasks = [
      ...tasks.slice(0, taskIndex),
      ...tasks.slice(taskIndex + 1),
    ];
    render();
  };

  const clearInput = (somethingToDo) => {
    somethingToDo.value = "";
    somethingToDo.focus();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    const somethingToDo = document.querySelector(".js-new__task");
    newTaskContent = somethingToDo.value.trim();

    if (newTaskContent === "") {
      return;
    }

    addNewTask(newTaskContent);
    clearInput(somethingToDo);
  };

  const init = () => {
    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
  };

  init();
}
