{
  const tasks = [
    
  ];

  const display = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
    <li <span class=${task.done ? "\" list__item--done\">" : "\"list__item\">"}
    ${task.content}</span><i class="fas fa-trash"></i></li>
    `;
    }
    document.querySelector(".js-form__ul").innerHTML = htmlString;
  };

  const toggleTaskDone = (taskIndex) => {
    tasks[taskIndex].done = !tasks[taskIndex].done;
    display();
  };


  const addNewTask = () =>{
    tasks.push({
        content: newTaskContent,
    });
    display();
  }


  const onFormSubmit = (event) =>{
    event.preventDefault();
    
    newTaskContent = document.querySelector(".js-new__task").value.trim();
    
    if (newTaskContent === ""){
    
        return;
    }
        addNewTask(newTaskContent);
    
        
    };

  const init = () => {
    
 const form = document.querySelector(".js-form");

 form.addEventListener("submit", onFormSubmit);


 };


  init();


}
