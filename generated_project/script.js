// script.js – Core logic for Colorful Todo App
// --------------------------------------------------
// This script implements data handling, rendering, and UI interactions
// for the Todo application defined in index.html. It uses vanilla
// JavaScript and the browser's localStorage for persistence.

// ---------------------------
// 1. Data Model & Persistence
// ---------------------------
const STORAGE_KEY = "colorful_todo_items";
let todos = [];

/** Load todos from localStorage. */
function loadTodos() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        todos = parsed;
      }
    } catch (e) {
      console.error("Failed to parse todos from storage", e);
    }
  }
}

/** Save current todos array to localStorage. */
function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

// ---------------------------
// 2. Rendering
// ---------------------------
/**
 * Render the todo list according to the supplied filter.
 * @param {string} filter - "all" | "active" | "completed"
 */
function renderTodos(filter = "all") {
  const listEl = document.getElementById("todo-list");
  // Clear existing items
  listEl.innerHTML = "";

  const fragment = document.createDocumentFragment();

  const filtered = todos.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true; // "all"
  });

  filtered.forEach((todo) => {
    const li = document.createElement("li");
    li.className = "todo-item";
    if (todo.completed) li.classList.add("completed");
    li.dataset.id = todo.id;

    // Checkbox toggle
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "toggle";
    checkbox.checked = !!todo.completed;
    li.appendChild(checkbox);

    // Text span (matches CSS .text class)
    const span = document.createElement("span");
    span.className = "text"; // CSS expects .text for styling
    span.textContent = todo.text;
    li.appendChild(span);

    // Edit button
    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    editBtn.title = "Edit";
    editBtn.innerHTML = "✏️"; // pencil emoji
    li.appendChild(editBtn);

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.title = "Delete";
    deleteBtn.innerHTML = "🗑️"; // trash can emoji
    li.appendChild(deleteBtn);

    fragment.appendChild(li);
  });

  listEl.appendChild(fragment);
}

// ---------------------------
// 3. UI Event Handlers
// ---------------------------
/** Generate a simple unique id for a new todo. */
function generateId() {
  // Using timestamp + random suffix to avoid collisions.
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

/** Add a new todo based on the input field value. */
function addTodoFromInput() {
  const input = document.getElementById("new-todo");
  const text = input.value.trim();
  if (!text) return;

  const newTodo = {
    id: generateId(),
    text,
    completed: false,
  };
  todos.push(newTodo);
  saveTodos();
  renderTodos(currentFilter);
  input.value = "";
  input.focus();
}

/** Toggle completion state of a todo identified by id. */
function toggleTodo(id) {
  const todo = todos.find((t) => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    saveTodos();
    renderTodos(currentFilter);
  }
}

/** Delete a todo by id. */
function deleteTodo(id) {
  todos = todos.filter((t) => t.id !== id);
  saveTodos();
  renderTodos(currentFilter);
}

/** Begin inline edit for a todo item element. */
function startEdit(li, todo) {
  const span = li.querySelector("span.text");
  if (!span) return;

  const input = document.createElement("input");
  input.type = "text";
  input.className = "edit-input";
  input.value = todo.text;
  input.style.flex = "1";

  // Replace span with input
  li.replaceChild(input, span);
  input.focus();
  input.select();

  const commit = () => {
    const newText = input.value.trim();
    if (newText && newText !== todo.text) {
      todo.text = newText;
      saveTodos();
    }
    // Restore span
    li.replaceChild(span, input);
    span.textContent = todo.text;
  };

  input.addEventListener("blur", commit);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      input.blur();
    } else if (e.key === "Escape") {
      // Cancel edit
      li.replaceChild(span, input);
    }
  });
}

/** Clear all completed todos (used by shortcut). */
function clearCompleted() {
  const before = todos.length;
  todos = todos.filter((t) => !t.completed);
  if (todos.length !== before) {
    saveTodos();
    renderTodos(currentFilter);
  }
}

// ---------------------------
// 4. Filter Controls
// ---------------------------
let currentFilter = "all";
function setFilter(filter) {
  currentFilter = filter;
  // Update active button styling
  document.querySelectorAll('.filter-btn').forEach((btn) => {
    const isActive = btn.dataset.filter === filter;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-pressed', isActive);
  });
  renderTodos(filter);
}

// ---------------------------
// 5. Keyboard Shortcuts
// ---------------------------
function globalKeydown(e) {
  // Ctrl+Enter → add todo (if input focused)
  if (e.ctrlKey && e.key === "Enter") {
    const active = document.activeElement;
    if (active && active.id === "new-todo") {
      e.preventDefault();
      addTodoFromInput();
    }
  }
  // Ctrl+Backspace → clear completed
  if (e.ctrlKey && e.key === "Backspace") {
    e.preventDefault();
    clearCompleted();
  }
  // Arrow navigation (optional, simple focus move)
  if (e.key === "ArrowUp" || e.key === "ArrowDown") {
    const list = document.getElementById("todo-list");
    const items = Array.from(list.querySelectorAll('.todo-item'));
    if (!items.length) return;
    const current = document.activeElement.closest('.todo-item');
    let idx = items.indexOf(current);
    if (e.key === "ArrowUp") idx = idx > 0 ? idx - 1 : items.length - 1;
    else idx = idx < items.length - 1 ? idx + 1 : 0;
    const target = items[idx];
    const focusable = target.querySelector('input.toggle, button.edit-btn, button.delete-btn, span.text');
    if (focusable) focusable.focus();
    e.preventDefault();
  }
}

// ---------------------------
// 6. Initialization & Event Wiring
// ---------------------------
document.addEventListener("DOMContentLoaded", () => {
  loadTodos();
  setFilter("all"); // also renders initial list

  // Add button click
  document.getElementById("add-btn").addEventListener("click", addTodoFromInput);

  // Enter key in input field
  document.getElementById("new-todo").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTodoFromInput();
    }
  });

  // Delegated events for toggle, edit, delete
  document.getElementById("todo-list").addEventListener("click", (e) => {
    const item = e.target.closest('.todo-item');
    if (!item) return;
    const id = item.dataset.id;

    if (e.target.matches('input.toggle')) {
      toggleTodo(id);
    } else if (e.target.matches('button.delete-btn')) {
      deleteTodo(id);
    } else if (e.target.matches('button.edit-btn')) {
      const todo = todos.find((t) => t.id === id);
      if (todo) startEdit(item, todo);
    }
  });

  // Filter button clicks
  document.querySelectorAll('.filter-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      setFilter(btn.dataset.filter);
    });
  });

  // Global shortcuts
  document.addEventListener('keydown', globalKeydown);
});
