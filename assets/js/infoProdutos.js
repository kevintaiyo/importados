if (window.location.pathname === '/index.html') {
    window.onload = function () {
        fetch("assets/json/produtos.json").then(response => response.json())
            .then(data => {
                //SETANDO IMAGENS
                document.getElementById('card1-img').src = data.produtos[0].img;
                document.getElementById('card2-img').src = data.produtos[1].img;
                document.getElementById('card3-img').src = data.produtos[2].img;

                //SETANDO TITULOS
                document.getElementById('card1-titulo').innerHTML = data.produtos[0].nome;
                document.getElementById('card2-titulo').innerHTML = data.produtos[1].nome;
                document.getElementById('card3-titulo').innerHTML = data.produtos[2].nome;

                //SETANDO DESCRICOES
                document.getElementById('card1-descricao').innerHTML = data.produtos[0].descricao;
                document.getElementById('card2-descricao').innerHTML = data.produtos[1].descricao;
                document.getElementById('card3-descricao').innerHTML = data.produtos[2].descricao;
            })
    }
}

//Recebe o "id" do botão do card pressionado e coloca na url 
function renderiza(produto) {
    window.location.href = 'compraLoja.html?produto=' + produto
}

if (window.location.pathname === '/compraLoja.html') {

    //Pega o numero do produto escolhido pelo usuario que fica na url
    const params = new URLSearchParams(window.location.search);
    const produto = params.get('produto');

    window.onload = function () {
        fetch("assets/json/produtos.json").then(response => response.json())
            .then(data => {

                //SETANDO AS INFORMAÇÔES ESTÁTICAS DO PRODUTO
                document.getElementById('img').src = data.produtos[produto].img;
                document.getElementById('nome').innerHTML = data.produtos[produto].nome;
                document.getElementById('descricao').innerHTML = data.produtos[produto].descricao;
                document.getElementById('precoDolar').innerHTML = data.produtos[produto].precoDolar + " USD";

                //SETANDO AS INFORMAÇÔES DE PREÇO REAIS - API
                fetch(`https://economia.awesomeapi.com.br/json/last/USD-BRL`).then(resposta => {
                    return resposta.json();
                }).then(economia => {
                    var dolar = economia.USDBRL.bid;
                    const precoReais = (data.produtos[produto].precoDolar * dolar).toFixed(2);
                    document.getElementById('precoReal').innerHTML = precoReais + " BRL"

                    //Chamando a função que vai incrementar o preco em reais na url
                    precoUrl(precoReais);

                })

            })

    }
}

function precoUrl(preco) {
    //Incrementando o preco fornecido na URL
    const url = new URL(window.location.href);
    url.searchParams.set('precoReais', preco);
    history.pushState(null, null, url);
}
