const taskText = document.getElementById('taskText');
const taskDate = document.getElementById('taskDate');
const taskTime = document.getElementById('taskTime');
const addBtn = document.getElementById('addBtn');
const dueTasks = document.getElementById('dueTasks');
const searchBox = document.getElementById('searchBox');
const alertModal = document.getElementById('alertModal');
const closeBtn = document.getElementById('closeBtn');
const okBtn = document.getElementById('okBtn');
const alertMessage = document.getElementById('alertMessage');
const taskEdit = document.getElementById('taskEdit');

let todoList = [];
let editingTaskId = null;

const formatDateForInput = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const formatDateForDisplay = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
};

const formatTimeForDisplay = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${period}`;
};

const loadTasks = () => {
    const storedTasks = localStorage.getItem('todoTasks');
    if (storedTasks) {
        todoList = JSON.parse(storedTasks);
    }
};

const saveTasks = () => {
    localStorage.setItem('todoTasks', JSON.stringify(todoList));
};

const handleAddTask = () => {
    const text = taskText.value.trim();
    const date = taskDate.value;
    const time = taskTime.value;

    if (!text || !date || !time) {
        showModal('Please fill in all fields');
        return;
    }

    if (editingTaskId) {
        const taskIndex = todoList.findIndex(task => task.id === editingTaskId);
        if (taskIndex !== -1) {
            todoList[taskIndex] = {
                ...todoList[taskIndex],
                text,
                date,
                time
            };

            editingTaskId = null;
            taskEdit.style.display = 'none';
        }
    } else {
        const newTask = {
            id: Date.now(),
            text,
            date,
            time
        };

        todoList.push(newTask);
    }

    saveTasks();
    renderTasks();

    taskText.value = '';
};

const deleteTask = (id) => {
    todoList = todoList.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
};

const editTask = (id) => {
    const task = todoList.find(task => task.id === id);
    if (!task) return;

    taskText.value = task.text;
    taskDate.value = task.date;
    taskTime.value = task.time;

    editingTaskId = id;

    taskText.focus();
};

const handleSearch = () => {
    const query = searchBox.value.toLowerCase();
    renderTasks(query);
};

const showModal = (message) => {
    alertMessage.textContent = message;
    alertModal.style.display = 'flex';
};

const hideModal = () => {
    alertModal.style.display = 'none';
};

const isToday = (dateString) => {
    const today = new Date();
    const taskDate = new Date(dateString);

    return today.getDate() === taskDate.getDate() &&
        today.getMonth() === taskDate.getMonth() &&
        today.getFullYear() === taskDate.getFullYear();
};

const renderTasks = (searchQuery = '') => {
    dueTasks.innerHTML = '';

    if (todoList.length === 0) {
        dueTasks.innerHTML = '<div class="no-tasks">No tasks yet. Add a task to get started!</div>';
        return;
    }

    let filteredTasks = todoList;
    if (searchQuery) {
        filteredTasks = todoList.filter(task =>
            task.text.toLowerCase().includes(searchQuery)
        );

        if (filteredTasks.length === 0) {
            dueTasks.innerHTML = '<div class="no-tasks">No matching tasks found</div>';
            return;
        }
    }

    filteredTasks.sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time}`);
        const dateB = new Date(`${b.date}T${b.time}`);
        return dateA - dateB;
    });

    const tasksByDate = {};
    filteredTasks.forEach(task => {
        if (!tasksByDate[task.date]) {
            tasksByDate[task.date] = [];
        }
        tasksByDate[task.date].push(task);
    });

    Object.keys(tasksByDate).sort().forEach(date => {
        const dateHeader = document.createElement('div');
        dateHeader.className = 'date-header';
        dateHeader.textContent = formatDateForDisplay(date);
        dueTasks.appendChild(dateHeader);

        tasksByDate[date].forEach(task => {
            const taskElement = createTaskElement(task);
            dueTasks.appendChild(taskElement);
        });
    });
};

const createTaskElement = (task) => {
    const taskItem = document.createElement('div');
    taskItem.className = 'task-item';
    taskItem.id = `task-${task.id}`;

    const taskContent = document.createElement('div');
    taskContent.className = 'task-content';

    const taskTextElement = document.createElement('span');
    taskTextElement.className = 'task-text';
    taskTextElement.textContent = `${task.text} at `;
    taskContent.appendChild(taskTextElement);

    const taskTimeElement = document.createElement('span');
    taskTimeElement.className = 'task-time';
    taskTimeElement.textContent = formatTimeForDisplay(task.time);
    taskContent.appendChild(taskTimeElement);

    const taskActions = document.createElement('div');
    taskActions.className = 'task-actions';

    const editBtn = document.createElement('button');
    editBtn.className = 'edit-btn';
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => editTask(task.id));
    taskActions.appendChild(editBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => deleteTask(task.id));
    taskActions.appendChild(deleteBtn);

    taskItem.appendChild(taskContent);
    taskItem.appendChild(taskActions);

    return taskItem;
};

loadTasks();

addBtn.addEventListener('click', handleAddTask);
searchBox.addEventListener('input', handleSearch);
closeBtn.addEventListener('click', hideModal);
okBtn.addEventListener('click', hideModal);

renderTasks();