{
  let tasks = [];
  let hideTasksDone;

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
    <li class="list__item"${
      task.done && hideTasksDone ? " list__item--hide" : ""
    }">
    <button class="done__button js-done__button">${task.done ? "&#10003;" : ""}
    </button>
    <span class="taskList__span${task.done ? " taskList__span--done" : ""}">
    ${task.content}
    </span>
    <button class="remove__button js-remove__button">&#128465;</button>
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

  const disableAllDoneButton = (button) => {
    const allTasksDone = tasks.every(({ done }) => done === true);
    if (allTasksDone) {
      button.disabled = true;
    }
  };

  const selectAllTasksDone = () => {
    tasks = tasks.map((task) => ({
      ...task,
      done: true,
    }));
    render();
  };

  toggleHideTasksDone = () =>{
    hideTasksDone = !hideTasksDone;
    render();
  };

  
  const bindsButtonsEvents = () => {
    const hideDoneTasksButton = document.querySelector(".js-hideDoneTasks");
    hideDoneTasksButton.addEventListener("click", toggleHideTasksDone);
      
      
    

    const selectAllDoneTasksButton = document.querySelector(
      ".js-completeAllTasks"
    );
    disableAllDoneButton(selectAllDoneTasksButton);
    selectAllDoneTasksButton.addEventListener("click", () => {
      selectAllTasksDone();
    });
  };

  
  const renderButtons = () => {
    const buttonsHtml = document.querySelector(".js-main__buttons");

    if (!tasks.length) {
      buttonsHtml.innerHTML = "";
      return;
    }

    buttonsHtml.innerHTML = `
    <button class="main__button js-hideDoneTasks">
        ${hideTasksDone ? "Pokaż" : "Ukryj"} ukończone
    </button>
    <button 
        class="main__button js-completeAllTasks"
        ${tasks.every(({ done }) => done) ? " disabled" : ""}
    >
        Ukończ wszystkie
    </button>
    `;
    
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

  const render = () => {
    renderTasks();
    renderButtons();
    bindEvents();
    bindsButtonsEvents();
  };

  init();
}
