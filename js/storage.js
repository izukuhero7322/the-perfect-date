/**
 * storage.js
 * ------------------------------------------------------------
 * Thin wrapper around LocalStorage. Every function fails
 * silently (returns null / false) if LocalStorage is
 * unavailable, so the app still works without it.
 * ------------------------------------------------------------
 */

const STORAGE_KEYS = {
  PLAYER_NAME: "tpd_playerName",
  LAST_RESULT: "tpd_lastResult",
  QUIZ_COMPLETED: "tpd_quizCompleted"
};

const Storage = (() => {
  let available = null;

  function isAvailable() {
    if (available !== null) return available;
    try {
      const testKey = "__tpd_test__";
      window.localStorage.setItem(testKey, "1");
      window.localStorage.removeItem(testKey);
      available = true;
    } catch (err) {
      available = false;
    }
    return available;
  }

  function savePlayerName(name) {
    if (!isAvailable()) return false;
    try {
      window.localStorage.setItem(STORAGE_KEYS.PLAYER_NAME, name);
      return true;
    } catch (err) {
      return false;
    }
  }

  function loadPlayerName() {
    if (!isAvailable()) return "";
    try {
      return window.localStorage.getItem(STORAGE_KEYS.PLAYER_NAME) || "";
    } catch (err) {
      return "";
    }
  }

  function saveResult(resultKey) {
    if (!isAvailable()) return false;
    try {
      window.localStorage.setItem(STORAGE_KEYS.LAST_RESULT, resultKey);
      window.localStorage.setItem(STORAGE_KEYS.QUIZ_COMPLETED, "true");
      return true;
    } catch (err) {
      return false;
    }
  }

  function loadResult() {
    if (!isAvailable()) return null;
    try {
      return window.localStorage.getItem(STORAGE_KEYS.LAST_RESULT);
    } catch (err) {
      return null;
    }
  }

  function hasCompletedQuiz() {
    if (!isAvailable()) return false;
    try {
      return window.localStorage.getItem(STORAGE_KEYS.QUIZ_COMPLETED) === "true";
    } catch (err) {
      return false;
    }
  }

  function clearGameState() {
    if (!isAvailable()) return false;
    try {
      window.localStorage.removeItem(STORAGE_KEYS.LAST_RESULT);
      window.localStorage.removeItem(STORAGE_KEYS.QUIZ_COMPLETED);
      return true;
    } catch (err) {
      return false;
    }
  }

  return {
    savePlayerName,
    loadPlayerName,
    saveResult,
    loadResult,
    hasCompletedQuiz,
    clearGameState
  };
})();
