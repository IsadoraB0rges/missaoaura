const perfis = [
    {
        id: 1,
        nome: "Engenheiro de Sistemas",
        categoria: "Construção",
        descricao: "Transforma problemas em soluções e domina a tecnologia.",
        imagem: "imagem/engeneheiro.jpg",
        recomendacao: "Você será responsável por construir e reparar os equipamentos da missão."
    },
    {
        id: 2,
        nome: "Cientista Explorador",
        categoria: "Investigação",
        descricao: "Gosta de pesquisar, analisar evidências e fazer descobertas.",
        imagem: "imagem/estrategia.jpg",
        recomendacao: "Você investigará amostras, estudará o planeta e buscará novas informações."
    },
    {
        id: 3,
        nome: "Explorador de Campo",
        categoria: "Exploração",
        descricao: "É curioso, gosta de aventuras e enfrenta situações desconhecidas.",
        imagem: "imagem/estrategiamissao.jpg",
        recomendacao: "Você explorará o terreno e ajudará a encontrar caminhos seguros."
    },
    {
        id: 4,
        nome: "Estrategista da Missão",
        categoria: "Planejamento",
        descricao: "Organiza informações, coordena pessoas e toma decisões.",
        imagem: "imagem/exploradordecampo.jpg",
        recomendacao: "Você coordenará a equipe e ajudará a definir as próximas etapas."
    }
];

const formulario = document.getElementById("teste");

const campoNascimento = document.getElementById("nascimento");

const hoje = new Date();
hoje.setMinutes(hoje.getMinutes() - hoje.getTimezoneOffset());

campoNascimento.max = hoje.toISOString().split("T")[0];

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const nascimento = document.getElementById("nascimento").value;

    if (nome === "" || nascimento === "") {
        alert("Preencha seu nome e sua data de nascimento.");
        return;
    }

    const dataNascimento = new Date(nascimento + "T00:00:00");
    const hoje = new Date();

    if (isNaN(dataNascimento.getTime()) || dataNascimento > hoje) {
        alert("Informe uma data de nascimento válida, que não seja futura.");
        return;
    }

    let idade = hoje.getFullYear() - dataNascimento.getFullYear();

    if (
        hoje.getMonth() < dataNascimento.getMonth() ||
        (hoje.getMonth() === dataNascimento.getMonth() &&
        hoje.getDate() < dataNascimento.getDate())
    ) {
        idade--;
    }

    const pontuacao = [0, 0, 0, 0];

    for (let i = 1; i <= 4; i++) {
        const resposta = document.querySelector(
            'input[name="p' + i + '"]:checked'
        );

        if (resposta === null) {
            alert("Responda todas as perguntas.");
            return;
        }

        pontuacao[Number(resposta.value) - 1]++;
    }

    const maiorPontuacao = Math.max(...pontuacao);

    const vencedores = [];

    for (let i = 0; i < pontuacao.length; i++) {
        if (pontuacao[i] === maiorPontuacao) {
            vencedores.push(perfis[i]);
        }
    }

    if (vencedores.length > 1) {
        alert("Você teve um empate entre perfis! Responda novamente para descobrir seu perfil predominante.");
        return;
    }

    const perfil = perfis.find(function(item) {
        return item.id === vencedores[0].id;
    });

    document.getElementById("mensagem").textContent =
        nome + ", sua idade é " + idade + " anos.";

    document.getElementById("nomePerfil").textContent = perfil.nome;
    document.getElementById("categoriaPerfil").textContent =
        "Categoria: " + perfil.categoria;
    document.getElementById("descricaoPerfil").textContent = perfil.descricao;
    document.getElementById("recomendacao").textContent =
        "Recomendação para a missão: " + perfil.recomendacao;

    document.getElementById("imagemPerfil").src = perfil.imagem;
    document.getElementById("imagemPerfil").alt = perfil.nome;

    document.getElementById("formulario").hidden = true;
    document.getElementById("resultado").hidden = false;
});

document.getElementById("refazer").addEventListener("click", function() {
    formulario.reset();

    document.getElementById("resultado").hidden = true;
    document.getElementById("formulario").hidden = false;
});