import { describe, it, expect } from 'vitest';
import { addPoint1, addPoint2, retirePlayer1, retirePlayer2 } from './addPoint';

// A fresh match in the shape MatchDetails.jsx passes to addPoint*.
// The scoring functions mutate their argument, so every test builds its own.
const newMatch = (overrides = {}) => ({
  status: 'in-progress',
  matchFormat: 'best-of-3',
  game: [0, 0],
  set1: [0, 0],
  set2: [0, 0],
  set3: [0, 0],
  tiebreak1: [0, 0],
  tiebreak2: [0, 0],
  tiebreak3: [0, 0],
  supertiebreak: [0, 0],
  serving: 0,
  ...overrides,
});

const points = (match, addPoint, n) => {
  for (let i = 0; i < n; i++) match = addPoint(match);
  return match;
};

describe('games', () => {
  it('counts 0-15-30-40-game, then resets the game and adds to the set', () => {
    let m = points(newMatch(), addPoint1, 3);
    expect(m.game).toEqual([3, 0]);
    m = addPoint1(m);
    expect(m.game).toEqual([0, 0]);
    expect(m.set1).toEqual([1, 0]);
  });

  it('deuce -> advantage -> game', () => {
    let m = addPoint1(newMatch({ game: [3, 3] }));
    expect(m.game).toEqual([4, 3]);
    expect(m.set1).toEqual([0, 0]);
    m = addPoint1(m);
    expect(m.game).toEqual([0, 0]);
    expect(m.set1).toEqual([1, 0]);
  });

  it('losing advantage returns the game to deuce', () => {
    const m = addPoint2(newMatch({ game: [4, 3] }));
    expect(m.game).toEqual([3, 3]);
  });

  it('short-deuce: the point at deuce decides the game', () => {
    const m = addPoint2(newMatch({ matchFormat: 'short-deuce', game: [3, 3] }));
    expect(m.game).toEqual([0, 0]);
    expect(m.set1).toEqual([0, 1]);
  });

  it('full-deuce formats do not end the game at 4-3', () => {
    const m = addPoint1(newMatch({ matchFormat: 'supertiebreak', game: [3, 3] }));
    expect(m.game).toEqual([4, 3]);
    expect(m.set1).toEqual([0, 0]);
  });
});

describe('sets', () => {
  it('is won at 6-4 and play moves to set 2', () => {
    let m = addPoint1(newMatch({ set1: [5, 4], game: [3, 0] }));
    expect(m.set1).toEqual([6, 4]);
    m = points(m, addPoint1, 4);
    expect(m.set2).toEqual([1, 0]);
    expect(m.set1).toEqual([6, 4]);
  });

  it('is not won at 6-5, but is at 7-5', () => {
    let m = addPoint1(newMatch({ set1: [5, 5], game: [3, 0] }));
    expect(m.set1).toEqual([6, 5]);
    m = points(m, addPoint1, 4);
    expect(m.set1).toEqual([7, 5]);
    m = points(m, addPoint2, 4);
    expect(m.set2).toEqual([0, 1]);
  });
});

describe('tiebreaks', () => {
  it('start at 6-6: points go to the tiebreak, not the game', () => {
    const m = addPoint1(newMatch({ set1: [6, 6] }));
    expect(m.tiebreak1).toEqual([1, 0]);
    expect(m.game).toEqual([0, 0]);
  });

  it('must be won by two', () => {
    let m = addPoint1(newMatch({ set1: [6, 6], tiebreak1: [6, 6] }));
    expect(m.tiebreak1).toEqual([7, 6]);
    expect(m.set1).toEqual([6, 6]);
    m = addPoint1(m);
    expect(m.tiebreak1).toEqual([8, 6]);
    expect(m.set1).toEqual([7, 6]);
  });

  it('in set 2 are scored in tiebreak2', () => {
    let m = newMatch({ set1: [6, 3], set2: [6, 6], tiebreak2: [6, 5] });
    m = points(m, addPoint2, 2);
    expect(m.tiebreak2).toEqual([6, 7]);
    expect(m.set2).toEqual([6, 6]);
    m = addPoint2(m);
    expect(m.tiebreak2).toEqual([6, 8]);
    expect(m.set2).toEqual([6, 7]);
    expect(m.tiebreak1).toEqual([0, 0]);
  });
});

