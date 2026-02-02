const themeToggleBtn = document.querySelector(
  ".light-dark-toggle .toggle-button",
);
const filterBtns = document.querySelectorAll(
  ".extensions-control .filter-buttons button",
);
const extenstionCards = document.querySelectorAll(
  ".extensions-list .extension-card",
);

let isDarkTheme = false;

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme");
  const toggleImg = themeToggleBtn.querySelector("img");

  isDarkTheme = !isDarkTheme;
  document.documentElement.setAttribute(
    "data-theme",
    current === "light" ? "dark" : "light",
  );

  if (isDarkTheme) toggleImg.src = "assets/images/icon-sun.svg";
  else toggleImg.src = "assets/images/icon-moon.svg";
}

let extensionCardsArray = [];
let extensionsData = [];

function createExtensionCard(extension) {
  const card = document.createElement("div");
  card.className = "extension-card";

  card.innerHTML = `
    <div class="card-header">
      <div class="icon">
        <img
          src="${extension.logo}"
          alt="${extension.name} extension logo"
        />
      </div>
      <div class="text">
        <h3 class="extension-name">${extension.name}</h3>
        <p class="description">
          ${extension.description}
        </p>
      </div>
    </div>
    <div class="card-actions">
      <button class="remove-button highlight-effect">Remove</button>
      <div class="active-toggle">
        <label class="switch">
          <input type="checkbox" ${extension.isActive ? "checked" : ""} />
          <span class="slider"></span>
        </label>
      </div>
    </div>
  `;

  return card;
}

function renderExtensions() {
  const extensionsList = document.querySelector(".extensions-list");
  extensionsList.innerHTML = "";

  extensionsData.forEach((extension) => {
    const card = createExtensionCard(extension);
    extensionsList.appendChild(card);
    extensionCardsArray.push(card);
  });

  attachCardEventListeners();
}

function attachCardEventListeners() {
  extensionCardsArray.forEach((card) => {
    const removeBtn = card.querySelector(".card-actions .remove-button");
    removeBtn.addEventListener("click", () => {
      card.remove();

      extensionCardsArray.forEach((c, index) => {
        if (c === card) extensionCardsArray.splice(index, 1);
      });
    });
  });
}

function filterCards(filterCondition) {
  const extensionsList = document.querySelector(".extensions-list");
  const allCards = extensionsList.querySelectorAll(".extension-card");

  allCards.forEach((card) => {
    const isActive = card.querySelector(
      '.card-actions input[type="checkbox"]',
    ).checked;

    if (filterCondition === "active") {
      card.style.display = isActive ? "" : "none";
    } else if (filterCondition === "inactive") {
      card.style.display = !isActive ? "" : "none";
      card.style.display = "";
    } else if (filterCondition === "all") {
    }
  });
}

fetch("./data.json")
  .then((response) => response.json())
  .then((data) => {
    extensionsData = data;
    renderExtensions();
  })
  .catch((error) => console.error("Error loading extensions data:", error));

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((btn) => btn.classList.remove("active"));
    btn.classList.add("active");

    filterCards(btn.getAttribute("data-card"));
  });
});

themeToggleBtn.addEventListener("click", toggleTheme);
