// No javaScript divida o qeu você tam que fazer em micro ações.

const button = document.querySelector(".button-add-task");
const input = document.querySelector(".input-text-task");
const completList = document.querySelector(".list-task");

// Criei um array.
let myListTask = [];

function addNewTask() {

    if (input.value == '') {
        alert('NÃO HÁ ITENS NA LISTA')
    } else {
        // O push adiciona algo a um array.
        myListTask.push({
            tarefa: input.value,
            concluida: false
        });

        input.value = '';

        seeTask()
    }
}

function seeTask() {
    let newLi = ''

    // O forEach navega por cada item do arrei, lendo um de cada vez, usando como parametro.
    myListTask.forEach((parametro, posicao) => {
        newLi = newLi + `

        <li class="task ${parametro.concluida && "done"}">
        <img src="./img/checked.png" alt="C" onclick="concluirTask(${posicao})">
        <p>${parametro.tarefa}</p>
        <img src="./img/trash.png" alt="X" onclick="deleteTask(${posicao})">
        </li>
        
        `
    })

    // O innerHTML permite adicioner o que quisermos no HTML.
    completList.innerHTML = newLi;


    localStorage.setItem('lista', JSON.stringify(myListTask))



}

function concluirTask(posicao) {
    myListTask[posicao].concluida = !myListTask[posicao].concluida;

    seeTask()
}

function deleteTask(posicao) {
    // O splice permite que sera deletado qualquer item do array, passando somente duas condições, qual possição do item, e quantos apartir dele.
    myListTask.splice(posicao, 1)

    // Temos que chamar novamente o seeTask para mostrar que foi apagado.
    seeTask()
}

function getTask() {
    const taskLocalStorage = localStorage.getItem('lista');

    if (taskLocalStorage) {
        myListTask = JSON.parse(taskLocalStorage);
    }

    seeTask()
}

getTask()

// O addEventListener vai ficar de olho no botão para saber se acontece alguma ação.
button.addEventListener('click', addNewTask)

