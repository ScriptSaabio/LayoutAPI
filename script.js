// Elementos HTML
const nameElement = document.getElementById("name");
const houseElement = document.getElementById("house");
const actorElement = document.getElementById("actor");
const speciesElement = document.getElementById("species");
const imgElement = document.querySelector("#img img");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

// Variáveis para controle de estado
let characters = [];
let currentIndex = 0;

// Mapeamento de casas para classes CSS
const casas = {
    Gryffindor: "Grifinoria",
    Slytherin: "Sonserina",
    Hufflepuff: "Lufa-Lufa",
    Ravenclaw: "Corvinal",
};

// Mapeamento de especie para classes CSS
const especies = {
    human: "Humano",
    ghost: "Fantasma",
    "house-elf": "Elf de Casa",
    "half-giant": "Meio-Gigante",
    werewolf: "Lobisomem",
    snake: "Serpente",
    cat: "Gato",
    owl: "Coruja",
    "half-human": "Meio-Humano",
    phoenix: "Fênix",
    dog: "Cachorro",
    toad: "Sapo",
    goblin: "Duende",
    "pygmy puff": "Puf-Pygmio",
    vampire: "Vampiro",
    acromantula: "Acromântula",
    centaur: "Centauro",
    hippogriff: "Hipogrifo",
    giant: "Gigante",
    selkie: "Selkie",
    cephalopod: "Cefalópode",
    dragon: "Dragão",
    "three-headed dog": "Cão de Três Cabeças",
    poltergeist: "Poltergeist",
    
};

const mensagensHP = {
    400: "O Ministério da Magia detectou um feitiço inválido na sua requisição. Revise seus encantamentos antes de tentar novamente.",
    
    404: "Nenhum bruxo foi encontrado nos registros de Hogwarts. Talvez ele esteja escondido sob a capa da invisibilidade... ou simplesmente não exista.",
    
    500: "O castelo de Hogwarts enfrentou uma falha mágica inesperada. Até mesmo os melhores bruxos às vezes perdem o controle.",
    
    504: "A coruja se perdeu no caminho e a mensagem não chegou a tempo. Tente novamente quando os ventos mágicos estiverem mais favoráveis."
};

// Função para buscar personagens da API
async function buscaPersonagem() {
    try {
        const response = await fetch(`https://hp-api.onrender.com/api/characters/`);

        // erro HTTP (ex: 500, 404)
        if (response.status !== 200) {
            const mensagem =
                mensagensHP[response.status] ||
                "A varinha hesitou... algo deu errado no fluxo da magia. Tente novamente.";

            throw new Error(`${mensagem} (HTTP ${response.status})`);
        }

        const data = await response.json();

        // validação básica
        if (!Array.isArray(data) || data.length === 0) {
            throw new Error("Os pergaminhos de Hogwarts não retornaram nenhum registro. Talvez os arquivos mágicos estejam indisponíveis.");
        }

        characters = data;
        mostraPersonagem(currentIndex);
        console.log(response);

    } catch (error) {
        console.error("⚠️ Falha ao acessar os registros de Hogwarts:", error);

        const mensagem = error.message || 
            "Uma força desconhecida interferiu na magia. Tente novamente.";

        alert(`🧙 ${mensagem}`);
    }
}

// Função para alterar o tema com base na casa
function mudaTema(house) {
    document.body.className = casas[house] || "";

    if (house === "gryffindor") {
        document.body.classList.add("grifinoria");
    } else if (house === "slytherin") {
        document.body.classList.add("sonserina");
    } else if (house === "hufflepuff") {
        document.body.classList.add("lufa-lufa");
    } else if (house === "ravenclaw") {
        document.body.classList.add("corvinal");
    }
}

// Função para exibir um personagem
function mostraPersonagem(index) {
    const character = characters[index];
    nameElement.textContent = `Nome: ${character.name}`;
    houseElement.textContent = `Casa: ${casas[character.house] || "Desconhecida"}`;
    actorElement.textContent = `Ator: ${character.actor}`;
    speciesElement.textContent = `Espécie: ${especies[character.species] || character.species}`;
    imgElement.src = character.image || "./img/hogwarts.jpeg";

    // Alterar o tema com base na casa
    mudaTema(character.house);
}


// Event listeners para os botões
prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
        mostraPersonagem(currentIndex);
    } else if(currentIndex <= 0){
        currentIndex = characters.length - 1;
        mostraPersonagem(currentIndex);
    }
});

nextBtn.addEventListener("click", () => {
    if (currentIndex < characters.length - 1) {
        currentIndex++;
        mostraPersonagem(currentIndex);
    } else if(currentIndex >= characters.length - 1){
        currentIndex = 0;
        mostraPersonagem(currentIndex);
    }
});

searchBtn.addEventListener("click", () => {
    const searchTerm = document.getElementById("search").value.toLowerCase();
    const term = String(searchTerm).trim().replace(/\s+/g, ' ');
    const foundIndex = characters.findIndex((character) =>
        character.name.toLowerCase().includes(term),
    );

    if (isNaN(term)) {
        if (foundIndex !== -1) {
            currentIndex = foundIndex;
            mostraPersonagem(currentIndex);
        } else {
            alert("🔎 Nenhum bruxo foi encontrado nos registros de Hogwarts. Talvez ele esteja sob efeito de um feitiço de ocultação.");
        }
    } else if (!isNaN(term)) {
        const index = Number(term) - 1; // Ajusta para índice baseado em 0
        if (index >= 0 && index < characters.length) {
            currentIndex = index;
            mostraPersonagem(currentIndex);
        } else {
            alert("📜 Esse número não corresponde a nenhum registro no pergaminho mágico. Verifique e tente novamente.");
        }
    } 
});

// Iniciar a aplicação
buscaPersonagem();
