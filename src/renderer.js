/**
 * This file will automatically be loaded by vite and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/process-model
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import './index.css';
import deleteIcon from './trash.png';
import dancingDuck from './dancing.gif';

const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");
const duckGif = document.getElementById("duck-gif");
const messages = document.getElementById("messages");

const motivationalMessages = [
  "Let's work!",
  "You're doing<br>amazing!",
  "Keep going!", 
  "You can<br>do it!",
  "I believe<br>in you!"
];
setInterval(loopingMessages, 15000);
    messages.innerHTML = motivationalMessages[0];
    let i = 1;
    function loopingMessages() {
      messages.innerHTML = motivationalMessages[i];
      i = (i+1) % motivationalMessages.length;
    };

const renderTasks = async () => {
  const tasks = await window.api.getAllTasks();
  taskList.innerHTML = '';
  
  const allCompleted = tasks.length && tasks.every(task => task.completed);
  if (allCompleted) {
    messages.innerHTML = "Well done! You<br>completed every task!";
    duckGif.src = dancingDuck;
    duckGif.style.right = "100px";
    duckGif.style.width = "70px";
  }

  tasks.forEach(task => {
    const li = document.createElement('li');
    const titleSpan = document.createElement('span');
    titleSpan.textContent = task.title;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = !!task.completed;

    titleSpan.classList.toggle('completed', checkbox.checked);

    checkbox.addEventListener('change', async () => {
      await window.api.markComplete({id:task.id, completed: checkbox.checked ? 1 : 0});
      titleSpan.classList.toggle('completed', checkbox.checked);
      
      const previousGifSrc = duckGif.src;
      const previousMessage = messages.textContent;
      const newMessage = "Great job!";

      if (checkbox.checked) {
        duckGif.src = dancingDuck;
        duckGif.style.width = "70px";
        messages.textContent = newMessage;
        messages.style.right = "10px";
        setTimeout(() => {
        duckGif.src = previousGifSrc;
        duckGif.style.width = "120px";
        messages.textContent = previousMessage;
        messages.style.right = "40px";
      }, 3000);
    }
    renderTasks()
    })
    
    const deleteBtn = document.createElement('button');
    //deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.innerHTML = `<img src="${deleteIcon}" alt="Delete">`;
    
    deleteBtn.addEventListener('click', async () => {
      await window.api.deleteTask(task.id);
      renderTasks()
    })
    
    li.appendChild(checkbox);
    li.appendChild(titleSpan);
    li.appendChild(deleteBtn);
  taskList.appendChild(li);
  })
}

const handleAddTask = async () => {
  const title = taskInput.value.trim();
  await window.api.addTask(title);
  renderTasks();
}

addTaskBtn.addEventListener('click', handleAddTask);

taskInput.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    handleAddTask();
  }
});

renderTasks()