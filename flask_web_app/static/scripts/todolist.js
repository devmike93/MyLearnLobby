const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

//adds item to To-do List
function addListItem(){
    if(inputBox.value === ''){
        alert("You must write something!");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData(); 
}

//uncheck an item + delete an item from list
listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false);

//****How to save to user's database? I dunno
//save data to browser(local storage) 
function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}
//display data henever website is opened again
function showListItems(){
    listContainer.innerHTML = localStorage.getItem("data")
}
showListItems();
