const cartas = document.querySelectorAll('.carta');
const elementoTempo = document.querySelector('header p:nth-child(2)');
const elementoTentativas = document.querySelector('header p:nth-child(3)');

const emojis = ['🇧🇷', '🇦🇷', '🇩🇪', '🇫🇷', '🇮🇹', '🇵🇹', '🇪🇸', '🇺🇲'];
let baralho = [...emojis, ...emojis];

let primeiraCarta = null;
let segundaCarta = null;
let bloquearTabuleiro = false;
let tentativas = 0;
let paresEncontrados = 0;
let tempoSegundos = 0;
let cronometro = null;
let jogoIniciado = false;

function embaralhar(array) {
  return array.sort(() => Math.random() - 0.5);
}

function iniciarCronometro() {
  cronometro = setInterval(() => {
    tempoSegundos++;
    const minutos = String(Math.floor(tempoSegundos / 60)).padStart(2, '0');
    const segundos = String(tempoSegundos % 60).padStart(2, '0');
    elementoTempo.textContent = `Tempo: ${minutos}:${segundos}`;
  }, 1000);
}

function inicializarJogo() {
  const baralhoEmbaralhado = embaralhar(baralho);
  cartas.forEach((carta, index) => {
    const elementoFrente = carta.querySelector('.face-frente');
    elementoFrente.textContent = baralhoEmbaralhado[index];
  });
}

cartas.forEach(carta => {
  carta.addEventListener('click', () => {
    if (bloquearTabuleiro) return;
    if (carta.classList.contains('virada')) return;

    if (!jogoIniciado) {
      jogoIniciado = true;
      iniciarCronometro();
    }

    carta.classList.add('virada');

    if (!primeiraCarta) {
      primeiraCarta = carta;
      return;
    }

    segundaCarta = carta;
    tentativas++;
    elementoTentativas.textContent = `Tentativas: ${tentativas}`;

    const elementoFrente1 = primeiraCarta.querySelector('.face-frente');
    const elementoFrente2 = segundaCarta.querySelector('.face-frente');

    if (!elementoFrente1 || !elementoFrente2) return;

    const valorPrimeira = elementoFrente1.textContent.trim();
    const valorSegunda = elementoFrente2.textContent.trim();

    if (valorPrimeira === valorSegunda) {
      primeiraCarta = null;
      segundaCarta = null;
      paresEncontrados++;

      if (paresEncontrados === emojis.length) {
        clearInterval(cronometro);
        setTimeout(() => {
          alert(`Parabéns! Você venceu em ${elementoTempo.textContent.replace('Tempo: ', '')} e ${tentativas} tentativas!`);
        }, 300);
      }
    } else {
      bloquearTabuleiro = true;

      const carta1 = primeiraCarta;
      const carta2 = segundaCarta;

      setTimeout(() => {
        carta1.classList.remove('virada');
        carta2.classList.remove('virada');

        primeiraCarta = null;
        segundaCarta = null;
        bloquearTabuleiro = false;
      }, 1000);
    }
  });
});

inicializarJogo();
