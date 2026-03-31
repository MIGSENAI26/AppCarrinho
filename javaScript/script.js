const nomeUsuarioInput = document.getElementById("input-usuario");
const senhaUsuarioInput = document.getElementById("input-senha");
const botaoEntrar = document.getElementById("botaoEntrar");
const botaoSair = document.getElementById("botaoSair");
const nomeH2 = document.getElementById("nome-usuario");

const lista = document.querySelector("[data-list]");
const inputProduto = document.getElementById("produto");
const inputPreco = document.getElementById("preco");
const botaoAdicionar = document.getElementById("adicionar");

let produtos = JSON.parse(localStorage.getItem("produtos")) || [];


const atualizarLogin = () => {
    const nomeUsuario = localStorage.getItem("usuario");
    if (nomeUsuario) {
        nomeH2.innerHTML = `Olá, ${nomeUsuario}!`;
    } else {
        nomeH2.innerHTML = "";
    }
};

const renderizarProdutos = () => {
    lista.innerHTML = "";

    produtos.forEach((produto, index) => {
        const li = document.createElement("li");
        li.classList.add("task");
        li.innerHTML = `
            ${produto.nome} - R$ ${produto.valor}
            <button onclick="removerProduto(${index})" style="margin-left: 0px; color: white;">X</button>
        `;
        lista.appendChild(li);
    });
};


const salvarNoStorage = () => {
    localStorage.setItem("produtos", JSON.stringify(produtos));
};

const removerProduto = (index) => {
    produtos.splice(index, 1);
    salvarNoStorage();
    renderizarProdutos();
};

botaoEntrar.addEventListener("click", () => {
    const nomeUsuario = nomeUsuarioInput.value.trim();
    const senhaUsuario = senhaUsuarioInput.value.trim();

    if (nomeUsuario && senhaUsuario) {
        localStorage.setItem("usuario", nomeUsuario);
        nomeUsuarioInput.value = "";
        senhaUsuarioInput.value = "";
        atualizarLogin();
    } else {
        alert("Preencha usuário e senha!");
    }
});

botaoSair.addEventListener("click", () => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("produtos"); 
    produtos = [];
    atualizarLogin();
    renderizarProdutos();
});

botaoAdicionar.addEventListener("click", () => {
    const nome = inputProduto.value.trim();
    const valor = inputPreco.value.trim();

    if (!localStorage.getItem("usuario")) {
        alert("Faça login para adicionar produtos!");
        return;
    }

    if (nome && valor) {
        produtos.push({ nome, valor });
        salvarNoStorage();
        renderizarProdutos();
        
        inputProduto.value = "";
        inputPreco.value = "";
        inputProduto.focus();
    } else {
        alert("Preencha o nome e o preço do produto!");
    }
});

window.addEventListener("storage", (evento) => {
    if (evento.key === "usuario") {
        if (!evento.newValue) {
            produtos = []; 
            alternarTelas(); 
            renderizarProdutos();
        } else {
            atualizarLogin();
            alternarTelas();
        }
    }

    if (evento.key === "produtos") {
        produtos = JSON.parse(evento.newValue) || [];
        renderizarProdutos();
    }
});

atualizarLogin();
renderizarProdutos();