// LevelUp: simple JavaScript for the Games and Register pages

// ----- Data: an array of objects, one object per game -----
const games = [
  { title: "Neon Drift", category: "Racing", rating: 4.7, price: 0, description: "A fast street racer with a pumping soundtrack.", image: "images/neon-drift.jpg" },
  { title: "Castle Siege", category: "Action", rating: 4.4, price: 2500, description: "Defend your castle against waves of enemies.", image: "images/castle-siege.jpg" },
  { title: "Pixel Dominoes", category: "Puzzle", rating: 4.0, price: 0, description: "The classic yard game with online lobbies.", image: "images/pixel-dominoes.jpg" },
  { title: "Star Striker", category: "Action", rating: 4.3, price: 0, description: "A fast team shooter set among the stars.", image: "images/star-striker.jpg" },
  { title: "Cricket Clash", category: "Sports", rating: 4.6, price: 2000, description: "Lead your favourite side to glory.", image: "images/cricket-clash.jpg" },
  { title: "Brain Blocks", category: "Puzzle", rating: 4.1, price: 900, description: "Slide the blocks and solve one hundred puzzles.", image: "images/brain-blocks.jpg" }
];

// ----- Show the games that match a category -----
function showGames(category) {
  const grid = document.getElementById("gameGrid");
  let html = "";
  let count = 0;

  for (let i = 0; i < games.length; i++) {
    const game = games[i];

    if (category === "All" || game.category === category) {
      let priceText = "J$" + game.price;
      if (game.price === 0) {
        priceText = "Free";
      }

      html += '<div class="col-12 col-sm-6 col-lg-4">' +
        '<article class="card h-100">' +
        '<img src="' + game.image + '" class="card-img-top game-cover" alt="Cover art for ' + game.title + '">' +
        '<div class="card-body text-center">' +
        '<h2 class="h5 card-title">' + game.title + '</h2>' +
        '<p class="mb-1">' + game.category + ' | ' + priceText + '</p>' +
        '<button type="button" class="btn btn-main details-btn" data-index="' + i + '">View details</button>' +
        '</div></article></div>';
      count++;
    }
  }

  grid.innerHTML = html;
  document.getElementById("gameCount").textContent = "Showing " + count + " game(s) in " + category + ".";
}

// ----- Games page -----
function setupGamesPage() {
  showGames("All");

  // Filter buttons: change which games are visible
  const buttons = document.querySelectorAll(".filter-btn");
  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      buttons.forEach(function (b) {
        b.classList.remove("btn-main");
        b.classList.add("btn-outline-light");
        b.setAttribute("aria-pressed", "false");
      });
      button.classList.remove("btn-outline-light");
      button.classList.add("btn-main");
      button.setAttribute("aria-pressed", "true");
      showGames(button.dataset.category);
    });
  });

  // jQuery: one click handler for every "View details" button.
  // It fills the Bootstrap modal with the chosen game, then opens it.
  $("#gameGrid").on("click", ".details-btn", function () {
    const game = games[$(this).data("index")];
    $("#gameModalImage").attr({ src: game.image, alt: "Cover art for " + game.title });
    $("#gameModalTitle").text(game.title);
    $("#gameModalDescription").text(game.description);
    $("#gameModalCategory").text(game.category);
    $("#gameModalRating").text(game.rating);
    $("#gameModalPrice").text(game.price === 0 ? "Free" : "J$" + game.price);

    const modal = new bootstrap.Modal(document.getElementById("gameModal"));
    modal.show();
  });
}

// ----- Register page -----

// Marks one field as valid or invalid. Returns true when the field is valid.
function checkField(id, isValid) {
  const field = document.getElementById(id);
  if (isValid) {
    field.classList.remove("is-invalid");
  } else {
    field.classList.add("is-invalid");
  }
  return isValid;
}

function setupRegisterPage() {
  const form = document.getElementById("registerForm");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Read the values from the form
    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const tournament = document.getElementById("tournament").value;
    const rulesAgreed = document.getElementById("rules").checked;

    // Validate every field (each call marks its own field)
    const nameOk = checkField("fullName", fullName.length >= 2);
    const emailOk = checkField("email", email.includes("@") && email.includes("."));
    const tournamentOk = checkField("tournament", tournament !== "");
    const rulesOk = checkField("rules", rulesAgreed);

    const message = document.getElementById("formMessage");
    message.classList.remove("d-none");

    if (nameOk && emailOk && tournamentOk && rulesOk) {
      // Success: confirmation message and Bootstrap toast
      message.className = "alert alert-success";
      message.textContent = "Thank you " + fullName + "! You are registered for " + tournament + ".";
      document.getElementById("toastBody").textContent = "Registration confirmed for " + tournament + ".";
      new bootstrap.Toast(document.getElementById("successToast")).show();
      form.reset();
    } else {
      // Problem: tell the user to fix the highlighted fields
      message.className = "alert alert-danger";
      message.textContent = "Please fix the highlighted fields and try again.";
    }
  });
}

// ----- Features shared by every page -----
function setupCommon() {
  // jQuery: show the back to top button after scrolling down, and jump to the top on click
  const $scrollTop = $("#scrollTop");
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 300) {
      $scrollTop.show();
    } else {
      $scrollTop.hide();
    }
  });
  $scrollTop.on("click", function () {
    $(window).scrollTop(0);
  });
}

// ----- Start -----
document.addEventListener("DOMContentLoaded", function () {
  setupCommon();
  if (document.getElementById("gameGrid")) {
    setupGamesPage();
  }
  if (document.getElementById("registerForm")) {
    setupRegisterPage();
  }
});
