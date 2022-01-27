//[1] ANIMATION FORM INPUT TASK-----------------------------
inputTask.addEventListener("click", addBtnAppr);
inputTask.addEventListener("keypress", addBtnAppr);
document.body.addEventListener("click", addBtnDspr);

function addBtnAppr(e) {
  inputGroup.classList.remove("form-idle");
  inputTask.classList.remove("task-idle");
  btnAdd.classList.remove("btn-idle");
}

function addBtnDspr(e) {
  if (
    e.target.classList.contains("btn-add") === true ||
    e.target.id !== "task"
  ) {
    inputGroup.classList.add("form-idle");
    inputTask.classList.add("task-idle");
    btnAdd.classList.add("btn-idle");
  }
}

//[2] ANIMATION FORM SEARCH -------------------------------------
btnSearch.addEventListener("mouseover", showSearchInput);
btnSearch.addEventListener("mouseleave", hideSearchInput);

function showSearchInput(e) {
  inputSearch.classList.add("hover");
}

function hideSearchInput(e) {
  inputSearch.classList.remove("hover");
}
