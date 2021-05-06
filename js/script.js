{
  const tasks = [
    {
      content: "jakies zadanie",
    },

    {
        content: "jakies zadanie",
      },
  ];

  const display = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
    <li class="form__taskItem js-form__Taskitem">${task.content}<i class="fas fa-trash"></i></li>
    `;
    }
    document.querySelector(".js-form__ul").innerHTML = htmlString;
  };

  const init = () => {
    display();
  };
  init();
}
