/**
 * results.js
 * ------------------------------------------------------------
 * Defines every possible personality outcome. game.js picks
 * one of these keys based on the highest scoring category.
 * ------------------------------------------------------------
 */

const results = {
  romantic: {
    key: "romantic",
    emoji: "💕",
    title: "The Hopeless Romantic",
    tagline: "You don't just want a date. You want a memory.",
    description:
      "For you, the little moments matter most. A meaningful conversation, a beautiful sunset, and someone who actually listens can mean everything.",
    perfectDate: [
      { time: "6:30 PM", emoji: "🌅", activity: "Sunset walk" },
      { time: "8:00 PM", emoji: "🍽️", activity: "Candlelight dinner" },
      { time: "9:30 PM", emoji: "🎵", activity: "Soft music" },
      { time: "11:00 PM", emoji: "🌙", activity: "Long conversation" }
    ]
  },
  adventurous: {
    key: "adventurous",
    emoji: "🌙",
    title: "The Midnight Adventurer",
    tagline: "Routine isn't really your thing.",
    description:
      "You want stories worth remembering, unexpected adventures and nights that somehow turn into mornings.",
    perfectDate: [
      { time: "7:00 PM", emoji: "🚗", activity: "Night drive" },
      { time: "8:30 PM", emoji: "🌃", activity: "City exploration" },
      { time: "10:00 PM", emoji: "🍜", activity: "Midnight food" },
      { time: "11:30 PM", emoji: "🌌", activity: "Watching the stars" }
    ]
  },
  chill: {
    key: "chill",
    emoji: "☕",
    title: "The Chill Soul",
    tagline: "You don't need an extravagant date.",
    description:
      "Give you the right person, a comfortable place and a good conversation, and you're already having the perfect night.",
    perfectDate: [
      { time: "6:00 PM", emoji: "☕", activity: "Coffee somewhere cozy" },
      { time: "7:30 PM", emoji: "🎬", activity: "Movie night in" },
      { time: "9:00 PM", emoji: "🛋️", activity: "Easy conversation" },
      { time: "10:30 PM", emoji: "🌙", activity: "Comfortable silence" }
    ]
  },
  spontaneous: {
    key: "spontaneous",
    emoji: "🔥",
    title: "The Spontaneous One",
    tagline: "Plans are optional.",
    description:
      "The best memories usually start with: \"Why not?\"",
    perfectDate: [
      { time: "6:00 PM", emoji: "🎲", activity: "No plan, just vibes" },
      { time: "7:15 PM", emoji: "🚗", activity: "Drive somewhere new" },
      { time: "8:45 PM", emoji: "🎟️", activity: "Whatever's happening nearby" },
      { time: "10:30 PM", emoji: "🌆", activity: "Wherever the night leads" }
    ]
  },
  foodie: {
    key: "foodie",
    emoji: "🍜",
    title: "The Foodie Lover",
    tagline: "The fastest way to your heart might just involve really good food.",
    description:
      "You believe a great meal says more than a thousand grand gestures. The right dish, shared with the right person, is basically romance.",
    perfectDate: [
      { time: "6:30 PM", emoji: "🥟", activity: "Street food crawl" },
      { time: "8:00 PM", emoji: "🍽️", activity: "That restaurant you've been eyeing" },
      { time: "9:30 PM", emoji: "🍮", activity: "Dessert somewhere new" },
      { time: "10:30 PM", emoji: "🍜", activity: "One last late-night bite" }
    ]
  },
  dreamer: {
    key: "dreamer",
    emoji: "✨",
    title: "The Dreamer",
    tagline: "You see romance differently.",
    description:
      "For you, it's about atmosphere, meaningful moments and a little bit of magic.",
    perfectDate: [
      { time: "7:00 PM", emoji: "✨", activity: "Somewhere that feels like a film set" },
      { time: "8:30 PM", emoji: "🎵", activity: "Music that matches the mood" },
      { time: "9:45 PM", emoji: "🌌", activity: "Stargazing" },
      { time: "11:00 PM", emoji: "💭", activity: "Talking about everything and nothing" }
    ]
  }
};

/**
 * The fixed priority order used only to break ties in game.js.
 * Earlier categories win in a tie — chosen to favor the
 * "warmest" outcomes first.
 */
const TIE_BREAK_ORDER = [
  "romantic",
  "dreamer",
  "adventurous",
  "foodie",
  "spontaneous",
  "chill"
];
