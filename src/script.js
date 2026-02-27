import "./style.css";
const popupWindow = document.querySelector(".popup");
const popupTodosWindow = document.querySelector(".popupTodos");
const addProject = document.getElementById("addBtn");
const confirmBtn = document.getElementById("confirmBtn");
const createBtn = document.getElementById("createBtn");
const closeBtn = document.querySelectorAll(".closeBtn");
const projectBtn = document.querySelectorAll(".projectBtn");
const allProjects = document.querySelector(".projectSelect");
const addTodos = document.getElementById("addTodos");

let projects = [];
let currentProject = null;

function Project(name, uuid){
    this.name = name;
    this.uuid = uuid;
    this.todos = [];
    this.addTodo = function(todo){
        this.todos.push(todo);
    };
};

function ToDo(title, description, date, priority){
    this.title = title;
    this.description = description;
    this.date = date;
    this.priority = priority;
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
function displayProjectsBtn(project){
    const newProject = document.createElement("div");
    const projectBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");
    newProject.classList.add("projectCard");
    newProject.appendChild(projectBtn);
    newProject.appendChild(deleteBtn);
    allProjects.appendChild(newProject);
    projectBtn.textContent = project.name;
    projectBtn.classList.add("projectBtn");
    deleteBtn.innerHTML = `<span style="color: #F45B69;">X</span>`;

    projectBtn.addEventListener("click", () => {
        currentProject = project;
        console.log("Selected:", currentProject.name);
    });

    deleteBtn.addEventListener("click", () => {
        projects = projects.filter(p => p.uuid !== project.uuid);
        newProject.remove();
        displayNumberOfProjects();
    });
    displayNumberOfProjects();
};

function getName(){
    const projectName = document.getElementById("name").value || "unnamed";
    const project = new Project(projectName, crypto.randomUUID());
    projects.push(project);
    displayProjectsBtn(project)
    console.log(projects);
}
function getTodosValues(){
    const todoTitle = document.getElementById("title").value;
    const todoDescription = document.getElementById("description").value;
    const todoDate = document.getElementById("date").value;
    const todoPriority = document.getElementById("priority").value;
    const todo = new ToDo(todoTitle, todoDescription, todoDate, todoPriority);
    currentProject.addTodo(todo);
};
confirmBtn.addEventListener("click", () => {
    getName();
    popupWindow.style.display = "none";
});
createBtn.addEventListener("click", () => {
    getTodosValues();
    popupTodosWindow.style.display = "none";
    console.log(projects);
});
function displayNumberOfProjects(){
    const titleDiv = document.querySelector(".title");
    const title = document.createElement("p")
    titleDiv.innerHTML = "";
    title.textContent = `Projects (${projects.length})`;
    titleDiv.appendChild(title);
};
displayNumberOfProjects();