const input = document.querySelector('#todo-input');
const btnAdicionar = document.querySelector('#add-btn');
const ulTarefas = document.querySelector('#todo-list');

let tarefas = JSON.parse(localStorage.getItem('tarefas'));

if (tarefas === null) {
  tarefas = [];
}

tarefas.forEach((ele, ind) => {
  carregarTarefas(ele);
});

btnAdicionar.addEventListener('click', e => {
  const tarefa = input.value.trim();

  if (tarefa === '') {
    return;
  }

  carregarTarefas(tarefa);
  
  input.value = '';

  tarefas.push(tarefa);
  localStorage.setItem('tarefas', JSON.stringify(tarefas));
});

function carregarTarefas(tarefa) {
  const liTarefa = document.createElement('li');
  liTarefa.classList.add('todo-item');
  liTarefa.innerHTML = `<p>${tarefa}</p>
    <button class='delete-btn'>Deletar</button>`;

  ulTarefas.appendChild(liTarefa);

  liTarefa.addEventListener('click', e => {
    if (e.target.classList.contains('delete-btn')) {
      return;
    }
    liTarefa.classList.toggle('completed');
  });

  liTarefa.querySelector('.delete-btn').addEventListener('click', e => {
    tarefas = tarefas.filter(trf => trf !== tarefa);
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
    liTarefa.remove();
  });
}
