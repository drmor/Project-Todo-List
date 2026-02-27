import "./style.css";
const popupWindow = document.querySelector(".popup");
const addProject = document.getElementById("addBtn");
const confirmBtn = document.getElementById("confirmBtn");
const closeBtn = document.getElementById("closeBtn");
const allProjects = document.querySelector(".projectSelect");

let todos = [];

function ToDo(name, uuid){
    this.name = name;
    this.uuid = uuid;
};

addProject.addEventListener('click', () => {
    popupWindow.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
    popupWindow.style.display = "none";
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
    deleteBtn.innerHTML = `<span style="color: #F45B69;">X</span>`;

    deleteBtn.addEventListener("click", () => {
        todos = todos.filter(p => p.uuid !== todo.uuid);
        newProject.remove();
    });
};
function getName(){
    const projectName = document.getElementById("name").value;
    let uuid = self.crypto.randomUUID();
    const todo = new ToDo(projectName, uuid);
    if (projectName == ''){
        todos.push(new ToDo("unnamed", uuid));
    } else {
        todos.push(todo);
    }
    displayProjectsBtn(todo)
}
confirmBtn.addEventListener("click", () => {
    getName();
    console.log(todos);
    popupWindow.style.display = "none";
});