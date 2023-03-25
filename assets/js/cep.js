// CEP PARA TESTES
// CEP Sul - 83705240
// CEP Nordeste - 44082400
// CEP Sudeste - 24855272
// CEP Centro-Oeste - 70650171
// CEP Norte - 67013218

//Resgatando o preco em reais do produto pela URL
const params = new URLSearchParams(window.location.search);
const precoReaisValor = params.get('precoReais');

function pesquisa() {
    const cep = document.getElementById('cep').value

    fetch(`https://viacep.com.br/ws/${cep}/json/`).then(resposta => {
        return resposta.json();
    }).then(dados => {
        var estado = dados.uf;
        console.log(dados);
        var desconto;

        //Verificando a região do cep e aplicando um desconto
        switch (estado) {

            //SUDESTE*************************
            case 'SP':
            case 'MG':
            case 'ES':
            case 'RJ':
                console.log("Região: SUDESTE - 30% de desconto");
                desconto = 0.3;
                break;

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
                return desconto = 0.07;
        }

        //Confirmação da compra - Mostra o valor integral do produto, o desconto e o preco com desconto - Biblioteca SweetAlert
        Swal.fire({
            title: 'Confirmação de compra',
            text: `Pelo seu CEP vimos que você tem direito a ${desconto * 100}% de desconto, sendo o preco de ${precoReaisValor} para ${(precoReaisValor * (1 -desconto)).toFixed(2)}`,
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar Compra!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Compra Confirmada',
                    `Você acaba de adquirir o produto ${document.getElementById('nome').value} no valor de  ${(precoReaisValor * (1 - desconto)).toFixed(2)}`,
                )
            }
        })

    }).catch(function (erro) { 
        //
        Swal.fire({
            icon: 'error',
            title: "CEP não reconhecido",
            text: 'Insira um cep existente!',
        })
        document.getElementById('cep').value = ''
    });
}
