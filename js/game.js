/**
 * game.js
 * ------------------------------------------------------------
 * Owns the quiz's runtime state: current question index,
 * accumulated category scores, answer selection, and final
 * personality determination. No DOM manipulation happens here
 * (that's app.js) — this file is pure game logic.
 * ------------------------------------------------------------
 */

const Game = (() => {
  let currentQuestionIndex = 0;
  let scores = {};
  let playerName = "";

  function resetScores() {
    scores = {
      romantic: 0,
      adventurous: 0,
      chill: 0,
      spontaneous: 0,
      foodie: 0,
      dreamer: 0
    };
  }

  function start(name) {
    playerName = name;
    currentQuestionIndex = 0;
    resetScores();
  }

  function getPlayerName() {
    return playerName;
  }

  function setPlayerName(name) {
    playerName = name;
  }

  function getCurrentQuestion() {
    return questions[currentQuestionIndex];
  }

  function getCurrentQuestionNumber() {
    return currentQuestionIndex + 1;
  }

  function getTotalQuestions() {
    return questions.length;
  }

  function getProgressPercent() {
    return Math.round((getCurrentQuestionNumber() / getTotalQuestions()) * 100);
  }

  /**
   * Applies the chosen option's score contributions and advances
   * to the next question. Returns true if the quiz is now finished.
   */
  function selectAnswer(optionIndex) {
    const question = getCurrentQuestion();
    const option = question.options[optionIndex];
    if (!option) return false;

    Object.keys(option.scores).forEach((category) => {
      scores[category] = (scores[category] || 0) + option.scores[category];
    });

    const isLastQuestion = currentQuestionIndex >= questions.length - 1;
    if (!isLastQuestion) {
      currentQuestionIndex += 1;
    }
    return isLastQuestion;
  }

  function getScores() {
    return { ...scores };
  }

  /**
   * Returns each category as a percentage of the total points
   * earned, for the personality statistics bars. Guaranteed to
   * sum to ~100 (rounding aside).
   */
  function getScorePercentages() {
    const total = Object.values(scores).reduce((sum, v) => sum + v, 0);
    const percentages = {};
    Object.keys(scores).forEach((category) => {
      percentages[category] = total > 0 ? Math.round((scores[category] / total) * 100) : 0;
    });
    return percentages;
  }

  /**
   * Determines the winning personality. Ties are broken using
   * the fixed TIE_BREAK_ORDER from results.js so the outcome is
   * always deterministic, never random.
   */
  function determineResult() {
    const maxScore = Math.max(...Object.values(scores));
    const topCategories = Object.keys(scores).filter(
      (category) => scores[category] === maxScore
    );

    let winningCategory = topCategories[0];
    if (topCategories.length > 1) {
      winningCategory = TIE_BREAK_ORDER.find((category) =>
        topCategories.includes(category)
      );
    }

    return results[winningCategory];
  }

  function restart() {
    currentQuestionIndex = 0;
    resetScores();
  }

  return {
    start,
    getPlayerName,
    setPlayerName,
    getCurrentQuestion,
    getCurrentQuestionNumber,
    getTotalQuestions,
    getProgressPercent,
    selectAnswer,
    getScores,
    getScorePercentages,
    determineResult,
    restart
  };
})();
