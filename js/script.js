{
  let tasks = [];
  let hideTasksDone = false;

  const addNewTask = (newTaskContent) => {
    tasks = [...tasks, { content: newTaskContent, done: false }];
    render();
  };
  const removeTask = (taskIndex) => {
    tasks = [...tasks.slice(0, taskIndex), ...tasks.slice(taskIndex + 1)];
    render();
  };
  const toggleTaskDone = (index) => {
    tasks = [
      ...tasks.slice(0, index),
      {
        ...tasks[index],
        done: !tasks[index].done,
      },
      ...tasks.slice(index + 1),
    ];
    render();
  };
  const renderTasks = () => {

    let HtmlString = "";

    for (const task of tasks) {
      HtmlString += `
    <li class="list__item${
      task.done && hideTasksDone ? " list__item--hide" : ""
    }">
    <button class="done__button js-done__button">
      ${task.done ? "✔" : ""}
    </button>
    <span class="taskList__span${task.done ? " taskList__span--done" : ""}">
      ${task.content}
    </span>
      <button class="remove__button js-remove__button">&#128465;
    </button>
    </li>
    `;
    }
    document.querySelector(".js-unorderList").innerHTML = HtmlString;
  };
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
  };
  const selectAllTasksDone = () => {
    tasks = tasks.map((task) => ({
      ...task,
      done: true,
    }));
    render();
  };
  toggleHideTasksDone = () => {
    hideTasksDone = !hideTasksDone;
    render();
  };
  const bindsButtonsEvents = () => {
    const hideDoneTasksButton = document.querySelector(".js-hideDoneTasks");
    if (hideDoneTasksButton) {
      hideDoneTasksButton.addEventListener("click", toggleHideTasksDone);
    }
    const selectAllDoneTasksButton = document.querySelector(
      ".js-completeAllTasks"
    );
    if (selectAllDoneTasksButton) {
      selectAllDoneTasksButton.addEventListener(
        "click", selectAllTasksDone
      );
    }
  };
  const renderButtons = () => {
    const buttonsHtml = document.querySelector(".js-buttons");
    if (!tasks.length) {
      buttonsHtml.innerHTML = "";
      return;
    }
      buttonsHtml.innerHTML = `
    <button class="buttons__button js-hideDoneTasks">
        ${hideTasksDone ? "Pokaż" : "Ukryj"} ukończone
    </button>
    <button 
        class="buttons__button js-completeAllTasks"
        ${tasks.every(({ done }) => done) ? "disabled" : ""}
    >
        Ukończ wszystkie
    </button>
    `;
  };
  const clearInput = (clearNewTaskContent) => {
    clearNewTaskContent.value = "";
    clearNewTaskContent.focus();
  };
  const onFormSubmit = (event) => {
    event.preventDefault();
    const clearNewTaskContent = document.querySelector(".js-new__task");
    newTaskContent = clearNewTaskContent.value.trim();
    if (newTaskContent === "") {
      return;
    }
    addNewTask(newTaskContent);
    clearInput(clearNewTaskContent);
  };
  const init = () => {
    const form = document.querySelector(".js-form");
    form.addEventListener("submit", onFormSubmit);
  };
  const render = () => {
    renderTasks();
    renderButtons();
    bindEvents();
    bindsButtonsEvents();
  };
  init();
}
