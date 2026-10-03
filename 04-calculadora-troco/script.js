const inputCompra = document.getElementById('input-compra');
const txtValorRecebido = document.getElementById('valor-recebido');
const txtValorTroco = document.getElementById('valor-troco');
const botoesControle = document.querySelectorAll('.btn-controle');

const moedas = {
  centavo1: { id: 'moeda-c1', valor: 0.01, quantidade: 0 },
  centavo5: { id: 'moeda-c5', valor: 0.05, quantidade: 0 },
  centavo25: { id: 'moeda-c25', valor: 0.25, quantidade: 0 },
  centavo50: { id: 'moeda-c50', valor: 0.50, quantidade: 0 },
  real1: { id: 'moeda-r1', valor: 1.00, quantidade: 0 }
};

botoesControle.forEach(botao => {
  botao.addEventListener('click', () => {
    const chaveMoeda = botao.dataset.moeda;
    const acao = botao.dataset.acao;

    if (acao === 'mais') {
      moedas[chaveMoeda].quantidade += 1;
    } else if (acao === 'menos') {
      moedas[chaveMoeda].quantidade -= 1;

      if (moedas[chaveMoeda].quantidade < 0) {
        moedas[chaveMoeda].quantidade = 0;
      }
    }

    document.getElementById(`qtd-${chaveMoeda}`).textContent = moedas[chaveMoeda].quantidade;
    
    atualizarValores();
  });
});

inputCompra.addEventListener('input', atualizarValores);

function atualizarValores() {
  const total = Object.values(moedas).reduce((acc, moeda) => {
    return acc + (moeda.valor * moeda.quantidade);
  }, 0);

  const valorCompra = Number(inputCompra.value) || 0;
  const troco = total - valorCompra;

  const formatador = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });

  txtValorRecebido.textContent = formatador.format(total);
  txtValorTroco.textContent = formatador.format(troco > 0 ? troco : 0);
}