describe('match completion', () => {
  it('player 1 wins in straight sets', () => {
    const m = addPoint1(newMatch({ set1: [6, 4], set2: [5, 4], game: [3, 0] }));
    expect(m.set2).toEqual([6, 4]);
    expect(m.status).toBe('completed');
  });

  it('player 2 wins in straight sets', () => {
    const m = addPoint2(newMatch({ set1: [4, 6], set2: [4, 5], game: [0, 3] }));
    expect(m.set2).toEqual([4, 6]);
    expect(m.status).toBe('completed');
  });

  it('best-of-3: a full third set decides the match', () => {
    const m = addPoint1(newMatch({ set1: [6, 4], set2: [4, 6], set3: [5, 3], game: [3, 0] }));
    expect(m.set3).toEqual([6, 3]);
    expect(m.status).toBe('completed');
  });
});

describe('supertiebreak', () => {
  it('at one set all, points go to the supertiebreak', () => {
    const m = addPoint1(newMatch({ matchFormat: 'supertiebreak', set1: [6, 4], set2: [4, 6] }));
    expect(m.supertiebreak).toEqual([1, 0]);
    expect(m.game).toEqual([0, 0]);
    expect(m.set3).toEqual([0, 0]);
  });

  it('is not won at 10-9, but is at 10-8', () => {
    let m = addPoint1(newMatch({ matchFormat: 'supertiebreak', set1: [6, 4], set2: [4, 6], supertiebreak: [9, 9] }));
    expect(m.supertiebreak).toEqual([10, 9]);
    expect(m.status).toBe('in-progress');

    m = addPoint1(newMatch({ matchFormat: 'short-deuce', set1: [6, 4], set2: [4, 6], supertiebreak: [9, 8] }));
    expect(m.supertiebreak).toEqual([10, 8]);
    expect(m.status).toBe('completed');
  });
});

describe('retirement', () => {
  it('completes the match, records who retired, and keeps the set scores', () => {
    let m = retirePlayer1(newMatch({ set1: [6, 4], set2: [2, 1], game: [2, 1] }));
    expect(m.status).toBe('completed');
    expect(m.retirement).toBe(true);
    expect(m.retiredPlayer).toBe(0);
    expect(m.game).toEqual([0, 0]);
    expect(m.set1).toEqual([6, 4]);
    expect(m.set2).toEqual([2, 1]);

    expect(retirePlayer2(newMatch()).retiredPlayer).toBe(1);
  });
});

describe('serve', () => {
  it('does not switch within a game', () => {
    const m = points(newMatch({ serving: 0 }), addPoint2, 3);
    expect(m.serving).toBe(0);
  });

  it('switches when a game completes', () => {
    const m = addPoint2(newMatch({ serving: 0, game: [0, 3] }));
    expect(m.serving).toBe(1);
  });

  // KNOWN BUG: reaching 6-6 switches serve for the completed game, then updateServe
  // switches it again for "tiebreak start", so the server of game 12 also serves the
  // first tiebreak point. Rule: the player due to serve next serves first.
  // When fixed, this test fails: change `it.fails` to `it`.
  it.fails('the player due to serve next serves the first tiebreak point', () => {
    const m = addPoint1(newMatch({ set1: [5, 6], game: [3, 0], serving: 0 }));
    expect(m.set1).toEqual([6, 6]);
    expect(m.serving).toBe(1);
  });

  // KNOWN BUG: the tiebreak branches never call updateServe, so serve never rotates
  // during a tiebreak. Rule: switch after the first point, then every two points.
  // When fixed, this test fails: change `it.fails` to `it`.
  it.fails('rotates serve after the first tiebreak point', () => {
    const m = addPoint1(newMatch({ set1: [6, 6], serving: 1 }));
    expect(m.tiebreak1).toEqual([1, 0]);
    expect(m.serving).toBe(0);
  });
});
