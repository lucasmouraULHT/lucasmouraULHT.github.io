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

// 1. Mudar o texto ao passar o mouse
let textoOriginal = "1. Passa por aqui!";
function mudarTexto() {
    document.getElementById("passarTexto").innerText = "Obrigado por passares!";
}

function reverterTexto() {
    document.getElementById("passarTexto").innerText = textoOriginal;
}

// 2. Mudar a cor do texto ao clicar nos botões
function mudarCor(cor) {
    document.getElementById("pintaTexto").style.color = cor;
}

// 3. Mudar o background ao digitar e borda ao clicar
let cores = ["blue", "red", "yellow", "grey"];
let index = 0;

function mudarBackground() {
    document.getElementById("experimentaEscrever").style.backgroundColor = cores[index];
    index = (index + 1) % cores.length;
}

function mudarBorda() {
    document.getElementById("experimentaEscrever").style.borderColor = "darkblue";
}

// 4. Mudar o background da página com a cor digitada
function mudarCorDeFundo() {
    let corEscolhida = document.getElementById("escolhaCor").value.toLowerCase();
    document.body.style.backgroundColor = corEscolhida;
}

// 5. Incrementar o contador
let contador = 33;
function incrementarContador() {
    contador++;
    document.getElementById("contador").innerText = contador;
}