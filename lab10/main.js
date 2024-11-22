fetch('https://deisishop.pythonanywhere.com/products/')
    .then(response => response.json())
    .then(data => {
        carregarProdutos(data);
        configurarPesquisa(data);
        configurarFiltroCategoria(data);
        configurarOrdenacaoPreco(data);
        atualizaCesto();
    });


let custoTotal = 0; 
let produtosExibidos = [];
function carregarProdutos(produtos) {
    produtosExibidos = produtos; 
    const allProdutos = document.getElementById('allProdutos');
    allProdutos.innerHTML = ""; // Limpa os produtos antes de carregar
    
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

        allProdutos.appendChild(article);

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            addProdutosCarrinho(produto);
        });
    });
}


function configurarOrdenacaoPreco() {
    const filtroPreco = document.getElementById("filtrarPreco");

    filtroPreco.addEventListener("change", () => {
        const opcaoSelecionada = filtroPreco.value;

        let produtosOrdenados = [...produtosExibidos]; //lista filtrada

        if (opcaoSelecionada === "Preco Crescente") {
            produtosOrdenados.sort((a, b) => a.price - b.price); //preço crescente
        } else if (opcaoSelecionada === "Preco Descrescente") {
            produtosOrdenados.sort((a, b) => b.price - a.price); //decrescente
        }

        carregarProdutos(produtosOrdenados); //recarrega os produtos 
    });
}



function configurarPesquisa(produtos) {
    const campoPesquisa = document.getElementById("pesquisarProduto");

    campoPesquisa.addEventListener("input", () => {
        const termo = campoPesquisa.value.toLowerCase();
        const produtosFiltrados = produtos.filter(produto =>
            produto.title.toLowerCase().includes(termo) ||
            produto.description.toLowerCase().includes(termo)
        );
        carregarProdutos(produtosFiltrados);
    });
}

function configurarFiltroCategoria(produtos) {
    const filtroCategoria = document.getElementById("filtrarCategoria");

    filtroCategoria.addEventListener("change", () => {
        const categoriaSelecionada = filtroCategoria.value.toLowerCase(); // Normaliza o valor do filtro

        const produtosFiltrados = categoriaSelecionada === "todas as categorias"
            ? produtos // Mostra todos os produtos
            : produtos.filter(produto => produto.category.toLowerCase() === categoriaSelecionada);

        carregarProdutos(produtosFiltrados);
    });
}



function configurarPesquisa(produtos) {
    const campoPesquisa = document.getElementById("pesquisarProduto");

    campoPesquisa.addEventListener("input", () => {
        const termo = campoPesquisa.value.toLowerCase();
        const produtosFiltrados = produtos.filter(produto =>
            produto.title.toLowerCase().includes(termo) ||
            produto.description.toLowerCase().includes(termo)
        );
        carregarProdutos(produtosFiltrados);
    });
}



function criaProdutoCesto(produto) {
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

    const removeButton = document.createElement("button");
    removeButton.textContent = "- Remover do Cesto";
    removeButton.classList.add("removeButton");

    // Event listener para remover o produto
    removeButton.addEventListener("click", () => {
        const produtosSelecionados = JSON.parse(localStorage.getItem('produtos-selecionados'));
        const index = produtosSelecionados.findIndex(p => p.id === produto.id);
        if (index !== -1) {
            produtosSelecionados.splice(index, 1);
            localStorage.setItem('produtos-selecionados', JSON.stringify(produtosSelecionados));
        }

        produtoDiv.remove();

        custoTotal -= produto.price;
        console.log(custoTotal);
        if (custoTotal == 0) {//apenas == -> se for === da bug
            document.getElementById("custo").textContent = "";//bug -0.00
        }
        document.getElementById("custo").textContent = custoTotal.toFixed(2);
        
    });

    produtoDiv.appendChild(removeButton);
    return produtoDiv;
}

function atualizaCesto() {
    const produtosAdded = document.getElementById("produtosAdded");
    produtosAdded.innerHTML = "";

    const produtosSelecionados = JSON.parse(localStorage.getItem('produtos-selecionados'));
    produtosSelecionados.forEach(produto => {
        const produtoDiv = criaProdutoCesto(produto);
        produtosAdded.appendChild(produtoDiv);
        custoTotal += produto.price;
    });

    document.getElementById("custo").textContent = custoTotal.toFixed(2);
}

function addProdutosCarrinho(produto) {
    const produtosAdded = document.getElementById("produtosAdded");

    const produtoDiv = criaProdutoCesto(produto);
    produtosAdded.appendChild(produtoDiv);


    const produtosSelecionados = JSON.parse(localStorage.getItem('produtos-selecionados'));
    produtosSelecionados.push(produto);
    localStorage.setItem('produtos-selecionados', JSON.stringify(produtosSelecionados));

    custoTotal += produto.price;
    document.getElementById("custo").textContent = custoTotal.toFixed(2);
}
