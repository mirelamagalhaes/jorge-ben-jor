
const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

// MENU PARA CELULAR
$("#menuBtn").addEventListener("click", () => {
  $("#menu").classList.toggle("open");
});

$$("nav a").forEach(link => {
  link.addEventListener("click", () => {
    $("#menu").classList.remove("open");
  });
});

// ÁLBUNS: busca capas no catálogo da Apple Music/iTunes
const albums = [
  {
    name: "A Tábua de Esmeralda",
    year: "1974",
    color: "#536c42",
    description: "Um dos discos mais celebrados da discografia de Jorge Ben.",
    track: "Os Alquimistas Estão Chegando"
  },
  {
    name: "África Brasil",
    year: "1976",
    color: "#a93229",
    description: "Um marco musical com samba, funk e referências afro-brasileiras.",
    track: "Ponta de Lança Africano"
  },
  {
    name: "Força Bruta",
    year: "1970",
    color: "#bd8845",
    description: "Um disco cheio de balanço e canções inesquecíveis.",
    track: "Oba, Lá Vem Ela"
  },
  {
    name: "Samba Esquema Novo",
    year: "1963",
    color: "#ed653c",
    description: "O álbum de estreia de Jorge Ben.",
    track: "Mas, Que Nada!"
  },
  {
    name: "Negro é Lindo",
    year: "1971",
    color: "#71844b",
    description: "Um título marcante na discografia do artista.",
    track: "Negro é Lindo"
  },
  {
    name: "Solta o Pavão",
    year: "1975",
    color: "#c58b50",
    description: "Mais um capítulo importante da trajetória musical.",
    track: "Jorge da Capadócia"
  }
];

async function loadAlbums() {
  const grid = $("#albumGrid");
  grid.innerHTML = "";

  for (const album of albums) {
    const card = document.createElement("button");
    card.className = "album-card";
    card.innerHTML = `
      <img alt="Capa de ${album.name}" loading="lazy">
      <b>${album.name}</b>
      <small>${album.year}</small>
    `;

    const image = card.querySelector("img");

    try {
      const query = encodeURIComponent(
        `Jorge Ben Jor ${album.name}`
      );

      const response = await fetch(
        `https://itunes.apple.com/search?term=${query}&entity=album&limit=20&country=BR`
      );

      const data = await response.json();

      const result = data.results.find(item =>
        item.collectionName?.toLowerCase().includes(
          album.name.toLowerCase()
        )
      ) || data.results[0];

      if (result?.artworkUrl100) {
        image.src = result.artworkUrl100.replace(
          "100x100bb",
          "600x600bb"
        );
      } else {
        image.alt = `Imagem não encontrada: ${album.name}`;
      }

    } catch (error) {
      image.alt = `Não foi possível carregar a capa de ${album.name}`;
    }

    card.addEventListener("click", () => {
      $$(".album-card").forEach(c =>
        c.classList.remove("active")
      );

      card.classList.add("active");

      $("#albumTitle").textContent = album.name;
      $("#albumYear").textContent = album.year;
      $("#albumDescription").textContent =
        album.description + " Faixa para conhecer: " + album.track;

      $("#albumLink").href =
        `https://open.spotify.com/search/${encodeURIComponent(
          "Jorge Ben Jor " + album.name
        )}`;

      $("#albumImage").src = image.src;
      document.documentElement.style.setProperty(
        "--accent",
        album.color
      );
    });

    grid.appendChild(card);
  }
}

loadAlbums();

// MÚSICAS
const songs = [
  {name:"Mas, Que Nada!",album:"Samba Esquema Novo",color:"#ed653c"},
  {name:"Chove Chuva",album:"Samba Esquema Novo",color:"#d88b43"},
  {name:"País Tropical",album:"Jorge Ben",color:"#c58b50"},
  {name:"Que Pena",album:"Jorge Ben",color:"#a93229"},
  {name:"Oba, Lá Vem Ela",album:"Força Bruta",color:"#bd8845"},
  {name:"O Telefone Tocou Novamente",album:"Força Bruta",color:"#754b42"},
  {name:"Fio Maravilha",album:"Ben",color:"#cf674c"},
  {name:"Os Alquimistas Estão Chegando",album:"A Tábua de Esmeralda",color:"#536c42"},
  {name:"Jorge da Capadócia",album:"Solta o Pavão",color:"#71844b"},
  {name:"Taj Mahal",album:"África Brasil",color:"#a93229"},
  {name:"Xica da Silva",album:"África Brasil",color:"#bd8845"},
  {name:"Amante Amado",album:"A Banda do Zé Pretinho",color:"#754b42"}
];

let selectedSong = null;
let favorites = JSON.parse(
  localStorage.getItem("benjorFavorites") || "[]"
);

function renderSongs() {
  $("#musicList").innerHTML = "";

  songs.forEach((song, index) => {
    const button = document.createElement("button");
    button.className = "music-row";

    button.innerHTML = `
      <span>
        <b>${String(index + 1).padStart(2, "0")}</b>
        &nbsp; ${song.name}
        <br><small>${song.album}</small>
      </span>
      <span>▶</span>
    `;

    button.addEventListener("click", () => {
      selectSong(index);
    });

    $("#musicList").appendChild(button);
  });
}

