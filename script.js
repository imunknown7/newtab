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
