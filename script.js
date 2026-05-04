const neonColors = ['#38bdf8', '#fbbf24', '#34d399', '#f472b6', '#a78bfa', '#fb7185'];

document.addEventListener('DOMContentLoaded', loadFromStorage);

function newElement() {
    const input = document.getElementById("myInput");
    const val = input.value.trim();

    if (val === '') {
        alert("Enter a mission first!");
        return;
    }

    const color = neonColors[Math.floor(Math.random() * neonColors.length)];
    renderTask(val, false, color);
    saveToStorage();
    input.value = "";
}

function renderTask(text, completed, color) {
    const li = document.createElement("li");
    li.innerHTML = `
        <span class="task-text">${text}</span>
        <i class="fas fa-times close-icon"></i>
    `;
    
    // UI Decoration
    li.style.borderLeft = `5px solid ${color}`;
    if (completed) li.classList.add("checked");

    // Toggle logic
    li.onclick = function() {
        this.classList.toggle("checked");
        saveToStorage();
    };

    // Remove logic
    li.querySelector(".close-icon").onclick = function(e) {
        e.stopPropagation();
        li.remove();
        saveToStorage();
    };

    document.getElementById("myUL").appendChild(li);
}

function saveToStorage() {
    const tasks = [];
    document.querySelectorAll("#myUL li").forEach(li => {
        tasks.push({
            text: li.querySelector(".task-text").innerText,
            completed: li.classList.contains("checked"),
            color: li.style.borderLeftColor
        });
    });
    localStorage.setItem("proTasks", JSON.stringify(tasks));
}

function loadFromStorage() {
    const data = JSON.parse(localStorage.getItem("proTasks")) || [];
    data.forEach(t => renderTask(t.text, t.completed, t.color));
}

function clearAll() {
    if (confirm("Clear all missions?")) {
        document.getElementById("myUL").innerHTML = "";
        localStorage.removeItem("proTasks");
    }
}