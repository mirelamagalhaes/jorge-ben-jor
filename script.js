
const songs = [
  {
    title: "Cigana",
    sub: "A identidade do universo",
    theme: {
      bg: "#f6e8d2",
      paper: "#fff8ed",
      accent: "#ed653c",
      dark: "#a93229",
      soft: "#f3b27f"
    }
  },
  {
    title: "Jorge da Capadócia",
    sub: "Força e espiritualidade",
    theme: {
      bg: "#e6e8d9",
      paper: "#f8f8ee",
      accent: "#536c42",
      dark: "#354b32",
      soft: "#a9b58a"
    }
  },
  {
    title: "Domingas",
    sub: "Calor e delicadeza",
    theme: {
      bg: "#f0e2c8",
      paper: "#fff7e7",
      accent: "#bd8845",
      dark: "#80542c",
      soft: "#e3bd7d"
    }
  },
  {
    title: "Oba, Lá Vem Ela",
    sub: "Energia e movimento",
    theme: {
      bg: "#f2ded6",
      paper: "#fff4ed",
      accent: "#b83d32",
      dark: "#812820",
      soft: "#e58b70"
    }
  },
  {
    title: "Me Chamando de Paixão",
    sub: "Romance em tons dourados",
    theme: {
      bg: "#f3e7d6",
      paper: "#fff9ef",
      accent: "#c58b50",
      dark: "#8b592e",
      soft: "#e8c18a"
    }
  },
  {
    title: "Amante Amado",
    sub: "Um clima intenso",
    theme: {
      bg: "#e9ded8",
      paper: "#f9f0eb",
      accent: "#754b42",
      dark: "#4b302c",
      soft: "#b98a7d"
    }
  },
  {
    title: "Por Causa de Você, Menina",
    sub: "Leveza e frescor",
    theme: {
      bg: "#e8eadc",
      paper: "#f8f9ef",
      accent: "#71844b",
      dark: "#46562d",
      soft: "#b8c58d"
    }
  },
  {
    title: "Moça",
    sub: "Doçura em movimento",
    theme: {
      bg: "#f2e1d9",
      paper: "#fff7f1",
      accent: "#cf674c",
      dark: "#93402e",
      soft: "#eda58d"
    }
  }
];

const questions = [
  {
    q: "Qual é o nome de nascimento de Jorge Ben Jor?",
    a: [
      "Jorge Duílio Lima Menezes",
      "Jorge Augusto Ben Lima",
      "Jorge Carlos Menezes Silva",
      "Jorge Ben de Oliveira"
    ],
    c: 0,
    e: "Seu nome de nascimento é Jorge Duílio Lima Menezes."
  },
  {
    q: "Qual álbum de 1963 apresentou Jorge Ben ao grande público?",
    a: [
      "África Brasil",
      "Samba Esquema Novo",
      "A Tábua de Esmeralda",
      "Força Bruta"
    ],
    c: 1,
    e: "Samba Esquema Novo foi lançado em 1963."
  },
  {
    q: "Qual destas músicas é um grande sucesso do início da carreira?",
    a: [
      "Mas Que Nada",
      "W/Brasil",
      "Xica da Silva",
      "Fio Maravilha"
    ],
    c: 0,
    e: "Mas Que Nada foi um dos primeiros grandes sucessos de Jorge Ben."
  },
  {
    q: "Em que ano foi lançado o álbum África Brasil?",
    a: ["1963", "1969", "1976", "1989"],
    c: 2,
    e: "África Brasil foi lançado em 1976."
  },
  {
    q: "Qual destas músicas está associada ao álbum África Brasil?",
    a: [
      "Taj Mahal",
      "Chove Chuva",
      "Que Pena",
      "Cadê Teresa"
    ],
    c: 0,
    e: "Taj Mahal é uma faixa conhecida de África Brasil."
  },
  {
    q: "Qual mistura de estilos descreve a sonoridade de Jorge Ben Jor?",
    a: [
      "Samba, rock e funk",
      "Ópera, polca e valsa",
      "Country, bluegrass e folk",
      "Reggae, country e tango"
    ],
    c: 0,
    e: "Sua música mistura elementos de samba, rock, funk e outras influências."
  },
  {
    q: "Em qual cidade brasileira Jorge Ben Jor nasceu?",
    a: [
      "Salvador",
      "Recife",
      "Rio de Janeiro",
      "Belo Horizonte"
    ],
    c: 2,
    e: "Jorge Ben Jor nasceu no Rio de Janeiro."
  },
  {
    q: "Qual instrumento é especialmente associado à sua música?",
    a: [
      "Violão",
      "Harpa",
      "Acordeão",
      "Bandolim"
    ],
    c: 0,
    e: "Jorge Ben é conhecido por seu jeito marcante de tocar violão."
  }
];

const $ = id => document.getElementById(id);

let selected = 0;
let favorites = readFavorites();
let qi = 0;
let score = 0;
let answered = false;

function readFavorites() {
  try {
    const value = JSON.parse(
      localStorage.getItem("universoCiganaFavorites") || "[]"
    );

    return Array.isArray(value)
      ? value.filter(n =>
          Number.isInteger(n) && n >= 0 && n < songs.length
        )
      : [];
  } catch {
    return [];
  }
}

function theme(t) {
  const root = document.documentElement;

  root.style.setProperty("--bg", t.bg);
  root.style.setProperty("--paper", t.paper);
  root.style.setProperty("--accent", t.accent);
  root.style.setProperty("--dark", t.dark);
  root.style.setProperty("--soft", t.soft);

  document.querySelector('meta[name="theme-color"]').content = t.accent;
}