function renderFavorites() {
  $("#favoritesList").innerHTML = "";

  if (!favorites.length) {
    $("#favoritesList").innerHTML =
      "<li>Nenhuma música favorita ainda.</li>";
    return;
  }

  favorites.forEach(name => {
    const li = document.createElement("li");
    li.textContent = "♥ " + name;
    $("#favoritesList").appendChild(li);
  });
}

function selectSong(index) {
  selectedSong = index;
  const song = songs[index];

  $("#currentMusic").textContent = song.name;

  $("#listenLink").href =
    `https://open.spotify.com/search/${encodeURIComponent(
      "Jorge Ben Jor " + song.name
    )}`;

  document.documentElement.style.setProperty(
    "--accent",
    song.color
  );

  $$(".music-row").forEach((row, i) => {
    row.classList.toggle("selected", i === index);
  });

  updateFavoriteButton();
}

function updateFavoriteButton() {
  if (selectedSong === null) return;

  const name = songs[selectedSong].name;

  $("#favoriteBtn").textContent =
    favorites.includes(name)
      ? "♥ Remover dos favoritos"
      : "♡ Adicionar aos favoritos";
}

$("#favoriteBtn").addEventListener("click", () => {
  if (selectedSong === null) {
    alert("Escolha uma música primeiro!");
    return;
  }

  const name = songs[selectedSong].name;

  if (favorites.includes(name)) {
    favorites = favorites.filter(item => item !== name);
  } else {
    favorites.push(name);
  }

  localStorage.setItem(
    "benjorFavorites",
    JSON.stringify(favorites)
  );

  renderFavorites();
  updateFavoriteButton();
});

renderSongs();
renderFavorites();

// BRINCADEIRA: COMPLETE O TÍTULO
$$("[data-word]").forEach(button => {
  button.addEventListener("click", () => {
    const correct = button.dataset.word === "nada";

    $("#wordFeedback").textContent = correct
      ? "Acertou! Mas, Que Nada! ✳"
      : "Quase! A palavra certa é Nada.";

    $("#wordFeedback").style.color =
      correct ? "green" : "firebrick";
  });
});

// BRINCADEIRA: VERDADEIRO OU FALSO
const truths = [
  {
    question:"África Brasil foi lançado em 1976.",
    answer:true,
    explanation:"Isso mesmo! O álbum é de 1976."
  },
  {
    question:"Samba Esquema Novo foi lançado em 1974.",
    answer:false,
    explanation:"Não. O disco foi lançado em 1963."
  },
  {
    question:"Força Bruta foi lançado em 1970.",
    answer:true,
    explanation:"Correto! Força Bruta é de 1970."
  },
  {
    question:"Negro é Lindo foi lançado em 1981.",
    answer:false,
    explanation:"Na verdade, Negro é Lindo foi lançado em 1971."
  }
];

let truthIndex = 0;

function showTruth() {
  $("#truthQuestion").textContent =
    truths[truthIndex].question;

  $("#truthFeedback").textContent = "";

  $$("[data-truth]").forEach(button => {
    button.disabled = false;

    button.onclick = () => {
      const choice = button.dataset.truth === "true";
      const item = truths[truthIndex];

      $("#truthFeedback").textContent =
        choice === item.answer
          ? "Acertou! " + item.explanation
          : "Não foi dessa vez. " + item.explanation;

      $$("[data-truth]").forEach(b => b.disabled = true);
    };
  });
}

$("#nextTruth").addEventListener("click", () => {
  truthIndex = (truthIndex + 1) % truths.length;
  showTruth();
});

showTruth();

// QUIZ PRINCIPAL
const questions = [
  {
    question:"Em que ano foi lançado Samba Esquema Novo?",
    answers:["1963","1967","1970","1974"],
    correct:0,
    explanation:"Samba Esquema Novo foi lançado em 1963."
  },
  {
    question:"Qual destes discos é de 1974?",
    answers:["Força Bruta","A Tábua de Esmeralda","África Brasil","Negro é Lindo"],
    correct:1,
    explanation:"A Tábua de Esmeralda é de 1974."
  },
  {
    question:"Qual música também é conhecida como Umbabarauma?",
    answers:["Taj Mahal","Fio Maravilha","Ponta de Lança Africano","Chove Chuva"],
    correct:2,
    explanation:"Ponta de Lança Africano também é conhecida como Umbabarauma."
  },
  {
    question:"Em que ano saiu África Brasil?",
    answers:["1971","1974","1975","1976"],
    correct:3,
    explanation:"África Brasil foi lançado em 1976."
  },
  {
    question:"Qual música faz parte de Força Bruta?",
    answers:["Oba, Lá Vem Ela","Taj Mahal","Jorge da Capadócia","Mas, Que Nada!"],
    correct:0,
    explanation:"Oba, Lá Vem Ela está no álbum Força Bruta."
  },
  {
    question:"Qual instrumento marcou a sonoridade de Jorge Ben desde o início?",
    answers:["Acordeão","Violão","Flauta","Harpa"],
    correct:1,
    explanation:"O violão é uma marca da sonoridade de Jorge Ben."
  },
  {
    question:"Qual álbum tem o título Negro é Lindo?",
    answers:["Ben","Solta o Pavão","Negro é Lindo","Tropical"],
    correct:2,
    explanation:"Negro é Lindo foi lançado em 1971."
  },
  {
    question:"Com quem Jorge Ben gravou Gil & Jorge?",
    answers:["Caetano Veloso","Tim Maia","Milton Nascimento","Gilberto Gil"],
    correct:3,
    explanation:"O álbum foi gravado com Gilberto Gil."
  }
];

