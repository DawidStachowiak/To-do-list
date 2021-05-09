{
  const tasks = [];

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

  const display = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
    <li class="list__item">
    <button class="done__button js-done__button">${task.done ? "&#10003;" : ""}
    </button>
    <span class="taskList__span${task.done ? " taskList__span--done" : ""}">${
        task.content
      }
            </span>
    <button class="js-remove__button">&#128465;</button>
    </li>
    `;
    }

    document.querySelector(".js-form__ul").innerHTML = htmlString;

    bindEvents();
  };

  const toggleTaskDone = (taskIndex) => {
    tasks[taskIndex].done = !tasks[taskIndex].done;
    display();
  };

  const addNewTask = () => {
    tasks.push({
      content: newTaskContent,
    });
    display();
  };

  const removeTask = (index) => {
    tasks.splice(index, 1);
    display();
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
