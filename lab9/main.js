document.addEventListener("DOMContentLoaded", () => {
    carregarProdutos();
});

let custoTotal = 0; // Inicializa o custo total

function carregarProdutos() {
    produtos.forEach(produto => {
        const article = document.createElement("article");
        const h3 = document.createElement("h3");
        const img = document.createElement("img");
        const pPreco = document.createElement("p");
        const divDescricao = document.createElement("div");
        const form = document.createElement("form");
        const input = document.createElement("input");
        input.classList.add("inputProduto");
        input.type = "submit";
        input.value = "+ Adicionar ao Cesto";
        const inputHidden = document.createElement("input");
        inputHidden.classList.add("inputHiddenProduto");
        inputHidden.type = "hidden";
        inputHidden.value = produto.id;

        article.classList.add("articleProduto");
        h3.classList.add("h3Produto");
        img.classList.add("imgProduto");
        pPreco.classList.add("pPreco");
        divDescricao.classList.add("divDescricao");
        form.classList.add("formProduto");

        h3.textContent = produto.title;
        img.src = produto.image;
        pPreco.textContent = "Custo Total: " + produto.price + " €";
        divDescricao.textContent = produto.description;

        form.appendChild(input);
        form.appendChild(inputHidden);

        article.appendChild(h3);
        article.appendChild(img);
        article.appendChild(pPreco);
        article.appendChild(divDescricao);
        article.appendChild(form);

        const allProdutos = document.getElementById('allProdutos');
        allProdutos.appendChild(article);

        form.addEventListener("submit", (e) => {
            e.preventDefault(); 
            addProdutosCarrinho(produto);
        });
    });
}

function addProdutosCarrinho(produto) {
    const produtosAdded = document.getElementById("produtosAdded");

    const produtoDiv = document.createElement("div");
    produtoDiv.classList.add("produtoCesto");

    const h3 = document.createElement("h3");
    h3.textContent = produto.title;
    produtoDiv.appendChild(h3);

    const img = document.createElement("img");
    img.src = produto.image;
    img.alt = produto.title;
    img.style.width = "100px";
    produtoDiv.appendChild(img);

    const pPreco = document.createElement("p");
    pPreco.textContent = `Custo total: ${produto.price} €`;
    produtoDiv.appendChild(pPreco);

    //BOATAO REMOVE
    const removeButton = document.createElement("button");
    removeButton.textContent = "- Remover do Cesto";
    removeButton.classList.add("removeButton");
    removeButton.addEventListener("click", () => {
        
        produtosAdded.removeChild(produtoDiv);
        custoTotal -= produto.price;
        console.log(custoTotal);
        if(custoTotal==0){
            document.getElementById("custo").textContent = "";//tinha bug "-0.00"
        }
        
        document.getElementById("custo").textContent = custoTotal.toFixed(2);
    });
    produtoDiv.appendChild(removeButton);
    produtosAdded.appendChild(produtoDiv);
    custoTotal += produto.price;
    document.getElementById("custo").textContent = custoTotal.toFixed(2);
}