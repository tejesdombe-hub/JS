const form = document.querySelector("#todoForm");
const input = document.querySelector("#todoInput");
const todoList = document.querySelector("#todoList");
const filters = document.querySelector("#filters");

let todos = JSON.parse(localStorage.getItem("todos")) || [];
let currentFilter = "all";


function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodos() {
  todoList.innerHTML = "";

  const filteredTodos = todos.filter(todo => {
    if (currentFilter === "active") return !todo.completed;
    if (currentFilter === "completed") return todo.completed;
    return true;
  });

  filteredTodos.forEach(todo => {
    const li = document.createElement("li");

    li.className = `todo-item ${todo.completed ? "completed" : ""}`;
    li.dataset.id = todo.id;

    li.innerHTML = `
      <input
        type="checkbox"
        class="complete-btn"
        ${todo.completed ? "checked" : ""}
      >

      <span class="todo-text"></span>

      <button class="delete-btn" type="button">
        Delete
      </button>
    `;

   
    li.querySelector(".todo-text").textContent = todo.text;

    todoList.append(li);
  });
}


form.addEventListener("submit", event => {
  event.preventDefault();

  const text = input.value.trim();

  if (!text) return;

  todos.push({
    id: Date.now(),
    text,
    completed: false
  });

  saveTodos();
  renderTodos();

  input.value = "";
  input.focus();
});


todoList.addEventListener("click", event => {
  const todoItem = event.target.closest(".todo-item");

  if (!todoItem) return;

  const id = Number(todoItem.dataset.id);

  if (event.target.classList.contains("delete-btn")) {
    todos = todos.filter(todo => todo.id !== id);

    saveTodos();
    renderTodos();
  }
});


todoList.addEventListener("change", event => {
  if (!event.target.classList.contains("complete-btn")) return;

  const todoItem = event.target.closest(".todo-item");
  const id = Number(todoItem.dataset.id);

  const todo = todos.find(todo => todo.id === id);

  if (todo) {
    todo.completed = event.target.checked;
  }

  saveTodos();
  renderTodos();
});


filters.addEventListener("click", event => {
  if (!event.target.matches("[data-filter]")) return;

  currentFilter = event.target.dataset.filter;

  filters.querySelectorAll("[data-filter]").forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.filter === currentFilter
    );
  });

  renderTodos();
});


renderTodos();

