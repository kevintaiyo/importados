
const precoProdutoBRL = 300;

fetch(`https://economia.awesomeapi.com.br/json/last/USD-BRL`).then(resposta => {
    return resposta.json();
}).then(economia => {
    var dolar = economia.USDBRL.bid;
    const precoProdutoUSD = precoProdutoBRL * dolar;

    console.log(`Valor do Dolar Hoje: ${dolar}`);
    console.log(`Valor do produto em BRL: ${precoProdutoBRL} e em USD: ${precoProdutoUSD.toFixed(2)}`);
})