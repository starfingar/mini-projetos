const input = document.querySelector('#todo-input');
const btnAdicionar = document.querySelector('#add-btn');
const ulTarefas = document.querySelector('#todo-list');

btnAdicionar.addEventListener('click', e => {
  const tarefa = input.value.trim();

  if (tarefa === '') {
    return;
  }

  const liTarefa = document.createElement('li');
  liTarefa.classList.add('todo-item');
  liTarefa.innerHTML = `<p>${tarefa}</p>
    <button class='delete-btn'>Deletar</button>`;

  ulTarefas.appendChild(liTarefa);

  input.value = '';

  liTarefa.querySelector('.delete-btn').addEventListener('click', e => {
    liTarefa.remove();
  })
});

