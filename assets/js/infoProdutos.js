//IMPRIME AS INFORMAÇÕES DOS CARDS DOS PRODUTOS NO INDEX.HTML
//ESSAS INFORMAÇÕES ESTÃO SALVAS NO ARQUIVO PRODUTOS.JSON
if (window.location.pathname === '/index.html') {
    window.onload = function () {
        fetch("assets/json/produtos.json").then(response => response.json())
            .then(data => {

                quantidadeDeProdutos = data.produtos.length

                //SETANDO IMAGENS, TITULOS E DESCRIÇÕES
                for (x = 0; x < quantidadeDeProdutos; x++) {
                    document.getElementById(`card${x+1}-img`).src = data.produtos[x].img;
                    document.getElementById(`card${x+1}-titulo`).innerHTML = data.produtos[x].nome;
                    document.getElementById(`card${x+1}-descricao`).innerHTML = data.produtos[x].descricao;
                    document.getElementById(`card${x+1}-dolarValor`).innerHTML = data.produtos[x].precoDolar + " USD";
                }
            }
        )
    }
}

//Recebe o "id" do botão do card pressionado e coloca na url que se é redirecionado
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

                //SETANDO PREÇO DO PRODUTO EM REAIS - API
                fetch(`https://economia.awesomeapi.com.br/json/last/USD-BRL`).then(resposta => {
                    return resposta.json();
                }).then(economia => {
                    var dolar = economia.USDBRL.bid;
                    const precoReais = (data.produtos[produto].precoDolar * dolar).toFixed(2);
                    document.getElementById('precoReal').innerHTML = precoReais + " BRL"

                    //Chamando a função que vai incrementar o preco em reais na url
                    precoUrl(precoReais);

                })
            }
        )
    }
}

function precoUrl(preco) {
    //Incrementando o preco fornecido na URL
    const url = new URL(window.location.href);
    url.searchParams.set('precoReais', preco);

    //Serve para a pagina parar de ficar resetando infinitamente
    history.pushState(null, null, url); 
}