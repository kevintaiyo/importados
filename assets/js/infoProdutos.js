
fetch("assets/json/produtos.json").then(response => response.json())
    .then(data => {

        console.log(data);

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

function renderiza(produto) {

    fetch("assets/json/produtos.json").then(response => response.json())
        .then(data => {

            console.log(data);
            console.log(produto);

            //SETANDO AS INFORMAÇÔES
            document.getElementById('card-img').src = data.produtos[produto].img;
            document.getElementById('card-titulo').innerHTML = data.produtos[produto].nome;
            document.getElementById('card-descricao').innerHTML = data.produtos[produto].descricao;
        })
}