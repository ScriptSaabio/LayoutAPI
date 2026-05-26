// Captura de Elementos no HTML
const nameElement = document.getElementById("name");
const houseElement = document.getElementById("house");
const actorElement = document.getElementById("actor");
const speciesElement = document.getElementById("species");
const imgElement = document.querySelector("#img img");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("searchBtn");
const hatIcon = document.getElementById("hatIcon");
const wandIcon = document.getElementById("wandIcon");

// Variáveis para controle do Index
let characters = [];
let currentIndex = 0;

// Mapeamento de casas para nomes em português
const casas = {
  Gryffindor: "Grifinoria",
  Slytherin: "Sonserina",
  Hufflepuff: "Lufa-Lufa",
  Ravenclaw: "Corvinal",
};

// Mapeamento de casas para temas (cores)
const temas = {
  Gryffindor: {
    body: "bg-[#2a0c0c] text-white",
    header: "bg-[#740001]",
    card: "bg-[#ae0001]",
    cardLight: "bg-[#d3a625] text-black",
    button: "bg-[#d3a625] text-black hover:bg-[#c2951f]",
    icon: "text-[#d3a625] text-5xl md:text-6xl"
  },
  Slytherin: {
    body: "bg-[#0f2e1c] text-white",
    header: "bg-[#1a472a]",
    card: "bg-[#2a623d]",
    cardLight: "bg-[#5d8a6f]",
    button: "bg-[#5d8a6f] hover:bg-[#4e765e]",
    icon: "text-[#5d8a6f] text-5xl md:text-6xl"
  },
  Hufflepuff: {
    body: "bg-[#fff6d8] text-black",
    header: "bg-[#eeb939]",
    card: "bg-[#f0c75e]",
    cardLight: "bg-[#fff1a8]",
    button: "bg-[#f0c75e] hover:bg-[#ddb84f]",
    icon: "text-[#eeb939] text-5xl md:text-6xl"
  },
  Ravenclaw: {
    body: "bg-[#0a112b] text-white",
    header: "bg-[#0e1a40]",
    card: "bg-[#222f5b]",
    cardLight: "bg-[#4a5d8c]",
    button: "bg-[#4a5d8c] hover:bg-[#3b4c73]",
    icon: "text-[#4a5d8c] text-5xl md:text-6xl"
  },
  Default: {
    body: "bg-gray-100 text-gray-900",
    header: "bg-gray-400",
    card: "bg-gray-300",
    cardLight: "bg-gray-200 text-black",
    button: "bg-gray-200 hover:bg-gray-300 text-black",
    icon: "text-gray-500 text-5xl md:text-6xl"
  }
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

  504: "A coruja se perdeu no caminho e a mensagem não chegou a tempo. Tente novamente quando os ventos mágicos estiverem mais favoráveis.",
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
      throw new Error(
        "Os pergaminhos de Hogwarts não retornaram nenhum registro. Talvez os arquivos mágicos estejam indisponíveis.",
      );
    }

    characters = data;
    mostraPersonagem(currentIndex);
    // console.log(response);
  } catch (error) {
    console.error("⚠️ Falha ao acessar os registros de Hogwarts:", error);

    const mensagem =
      error.message ||
      "Uma força desconhecida interferiu na magia. Tente novamente.";

    alert(`🧙 ${mensagem}`);
  }
}

// Função para alterar o tema com base na casa
function mudaTema(house) {

  const tema = temas[house];

  if (!tema) return;

  // BODY
  document.body.className = `min-h-screen flex flex-col ${tema.body}`;

  // HEADER
  const header = document.querySelector("header");
  if (header) {
    header.className = `p-4 flex flex-col md:flex-row items-center justify-between gap-4 ${tema.header}`;
  }

  // CARD IMAGEM
  const imgCard = document.getElementById("img");
  if (imgCard) {
    imgCard.className = `p-4 rounded-xl flex items-center justify-center h-100 md:h-150 max-h-150 ${tema.card}`;
  }

  // TEXTOS
  document.querySelectorAll("#texto p").forEach((p) => {
    if (p) {
      p.className = `p-3 rounded-lg text-sm md:text-base ${tema.cardLight}`;
    }
  });

  // BOTÕES
  document.querySelectorAll("button").forEach((btn) => {
    if (btn) {
      btn.className = `flex-1 p-3 rounded-lg transition cursor-pointer ${tema.button}`;
    }
  });

  // ÍCONE
  const icon = document.getElementById("houseIcon");

  if (icon) {
    icon.className = `fa-solid fa-hat-wizard transition duration-500 ${tema.icon}`;
  }

}

