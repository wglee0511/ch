const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoListPending = document.querySelector(".js-toDoList-pending"),
    toDoListFinished = document.querySelector(".js-toDoList-finished");

const PENDING_LS = "PENDING";
const FINISHED_LS = "FINISHED";

let toDoPenArray = [];
let toDoFinArray = [];

let chkBtn = document.createElement("button");

// checkToDo
function checkToDo(event){
    const cBtn = event.target;
    const li = cBtn.parentNode;

    toDoListFinished.appendChild(li);
    // toDoListPending.removeChild(li);

    chkBtn.innerText = "❎";    
    li.appendChild(chkBtn);

    const reChangeToDo = toDoPenArray.filter(function(toDo){
        console.log("checkToDo/toDo.id, li.id = ", toDo.id, li.id);
        return toDo.id != parseInt(li.id);
    });
    toDoFinArray = reChangeToDo;

    saveFinToDo();
}

// deletePenToDo
function deletePenToDo(event){
    const dBtn = event.target;
    const li = dBtn.parentNode;

    toDoListPending.removeChild(li);

    const cleanPenToDo = toDoPenArray.filter(function(toDo){ // click
        console.log(toDo.id, li.id); // (num, string)
        return toDo.id != parseInt(li.id); // 필터를 통해 새로운 array 생성
    });
    toDoPenArray = cleanPenToDo; // swap
    savePenToDo();
}

function saveFinToDo(){
    localStorage.setItem(FINISHED_LS, JSON.stringify(toDoFinArray));
} // object → string

function savePenToDo(){
    localStorage.setItem(PENDING_LS, JSON.stringify(toDoPenArray));
} // object → string


// printFinToDo
function printFinToDo(value){
    console.log("printFinToDo value = ", value);
    
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");

    delBtn.innerText = "❌";
    chkBtn.innerText = "❎";
    span.innerText = value;

    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(chkBtn);

    toDoFinArray.appendChild(li);

    // const toDoFinObj = {
    //     id : newId,
    //     value : value
    // };
    // toDoFinArray.push(toDoFinObj);

    // delBtn.addEventListener("click", deleteToDo);
    // chkBtn.addEventListener("click", checkToDo);
}

// printPenToDo
function printPenToDo(value){
    console.log("printPenToDo value = ", value);
    
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = Date.now();

    delBtn.innerText = "❌";
    chkBtn.innerText = "✅";
    span.innerText = value;

    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(chkBtn);
    li.id = newId;

    toDoListPending.appendChild(li);

    const toDoPendingObj = {
        id : newId,
        value : value
    };
    toDoPenArray.push(toDoPendingObj);
    savePenToDo();

    delBtn.addEventListener("click", deletePenToDo);
    chkBtn.addEventListener("click", checkToDo);
}

function toDoFormSubmit(event){
    event.preventDefault();
    const toDoValue = toDoInput.value;
    printPenToDo(toDoValue);
}

function loadToDos(){
    const loadSucPenToDos = localStorage.getItem(PENDING_LS);
    const loadSucFinToDos = localStorage.getItem(FINISHED_LS);

    if(loadSucPenToDos !== null || loadSucFinToDos !== null) {
        
        // PENDING_LS
        console.log("loadSucPenToDos = ", loadSucPenToDos); // string
        const parsePenToDos = JSON.parse(loadSucPenToDos); // object
        console.log("parsePenToDos = ", parsePenToDos);

        // FINISHED_LS
        console.log("loadSucFinToDos = ", loadSucFinToDos); // string
        const parseFinToDos = JSON.stringify(loadSucFinToDos); // object
        console.log("parseFinToDos = ", parseFinToDos);

        parsePenToDos.forEach(function(toDoPen){
            console.log("toDoPen.value = ", toDoPen.value);
            printPenToDo(toDoPen.value);
        });

        parseFinToDos.forEach(function(toDoFin){
            console.log("toDoFin.value = ", toDoFin.value);
            printFinToDo(toDoFin.value);
        });

    } else {
        localStorage.removeItem(PENDING_LS);
    }
}

function init(){
    loadToDos(); // load
    toDoForm.addEventListener("submit", toDoFormSubmit);
}

init();