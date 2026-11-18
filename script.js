
/* ==========================
   AFTERSCHOOL 2000
   INTERACTIVE EXPERIENCE
========================== */

// DIGITAL CLOCK

function updateClock() {
    const now = new Date();

    const time = now.toLocaleTimeString("pt-BR", {
        hour12: false
    });

    document.getElementById("clock").textContent = time;
}

updateClock();
setInterval(updateClock, 1000);


// OPEN WINDOWS

function openWindow(id) {
    const selected = document.getElementById(id);

    selected.classList.add("active");

    selected.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });
}


// CLOSE WINDOWS

function closeWindow(id) {
    document.getElementById(id).classList.remove("active");
}


// EXPLORE WORLD

function exploreWorld() {
    document.getElementById("summer").classList.add("active");

    document.getElementById("summer").scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}


// MUSIC PLAYER SIMULATION

let musicPlaying = false;
let progressValue = 0;
let musicTimer = null;

function toggleMusic() {
    const button = document.getElementById("playButton");
    const status = document.getElementById("musicStatus");
    const progress = document.getElementById("progress");

    musicPlaying = !musicPlaying;

    if (musicPlaying) {
        button.textContent = "Ⅱ PAUSE";
        status.textContent = "Summer vibes loading... ♫";

        musicTimer = setInterval(() => {
            progressValue += 1;

            if (progressValue >= 100) {
                progressValue = 0;
            }

            progress.style.width = progressValue + "%";
        }, 500);

    } else {
        button.textContent = "▶ PLAY";
        status.textContent = "Paused ♡";

        clearInterval(musicTimer);
    }
}


// SURF CHALLENGE

function surfGame() {
    const result = document.getElementById("surfResult");

    const points = Math.floor(Math.random() * 100) + 1;

    if (points >= 80) {
        result.textContent = "🏆 AMAZING SURF! " + points + " points!";
    } else if (points >= 50) {
        result.textContent = "🌊 NICE WAVE! " + points + " points!";
    } else {
        result.textContent = "🏄 TRY AGAIN! " + points + " points!";
    }
}


// MUSIC FACTS

const musicFacts = [
    "Jorge Ben Jor é um dos grandes nomes da música brasileira! ♫",
    "Charlie Brown Jr. marcou gerações com sua mistura de rock e reggae.",
    "Bob Marley tornou-se um dos maiores símbolos mundiais do reggae.",
    "Armandinho é conhecido pela sua sonoridade ligada ao reggae brasileiro.",
    "A música pode guardar memórias e emoções especiais. ♡"
];

function showMusicFact() {
    const random = Math.floor(Math.random() * musicFacts.length);

    document.getElementById("musicFact").textContent =
        musicFacts[random];
}


// SECRET FILE

function secretMessage() {
    document.getElementById("secretFile").textContent =
        "★ FILE UNLOCKED ★ You found a little piece of the 2000s!";
}


// CHICKEN JOE QUOTES

const chickenQuotes = [
    "Hang loose, dude! 🏄",
    "The ocean is calling!",
    "Life is better with waves!",
    "Don't worry. Just surf!",
    "Good vibes only, bro!"
];

function chickenQuote() {
    const random = Math.floor(Math.random() * chickenQuotes.length);

    document.getElementById("chickenQuote").textContent =
        chickenQuotes[random];
}


// MEMORY BOX

function saveMemory() {
    const input = document.getElementById("memoryInput");

    const memory = input.value.trim();

    if (memory === "") {
        alert("Write a little memory first! ♡");
        return;
    }

    const memories = JSON.parse(
        localStorage.getItem("afterschoolMemories") || "[]"
    );

    memories.push(memory);

    localStorage.setItem(
        "afterschoolMemories",
        JSON.stringify(memories)
    );

    input.value = "";

    showMemories();
}


function showMemories() {
    const list = document.getElementById("memoryList");

    list.replaceChildren();

    const memories = JSON.parse(
        localStorage.getItem("afterschoolMemories") || "[]"
    );

    memories.forEach((memory, index) => {
        const item = document.createElement("p");

        item.textContent = "♡ " + memory;

        list.appendChild(item);
    });
}


// LOAD SAVED MEMORIES

showMemories();


// SECRET POPUP

let secretClicks = 0;

document.querySelector(".logo").addEventListener("click", () => {
    secretClicks++;

    if (secretClicks >= 5) {
        document.getElementById("popup").classList.add("show");
        secretClicks = 0;
    }
});


function closePopup() {
    document.getElementById("popup").classList.remove("show");
}


console.log("★ AFTERSCHOOL 2000 ONLINE ★");
