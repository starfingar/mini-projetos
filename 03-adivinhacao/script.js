const input = document.getElementById('palpite-input');
const btnEnviar = document.getElementById('enviar-btn');
const tentativas = document.getElementById('tentativas');
const olPalpites = document.getElementById('palpites');
const resposta = document.getElementById('resposta');
const btnReiniciar = document.getElementById('reiniciar-btn');

let totalTentativas = 0;
let bloquearPalpites = false;
let numeroAleatorio = () => {
  return Math.floor(Math.random() * 100) + 1;
};
let numero = numeroAleatorio();

btnEnviar.addEventListener('click', () => {
  if (bloquearPalpites) return;

  const palpiteValido = Number(input.value.trim());

  if (input.value.trim() === '') return;

  if (
    Number.isInteger(palpiteValido) &&
    palpiteValido > 0 &&
    palpiteValido <= 100
  ) {
    totalTentativas++;
    tentativas.textContent = `Tentativas: ${totalTentativas}`;

    const palpite = document.createElement('li');
    palpite.classList.add('palpiteLista');
    palpite.textContent = `${totalTentativas}° palpite: ${palpiteValido}`;

    olPalpites.appendChild(palpite);

    if (palpiteValido > numero) {
      resposta.textContent = 'Seu ultimo palpite é maior que o número';
    } else if (palpiteValido < numero) {
      resposta.textContent = 'Seu ultimo palpite é menor que o número';
    } else {
      resposta.textContent = 'Exato! Você acertou o número';
      bloquearPalpites = true;
    }
  }

  if (bloquearPalpites) {
    input.disabled = true;
    btnEnviar.disabled = true;
  }

  input.value = '';
});

btnReiniciar.addEventListener('click', () => {
  bloquearPalpites = false;

  const todosPalpites = document.querySelectorAll('.palpiteLista');
  todosPalpites.forEach(plp => plp.remove());

  totalTentativas = 0;
  tentativas.textContent = 'Tentativas: 0';
  resposta.textContent = '';
  input.disabled = false;
  btnEnviar.disabled = false;

  numero = numeroAleatorio();
});
