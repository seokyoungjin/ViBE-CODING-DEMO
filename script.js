// DOM 요소 선택
const todoInput = document.getElementById('todo-input');
const addButton = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
const clearAllButton = document.getElementById('clear-all');

// 로컬 스토리지에서 할 일 목록 불러오기
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// 할 일 저장 함수
function addTodo() {
    const text = todoInput.value.trim();

    if (text === '') {
        alert('할 일을 입력해주세요.');
        return;
    }

    const todo = {
        id: Date.now(),
        text: text,
        completed: false,
        important: false
    };

    todos.push(todo);
    saveTodosToLocalStorage();
    displayTodos();
    todoInput.value = '';
}

// 할 일 삭제 함수
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveTodosToLocalStorage();
    displayTodos();
}

// 할 일 완료 상태 토글 함수
function toggleTodo(id) {
    todos = todos.map(todo => {
        if (todo.id === id) {
            return { ...todo, completed: !todo.completed };
        }
        return todo;
    });
    saveTodosToLocalStorage();
    displayTodos();
}

// 할 일 중요 표시 토글 함수
function toggleImportant(id) {
    todos = todos.map(todo => {
        if (todo.id === id) {
            return { ...todo, important: !todo.important };
        }
        return todo;
    });
    saveTodosToLocalStorage();
    displayTodos();
}

// 모든 할 일 삭제 함수
function clearAll() {
    todos = [];
    saveTodosToLocalStorage();
    displayTodos();
}

// 로컬 스토리지에 할 일 목록 저장
function saveTodosToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// 할 일 목록 화면에 표시
function displayTodos() {
    todoList.innerHTML = '';
    
    todos.forEach(todo => {
        const todoItem = document.createElement('div');
        todoItem.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        
        const checkbox = document.createElement('div');
        checkbox.className = `todo-checkbox ${todo.completed ? 'checked' : ''}`;
        checkbox.onclick = () => toggleTodo(todo.id);

        const todoText = document.createElement('span');
        todoText.className = 'todo-text';
        todoText.textContent = todo.text;

        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'button-container';

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-btn';
        deleteButton.innerHTML = '🗑️';
        deleteButton.onclick = () => deleteTodo(todo.id);

        const starButton = document.createElement('button');
        starButton.className = `star-btn ${todo.important ? 'important' : ''}`;
        starButton.innerHTML = todo.important ? '★' : '☆';
        starButton.onclick = () => toggleImportant(todo.id);

        buttonContainer.appendChild(deleteButton);
        buttonContainer.appendChild(starButton);

        todoItem.appendChild(checkbox);
        todoItem.appendChild(todoText);
        todoItem.appendChild(buttonContainer);
        todoList.appendChild(todoItem);
    });
}

// 이벤트 리스너 등록
addButton.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});
clearAllButton.addEventListener('click', clearAll);

// 초기 할 일 목록 표시
displayTodos(); 