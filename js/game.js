//VARIAVEIS DE CONTROLE DO JOGO
let perguntasFeitas = [];

//PERGUNTAS DO JOGO
const perguntas = [
    //PERGUNTA 0
    {pergunta: "Qual dessas linguagens não é considerada uma linguagem de programação?",
     respostas: ['PHP', 'Javascript', 'C++', 'HTML'],
     correta: 'resp3'
    },
    //PERGUNTA 1
    {pergunta: "Em que ano o Brasil foi descoberto?",
     respostas: ['1498', '1500', '1375', '1829'],
     correta: 'resp1'
    },
    //PERGUNTA 2
    {pergunta: "Qual Mar o povo Hebreu atravessou para fugir do exército egípcio?",
     respostas: ['Mar Vermelho', ' Mar Glacial', 'Mar das índias', 'Mar Austral'],
     correta: 'resp0'
    },
    //PERGUNTA 3
    {pergunta: "Rexona...",
     respostas: ['Te abandona', 'não te abandona', 'Desodorante', 'me abandonou...'],
     correta: 'resp1'
    },
]

var qtdPerguntas = perguntas.length - 1;
// console.log(perguntas[1].pergunta)
GerarPergunta(qtdPerguntas);

function GerarPergunta(maxPerguntas){
    //GERAR NÚMERO ALEAÓRIO
    let aleatorio = (Math.random() * maxPerguntas).toFixed();
    //CONVERTER PARA NUMERO
    aleatorio = Number(aleatorio);
    console.log('a pergunta foi a ' + aleatorio)
    //VERIFICAR SE A PERGUNTA SORTEADA JÁ FOI FEITA
    if(!perguntasFeitas.includes(aleatorio)){
        //COLOCAR COMO PERGUNTA FEITA
        perguntasFeitas.push(aleatorio);

        //PREENCHER O HTML COM OS DADOS DA QUESTÃO SORTEADA
        var p_selecionada = perguntas[aleatorio].pergunta;
        console.log(p_selecionada)
        //ALIMENTAR A PERGUNTA VINDA DO SORTEIO
        $('#pergunta').html(p_selecionada);
        $('#pergunta').attr('data-indice', aleatorio);

        //COLOCAR AS RESPOSTAS
        for (var i=0; i<4;i++){
            $('#resp'+i).html(perguntas[aleatorio].respostas[i]);
        }
        //EMBARALHAR AS RESPOSTAS
        var pai = $('#respostas');
        var botoes = pai.children()

        for(var i = 1; i < botoes.length;i++){
            pai.append(botoes.eq(Math.floor(Math.random() * botoes.length)));
        }
    }else{
        //SE A PERGUNTA JÁ FOI FEITA
        console.log('a pergunta foi feita, procurado outra kkk');
        if(perguntasFeitas.length < qtdPerguntas + 1){
            return GerarPergunta(maxPerguntas);
        }else{
            console.log('acabaram as perguntas!')
            $('#quiz').addClass('hidden');
            $('#mensagem').html('Parabéns,Você concluiu todas as perguntas!')
            $('#status').removeClass('hidden');
        }
    }
}$('.resposta').click(function(){
    if($('#quiz').attr('data-status') !== 'travado'){
        //PECORRER TODAS AS RESPOSTAS E DESMARCAR A CLASSE SELECIONADA
        resetaBotoes();
        //ADICIONAR A CLASSE SELECIONADA
        $(this).addClass('selecionada');
    }
});

$('#confirm').click(function(){
    //PEGAR O INDICE DA PERGUNTA
    var indice = $('#pergunta').attr('data-indice');

    //QUAL É A RESPOSTA CERTA
    var respCerta = perguntas[indice].correta;

    //QUAL FOI A RESPOSTA QUE O USUÁRIO SELECIONOU
    $('.resposta').each(function(){
        if($(this).hasClass('selecionada')){
            var respostaEscolhida = $(this).attr('id');
        if(respCerta == respostaEscolhida){
            console.log('Acertou miseravee')
            proximaPergunta();
        }else{
            $('#quiz').attr('data-status', 'travado');
            $('#confirm').addClass('hidden');
            $('#'+respCerta).addClass('correta');
            $('#'+ respostaEscolhida).removeClass('selecionada');
            $('#'+ respostaEscolhida).addClass('errada');
            setTimeout(function(){
                gameover();
            }, 4000);
        }
        }
    });
});
function newGame(){
    $('#quiz').attr('data-status', 'ok');
    $('#confirm').removeClass('hidden');
    perguntasFeitas = [];
    resetaBotoes();
    GerarPergunta(qtdPerguntas);
}
function proximaPergunta(){
    resetaBotoes();
    GerarPergunta(qtdPerguntas);
};
function resetaBotoes(){
    $('.resposta').each(function(){
        if($(this).hasClass('selecionada')){
            $(this).removeClass('selecionada');
        }
        if($(this).hasClass('correta')){
            $(this).removeClass('correta');
        }
        if($(this).hasClass('errada')){
            $(this).removeClass('errada')
        }
    });
}
function gameover(){
    $('#quiz').addClass('hidden');
    $("#mensagem").css('color', 'red');
    $('#mensagem').html('Você errou, Fim de jogo!')
    $('#status').removeClass('hidden');

}
$('#novojogo').click(function(){
    newGame();
    $('#quiz').removeClass('hidden');
    $('#status').addClass('hidden');
})