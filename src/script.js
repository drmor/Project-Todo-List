import "./style.css";
const popupWindow = document.querySelector(".popup");
const popupTodosWindow = document.querySelector(".popupTodos");
const addProject = document.getElementById("addBtn");
const confirmBtn = document.getElementById("confirmBtn");
const closeBtn = document.querySelectorAll(".closeBtn");
const allProjects = document.querySelector(".projectSelect");
const addTodos = document.getElementById("addTodos");

let todos = [];

function ToDo(name, uuid){
    this.name = name;
    this.uuid = uuid;
};

addProject.addEventListener('click', () => {
    popupWindow.style.display = "flex";
});
addTodos.addEventListener("click", () => {
    popupTodosWindow.style.display = "flex";
});
closeBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        popupWindow.style.display = "none";
        popupTodosWindow.style.display = "none";
    });
});
function displayProjectsBtn(todo){
    const newProject = document.createElement("div");
    const projectBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");
    newProject.classList.add("projectCard");
    newProject.appendChild(projectBtn);
    newProject.appendChild(deleteBtn);
    allProjects.appendChild(newProject);
    projectBtn.textContent = todo.name;
    projectBtn.id = todo.name;
    deleteBtn.innerHTML = `<span style="color: #F45B69;">X</span>`;

    deleteBtn.addEventListener("click", () => {
        todos = todos.filter(p => p.uuid !== todo.uuid);
        newProject.remove();
    });
    displayNumberOfProjects();
};
function getName(){
    const projectName = document.getElementById("name").value || "unnamed";
    let uuid = self.crypto.randomUUID();
    const todo = new ToDo(projectName, uuid);
    todos.push(todo);
    displayProjectsBtn(todo)
}
function getTodosValues(){
    const todoTitle = document.getElementById("title").value;
    const todoDescription = document.getElementById("description").value;
    const todoDate = document.getElementById("date").value;
    const todoPriority = document.getElementById("priority").value;
};
confirmBtn.addEventListener("click", () => {
    getName();
    popupWindow.style.display = "none";
});

function displayNumberOfProjects(){
    const titleDiv = document.querySelector(".title");
    const title = document.createElement("p")
    titleDiv.innerHTML = "";
    title.textContent = `Projects (${todos.length})`;
    titleDiv.appendChild(title);
};
displayNumberOfProjects();