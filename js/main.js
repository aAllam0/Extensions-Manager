const themeToggleBtn = document.querySelector(
  ".light-dark-toggle .toggle-button"
);
const filterBtns = document.querySelectorAll(
  ".extensions-control .filter-buttons button"
);
const extenstionCards = document.querySelectorAll(
  ".extensions-list .extension-card"
);

let isDarkTheme = false;

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme");
  const toggleImg = themeToggleBtn.querySelector("img");

  isDarkTheme = !isDarkTheme;
  document.documentElement.setAttribute(
    "data-theme",
    current === "light" ? "dark" : "light"
  );

  if (isDarkTheme) toggleImg.src = "assets/images/icon-sun.svg";
  else toggleImg.src = "assets/images/icon-moon.svg";
}

let extensionCardsArray = Array.from(extenstionCards);

function filterCards(filterCondition) {
  document.querySelector(".extensions-list").innerHTML = "";

  extensionCardsArray.forEach((card) => {
    isActive = card.querySelector(
      ".card-actions input[type='checkbox']"
    ).checked;

    if (filterCondition === "active") {
      if (isActive)
        document.querySelector(".extensions-list").appendChild(card);
    } else if (filterCondition === "inactive") {
      if (!isActive)
        document.querySelector(".extensions-list").appendChild(card);
    } else if (filterCondition === "all") {
      document.querySelector(".extensions-list").appendChild(card);
    }
  });
}

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((btn) => btn.classList.remove("active"));
    btn.classList.add("active");

    filterCards(btn.getAttribute("data-card"));
  });
});

extenstionCards.forEach((card) => {
  const removeBtn = card.querySelector(".card-actions .remove-button");
  removeBtn.addEventListener("click", () => {
    card.remove();

    extensionCardsArray.forEach((c, index) => {
      if (c === card) extensionCardsArray.splice(index, 1);
    });
    console.log(extensionCardsArray);
  });
});

themeToggleBtn.addEventListener("click", toggleTheme);
