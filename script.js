// live clock and date

const clock = document.getElementById("clock");
const date = document.getElementById("date");

function updateClock() {
  const now = new Date();
  // time
  clock.textContent = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  // date
  date.textContent = now.toLocaleDateString([], {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}
updateClock();
setInterval(updateClock, 1000);

// NASA APOD BACKGROUND

const background = document.querySelector(".background");
background.style.backgroundImage = "url('backgrounds/defaultbg.jpg')";

fetch(
  `https://api.nasa.gov/planetary/apod?api_key=pvidCKfvbcTQOPGd1CI1G6FGfOjjvKk9hc8kH2xc`
)
  .then((response) => response.json())
  .then((data) => {
    if (data.media_type === "image") {
      background.style.backgroundImage = `url(${data.hdurl || data.url})`;
    }
  })
  .catch((error) => {
    console.error(error);
  });

// search selector + searching part

const searchInput = document.getElementById("search-input");

const engineButton = document.getElementById("engine-button");
const engineIcon = document.getElementById("engine-icon");
const dropdown = document.getElementById("engine-dropdown");

const searchEngines = {
  google: {
    icon: "icons/google.svg",
    url: "https://www.google.com/search?q=",
  },

  duckduckgo: {
    icon: "icons/duckduckgo.svg",
    url: "https://duckduckgo.com/?q=",
  },

  brave: {
    icon: "icons/brave.svg",
    url: "https://search.brave.com/search?q=",
  },

  startpage: {
    icon: "icons/startpage.svg",
    url: "https://www.startpage.com/search?q=",
  },
};

let currentEngine = localStorage.getItem("searchEngine") || "google";

function setEngine(engine) {
  currentEngine = engine;

  engineIcon.src = searchEngines[engine].icon;

  localStorage.setItem("searchEngine", engine);
}

setEngine(currentEngine);

engineButton.addEventListener("click", (e) => {
  e.stopPropagation();

  dropdown.classList.toggle("hidden");
});

document.addEventListener("click", () => {
  dropdown.classList.add("hidden");
});

document.querySelectorAll(".engine-option").forEach((option) => {
  option.addEventListener("click", () => {
    setEngine(option.dataset.engine);

    dropdown.classList.add("hidden");
  });
});

searchInput.addEventListener("keydown", (e) => {
  if (e.key !== "Enter") return;

  const query = searchInput.value.trim();

  if (!query) return;

  const url = searchEngines[currentEngine].url + encodeURIComponent(query);
  window.open(url, "_blank");
});


// search box focus

searchInput.addEventListener("focus", () => {
  document.body.classList.add("search-active");
});

searchInput.addEventListener("blur", () => {
  document.body.classList.remove("search-active");
});