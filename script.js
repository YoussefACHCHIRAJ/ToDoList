window.addEventListener("load" , ()=>{
    myStorage = JSON.parse(localStorage.getItem('myStorage')) || [];
    
    //save username
    let name= document.querySelector('#name');
    let userName = localStorage.getItem('userName');
    name.value = userName;
    let username = document.querySelector('.username');
    username.innerHTML = userName;
    name.addEventListener('input' , letter =>{
        username.innerHTML = letter.target.value;
    })
    name.addEventListener('change' , e=>{
        localStorage.setItem('userName' , e.target.value);
        
    })
   //******************************* */
   let form =document.querySelector('.inputs');
   let title = document.querySelector('.title');
   let addTask = document.querySelector('.addTask');

   form.addEventListener('submit' , e=>{
    e.preventDefault();
    if(title.value != ''){
        const todo = {
            content: e.target.elements.Title.value,
            id :new Date().getTime(),
        }
        myStorage.push(todo);
        localStorage.setItem('myStorage' , JSON.stringify(myStorage));
        
        e.target.reset();
        displayTodo();
    }else{
        alert( userName + "  write the title for your Task first");
    }
   })
   displayTodo();
})

function displayTodo(){
    const theTasks = document.querySelector('.theTasks');
    theTasks.innerHTML = '';
    myStorage.forEach(todo =>{
        const taskList = document.createElement("div");
        taskList.classList.add("taskList");
        const content = document.createElement("div");
        content.classList.add("content");
        content.innerHTML = `<input type="text" id="update" value="${todo.content}" readonly>`
        const btns = document.createElement("div");
        btns.classList.add("btns");
        const editbtn = document.createElement("button");
        editbtn.classList.add("edit");
        editbtn.innerHTML = "edit";
        const deletebtn = document.createElement("button");
        deletebtn.innerHTML = "delete";
        deletebtn.classList.add("delete");

        theTasks.appendChild(taskList);
        taskList.appendChild(content);
        taskList.appendChild(btns);
        btns.appendChild(editbtn);
        btns.appendChild(deletebtn);
       
        

     // edit 
     input = document.querySelectorAll("input");
     const updateTask = document.querySelector("#update");
     
     editbtn.addEventListener("click" , e=>{
        
        updateTask.removeAttribute("readonly");

        updateTask.focus();

        updateTask.style.color = "red";
        editbtn.innerHTML ="save";

        updateTask.addEventListener("blur" , e=>{
            updateTask.setAttribute("readonly" , true);
            todo.content = e.target.value;
            localStorage.setItem("myStorage" , JSON.stringify(myStorage));
            updateTask.style.color = "#fff";
            editbtn.innerHTML ="edit";
            displayTodo();
        })

     }) 
       
        
        // delete
        deletebtn.addEventListener('click', (e) => {
			myStorage = myStorage.filter(t => t != todo);
			localStorage.setItem('myStorage', JSON.stringify(myStorage));
			displayTodo()
		})
    }) 
}

