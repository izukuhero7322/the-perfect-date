/**
 * animations.js
 * ------------------------------------------------------------
 * Reusable visual effects: floating hearts/sparkles in the
 * background, animated progress bar, animated stat bars,
 * and the multi-step result reveal sequence.
 * ------------------------------------------------------------
 */

const Animations = (() => {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  let heartsIntervalId = null;

  /**
   * Continuously spawns floating hearts/sparkles inside a container.
   * Respects prefers-reduced-motion by spawning far fewer, static ones.
   */
  function startFloatingHearts(containerEl) {
    if (!containerEl) return;
    containerEl.innerHTML = "";

    const symbols = ["❤️", "💕", "✨", "💫", "⭐"];
    const count = prefersReducedMotion ? 6 : 18;

    for (let i = 0; i < count; i++) {
      spawnParticle(containerEl, symbols);
    }

    if (!prefersReducedMotion) {
      heartsIntervalId = window.setInterval(() => {
        spawnParticle(containerEl, symbols);
      }, 900);
    }
  }

  function spawnParticle(containerEl, symbols) {
    const el = document.createElement("span");
    el.className = "floating-particle";
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    el.style.left = `${Math.random() * 100}%`;
    el.style.fontSize = `${0.8 + Math.random() * 1.4}rem`;
    el.style.animationDuration = `${prefersReducedMotion ? 0 : 8 + Math.random() * 10}s`;
    el.style.animationDelay = `${Math.random() * 2}s`;
    el.style.opacity = `${0.3 + Math.random() * 0.5}`;

    containerEl.appendChild(el);

    // Clean up after the animation finishes so the DOM doesn't grow forever.
    const lifetime = prefersReducedMotion ? 0 : 18000;
    if (lifetime > 0) {
      window.setTimeout(() => {
        if (el.parentNode) el.parentNode.removeChild(el);
      }, lifetime);
    }
  }

  function stopFloatingHearts() {
    if (heartsIntervalId) {
      window.clearInterval(heartsIntervalId);
      heartsIntervalId = null;
    }
  }

  /**
   * Animates the top progress bar to a given percentage (0-100).
   */
  function setProgress(progressFillEl, percent) {
    if (!progressFillEl) return;
    requestAnimationFrame(() => {
      progressFillEl.style.width = `${percent}%`;
    });
  }

  /**
   * Animates a single stat bar's fill width, and counts its label up.
   */
  function animateStatBar(fillEl, labelEl, targetPercent, delayMs = 0) {
    if (!fillEl) return;
    window.setTimeout(() => {
      fillEl.style.width = `${targetPercent}%`;
      if (labelEl) {
        animateCountUp(labelEl, targetPercent, prefersReducedMotion ? 0 : 900);
      }
    }, prefersReducedMotion ? 0 : delayMs);
  }

  function animateCountUp(labelEl, target, durationMs) {
    if (durationMs <= 0) {
      labelEl.textContent = `${target}%`;
      return;
    }
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / durationMs, 1);
      const value = Math.round(progress * target);
      labelEl.textContent = `${value}%`;
      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }
    requestAnimationFrame(tick);
  }

  /**
   * Plays the "Analyzing your choices..." reveal sequence.
   * Calls onStepChange(text, emoji) for each step, then onComplete.
   */
  function playRevealSequence(onStepChange, onComplete) {
    const steps = [
      { text: "Analyzing your choices...", emoji: "❤️" },
      { text: "Reading your vibes...", emoji: "✨" },
      { text: "Finding your perfect date...", emoji: "💕" }
    ];

    const stepDuration = prefersReducedMotion ? 200 : 1100;
    let i = 0;

    function next() {
      if (i >= steps.length) {
        if (typeof onComplete === "function") onComplete();
        return;
      }
      if (typeof onStepChange === "function") {
        onStepChange(steps[i].text, steps[i].emoji);
      }
      i += 1;
      window.setTimeout(next, stepDuration);
    }

    next();
  }

  /**
   * Simple fade/slide screen transition. Hides the current screen,
   * shows the next one, and toggles the .active class for CSS to animate.
   */
  function switchScreen(fromEl, toEl) {
    if (fromEl) {
      fromEl.classList.remove("active");
      fromEl.setAttribute("aria-hidden", "true");
    }
    if (toEl) {
      toEl.classList.add("active");
      toEl.removeAttribute("aria-hidden");
      const focusTarget = toEl.querySelector("[data-autofocus]");
      if (focusTarget) {
        window.setTimeout(() => focusTarget.focus(), prefersReducedMotion ? 0 : 300);
      }
    }
  }

  return {
    prefersReducedMotion,
    startFloatingHearts,
    stopFloatingHearts,
    setProgress,
    animateStatBar,
    playRevealSequence,
    switchScreen
  };
})();
