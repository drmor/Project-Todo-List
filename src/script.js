import "./style.css";
import { format } from "date-fns";
const popupWindow = document.querySelector(".popup");
const popupTodosWindow = document.querySelector(".popupTodos");
const addProject = document.getElementById("addBtn");
const confirmBtn = document.getElementById("confirmBtn");
const createBtn = document.getElementById("createBtn");
const closeBtn = document.querySelectorAll(".closeBtn");
const allProjects = document.querySelector(".projectSelect");
const addTodos = document.getElementById("addTodos");
const container = document.querySelector(".container");
const todoContainer = document.querySelector(".todo");

let projects = [];
let currentProject = null;
let currentIndex = null;

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
    projectBtn.dataset.action = "open";
    projectBtn.classList.add("projectBtn");
    deleteBtn.innerHTML = `<span style="color: #F45B69;">X</span>`;

    projects.forEach((project, index) => {
        projectBtn.setAttribute("data-index", index);
    });

    projectBtn.addEventListener("click", () => {
        currentProject = project;
        addTodos.style.display = "block";
        console.log("Selected:", currentProject.name);
        displayProject()
    });
    deleteBtn.addEventListener("click", () => {
        projects = projects.filter(p => p.uuid !== project.uuid);
        newProject.remove();
        displayNumberOfProjects();
        container.innerHTML = "";
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
    const todoDate = format(document.getElementById("date").value, "MMM dd yyyy");
    const todoPriority = document.getElementById("priority").value;
    const todo = new ToDo(todoTitle, todoDescription, todoDate, todoPriority);
    currentProject.addTodo(todo);
};
createBtn.addEventListener("click", () => {
    getTodosValues();
    popupTodosWindow.style.display = "none";
    displayProject();
    console.log(projects);
    displayTodos(currentIndex);
});
confirmBtn.addEventListener("click", () => {
    getName();
    popupWindow.style.display = "none";
});
function displayNumberOfProjects(){
    const titleDiv = document.querySelector(".title");
    const title = document.createElement("p")
    titleDiv.innerHTML = "";
    title.textContent = `Projects (${projects.length})`;
    titleDiv.appendChild(title);
};
displayNumberOfProjects();

function displayProject(){
    container.innerHTML = "";
    const projectTitle = document.createElement("h1");
    projectTitle.textContent = `Project: ${currentProject.name}`;

    container.appendChild(projectTitle);
};
allProjects.addEventListener("click", (event) => {
    const btn = event.target;
    if (btn.dataset.action === "open") {
        const index = parseInt(btn.dataset.index);
        currentIndex = index;
        displayTodos(index);
    };
});
function displayTodos(index){
    todoContainer.innerHTML = "";
    projects[index].todos.forEach(todo => {
        const todoCard = document.createElement("div");
        todoCard.classList.add("card");
        const titleOfTodo = document.createElement("p");
        titleOfTodo.classList.add("cardTitle");
        titleOfTodo.textContent = `ToDo: ${todo.title}`;
        const descriptionOfTodo = document.createElement("p");
        descriptionOfTodo.innerHTML = `<span style="font-weight:500;">Description:</span> ${todo.description}`;
        const dateOfTodo = document.createElement("p");
        dateOfTodo.innerHTML = `<span style="font-weight:500;">Date:</span> ${todo.date}`;
        const priorityOfTodo = document.createElement("p");
        priorityOfTodo.innerHTML = `<span style="font-weight:500;">Priority:</span> ${todo.priority}`;
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = "done";
        const deleteTodoBtn = document.createElement("button");
        deleteTodoBtn.id = "remove";
        deleteTodoBtn.innerHTML = `<span style="color: #F45B69;">X</span>`;
        const div = document.createElement("div");

        todoCard.appendChild(div);
        div.appendChild(titleOfTodo);
        div.appendChild(descriptionOfTodo);
        div.appendChild(dateOfTodo);
        div.appendChild(priorityOfTodo);
        todoCard.appendChild(checkbox);
        todoCard.appendChild(deleteTodoBtn);
        todoContainer.appendChild(todoCard);
        container.appendChild(todoContainer);
    });
};