function chooseSong(i) {
  selected = i;
  theme(songs[i].theme);

  $("currentTitle").textContent = songs[i].title;
  $("miniTitle").textContent = songs[i].title;

  renderSongs();
}

function renderSongs() {
  $("musicGrid").innerHTML = "";

  songs.forEach((song, i) => {
    const card = document.createElement("div");

    card.className =
      "music-card" + (selected === i ? " selected" : "");

    card.innerHTML = `
      <span class="card-no">FAIXA ${String(i + 1).padStart(2, "0")}</span>
      <div class="card-art" style="--card:${song.theme.accent}"></div>
      <span class="card-title"></span>
      <span class="card-sub"></span>
      <button class="heart" type="button"></button>
    `;

    card.querySelector(".card-title").textContent = song.title;
    card.querySelector(".card-sub").textContent = song.sub;

    const heart = card.querySelector(".heart");

    heart.textContent = favorites.includes(i) ? "♥" : "♡";

    heart.setAttribute(
      "aria-label",
      favorites.includes(i)
        ? "Remover das favoritas"
        : "Adicionar às favoritas"
    );

    card.addEventListener("click", () => chooseSong(i));

    heart.addEventListener("click", event => {
      event.stopPropagation();

      favorites = favorites.includes(i)
        ? favorites.filter(x => x !== i)
        : [...favorites, i];

      try {
        localStorage.setItem(
          "universoCiganaFavorites",
          JSON.stringify(favorites)
        );
      } catch {}

      renderSongs();
    });

    $("musicGrid").appendChild(card);
  });

  $("favoritesList").innerHTML = "";
  $("favoritesEmpty").hidden = favorites.length > 0;

  favorites.forEach(i => {
    const button = document.createElement("button");

    button.className = "favorite-chip";
    button.textContent = "♥ " + songs[i].title;

    button.addEventListener("click", () => chooseSong(i));

    $("favoritesList").appendChild(button);
  });
}

$("listenButton").addEventListener("click", () => {
  const url =
    "https://www.youtube.com/results?search_query=" +
    encodeURIComponent("Jorge Ben Jor " + songs[selected].title);

  window.open(url, "_blank", "noopener,noreferrer");
});

$("menuToggle").addEventListener("click", () => {
  const open = $("nav").classList.toggle("open");

  $("menuToggle").setAttribute("aria-expanded", String(open));
  $("menuToggle").textContent = open ? "×" : "☰";
});

$("nav").querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    $("nav").classList.remove("open");
    $("menuToggle").setAttribute("aria-expanded", "false");
    $("menuToggle").textContent = "☰";
  });
});

function showQuestion() {
  answered = false;

  const question = questions[qi];

  $("quizProgress").textContent =
    `PERGUNTA ${qi + 1} DE ${questions.length}`;

  $("quizScore").textContent =
    `${score} ${score === 1 ? "PONTO" : "PONTOS"}`;

  $("progressFill").style.width =
    `${qi / questions.length * 100}%`;

  $("questionText").textContent = question.q;
  $("quizFeedback").textContent = "";
  $("quizOptions").innerHTML = "";

  question.a.forEach((answer, i) => {
    const button = document.createElement("button");

    button.className = "option";
    button.textContent =
      String.fromCharCode(65 + i) + ". " + answer;

    button.addEventListener("click", () => answerQuestion(i));

    $("quizOptions").appendChild(button);
  });

  $("nextQuestion").disabled = true;
  $("nextQuestion").hidden = false;

  $("nextQuestion").textContent =
    qi === questions.length - 1
      ? "Ver resultado →"
      : "Próxima pergunta →";
}

function answerQuestion(i) {
  if (answered) return;

  answered = true;

  const question = questions[qi];
  const options = [...$("quizOptions").children];

  options.forEach((button, n) => {
    button.disabled = true;

    if (n === question.c) {
      button.classList.add("correct");
    } else if (n === i) {
      button.classList.add("wrong");
    }
  });

  if (i === question.c) {
    score++;
  }

  $("quizScore").textContent =
    `${score} ${score === 1 ? "PONTO" : "PONTOS"}`;

  $("quizFeedback").textContent =
    (i === question.c ? "Isso aí! " : "Boa tentativa! ") +
    question.e;

  $("nextQuestion").disabled = false;
}

$("nextQuestion").addEventListener("click", () => {
  if (!answered) return;

  if (qi === questions.length - 1) {
    $("progressFill").style.width = "100%";
    $("quizProgress").textContent = "QUIZ FINALIZADO";

    $("quizScore").textContent =
      `${score} / ${questions.length} PONTOS`;

    $("questionText").textContent =
      score === 8
        ? "Você conhece muito bem esse universo!"
        : score >= 5
          ? "Você está no ritmo! Mandou bem."
          : "Sua viagem pelo universo de Jorge Ben está só começando!";

    $("quizOptions").innerHTML = "";

    $("quizFeedback").textContent =
      `Você acertou ${score} de ${questions.length} perguntas. Que tal ouvir uma música e tentar novamente?`;

    $("nextQuestion").hidden = true;
  } else {
    qi++;
    showQuestion();
  }
});

$("restartQuiz").addEventListener("click", () => {
  qi = 0;
  score = 0;
  showQuestion();
});

chooseSong(0);
showQuestion();
