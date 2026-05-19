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
let currentIndex = -1;

// Mapeamento de casas para classes CSS
const casas = {
    Gryffindor: "grifinoria",
    Slytherin: "sonserina",
    Hufflepuff: "lufa-lufa",
    Ravenclaw: "corvinal",
};

// Função para buscar personagens da API
async function buscaPersonagem() {
    const response = await fetch("https://hp-api.onrender.com/api/characters");
    characters = await response.json();
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
    houseElement.textContent = `Casa: ${character.house || "Desconhecida"}`;
    actorElement.textContent = `Ator: ${character.actor}`;
    speciesElement.textContent = `Espécie: ${character.species}`;
    imgElement.src = character.image || "./img/hogwarts.jpeg";

    // Alterar o tema com base na casa
    mudaTema(character.house);
}

// Event listeners para os botões
prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
        mostraPersonagem(currentIndex);
    }
});

nextBtn.addEventListener("click", () => {
    if (currentIndex < characters.length - 1) {
        currentIndex++;
        mostraPersonagem(currentIndex);
    }
});

searchBtn.addEventListener("click", () => {
    const searchTerm = document.getElementById("search").value.toLowerCase();
    const foundIndex = characters.findIndex((character) =>
        character.name.toLowerCase().includes(searchTerm),
    );

    if (isNaN(searchTerm)) {
        if (foundIndex !== -1) {
            currentIndex = foundIndex;
            mostraPersonagem(currentIndex);
        } else {
            alert("Personagem não encontrado!");
        }
    } else if (!isNaN(searchTerm)) {
        const index = Number(searchTerm) - 1; // Ajusta para índice baseado em 0
        if (index >= 0 && index < characters.length) {
            currentIndex = index;
            mostraPersonagem(currentIndex);
        } else {
            alert("Número fora do intervalo de personagens!");
        }
    }   
});

// Iniciar a aplicação
buscaPersonagem();
