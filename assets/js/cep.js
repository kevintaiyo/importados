// CEP PARA TESTES
// CEP Sul - 83705240
// CEP Nordeste - 44082400
// CEP Sudeste - 24855272
// CEP Centro-Oeste - 70650171
// CEP Norte - 67013218

var desconto;

function pesquisa() {
    const cep = document.getElementById('cep').value

    fetch(`https://viacep.com.br/ws/${cep}/json/`).then(resposta => {
        return resposta.json();
    }).then(dados => {
        console.log(dados);

        var estado = dados.uf;

        //Verificando a região do cep e aplicando um desconto
        switch (estado) {

            //SUDESTE*************************
            case 'SP':
            case 'MG':
            case 'ES':
            case 'RJ':
                if (dados.localidade == 'Mogi das Cruzes') {
                    console.log('mogi')
                    desconto = 1;
                    break;
                } else {
                    console.log("Região: SUDESTE - 30% de desconto");
                    desconto = 0.3;
                    break;
                }


            //CENTRO-OESTE********************
            case 'MS':
            case 'MT':
            case 'GO':
            case 'DF':
                console.log("Região: CENTRO-OESTE - 10% de desconto");
                desconto = 0.1;
                break;

            //SUL*****************************
            case 'PR':
            case 'SC':
            case 'RS':
                console.log("Região: SUL - 20% de desconto");
                desconto = 0.2;
                break;

            //NORTE***************************
            case 'AC':
            case 'AM':
            case 'RR':
            case 'RO':
            case 'AP':
            case 'PA':
            case 'TO':
                console.log("Região: NORTE - 3% de desconto");
                desconto = 0.03;
                break;

            //NORDESTE************************
            case 'MA':
            case 'PI':
            case 'BA':
            case 'CE':
            case 'PN':
            case 'PB':
            case 'PE':
            case 'AL':
            case 'SE':
                console.log("Região: NORDESTE - 7% de desconto");
                desconto = 0.07;
                break;
        }

        var precoReaisValor = resgataValorReal() //Recebe o valor que sera usado na funcao abaixo
        confirmaCompra(precoReaisValor)  //Confirmação da compra

    }).catch(function (erro) {
        console.log(erro);
        Swal.fire({
            icon: 'error',
            title: "CEP não reconhecido",
            text: 'Insira um cep existente!',
        })
        document.getElementById('cep').value = ''
    });
}


/*  Confirmação da compra 
    Mostra o valor integral do produto, o desconto e o preco com desconto 
    Biblioteca SweetAlert    
*/
function confirmaCompra(precoReaisValor) {
    console.log(precoReaisValor);
    Swal.fire({
        title: 'Confirmação de compra',
        text: `Pelo seu CEP vimos que você tem direito a ${(desconto * 100).toFixed(0)}% de desconto no frete de 1000 R$, sendo o preço de ${precoReaisValor}R$ para ${(parseFloat(precoReaisValor) + (parseFloat(1 - desconto) * 1000)).toFixed(2)}R$`,
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar Compra!'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Compra Confirmada',
                `Você acaba de realizar uma compra no valor de ${precoReaisValor}R$ para ${(precoReaisValor + (1 - desconto * 1000)).toFixed(2)}R$`,
            )
        }
    })
}

function resgataValorReal() {

    //Resgatando o preco em reais do produto pela URL
    const params = new URLSearchParams(window.location.search);
    const precoReaisValor = params.get('precoReais');
    return precoReaisValor
}