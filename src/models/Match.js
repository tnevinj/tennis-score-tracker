import mongoose from 'mongoose';

const matchSchema = new mongoose.Schema({
  player1: {
    type: String,
    required: true,
  },
  player2: {
    type: String,
    required: true,
  },
  tournament: {
    type: String,
    required: true,
  },
  matchFormat: {
    type: String,
    required: true,
  },
  set1: {
    type: Array,
    default: [0, 0],
    required: true,
  },
  set2: {
    type: Array,
    default: [0, 0],
    required: true,
  },
  set3: {
    type: Array,
    default: [0, 0],
    required: true,
  },
  tiebreak1: {
    type: Array,
    default: [0, 0],
    required: true,
  },
  tiebreak2: {
    type: Array,
    default: [0, 0],
    required: true,
  },
  tiebreak3: {
    type: Array,
    default: [0, 0],
    required: true,
  },
  game: {
    type: Array,
    default: [0, 0],
    required: true,
  },
  supertiebreak: {
    type: Array,
    default: [0, 0],
    required: true,
  },
  status: {
    type: String,
    default: 'upcoming',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  serving: {
    type: Number,  // 0 for player1, 1 for player2
    default: 0,    // Default to player1 serving first
    required: true,
  },
  initialServer: {
    type: Number,  // 0 for player1, 1 for player2
    default: 0,    // Track who served first in the match
    required: true,
  },
  retirement: {
    type: Boolean,
    default: false,
    required: true,
  },
  retiredPlayer: {
    type: Number,  // 0 for player1, 1 for player2, null if no retirement
    default: null,
  },
  retirementReason: {
    type: String,
    default: '',
  },
});

export default mongoose.models.Match || mongoose.model('Match', matchSchema);
