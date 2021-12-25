const todoInput = document.getElementById("myInput");
const todoList = document.querySelector("#myUL");
const addTodoBTN = document.querySelector(".addBtn");
const deleteBTN = document.getElementsByClassName("close");

// ==================
addTodoBTN.addEventListener("click", createTodo);
renderTodo();

async function createTodo() {
  const url = `http://127.0.0.1:3000/api/todo`;
  const inputValue = todoInput.value;
  if (inputValue === "") {
    alert("Please add todo");
    return;
  }
  //API
  const res = await axios.post(url, { description: inputValue });
  const data = res.data.data;
  console.log(data);
  //   UI
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(inputValue));
  let span = document.createElement("SPAN");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  const att = document.createAttribute("data-id");
  att.value = data.id;
  span.setAttributeNode(att);
  li.appendChild(span);
  todoList.appendChild(li);
  todoInput.value = "";
  deleteTodo(deleteBTN);
  //   mark todo completed
  li.addEventListener("click", markDone);
}

async function renderTodo() {
  const url = `http://127.0.0.1:3000/api/todo`;
  const res = await axios.get(url);
  const data = res.data.data;
  //   console.log(data);
  if (data.length === 0) return;
  let output = "";
  data.forEach((el) => {
    output += `<li>${el.description}<span data-id=${el.todo_id} class="close">\u00D7</span></li>`;
  });
  todoList.innerHTML = output;
  deleteTodo(deleteBTN);
  const todoEls = document.querySelectorAll("li");
  todoEls.forEach((todo) => {
    todo.addEventListener("click", markDone);
  });
}

function deleteTodo(deleteButton) {
  for (let el of deleteButton) {
    el.addEventListener("click", function () {
      const id = el.getAttribute("data-id");
      axios
        .delete(`http://127.0.0.1:3000/api/todo/${id}`)
        .then((res) => console.log(res));
      el.parentElement.style.display = "none";
    });
  }
}

function markDone() {
  this.classList.toggle("checked");
}
