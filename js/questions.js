/**
 * questions.js
 * ------------------------------------------------------------
 * Holds all quiz question data for "The Perfect Date".
 * Each option carries a `scores` object that quietly adds
 * points toward one or more hidden personality categories:
 *   romantic | adventurous | chill | spontaneous | foodie | dreamer
 *
 * No UI logic lives in this file — see game.js / app.js.
 * ------------------------------------------------------------
 */

const questions = [
  {
    id: 1,
    prompt: "It's your first date.\nWhere are you going?",
    options: [
      {
        text: "Beach at sunset",
        emoji: "🌊",
        scores: { romantic: 3, dreamer: 2, chill: 1 }
      },
      {
        text: "Movie and popcorn",
        emoji: "🎬",
        scores: { chill: 3, romantic: 1 }
      },
      {
        text: "Explore the city",
        emoji: "🌃",
        scores: { adventurous: 3, spontaneous: 1 }
      },
      {
        text: "Find a late-night food spot",
        emoji: "🍜",
        scores: { foodie: 3, spontaneous: 1 }
      }
    ]
  },
  {
    id: 2,
    prompt: 'Your date suddenly says:\n"Let\'s go somewhere unexpected."',
    options: [
      {
        text: "Start driving with no destination",
        emoji: "🚗",
        scores: { spontaneous: 3, adventurous: 2 }
      },
      {
        text: "Explore somewhere new",
        emoji: "🌃",
        scores: { adventurous: 3, dreamer: 1 }
      },
      {
        text: "Head toward the beach",
        emoji: "🏖️",
        scores: { romantic: 2, dreamer: 2 }
      },
      {
        text: "Find the best food nearby",
        emoji: "🍔",
        scores: { foodie: 3, spontaneous: 1 }
      }
    ]
  },
  {
    id: 3,
    prompt: "It's midnight and neither of you\nwants the date to end.\n\nWhat happens?",
    options: [
      {
        text: "Talk for hours",
        emoji: "🌙",
        scores: { romantic: 2, chill: 2, dreamer: 1 }
      },
      {
        text: "Listen to music together",
        emoji: "🎵",
        scores: { dreamer: 3, romantic: 1 }
      },
      {
        text: "Go for a night drive",
        emoji: "🚗",
        scores: { adventurous: 2, spontaneous: 2 }
      },
      {
        text: "Get one last meal",
        emoji: "🍜",
        scores: { foodie: 3, chill: 1 }
      }
    ]
  },
  {
    id: 4,
    prompt: "Your date gives you a surprise.\n\nWhat would make you happiest?",
    options: [
      {
        text: "A handwritten letter",
        emoji: "💌",
        scores: { romantic: 3, dreamer: 1 }
      },
      {
        text: "A thoughtful gift",
        emoji: "🎁",
        scores: { chill: 2, romantic: 1 }
      },
      {
        text: "Flowers",
        emoji: "🌹",
        scores: { romantic: 2, dreamer: 2 }
      },
      {
        text: "A surprise experience",
        emoji: "🎟️",
        scores: { adventurous: 2, spontaneous: 2 }
      }
    ]
  },
  {
    id: 5,
    prompt: "What's the perfect date atmosphere?",
    options: [
      {
        text: "Quiet sunset",
        emoji: "🌅",
        scores: { romantic: 2, dreamer: 2 }
      },
      {
        text: "Magical night",
        emoji: "✨",
        scores: { dreamer: 3, romantic: 1 }
      },
      {
        text: "Exciting adventure",
        emoji: "🔥",
        scores: { adventurous: 3, spontaneous: 1 }
      },
      {
        text: "Cozy and comfortable",
        emoji: "☕",
        scores: { chill: 3 }
      }
    ]
  },
  {
    id: 6,
    prompt: "Your date asks: \"What should we eat?\"\n\nYour honest answer?",
    options: [
      {
        text: "Whatever's cozy and familiar",
        emoji: "🍝",
        scores: { chill: 3, foodie: 1 }
      },
      {
        text: "Let's find the best-rated spot in town",
        emoji: "⭐",
        scores: { foodie: 3, adventurous: 1 }
      },
      {
        text: "Street food, wherever smells good",
        emoji: "🌮",
        scores: { spontaneous: 2, foodie: 2 }
      },
      {
        text: "Somewhere with candles and a view",
        emoji: "🕯️",
        scores: { romantic: 3, dreamer: 1 }
      }
    ]
  },
  {
    id: 7,
    prompt: "Be honest — how do you actually plan dates?",
    options: [
      {
        text: "I have the whole evening mapped out",
        emoji: "📋",
        scores: { romantic: 2, chill: 1 }
      },
      {
        text: "I have zero plan, we'll figure it out",
        emoji: "🎲",
        scores: { spontaneous: 3, adventurous: 1 }
      },
      {
        text: "I just want everyone comfortable and fed",
        emoji: "🍽️",
        scores: { foodie: 2, chill: 2 }
      },
      {
        text: "I imagine it like a scene from a film",
        emoji: "🎞️",
        scores: { dreamer: 3, romantic: 1 }
      }
    ]
  }
];
