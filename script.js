const input = document.querySelector("#todo-form");
const titleInput = document.querySelector("#task-title-input");
const todoListUl = document.querySelector("#todo-list");
const buttonEnviar = document.querySelector("#task-button");

let task = [];

function renderOnTask(taskTitle, done = false) {
  //adicionando a tarefa no html
  const li = document.createElement("li"); // criando uma nova tag li
  const checkBox = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  checkBox.addEventListener("change", (event) => {
    const toChangeToggle = event.target.parentElement;
    const spanChange = toChangeToggle.querySelector("span");

    const done = event.target.checked;
    if (done) {
      spanChange.style.textDecoration = "line-through";
    } else {
      spanChange.style.textDecoration = "none";
    }

    task = task.map((t) => {
      if (t.title === spanChange.textContent) {
        return {
          title: t.title,
          done: !t.done,
        };
      }
      return t;
    });
    localStorage.setItem("task", JSON.stringify(task));
  });
  checkBox.checked = done;

  const span = document.createElement("span");
  span.textContent = taskTitle;

  if (done) {
    span.style.textDecoration = "line-through";
  }

  const button = document.createElement("button");
  button.textContent = "X";
  button.addEventListener("click", (event) => {
    const toRemove = event.target.parentElement;
    const removeSpan = toRemove.querySelector("span").textContent;

    task = task.filter((t) => t.title !== removeSpan);
    todoListUl.removeChild(toRemove);
    localStorage.setItem("task", JSON.stringify(task));
  });

  li.appendChild(checkBox);
  li.appendChild(span);
  li.appendChild(button);
  todoListUl.appendChild(li);
}

window.onload = () => {
  const localStorageTasks = localStorage.getItem("task");
  if (localStorageTasks) {
    // Verifica se há dados no localStorage
    try {
      task = JSON.parse(localStorageTasks); // Tenta analisar os dados
      task.forEach((t) => {
        renderOnTask(t.title, t.done);
      });
    } catch (error) {
      // Se houver um erro na análise
      console.error("Erro ao analisar os dados do localStorage:", error);
      localStorage.removeItem("task"); // Remove os dados corrompidos
    }
  }
};

input.addEventListener("submit", (event) => {
  event.preventDefault(); // evita o comportamento padrao, ao enviar o formulario.

  const taskTitle = titleInput.value;
  if (taskTitle.length < 3) {
    alert(`Adicione uma tarefa valida, minimo 4 caracteres`);
    return;
  }

  //adicionando a tarefa no array task
  task.push({
    title: taskTitle,
    done: false,
  });

  localStorage.setItem("task", JSON.stringify(task));

  renderOnTask(taskTitle);

  titleInput.value = "";
});
