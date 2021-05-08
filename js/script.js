{
  const tasks = [
    
  ];

  const display = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
    <li class="list__item">
    <button class= "done__button js-done__button">${task.done ? "&#x2714" : ""}
    </button>
    <span class="listItem__span{${task.done ? "listItem__span--done" : ""}">${task.content}
            </span>
    <button class="js-remove__button"<i class="fas fa-trash "></i></button>
    </li>
    `;

    }

    document.querySelector(".js-form__ul").innerHTML = htmlString;

   const removeButtons = document.querySelectorAll(".js-remove__button");

   removeButtons.forEach( (removeButton, index) => {
       removeButton.addEventListener("click", () => {

            removeTask(index);

       });

       
   });

   const toggleDoneButtons = document.querySelectorAll(".js-done__button");

   toggleDoneButtons.forEach( (toggleDoneButton, index) => {
       toggleDoneButton.addEventListener("click", () => {

            toggleTaskDone(index);

       });

       
   });


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


  const removeTask = (index) =>{

    tasks.splice(index, 1);
            display();
  };


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
