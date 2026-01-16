# ColorfulTodoApp

**A lightweight, colorful, and fully client‑side Todo application** built with plain HTML, CSS, and JavaScript. The app lets you add, edit, delete, and organize tasks, with persistent storage in the browser’s `localStorage` and a handful of handy keyboard shortcuts.

---

## 🎯 Brief Description

ColorfulTodoApp is a single‑page web app that provides a clean, responsive UI for managing a todo list. All data is stored locally, so no server or database is required. The app demonstrates modern vanilla‑JS patterns such as modular event handling, DOM rendering with `DocumentFragment`, and state persistence.

---

## 🛠️ Tech Stack

- **HTML5** – markup and structure (`index.html`)
- **CSS3** – styling and colour themes (`styles.css`)
- **JavaScript (ES6+)** – core logic, UI interactions, and persistence (`script.js`)

---

## ✨ Features (as implemented)

| Feature | Description |
|---------|-------------|
| **Add Todo** | Type a task in the input field and press **Enter** or **Ctrl + Enter** to add it to the list. |
| **Edit Todo** | Click the ✏️ button on a task to edit inline. Press **Enter** to save, **Escape** to cancel. |
| **Delete Todo** | Click the 🗑️ button to remove a task permanently. |
| **Toggle Completion** | Click the checkbox to mark a task as completed; completed items are styled differently. |
| **Filter Views** | Buttons to show **All**, **Active**, or **Completed** tasks. |
| **Clear Completed (Shortcut)** | Press **Ctrl + Backspace** to delete all completed tasks at once. |
| **Keyboard Navigation** | Arrow‑Up/Down moves focus between items for quick access. |
| **Persistence** | All todos are saved in `localStorage` under the key `colorful_todo_items`, surviving page reloads and browser restarts. |
| **Responsive Design** | The layout adapts to various screen sizes, making it usable on desktop and mobile browsers. |

---

## 📦 Installation / Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/colorful-todo-app.git
   cd colorful-todo-app
   ```
2. **Open the app**
   - Simply open `index.html` in any modern browser (Chrome, Firefox, Edge, Safari).
   - No build step, server, or package manager is required.

---

## 📖 Usage Guide

### Adding a Todo
1. Click inside the **“What needs to be done?”** input field.
2. Type your task.
3. Press **Enter** or **Ctrl + Enter** to add it.

### Editing a Todo
1. Click the ✏️ **Edit** button next to the task.
2. Modify the text in the inline input that appears.
3. Press **Enter** to save or **Escape** to cancel.

### Deleting a Todo
- Click the 🗑️ **Delete** button next to the task you want to remove.

### Marking as Complete
- Click the checkbox on the left side of a task. Completed tasks receive a strikethrough style.

### Filtering
- Use the **All**, **Active**, and **Completed** buttons at the bottom to change the view.

### Keyboard Shortcuts
| Shortcut | Action |
|----------|--------|
| **Ctrl + Enter** (while the input is focused) | Add the current text as a new todo |
| **Ctrl + Backspace** | Clear **all** completed todos |
| **Arrow Up / Arrow Down** | Move focus between todo items |

---

## 🛠️ Development Notes

### File Structure
```
project-root/
├─ index.html      # Main HTML markup
├─ styles.css      # All visual styling (colours, layout, responsive rules)
└─ script.js       # Core JavaScript – data model, rendering, event handling
```

### Where to Modify
- **Styling** – Edit `styles.css`. Classes such as `.todo-item`, `.completed`, `.filter-btn`, and colour variables are defined here.
- **Logic** – Edit `script.js`. The file is divided into sections:
  1. **Data Model & Persistence** – change the `STORAGE_KEY` or storage mechanism.
  2. **Rendering** – adjust how tasks are built in the DOM.
  3. **Event Handlers** – add new UI interactions or shortcuts.
  4. **Filters** – extend filter logic if you need additional views.
- **Markup** – Edit `index.html` for structural changes (e.g., adding a header, changing button icons).

### Persistence Details
- Todos are stored as a JSON string in `localStorage` under the key `colorful_todo_items`.
- On page load, `loadTodos()` parses this data back into the `todos` array.
- Every mutation (`add`, `toggle`, `edit`, `delete`, `clearCompleted`) calls `saveTodos()` to keep storage in sync.
- Because `localStorage` is domain‑scoped, the data is isolated to this app’s URL.

---

## 🤝 Contributing (optional)

Contributions are welcome! If you’d like to improve the app:
1. Fork the repository.
2. Create a new branch for your feature or bug‑fix.
3. Ensure the app still works by opening `index.html`.
4. Submit a Pull Request with a clear description of the changes.

Please keep the code style consistent with the existing files (ES6 syntax, descriptive variable names, and comments).

---

## 📄 License

This project is licensed under the **MIT License** – see the `LICENSE` file for details.
