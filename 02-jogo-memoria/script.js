const cartas = document.querySelectorAll('.carta');

cartas.forEach(carta => {
  carta.addEventListener('click', () => {
    carta.classList.toggle('virada');
  });
});
