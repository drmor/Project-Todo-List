import "./style.css";
const popupWindow = document.querySelector(".popup");
const addProject = document.getElementById("addBtn");
const confirmBtn = document.getElementById("confirmBtn");
const closeBtn = document.getElementById("closeBtn");
const allProjects = document.querySelector("projectSelect");

const todos = [];

function ToDo(name){
    this.name = name;
};

addProject.addEventListener('click', () => {
    popupWindow.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
    popupWindow.style.display = "none";
});
function displayProjectsBtn(){
    console.log("h")
};
function getName(){
    const projectName = document.getElementById("name").value;
    const todo = new ToDo(projectName);
    if (projectName == ''){
        alert("insert name of project");
    } else {
        todos.push(todo);
    }
}
confirmBtn.addEventListener("click", () => {
    getName();
    console.log(todos);
    popupWindow.style.display = "none";
    displayProjectsBtn();
});