let questionIndex = 0;
let points = 0;
let hasAnswered = false;
let quizStarted = false;

function startQuiz() {
  questionIndex = 0;
  points = 0;
  quizStarted = true;
  $("#nextQuestion").textContent = "RESPONDER ↗";
  renderQuestion();
}

function renderQuestion() {
  hasAnswered = false;

  const item = questions[questionIndex];

  $("#questionNumber").textContent =
    `PERGUNTA ${questionIndex + 1} DE ${questions.length}`;

  $("#score").textContent = `${points} PONTOS`;

  $("#progressBar").style.width =
    `${questionIndex / questions.length * 100}%`;

  $("#question").textContent = item.question;
  $("#quizFeedback").textContent = "";
  $("#answers").innerHTML = "";

  item.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = "answer";
    button.textContent =
      `${String.fromCharCode(65 + index)}. ${answer}`;

    button.addEventListener("click", () => {
      $$(".answer").forEach(b =>
        b.classList.remove("selected")
      );

      button.classList.add("selected");
      $("#nextQuestion").disabled = false;
    });

    $("#answers").appendChild(button);
  });

  $("#nextQuestion").disabled = true;
}

function finishQuiz() {
  $("#progressBar").style.width = "100%";
  $("#questionNumber").textContent = "RESULTADO FINAL";
  $("#score").textContent = `${points} DE 8 PONTOS`;

  let message = "Continue explorando os discos!";

  if (points === 8) {
    message = "Você é uma enciclopédia do suingue!";
  } else if (points >= 6) {
    message = "Mandou muito bem! Você conhece a obra!";
  } else if (points >= 3) {
    message = "Bom começo! Tem muito som para descobrir!";
  }

  $("#question").textContent = message;
  $("#answers").innerHTML =
    `<h2>${points} / 8 pontos</h2>`;

  $("#quizFeedback").textContent =
    "Compartilhe o resultado e desafie alguém!";

  $("#nextQuestion").textContent = "JOGAR NOVAMENTE ↻";
  $("#nextQuestion").dataset.restart = "true";
}

$("#nextQuestion").addEventListener("click", () => {
  if ($("#nextQuestion").dataset.restart === "true") {
    delete $("#nextQuestion").dataset.restart;
    startQuiz();
    return;
  }

  if (!quizStarted) {
    startQuiz();
    return;
  }

  if (!hasAnswered) {
    const selected = $(".answer.selected");

    if (!selected) return;

    const selectedIndex = $$(".answer").indexOf(selected);
    const item = questions[questionIndex];

    hasAnswered = true;

    $$(".answer").forEach((button, index) => {
      button.disabled = true;

      if (index === item.correct) {
        button.classList.add("correct");
      } else if (index === selectedIndex) {
        button.classList.add("wrong");
      }
    });

    if (selectedIndex === item.correct) {
      points++;
    }

    $("#score").textContent = `${points} PONTOS`;
    $("#quizFeedback").textContent = item.explanation;

    $("#nextQuestion").textContent =
      questionIndex === questions.length - 1
        ? "VER RESULTADO ↗"
        : "PRÓXIMA PERGUNTA ↗";

    return;
  }

  questionIndex++;

  if (questionIndex < questions.length) {
    renderQuestion();
  } else {
    finishQuiz();
  }
});

// GALERIA: AMPLIAR FOTOS
$$(".photo-grid img").forEach(image => {
  image.addEventListener("click", () => {
    $("#lightboxImage").src = image.src;
    $("#lightbox").classList.add("open");
  });
});

$("#closeLightbox").addEventListener("click", () => {
  $("#lightbox").classList.remove("open");
});

$("#lightbox").addEventListener("click", event => {
  if (event.target.id === "lightbox") {
    $("#lightbox").classList.remove("open");
  }
});

// COMPARTILHAR
$("#shareBtn").addEventListener("click", async () => {
  const data = {
    title:"Universo Ben Jor",
    text:"Vem conhecer esse universo de música e brincadeiras!",
    url:location.href
  };

  try {
    if (navigator.share) {
      await navigator.share(data);
    } else {
      await navigator.clipboard.writeText(location.href);
      alert("Link copiado!");
    }
  } catch (error) {
    alert("Copie o endereço do site para compartilhar.");
  }
});
