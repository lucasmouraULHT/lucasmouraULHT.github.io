
let counter = 0;
const heading = document.querySelector('h1');
function count() {
    counter++;
    heading.textContent = counter;
}

document.getElementById("button").addEventListener("click", function() {
    alert("Button clicked!");
    count();
});

// ---------------------------------------------------


let textoOriginal = "1. Passa por aqui!";
function mudarTexto() {
    document.getElementById("passarTexto").innerText = "Obrigado por passares!";
}

function reverterTexto() {
    document.getElementById("passarTexto").innerText = textoOriginal;
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("button").forEach((button) => {
        button.addEventListener("click", ()=>{
            document.getElementById("pintaTexto").style.color = button.dataset.color;
        });
    })
});
// function mudarCor(cor) {
//     document.getElementById("pintaTexto").style.color = cor;
// }


let cores = ["blue", "red", "yellow", "grey"];
let index = 0;

function mudarBackground() {
    document.getElementById("experimentaEscrever").style.backgroundColor = cores[index];
    index = (index + 1) % cores.length;
}

function mudarBorda() {
    document.getElementById("experimentaEscrever").style.borderColor = "darkblue";
}


// function mudarCorDeFundo(colorChosen) {
//     // let corEscolhida = document.getElementById("escolhaCor").value.toLowerCase();
//     document.body.style.backgroundColor = colorChosen;
// }
document.addEventListener("DOMContentLoaded", () => {
    document.querySelector('select').onchange = function() {
        document.querySelector('body').style.backgroundColor = this.value;
    }
});


let contador = 33;
function incrementarContador() {
    contador++;
    document.getElementById("contador").innerText = contador;
}

// ------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
    document.querySelector('form').onsubmit = (e) => {
        // do not reload the page
        e.preventDefault()
        document.getElementById("mudarTextoAqui").innerText = `Olá, ${nome = document.getElementById("escreveNome").value} tem ${idade = document.getElementById("escreveIdade").value} anos.`;
    };
});
const mudaTexto = () => {
    const nome = document.getElementById("escreveNome").value;
    const idade = document.getElementById("escreveIdade").value;
    document.getElementById("mudarTextoAqui").innerText = `Olá, ${nome} tem ${idade} anos.`;
};


// -------------------------------------------
if (!localStorage.getItem('counter')) {
    localStorage.setItem('counter', 0);
}
function count() {
    let counter = localStorage.getItem('counter');
    counter++;
    document.getElementById('automaticCounter').textContent= counter;
    localStorage.setItem('counter', counter);
}
setInterval(count, 1000);
document.getElementById('automaticCounter').textContent=localStorage.getItem('counter');


// const startAutomaticCounter = () => {
//     let counter = 0;
//     const updateCounter = () => {
//         counter++;
//         document.getElementById("automaticCounter").innerText = counter;
//     };
//     setInterval(updateCounter, 1000);
// };
// startAutomaticCounter();