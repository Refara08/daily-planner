const ulLists = document.querySelector("ul.collection");
let liList = document.querySelectorAll(".collection-item");
const taskLists = document.querySelector(".task-lists");
const formInput = document.querySelector("#input-form");
const formSearch = document.querySelector("#search-form");
const inputGroup = document.querySelector(".new-task");
const inputTask = document.querySelector("#task");
const inputSearch = document.querySelector("#search");
const btnAdd = document.querySelector(".btn-add");
const btnClear = document.querySelector(".btn-clear");
const btnSearch = document.querySelector(".btn-search");

// RUN ALL FUNCTIONS
runFunction();

function runFunction() {
  //[1] RESET LIST BY LOCAL STORAGE DATA
  resetLists();

  //[2] ADD SCROLL OVERLAY---------------------------------
  displayOverlay();

  //[3] REMOVE INDIVIDUAL TASKS----------------------------
  document.body.addEventListener("click", removeItem);

  //[4] ADD ITEM--------------------------------------------
  formInput.addEventListener("submit", addNewTask);

  //[5] REMOVE ALL TASKS------------------------------------------
  btnClear.addEventListener("click", removeLists);

  //[6] CROSS LIST ITEM----------------------------------------------
  ulLists.addEventListener("dblclick", crossThis);

  //[7] SEARCH ITEM
  formSearch.addEventListener("submit", hideSearchInput);
  formSearch.addEventListener("keyup", searchItem);
}

//[1] RESET LIST BY LOCAL STORAGE DATA
function resetLists(e) {
  const liList = document.querySelectorAll("li.collection-item");
  for (let i = 0; i < liList.length; i++) {
    ulLists.removeChild(liList[i]);
  }

  let tasks;

  if (localStorage.getItem("tasks") !== null) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    for (let i = 0; i < tasks.length; i++) {
      const newLi = document.createElement("li");
      newLi.className = "collection-item";
      newLi.appendChild(document.createTextNode(`${tasks[i]}`));

      //Create a tag
      const newLink = document.createElement("a");
      newLink.className = "remove-item";
      newLink.getAttribute("href", "#");
      newLi.appendChild(newLink);

      //Create i tag
      const newIcon = document.createElement("i");
      newIcon.className = "fas fa-trash";
      newLink.appendChild(newIcon);

      //Append New li to Ul
      ulLists.appendChild(newLi);
    }
  }

  //Display overlay
  displayOverlay();
}

//[2] ADD SCROLL OVERLAY---------------------------------
function displayOverlay() {
  if (ulLists.scrollHeight > ulLists.clientHeight) {
    taskLists.classList.add("scroll-overlay");
    ulLists.style.borderColor = "#333";
  } else {
    taskLists.classList.remove("scroll-overlay");
    ulLists.style.borderColor = "transparent";
  }
}

//[3] REMOVE INDIVIDUAL TASKS----------------------------
function removeItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    e.target.parentElement.parentElement.remove();

    // localStorage.removeItem("tasks");

    // const liList = document.querySelectorAll("li.collection-item");

    // for (let i = 0; i < liList.length; i++) {
    //   let tasks;
    //   if (localStorage.getItem("tasks") === null) {
    //     tasks = [];
    //   } else {
    //     tasks = JSON.parse(localStorage.getItem("tasks"));
    //   }

    //   tasks.push(ulLists.children[i].innerText);

    //   localStorage.setItem("tasks", JSON.stringify(tasks));
    // }

    removeTaskFromLocalStorage(e.target.parentElement.parentElement);

    function removeTaskFromLocalStorage(taskItem) {
      let tasks;
      if (localStorage.getItem("tasks") === null) {
        tasks = [];
      } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
      }

      tasks.forEach(function (task, index) {
        if (taskItem.textContent == task) {
          //SPLICE IS DA KEYYYY
          tasks.splice(index, 1);
        }
      });

      localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    displayOverlay();
  }
}

// penting untuk mendeklarasi variable yang berubah menggunakan
// let daripada const.
// dan penting untuk mendeklarasikannya kembali tanpa "let"
// ketika variable yang berubah tsb akan digunakan lagi
// liList = document.querySelectorAll(".collection-item");
// console.log(liList);
// console.log(liList.length);

//[4] ADD ITEM--------------------------------------------

function addNewTask(e) {
  //Create New li
  const newLi = document.createElement("li");
  newLi.className = "collection-item";
  newLi.appendChild(
    document.createTextNode(`${e.target.children[0].children[0].value}`)
  );

  //Create a tag
  const newLink = document.createElement("a");
  newLink.className = "remove-item";
  newLink.getAttribute("href", "#");
  newLi.appendChild(newLink);

  //Create i tag
  const newIcon = document.createElement("i");
  newIcon.className = "fas fa-trash";
  newLink.appendChild(newIcon);

  //Append New li to Ul
  ulLists.appendChild(newLi);

  const task = e.target.children[0].children[0].value;
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));

  e.target.children[0].children[0].value = "";

  //Display overlay
  displayOverlay();

  e.preventDefault();
}

//[5] REMOVE ALL TASKS------------------------------------------

function removeLists(e) {
  if (confirm("Are you sure?") === true) {
    // let liList = document.querySelectorAll(".collection-item");
    // for (let i = 0; i < liList.length; i++) {
    //   ulLists.removeChild(liList[i]);
    // }

    //WHITLE IS DA KEYYYY
    while (ulLists.firstChild) {
      ulLists.removeChild(ulLists.firstChild);
    }

    localStorage.removeItem("tasks");

    displayOverlay();
  }
}

//[6] CROSS LIST ITEM----------------------------------------------

function crossThis(e) {
  if (e.target.classList.contains("collection-item")) {
    e.target.innerHTML = `<strike>${e.target.innerText}</strike><a href="#" class="remove-item"><i class="fas fa-trash"></i></a>`;
    e.target.style.color = "#777";
    e.target.style.fontStyle = "italic";
  }
}

//[7] SEARCH ITEM --------------------------------------------------

function searchItem(e) {
  const searchVal = e.target.value.toLowerCase();
  liList = document.querySelectorAll(".collection-item");

  liList.forEach(function (task) {
    const text = task.firstChild.textContent;
    //intinya..
    //arti dari text.toLowerCase().indexOf(searchVal) != -1
    //index dari karakter searchVal (misal: g)
    //dalam text itu nomor berapa?
    //kalo bukan -1 (artinya ada!)
    //maka..
    if (text.toLowerCase().indexOf(searchVal) != -1) {
      task.style.display = "flex";
    } else {
      task.style.display = "none";
    }
  });
}

function hideSearchInput(e) {
  inputSearch.classList.remove("hover");

  e.preventDefault();
}
