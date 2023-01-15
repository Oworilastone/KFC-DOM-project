const input = document.getElementById("new-todo-input");
const addTaskBtn = document.getElementById("new-todo-submit");

addTaskBtn.addEventListener("click", () => {
  let localItems = JSON.parse(localStorage.getItem("localItem"));
  localItems === null ? (todoslist = []) : (todoslist = localItems);
  todoslist.push(input.value);
  localStorage.setItem("localItem", JSON.stringify(todoslist));
  
  showList();
});

function showList() {
  let output = "";
  let todosListShow = document.getElementById("todos");
  let localItems = JSON.parse(localStorage.getItem("localItem"));
  localItems === null ? (todoslist = []) : (todoslist = localItems);
  todoslist.forEach((data, index) => {
    output += `
                <div class="todos">
                    <div class="content">
                            <input
                            id="input_${index}" 
                            type="text"
                            class="text"
                            value="${data}"
                            readonly
                            />
                        </div>
                        <div class="actions">
                            <button class="edit" id="edit_${index}" onClick="editItem(${index})">Edit</button>
                            <button class="delete" onClick="deleteItem(${index})"> Delete </button>
                        </div>
                    </div>
                </div>
                `;
  });
  todosListShow.innerHTML = output;
}

function deleteItem(index) {
  let localItems = JSON.parse(localStorage.getItem("localItem"));
  todoslist.splice(index, 1);
  localStorage.setItem("localItem", JSON.stringify(todoslist));
  showList();
}

function editItem(index) {
    todos_edit_el = document.getElementById('edit_'+index)
    todos_input_el = document.getElementById('input_'+index)

  if (todos_edit_el.innerText.toLowerCase() == "edit") {
    todos_edit_el.innerText = "Save";
    todos_input_el.removeAttribute("readonly");
    todos_input_el.focus();
  } else {
    todos_edit_el.innerText = "Edit";
    todos_input_el.setAttribute("readonly", "readonly");

    
    let localItems = JSON.parse(localStorage.getItem("localItem"));
    localItems[index] = todos_input_el.value
    todoslist = localItems
    localStorage.setItem("localItem", JSON.stringify(todoslist));


    console.log(todoslist)
  }
}
