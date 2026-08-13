function adicionarCarrinho(nome, preco) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    carrinho.push({
        nome: nome,
        preco: preco
    });

    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    alert(nome + " foi adicionado ao carrinho!");
}
// LOGIN
function fazerLogin() {
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    if (email === "" || senha === "") {
        alert("Preencha o e-mail e a senha!");
        return;
    }

    localStorage.setItem("usuarioLogado", email);

    alert("Login realizado com sucesso!");

    window.location.href = "index.html";
}


// CARRINHO


function mostrarCarrinho() {
    const listaCarrinho = document.getElementById("lista-carrinho");

    if (!listaCarrinho) {
        return;
    }

    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    listaCarrinho.innerHTML = "";

    let total = 0;

    carrinho.forEach((produto, index) => {
        total += produto.preco;

        listaCarrinho.innerHTML += `
            <div class="item-carrinho">
                <h3>${produto.nome}</h3>
                <p>Preço: R$ ${produto.preco.toFixed(2).replace(".", ",")}</p>
                <button onclick="removerProduto(${index})">Remover</button>
            </div>
        `;
    });

    const totalCarrinho = document.getElementById("total-carrinho");

    if (totalCarrinho) {
        totalCarrinho.textContent =
            "R$ " + total.toFixed(2).replace(".", ",");
    }

    if (carrinho.length === 0) {
        listaCarrinho.innerHTML = "<p>Seu carrinho está vazio.</p>";
    }
}

function removerProduto(index) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    carrinho.splice(index, 1);

    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    mostrarCarrinho();
}

function finalizarCompra() {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    window.location.href = "pagamento.html";
}

function mostrarFormaPagamento() {
    const pagamentoSelecionado = document.querySelector(
        'input[name="pagamento"]:checked'
    );

    const detalhes = document.getElementById("detalhes-pagamento");

    if (!pagamentoSelecionado || !detalhes) {
        return;
    }

    if (pagamentoSelecionado.value === "pix") {
        detalhes.innerHTML = `
            <div class="detalhes-pagamento">
                <h3>Pagamento via PIX</h3>

                <div class="qr-code">
                    QR CODE
                </div>

                <p>Escaneie o QR Code para realizar o pagamento.</p>
            </div>
        `;
    }

    if (pagamentoSelecionado.value === "cartao") {
        detalhes.innerHTML = `
            <div class="detalhes-pagamento">
                <h3>Dados do Cartão</h3>

                <input
                    type="text"
                    id="nome-cartao"
                    placeholder="Nome no cartão"
                >

                <input
                    type="text"
                    id="numero-cartao"
                    placeholder="Número do cartão"
                >

                <div class="linha-cartao">
                    <input
                        type="text"
                        id="validade-cartao"
                        placeholder="MM/AA"
                    >

                    <input
                        type="text"
                        id="cvv-cartao"
                        placeholder="CVV"
                    >
                </div>
            </div>
        `;
    }

    if (pagamentoSelecionado.value === "boleto") {
        detalhes.innerHTML = `
            <div class="detalhes-pagamento">
                <h3>Pagamento via Boleto</h3>

                <p>O boleto será gerado após confirmar a compra.</p>

                <p>
                    <strong>Vencimento:</strong>
                    3 dias úteis
                </p>
            </div>
        `;
    }
}

function confirmarPagamento() {
    const pagamentoSelecionado = document.querySelector(
        'input[name="pagamento"]:checked'
    );

    if (!pagamentoSelecionado) {
        alert("Escolha uma forma de pagamento!");
        return;
    }

    let formaPagamento = pagamentoSelecionado.value;

    if (formaPagamento === "pix") {
        alert("Pagamento via PIX selecionado!");
    }

    if (formaPagamento === "cartao") {
        alert("Pagamento via Cartão selecionado!");
    }

    if (formaPagamento === "boleto") {
        alert("Pagamento via Boleto selecionado!");
    }

    localStorage.removeItem("carrinho");

    alert("Compra finalizada com sucesso!");

    window.location.href = "index.html";
}

mostrarCarrinho();// ==============================
// CORRIGIR BOTÃO LOGIN DO MENU
// ==============================

document.addEventListener("DOMContentLoaded", function () {

    const links = document.querySelectorAll("a");

    links.forEach(function (link) {

        if (link.textContent.trim().toLowerCase() === "login") {
            link.href = "login.html";
        }

    });

});// ==============================
// MOSTRAR USUÁRIO LOGADO / SAIR
// ==============================

document.addEventListener("DOMContentLoaded", function () {
    const usuarioLogado = localStorage.getItem("usuarioLogado");

    const links = document.querySelectorAll("a");

    links.forEach(function (link) {
        if (link.textContent.trim().toLowerCase() === "login") {

            if (usuarioLogado) {
                link.textContent = "Sair";
                link.href = "#";

                link.addEventListener("click", function (event) {
                    event.preventDefault();

                    localStorage.removeItem("usuarioLogado");

                    alert("Você saiu da sua conta!");

                    window.location.href = "index.html";
                });
            } else {
                link.href = "login.html";
            }
        }
    });
});

    