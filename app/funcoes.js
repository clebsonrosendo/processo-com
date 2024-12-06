// Funções complementares do Materiallize iniciadas com o carregamento da página
$(document).ready(function () {
  // PÁGINA INICIAL
  // Menu lateral, com propriedade 'edge' para posicionar na lateral direita.
  $('.sidenav').sidenav({
    edge: 'right'
  });

   // PÁGINA DE INSCRIÇÃO
   // Carregando a classe dos modal
  $('.modal').modal()
  // Carregando modal com os Termos do Processo
  $( "#conteudo-modal-termos" ).load("termos-processo.html")
  // Carregando checked se aceitar os termos
  $('#termoceito').click(function(){
  $('#checktermo').attr('checked', 'checked')})
  // Retirando o checked se os termos não forem aceitos
  $('#termonaoceito').click(function(){
  $('#checktermo').removeAttr('checked')})
  // Formatando nome da inscrição corretamente. Retirando caracteres especiais e deixando em maiúsculo.
  $('#inscricaonome').focusout(function() {

    let strnome = document.getElementById('inscricaonome')
    let df = strnome.value
    strnome.value = df.normalize("NFD").replace(/[^\w\s]/gi, '').toUpperCase()
  })
  // Contando caracteres do CPF na página inscrição
  $('input#inscricaocpf').characterCounter();
  // Validando CPF e exibindo mensagem
  $('#inscricaocpf').focusout(function () {

    let strCPF = document.getElementById('inscricaocpf').value
    let Soma
    let Resto
    Soma = 0
    if (strCPF != '') {
    if (strCPF == "00000000000") return cpfvalidado(2)

    for (i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i)
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0
    if (Resto != parseInt(strCPF.substring(9, 10))) return cpfvalidado(2)

    Soma = 0
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i)
    Resto = (Soma * 10) % 11

    if ((Resto == 10) || (Resto == 11)) Resto = 0
    if (Resto != parseInt(strCPF.substring(10, 11))) return cpfvalidado(2)
    return cpfvalidado(1)
    } else {
      cpfvalidado(3)
    }
  })
  // Contando caracteres do Telefone na página inscrição
  $('input#celinscricao').characterCounter()
  // Iniciando o select de vagas na página de inscrição
  $('select').formSelect()
  // Exibindo botão depois que todos os campos forem preenchidos
   $('#btnSend').click(
    function() {
    $('#conteudo-modal-confirmacao').load('confirmacaoInscricao.html')
    
})

})


 // Data de início e termino das inscrições de forma dinâmica
function datamensal() {
  let dataMes = new Date().getMonth()
  let dataAno = new Date().getFullYear()
  let dataInicial = '01/'+dataMes+'/'+dataAno
  let dataFinal = '15/'+dataMes+'/'+dataAno
  document.getElementById('dataI').innerHTML = dataInicial
  document.getElementById('dataF').innerHTML = dataFinal
}

// Configurações visuais após verificação do CPF
function cpfvalidado(x) {
  let cpftextspan = document.getElementById('textocpfvalidado')
  if (x == 1) { 
    cpftextspan.classList.remove('red-text')
    cpftextspan.innerHTML = 'CPF Válido'
    cpftextspan.classList.add('green-text')
  } else if (x == 2) {
    cpftextspan.classList.remove('green-text')
    cpftextspan.innerHTML = 'CPF Inválido'
    cpftextspan.classList.add('red-text')
  } else if (x == 3) {
    cpftextspan.innerHTML = ''
  }
}

// Funcão para imrprimir fixa de inscrição
// $("#btnPrint").live("click", function () {
//     var divContents = $("#text").html();
//     var printWindow = window.open('', '', 'height=2480,width=3508');
//     printWindow.document.write('<html><head><title>Impressão</title>')
//     printWindow.document.write('</head><body>')
//     printWindow.document.write(divContents);
//     printWindow.document.write('</body></html>')
//     printWindow.document.close()
//     printWindow.print()
//   });