/* MENU RESPONSIVO */

const botaoMenu = document.querySelector("#botao-menu");
const navegacao = document.querySelector("#menu-principal");
const linksMenu = navegacao.querySelectorAll("a");

// Centraliza a abertura e o fechamento do menu
function definirEstadoMenu(aberto) {
    navegacao.classList.toggle("aberta", aberto);

    botaoMenu.setAttribute("aria-expanded", String(aberto));
    botaoMenu.setAttribute(
        "aria-label",
        aberto ? "Fechar menu" : "Abrir menu"
    );

    botaoMenu.textContent = aberto ? "✕" : "☰";
}

// Abre ou fecha ao clicar no botão
botaoMenu.addEventListener("click", () => {
    const aberto = navegacao.classList.contains("aberta");
    definirEstadoMenu(!aberto);
});

// Fecha quando um link é selecionado
linksMenu.forEach((link) => {
    link.addEventListener("click", () => {
        definirEstadoMenu(false);
    });
});

// Fecha ao pressionar Esc
document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" &&
        navegacao.classList.contains("aberta")) {

        definirEstadoMenu(false);
        botaoMenu.focus();
    }
});

// Fecha se a janela voltar ao tamanho de computador
window.addEventListener("resize", () => {
    if (window.innerWidth > 768 &&
        navegacao.classList.contains("aberta")) {

        definirEstadoMenu(false);
    }
});

// ANIMAÇÕES DURANTE A ROLAGEM

// Ativa os estilos de animação somente com JavaScript
document.documentElement.classList.add("js");

// Seleciona todos os elementos que devem aparecer
const elementos = document.querySelectorAll(".revelar");

// Observa quando um elemento entra na tela
if ("IntersectionObserver" in window) {

    const observador = new IntersectionObserver((entradas) => {

        entradas.forEach((entrada) => {

            if (entrada.isIntersecting) {

                entrada.target.classList.add("visivel");

                // Para de observar após a animação
                observador.unobserve(entrada.target);
            }

        });

    }, {
        threshold: 0.1
    });

    elementos.forEach((elemento) => {
        observador.observe(elemento);
    });

} else {

    // Alternativa para navegadores sem suporte
    elementos.forEach((elemento) => {
        elemento.classList.add("visivel");
    });

}


// DESTACAR A SEÇÃO ATIVA NO MENU

const secoesPagina = document.querySelectorAll("main section[id]");
const linksNavegacao = document.querySelectorAll(".navegacao a");
const cabecalho = document.querySelector(".cabecalho");

function atualizarSecaoAtiva() {

    const limite = cabecalho.offsetHeight + 80;
    let secaoAtual = secoesPagina[0]?.id;

    // Descobre qual seção chegou ao topo da área de leitura
    secoesPagina.forEach((secao) => {

        if (secao.getBoundingClientRect().top <= limite) {
            secaoAtual = secao.id;
        }

    });

    // Destaca o link correspondente
    linksNavegacao.forEach((link) => {

        const ativo = link.getAttribute("href") === `#${secaoAtual}`;

        link.classList.toggle("ativo", ativo);

        if (ativo) {
            link.setAttribute("aria-current", "location");
        } else {
            link.removeAttribute("aria-current");
        }

    });
}

// Atualiza durante a navegação
window.addEventListener("scroll", atualizarSecaoAtiva, {
    passive: true
});

// Atualiza se a janela mudar de tamanho
window.addEventListener("resize", atualizarSecaoAtiva);

// Define a seção ativa ao abrir a página
atualizarSecaoAtiva();
