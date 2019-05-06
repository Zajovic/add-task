"use strict";

document.addEventListener("DOMContentLoaded", restorTask);
document.getElementById("input1").addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        return addTask();
    }
});

var tasks = [];

function addTask() {
    let taskValue = document.getElementById("input1").value;
    if (taskValue == "") {
        alert("Task fiel is empty!");
    } else {
        let taskValueNode = document.createTextNode(taskValue);
        let taskUl = document.getElementById("list");
        let taskLi = document.createElement("LI");
        taskLi.appendChild(taskValueNode);

        let span = document.createElement("span");
        let xNode = document.createTextNode("X");
        span.addEventListener("click", removeTask);

        span.appendChild(xNode);
        taskLi.appendChild(span)
        taskUl.appendChild(taskLi);

        /*dodavanje u niz i cuvanje */
        tasks.push(taskValue);
        localStorage.setItem("storedTasks", JSON.stringify(tasks));
        document.getElementById("input1").value = "";
    }
}


function removeTask() {
    let task = this.parentNode;
    task.remove();
}

function restorTask() {
    let storedTasks = localStorage.getItem("storedTasks");
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
    }
    ispisiListuTaskova();
}

/*`Prikaz podataka - UI */
function ispisiListuTaskova() {
    // console.log('lista taskova ', tasks);

    let taskUl = document.getElementById("list");
    taskUl.innerHTML = "";

    for (let i = 0; i < tasks.length; i++) {
        let taskValueNode = document.createTextNode(tasks[i]);
        let taskLi = document.createElement("LI");
        taskLi.appendChild(taskValueNode);

        let span = document.createElement("span");
        let xNode = document.createTextNode("X");

        span.addEventListener("click", removeTask);
        span.appendChild(xNode);
        taskLi.appendChild(span);
        taskUl.appendChild(taskLi);
    }

}

function clearTasks() {
    let taskUl = document.getElementById("list");
    taskUl.innerHTML = "";
    localStorage.clear();

    //	while(taskUl.firstChild){
    //		taskUl.removeChild(taskUl.firstChild);
    //	}
}

function filterTasks() {
    let taskValue = document.getElementById("input2").value.toUpperCase();

    let taskUl = document.getElementById("list");
    let taskLi = document.getElementsByTagName("LI");
    console.log("taskli", taskLi);
    for (let i = 0; i < taskLi.length; i++) {
        if (taskLi[i].textContent.toUpperCase().indexOf(taskValue) > -1) {
            taskLi[i].style.display = "";
        } else {
            taskLi[i].style.display = "none";
        }
    }
}