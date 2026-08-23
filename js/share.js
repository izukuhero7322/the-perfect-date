/**
 * share.js
 * ------------------------------------------------------------
 * Handles sharing the quiz result via the Web Share API,
 * falling back to copying a message to the clipboard.
 * ------------------------------------------------------------
 */

const Share = (() => {
  function buildShareMessage(playerName, result) {
    const name = playerName ? `${playerName} is` : "I'm";
    return (
      `${name} ${result.emoji} ${result.title}!\n\n` +
      `"${result.tagline}"\n\n` +
      `Find your date personality in The Perfect Date 💕`
    );
  }

  async function shareResult(playerName, result, onSuccess, onFallback, onError) {
    const message = buildShareMessage(playerName, result);
    const shareData = {
      title: "The Perfect Date",
      text: message
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        if (typeof onSuccess === "function") onSuccess();
        return;
      } catch (err) {
        // User cancelled the share sheet — not a real error, do nothing.
        if (err && err.name === "AbortError") return;
        // Fall through to clipboard fallback for any other failure.
      }
    }

    copyToClipboard(message, onFallback, onError);
  }

  function copyToClipboard(text, onFallback, onError) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          if (typeof onFallback === "function") onFallback();
        })
        .catch(() => {
          legacyCopy(text, onFallback, onError);
        });
    } else {
      legacyCopy(text, onFallback, onError);
    }
  }

  function legacyCopy(text, onFallback, onError) {
    try {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      const successful = document.execCommand("copy");
      document.body.removeChild(textarea);
      if (successful) {
        if (typeof onFallback === "function") onFallback();
      } else if (typeof onError === "function") {
        onError();
      }
    } catch (err) {
      if (typeof onError === "function") onError();
    }
  }

  return { shareResult, buildShareMessage };
})();
