// CEP Sul - 83705240
// CEP Nordeste - 44082400
// CEP Sudeste - 24855272
// CEP Centro-Oeste - 70650171
// CEP Norte - 67013218

function pesquisa() {
    const cep = document.getElementById('cep').value
    
    

    fetch(`https://viacep.com.br/ws/${cep}/json/`).then(resposta => {
        return resposta.json();
    }).then(dados => {
        var estado = dados.uf;
        console.log(dados);
        var desconto;

        switch (estado) {

            //SUDESTE*************************
            case 'SP':
            case 'MG':
            case 'ES':
            case 'RJ':
                console.log("Região: SUDESTE - 30% de desconto");
                desconto = 0.3;

            //CENTRO-OESTE********************
            case 'MS':
            case 'MT':
            case 'GO':
            case 'DF':
                console.log("Região: CENTRO-OESTE - 10% de desconto");
                return desconto = 0.1;

            //SUL*****************************
            case 'PR':
            case 'SC':
            case 'RS':
                console.log("Região: SUL - 20% de desconto");
                return desconto = 0.2;

            //NORTE***************************
            case 'AC':
            case 'AM':
            case 'RR':
            case 'RO':
            case 'AP':
            case 'PA':
            case 'TO':
                console.log("Região: NORTE - 3% de desconto");
                return desconto = 0.03;

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

            default:
                console.log("CEP inválido");
        }

        console.log(desconto);
    })

    
}

Swal.fire({
    title: 'Confirmação de compra',
    text: `Pelo seu CEP vimos que você tem direito a ${desconto}% de desconto, sendo o preco atual de ${document.getElementById('precoReal').value*desconto}`,
    icon: 'info',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    }
  })