const API_URL = 'https://ctd-todo-api.herokuapp.com/v1';

function infoDosUser(){
    tokenDoUsuario = localStorage.getItem('token')
     pedirInformacoesDoUsuario(tokenDoUsuario)
 }
 
 infoDosUser()

 /**
 * Pedi os dados de cadastro do usuário.
 * @param {string} tokenDoUsuario Token JWT da autenticação do usuário.
 */
  function pedirInformacoesDoUsuario(tokenDoUsuario) {

    // Configurações da requisição GET.
    let configuracoes = {
        method: 'GET',
        headers: {
            'authorization': tokenDoUsuario
        },
    }

    // Requisição para retorno dos dados de cadastro do usuário.
    fetch(`${API_URL}/users/getMe/`, configuracoes)
        .then(function (respostaDoServidor) {
                
            // Retorno apenas dos dados convertidos em JSON.
            let JSON = respostaDoServidor.json();

            // Retorno da promessa convertida em JSON.
            return JSON;
        })
        .then(function (respostaDoServidorEmJSON) {

            
            localStorage.setItem('@User', respostaDoServidorEmJSON)

            
            // Apresentando resultado final no console.log().
            console.log(`GET pedirInformacoesDoUsuario() ${JSON.stringify(respostaDoServidorEmJSON)}`);
            pedirTodasTarefas();
        });

}


function pedirTodasTarefas() {

    let configuracoes = {
        method: 'GET',
        headers: {
            'authorization': localStorage.getItem('token')
        },
    }

    // URL(https://jsonplaceholder.typicode.com/posts)
    fetch(`${API_URL}/tasks`, configuracoes)
        .then(function (respostaDoServidor) {
            
            // Retorno apenas dos dados convertidos em JSON.
            var JSON = respostaDoServidor.json();

            // Retorno da promessa convertida em JSON.
            return JSON;
        })
        .then(function (respostaDoServidorEmJSON) {

            localStorage.setItem('tarefas', JSON.stringify(respostaDoServidorEmJSON))
            
            // Resultado da promessa convertida em JSON. 
            console.log('GET pedirTodasTarefas() \n', respostaDoServidorEmJSON)
            criarLista(respostaDoServidorEmJSON)
        });
}

function criarLista(listaDeTarefas) {
    let listaHTML = document.querySelector("#listaTarefas");

    listaHTML.innerHTML = ''

    listaDeTarefas.map(function (publicacao) {
        
        listaHTML.style = "color: white"

        listaHTML.innerHTML +=
            `<li>
                ${publicacao.description}
                ${' - '}
                ${publicacao.createdAt}
            </li>`
        
    });

}

function criarUmaTarefa(corpoDaTarefa) {

    var configuracoes = {
        method: 'POST',
        body: JSON.stringify(corpoDaTarefa),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'authorization': localStorage.getItem('token')
        },
    }


    // URL(https://jsonplaceholder.typicode.com/posts)
    fetch(`${API_URL}/tasks/`, configuracoes)
        .then(function (respostaDoServidor) {
                
            // Retorno apenas dos dados convertidos em JSON.
            var JSON = respostaDoServidor.json();
            // Nota: Você pode ter acesso ao corpo da informação sem convertê-la:
            // respostaDoServidor.body(); 

            // Retorno da promessa convertida em JSON.
            return JSON;
        })
        .then(function (respostaDoServidorEmJSON) {
            
            // Resultado da promessa convertida em JSON. 
            console.log('POST criarUmaTarefa() \n', respostaDoServidorEmJSON)
        });
}

function adcTarefa(){
    const corpoDaTarefa = {
        "id": 1,
        "description": document.getElementById('descTarefa').value,
        "completed": false,
        "userId": 1,
        "createdAt": Date.now
      }

      criarUmaTarefa(corpoDaTarefa)
      limparCampo()
      pedirTodasTarefas();
}

const limparCampo = ()=>{
    const campos = document.getElementById('descTarefa')
    campos.value = ""
}

document.getElementById('btnAdicionar')
    .addEventListener('click', adcTarefa)