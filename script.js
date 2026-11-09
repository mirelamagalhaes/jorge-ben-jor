
const songs = [
    { title: "Cigana", color: "#ed653c" },
    { title: "Jorge da Capadócia", color: "#354b32" },
    { title: "Domingas", color: "#bd8845" },
    { title: "Oba, Lá Vem Ela", color: "#a93229" },
    { title: "Me Chamando de Paixão", color: "#c58b50" },
    { title: "Amante Amado", color: "#754b42" },
    { title: "Por Causa de Você, Menina", color: "#71844b" },
    { title: "Moça", color: "#cf674c" }
];

let currentSong = -1;
let favorites = JSON.parse(localStorage.getItem("jorgeFavorites") || "[]");

const musicGrid = document.getElementById("musicGrid");
const favoritesList = document.getElementById("favoritesList");
const currentTitle = document.getElementById("currentTitle");
const playBtn = document.getElementById("playBtn");
const listenLink = document.getElementById("listenLink");
const miniVinyl = document.getElementById("miniVinyl");

// CRIAR PLAYLIST

function renderSongs() {
    musicGrid.innerHTML = "";

    songs.forEach((song, index) => {
        const isFavorite = favorites.includes(index);

        const card = document.createElement("article");
        card.className = "music-card";

        const art = document.createElement("div");
        art.className = "album-art";
        art.style.background = `linear-gradient(145deg, ${song.color}, #251e1b)`;

        const artTitle = document.createElement("span");
        artTitle.textContent = song.title;
        art.appendChild(artTitle);

        const title = document.createElement("h3");
        title.textContent = song.title;

        const actions = document.createElement("div");
        actions.className = "card-actions";

        const play = document.createElement("button");
        play.textContent = "▶ Ouvir";
        play.addEventListener("click", () => selectSong(index));

        const favorite = document.createElement("button");
        favorite.className = "favorite" + (isFavorite ? " active" : "");
        favorite.textContent = isFavorite ? "♥" : "♡";
        favorite.setAttribute("aria-label", "Adicionar aos favoritos");
        favorite.addEventListener("click", () => toggleFavorite(index));

        actions.append(play, favorite);
        card.append(art, title, actions);
        musicGrid.appendChild(card);
    });
}

// SELECIONAR MÚSICA

function selectSong(index) {
    currentSong = index;

    const song = songs[index];

    currentTitle.textContent = song.title;

    const query = encodeURIComponent(
        `Jorge Ben Jor ${song.title} música`
    );

    listenLink.href =
        `https://www.youtube.com/results?search_query=${query}`;

    playBtn.textContent = "↗";
    miniVinyl.classList.add("spinning");

    // Abre resultados para ouvir a música.
    window.open(listenLink.href, "_blank", "noopener,noreferrer");
}

// BOTÃO DO PLAYER

playBtn.addEventListener("click", () => {
    if (currentSong === -1) {
        selectSong(0);
        return;
    }

    // O áudio é reproduzido na plataforma externa.
    const song = songs[currentSong];
    const query = encodeURIComponent(
        `Jorge Ben Jor ${song.title} música`
    );

    window.open(
        `https://www.youtube.com/results?search_query=${query}`,
        "_blank",
        "noopener,noreferrer"
    );
});

// MÚSICA ANTERIOR

document.getElementById("prevBtn").addEventListener("click", () => {
    const index = currentSong <= 0
        ? songs.length - 1
        : currentSong - 1;

    selectSong(index);
});

// PRÓXIMA MÚSICA

document.getElementById("nextBtn").addEventListener("click", () => {
    const index = (currentSong + 1) % songs.length;
    selectSong(index);
});

// FAVORITOS

function toggleFavorite(index) {
    if (favorites.includes(index)) {
        favorites = favorites.filter(item => item !== index);
    } else {
        favorites.push(index);
    }

    localStorage.setItem(
        "jorgeFavorites",
        JSON.stringify(favorites)
    );

    renderSongs();
    renderFavorites();
}

// MOSTRAR FAVORITOS

function renderFavorites() {
    favoritesList.innerHTML = "";

    if (favorites.length === 0) {
        const message = document.createElement("p");
        message.textContent =
            "Você ainda não adicionou músicas aos favoritos.";

        favoritesList.appendChild(message);
        return;
    }

    favorites.forEach(index => {
        const item = document.createElement("button");
        item.className = "favorite-item";
        item.textContent = "♥ " + songs[index].title;

        item.addEventListener("click", () => selectSong(index));

        favoritesList.appendChild(item);
    });
}

// MENU MOBILE

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
    nav.classList.toggle("open");

    menuToggle.textContent =
        nav.classList.contains("open") ? "✕" : "☰";
});

nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuToggle.textContent = "☰";
    });
});

// BOTÃO VOLTAR AO TOPO

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {
    topBtn.style.display =
        window.scrollY > 400 ? "block" : "none";
});

topBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// ANIMAÇÕES AO ROLAR A PÁGINA

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15
});

document.querySelectorAll(
    ".music-card, .timeline-item, .visual-card"
).forEach(element => {
    element.classList.add("reveal");
    observer.observe(element);
});

// INICIALIZAÇÃO

renderSongs();
renderFavorites();
