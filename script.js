const getTodos = () => {
  const todos = localStorage.getItem("todos") || "[]";
  return JSON.parse(todos);
};

const updateTodoList = () => {
  todoListUL.innerHTML = "";
  allTodos.forEach((todo, todoIndex) => {
    const todoItem = createTodoItem(todo, todoIndex);
    todoListUL.append(todoItem);
  });
};

const createTodoItem = (todo, todoIndex) => {
  const todoId = "task-checkbox-" + todoIndex;
  const todoLI = document.createElement("li");
  const todoText = todo.text;
  todoLI.className = "task-item";
  todoLI.innerHTML = `
      <input type="checkbox" id="${todoId}" class="task-checkbox">
      <label class="checkbox-label" for="${todoId}">
          <svg class="check-svg" fill="transparent" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
      </label>
      <label for="${todoId}" class="task-text">
          ${todoText}
      </label>
      <button class="delete-task-btn">
          <svg class="delete-svg" fill="var(--gray-color)" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
      </button>
  `;
  const deleteButton = todoLI.querySelector(".delete-task-btn");
  deleteButton.addEventListener("click", () => {
    deleteTodoItem(todoIndex);
  });
  const checkbox = todoLI.querySelector("input");
  checkbox.addEventListener("change", () => {
    allTodos[todoIndex].completed = checkbox.checked;
    saveTodos();
  });
  checkbox.checked = todo.completed;
  return todoLI;
};

const deleteTodoItem = (todoIndex) => {
  allTodos = allTodos.filter((_, i) => i !== todoIndex);
  saveTodos();
  updateTodoList();
};

const saveTodos = () => {
  const todosJson = JSON.stringify(allTodos);
  localStorage.setItem("todos", todosJson);
};

const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("task-input");
const todoListUL = document.getElementById("tasks-list");

let allTodos = getTodos();
updateTodoList();

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addTodo();
});

const addTodo = () => {
  const todoText = todoInput.value.trim();
  if (todoText.length > 0) {
    const todoObject = {
      text: todoText,
      completed: false,
    };
    allTodos.push(todoObject);
    updateTodoList();
    saveTodos();
    todoInput.value = "";
  }
};
