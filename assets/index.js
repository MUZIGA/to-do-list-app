
/ assets/index.js

const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const list = document.getElementById('task-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
  list.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = 'flex justify-between items-center bg-white p-3 rounded shadow';

    const span = document.createElement('span');
    span.textContent = task.text;
    span.className = task.completed ? 'line-through text-gray-500' : '';

    const actions = document.createElement('div');
    actions.className = 'flex gap-2';

    const completeBtn = document.createElement('button');
    completeBtn.textContent = '✓';
    completeBtn.className = 'text-green-600';
    completeBtn.onclick = () => {
      tasks[index].completed = !tasks[index].completed;
      updateTasks();
    };
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'text-red-600';
    deleteBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 18M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2M4 7h16M10 11v6M14 11v6" />
      </svg>
    `;
    deleteBtn.onclick = () => {
      tasks.splice(index, 1);
      updateTasks();
    };

    actions.appendChild(completeBtn);
    actions.appendChild(deleteBtn);
    li.appendChild(span);
    li.appendChild(actions);
    list.appendChild(li);
  });
}

function updateTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const text = input.value.trim();
  if (text) {
    tasks.push({ text, completed: false });
    updateTasks();
    input.value = '';
  }
});

// Initial render
renderTasks();