// Função para exibir um personagem
function mostraPersonagem(index) {
  const character = characters[index];

  nameElement.textContent = `Nome: ${character.name}`;
  houseElement.textContent = `Casa: ${casas[character.house] || "Desconhecida"}`;
  actorElement.textContent = `Ator: ${character.actor}`;
  speciesElement.textContent = `Espécie: ${especies[character.species] || character.species}`;

  imgElement.src = character.image || "./assets/img/hogwarts.jpeg";

  // Alterar o tema com base na casa
  const house = character.house;
  // console.log("Casa do personagem:", house); // Debug: Verificar o valor da casa

  if (house && house.trim() !== "") {
    mudaTema(house);
  } else {
    mudaTema("Default");
  }
}

// Event listeners para os botões
prevBtn.addEventListener("click", () => {
  currentIndex = currentIndex > 0 ? currentIndex - 1 : characters.length - 1;

  mostraPersonagem(currentIndex);
});

nextBtn.addEventListener("click", () => {
  currentIndex = currentIndex < characters.length - 1 ? currentIndex + 1 : 0;

  mostraPersonagem(currentIndex);
});

searchBtn.addEventListener("click", () => {
  const searchTerm = document.getElementById("search").value.toLowerCase().trim();

  const term = String(searchTerm).trim().replace(/\s+/g, " ");

  const foundIndex = characters.findIndex((character) =>
    character.name.toLowerCase().includes(term),
  );


  if (searchTerm === "") {
    alert(
      `🎩 O Chapéu Seletor não sentiu nenhuma presença em sua mente…
Por favor, diga o nome de um bruxo para que eu possa decidir seu destino nos corredores de Hogwarts.`);
    return;
  }

  if (isNaN(searchTerm)) {
    if (foundIndex !== -1) {
      currentIndex = foundIndex;
      mostraPersonagem(currentIndex);
    } else {
      alert(
        "🔎 Nenhum bruxo foi encontrado nos registros de Hogwarts. Talvez ele esteja sob efeito de um feitiço de ocultação.",
      );
    }
  } else if (!isNaN(searchTerm)) {
    const index = Number(searchTerm) - 1; // Ajusta para índice baseado em 0
    if (index >= 0 && index < characters.length) {
      currentIndex = index;
      mostraPersonagem(currentIndex);
    } else {
      alert(
        "📜 Esse número não corresponde a nenhum registro no pergaminho mágico. Verifique e tente novamente.",
      );
    }
  }
});

searchInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    searchBtn.click();
  }
});

document.addEventListener("keydown", (event) => {
  if (!characters.length) return;

  if (event.key === "ArrowRight") {
    nextBtn.click();
  }

  if (event.key === "ArrowLeft") {
    prevBtn.click();
  }
});

hatIcon.addEventListener("click", () => {
  if (!characters.length) return;

  const min = 0;
  const max = characters.length - 1;

  const randomIndex = Math.floor(Math.random() * (max - min + 1)) + min;

  currentIndex = randomIndex;
  mostraPersonagem(currentIndex);
});

wandIcon.addEventListener("click", () => {
  if (!characters.length) return;

  const min = 0;
  const max = characters.length - 1;

  const randomIndex = Math.floor(Math.random() * (max - min + 1)) + min;

  currentIndex = randomIndex;
  mostraPersonagem(currentIndex);
});

// Iniciar a aplicação
buscaPersonagem();
