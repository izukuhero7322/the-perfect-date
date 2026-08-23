/**
 * app.js
 * ------------------------------------------------------------
 * Main application entry point. Initializes the app, grabs DOM
 * references, wires up event listeners, and switches between
 * screens (landing → quiz → reveal → result).
 * ------------------------------------------------------------
 */

(function () {
  "use strict";

  let dom = {};

  function cacheDom() {
    dom = {
      hearts: document.getElementById("floating-hearts"),

      screenLanding: document.getElementById("screen-landing"),
      screenQuiz: document.getElementById("screen-quiz"),
      screenReveal: document.getElementById("screen-reveal"),
      screenResult: document.getElementById("screen-result"),

      nameInput: document.getElementById("name-input"),
      nameError: document.getElementById("name-error"),
      startBtn: document.getElementById("start-btn"),

      progressFill: document.getElementById("progress-fill"),
      questionCounter: document.getElementById("question-counter"),
      questionPrompt: document.getElementById("question-prompt"),
      optionsGrid: document.getElementById("options-grid"),

      revealText: document.getElementById("reveal-text"),
      revealEmoji: document.getElementById("reveal-emoji"),

      resultGreeting: document.getElementById("result-greeting"),
      resultEmoji: document.getElementById("result-emoji"),
      resultTitle: document.getElementById("result-title"),
      resultTagline: document.getElementById("result-tagline"),
      resultDescription: document.getElementById("result-description"),
      statsList: document.getElementById("stats-list"),
      dateItinerary: document.getElementById("date-itinerary"),
      shareBtn: document.getElementById("share-btn"),
      shareConfirmation: document.getElementById("share-confirmation"),
      restartBtn: document.getElementById("restart-btn")
    };
  }

  function init() {
    cacheDom();
    Animations.startFloatingHearts(dom.hearts);
    restorePlayerName();
    bindLandingEvents();
    bindQuizEvents();
    bindResultEvents();
  }

  // ---------------------------------------------------------
  // Landing screen
  // ---------------------------------------------------------

  function restorePlayerName() {
    const savedName = Storage.loadPlayerName();
    if (savedName) {
      dom.nameInput.value = savedName;
    }
  }

  function bindLandingEvents() {
    dom.startBtn.addEventListener("click", handleStart);
    dom.nameInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") handleStart();
    });
    dom.nameInput.addEventListener("input", () => {
      hideNameError();
    });
  }

  function handleStart() {
    const name = dom.nameInput.value.trim();
    if (!name) {
      showNameError();
      return;
    }

    Storage.savePlayerName(name);
    Game.start(name);

    Animations.switchScreen(dom.screenLanding, dom.screenQuiz);
    renderCurrentQuestion();
  }

  function showNameError() {
    dom.nameError.textContent = "Hey... the date needs a name first ❤️";
    dom.nameError.classList.add("visible");
    dom.nameInput.classList.add("input-error");
    dom.nameInput.focus();
  }

  function hideNameError() {
    dom.nameError.classList.remove("visible");
    dom.nameInput.classList.remove("input-error");
  }

  // ---------------------------------------------------------
  // Quiz screen
  // ---------------------------------------------------------

  function bindQuizEvents() {
    dom.optionsGrid.addEventListener("click", (e) => {
      const card = e.target.closest(".option-card");
      if (!card) return;
      handleAnswer(Number(card.dataset.index));
    });
  }

  function renderCurrentQuestion() {
    const question = Game.getCurrentQuestion();

    dom.questionCounter.textContent = `QUESTION ${Game.getCurrentQuestionNumber()} / ${Game.getTotalQuestions()}`;
    Animations.setProgress(dom.progressFill, Game.getProgressPercent());

    dom.questionPrompt.textContent = question.prompt;

    dom.optionsGrid.innerHTML = "";
    question.options.forEach((option, index) => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "option-card";
      card.dataset.index = String(index);
      card.setAttribute("aria-label", `${option.emoji} ${option.text}`);
      card.innerHTML = `
        <span class="option-emoji" aria-hidden="true">${option.emoji}</span>
        <span class="option-text">${option.text}</span>
      `;
      dom.optionsGrid.appendChild(card);
    });

    dom.screenQuiz.classList.add("question-enter");
    window.setTimeout(() => dom.screenQuiz.classList.remove("question-enter"), 400);
  }

  function handleAnswer(optionIndex) {
    const isFinished = Game.selectAnswer(optionIndex);

    if (isFinished) {
      Animations.switchScreen(dom.screenQuiz, dom.screenReveal);
      runRevealSequence();
    } else {
      renderCurrentQuestion();
    }
  }

  // ---------------------------------------------------------
  // Reveal screen
  // ---------------------------------------------------------

  function runRevealSequence() {
    Animations.playRevealSequence(
      (text, emoji) => {
        dom.revealText.textContent = text;
        dom.revealEmoji.textContent = emoji;
      },
      () => {
        const result = Game.determineResult();
        Storage.saveResult(result.key);
        Animations.switchScreen(dom.screenReveal, dom.screenResult);
        renderResult(result);
      }
    );
  }

  // ---------------------------------------------------------
  // Result screen
  // ---------------------------------------------------------

  function renderResult(result) {
    const name = Game.getPlayerName();

    dom.resultGreeting.textContent = name;
    dom.resultEmoji.textContent = result.emoji;
    dom.resultTitle.textContent = result.title;
    dom.resultTagline.textContent = `"${result.tagline}"`;
    dom.resultDescription.textContent = result.description;

    renderStats();
    renderItinerary(result);

    dom.shareConfirmation.classList.remove("visible");
  }

  const STAT_LABELS = {
    romantic: { label: "Romance", emoji: "💕" },
    adventurous: { label: "Adventure", emoji: "🔥" },
    chill: { label: "Chill", emoji: "🌙" },
    spontaneous: { label: "Spontaneous", emoji: "✨" },
    foodie: { label: "Foodie", emoji: "🍜" },
    dreamer: { label: "Dreamer", emoji: "💭" }
  };

  function renderStats() {
    const percentages = Game.getScorePercentages();
    // Show the four most prominent categories so the card stays readable.
    const sortedCategories = Object.keys(percentages)
      .sort((a, b) => percentages[b] - percentages[a])
      .slice(0, 4);

    dom.statsList.innerHTML = "";

    sortedCategories.forEach((category, i) => {
      const meta = STAT_LABELS[category];
      const row = document.createElement("div");
      row.className = "stat-row";
      row.innerHTML = `
        <div class="stat-label">
          <span aria-hidden="true">${meta.emoji}</span>
          <span>${meta.label}</span>
          <span class="stat-percent" data-percent-label>0%</span>
        </div>
        <div class="stat-bar-track">
          <div class="stat-bar-fill" data-percent-fill style="width: 0%"></div>
        </div>
      `;
      dom.statsList.appendChild(row);

      const fillEl = row.querySelector("[data-percent-fill]");
      const labelEl = row.querySelector("[data-percent-label]");
      Animations.animateStatBar(fillEl, labelEl, percentages[category], i * 180);
    });
  }

  function renderItinerary(result) {
    dom.dateItinerary.innerHTML = "";
    result.perfectDate.forEach((stop) => {
      const item = document.createElement("li");
      item.className = "itinerary-item";
      item.innerHTML = `
        <span class="itinerary-time">
          <span aria-hidden="true">${stop.emoji}</span> ${stop.time}
        </span>
        <span class="itinerary-activity">${stop.activity}</span>
      `;
      dom.dateItinerary.appendChild(item);
    });
  }

  function bindResultEvents() {
    dom.shareBtn.addEventListener("click", handleShare);
    dom.restartBtn.addEventListener("click", handleRestart);
  }

  function handleShare() {
    const result = Game.determineResult();
    Share.shareResult(
      Game.getPlayerName(),
      result,
      () => flashShareConfirmation("Shared! 💕"),
      () => flashShareConfirmation("Result copied! 💕"),
      () => flashShareConfirmation("Couldn't share right now.")
    );
  }

  function flashShareConfirmation(message) {
    dom.shareConfirmation.textContent = message;
    dom.shareConfirmation.classList.add("visible");
    window.setTimeout(() => {
      dom.shareConfirmation.classList.remove("visible");
    }, 2400);
  }

  function handleRestart() {
    Game.restart();
    Storage.clearGameState();
    Animations.switchScreen(dom.screenResult, dom.screenLanding);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
