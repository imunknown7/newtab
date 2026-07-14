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

// search
const searchInput = document.getElementById("search-input");

searchInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    const query = searchInput.value.trim();

    if (query === "") return;

    const url = "https://www.google.com/search?q=" + encodeURIComponent(query);

    window.location.href = url;
  }
});

// NASA APOD BACKGROUND

const background = document.querySelector(".background");
background.style.backgroundImage = "url('backgrounds/defaultbg.jpg')";

fetch(`https://api.nasa.gov/planetary/apod?api_key=pvidCKfvbcTQOPGd1CI1G6FGfOjjvKk9hc8kH2xc`)
  .then((response) => response.json())
  .then((data) => {
    if (data.media_type === "image") {
      background.style.backgroundImage = `url(${data.hdurl || data.url})`;
    }
  })
  .catch((error) => {
    console.error(error);
  });
