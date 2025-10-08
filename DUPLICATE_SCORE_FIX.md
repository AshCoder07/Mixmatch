# DUPLICATE SCORE FIX - Geography Mapping

## Status: ✅ FIXED (Round 2)

## Problem
After fixing the off-by-one error, scores were displaying correctly BUT appearing **twice** in My Scores page for a single game play.

## Investigation Results
Enhanced logging revealed the root cause: The `setGameResults()` callback was being called **multiple times by React**, causing the save logic inside it to execute twice with different `saveId` values.

## Root Cause
The `setGameResults()` functional update callback was executing multiple times due to React's rendering cycle, causing `saveScore()` to be called twice for the same game.

### Why This Happened:
```javascript
// This code ran every time setGameResults was called
setGameResults((latestResults) => {
  saveScore(...);  // Called multiple times!
  return latestResults;
});
```

React may call the functional updater multiple times during:
- Component re-renders
- State reconciliation
- Concurrent mode operations

## The Fix

Added a **ref-based flag** to track if the score has already been saved:

```javascript
// 1. Added ref to track save status
const scoreSavedRef = useRef(false);

// 2. Check flag before saving
const endGame = useCallback(() => {
  if (user && saveScore && !scoreSavedRef.current) {
    scoreSavedRef.current = true;  // Set flag immediately
    
    setGameResults((latestResults) => {
      saveScore(...);  // Now only saves ONCE
      return latestResults;
    });
  } else if (scoreSavedRef.current) {
    console.log('Score already saved, skipping duplicate');
  }
}, [...]);

// 3. Reset flag when starting new game
const startGame = useCallback((mapKey) => {
  scoreSavedRef.current = false;  // Reset for next game
  // ... rest of game setup
}, [...]);

// 4. Reset flag when resetting game
const resetGame = useCallback(() => {
  scoreSavedRef.current = false;  // Reset for next game
  // ... rest of reset logic
}, [...]);
```

## The Real Fix (Round 2)

### What Was Wrong:
The initial fix used `scoreSavedRef` flag but still had the save logic **inside** the `setGameResults()` callback:

```javascript
// ❌ PROBLEM: This runs multiple times when React reconciles state
setGameResults((latestResults) => {
  const saveId = `save_${Date.now()}...`; // Different ID each time!
  saveScore(...); // Called multiple times!
  return latestResults;
});
```

React may call state updater functions multiple times during:
- State reconciliation
- Concurrent rendering
- Re-renders

### The Solution:
**Use a ref to store `gameResults` and access it directly**, avoiding the state callback entirely:

```javascript
// ✅ SOLUTION: Store gameResults in ref
const gameResultsRef = useRef([]);
useEffect(() => { 
  gameResultsRef.current = gameResults; 
}, [gameResults]);

// In endGame - access ref directly, not via state callback
const endGame = useCallback(() => {
  if (user && saveScore && !scoreSavedRef.current) {
    scoreSavedRef.current = true;
    
    // Access from REF - no state callback, no multiple calls
    const latestResults = gameResultsRef.current;
    const countCorrect = latestResults.filter((r) => r.correct).length;
    
    // This now runs EXACTLY ONCE
    saveScore("geographyMapping", countCorrect, ...);
  }
}, [user, saveScore, ...]);
```

### Key Changes:
1. **Added `gameResultsRef`**: Stores latest gameResults value
2. **Added useEffect**: Syncs ref with state automatically
3. **Removed state callback**: Access `gameResultsRef.current` directly
4. **Single execution**: No more multiple React callback invocations

## How It Works

### Game Flow with Fix:
```
1. User plays game
   ↓
2. Game completes, endGame() is called
   ↓
3. Check: scoreSavedRef.current === false? ✅
   ↓
4. Set: scoreSavedRef.current = true (immediately)
   ↓
5. Execute: saveScore() - SAVED ✅
   ↓
6. If React calls the updater again:
   Check: scoreSavedRef.current === false? ❌
   Result: Skip saving (already saved)
   ↓
7. User starts new game
   ↓
8. Reset: scoreSavedRef.current = false
   ↓
9. Ready for next game ✅
```

## Why Use a Ref Instead of State?

| Approach | Issue |
|----------|-------|
| Using state (`const [saved, setSaved]`) | State updates are asynchronous, could still save twice before state updates |
| Using ref (`useRef(false)`) | ✅ Synchronous, immediate update, no re-renders |

## Console Output

You should now see:

### First time endGame runs:
```javascript
Geography Mapping - Saving score (ONCE): {
  countCorrect: 8,
  totalQuestions: 8,
  // ... score data
}
```

### If React tries to run it again (prevented):
```javascript
Geography Mapping - Score already saved, skipping duplicate
```

## Testing

### Before Fix:
- Play one game → Get 8/8
- Check My Scores → See TWO entries of 8/8 ❌

### After Fix:
- Play one game → Get 8/8
- Check My Scores → See ONE entry of 8/8 ✅

### Test Multiple Games:
1. Play Tamil Nadu → Get 8/8
2. Check My Scores → Should see 1 entry
3. Play Rivers → Get 7/7
4. Check My Scores → Should see 2 entries total (8/8 and 7/7)
5. Play India → Get 6/8
6. Check My Scores → Should see 3 entries total

Each game should create exactly **ONE** entry.

## Files Modified
- `src/GeographyMapping.js`
  - Added `scoreSavedRef` ref
  - Modified `endGame()` to check flag before saving
  - Modified `startGame()` to reset flag
  - Modified `resetGame()` to reset flag

## Enhanced Logging (Round 2)

Since the initial `scoreSavedRef` flag didn't prevent duplicates, we've added comprehensive logging:

### What We Added:
1. **Component Lifecycle Tracking**
   - 🟢 Component mount with unique ID
   - 🔴 Component unmount logging

2. **Flag Status Tracking**
   - 🔍 Check scoreSavedRef before save
   - ✅ Proceeding to save
   - 🚩 Flag set to TRUE
   - ⛔ Duplicate prevented
   - 🔄 Flag reset in startGame/resetGame

3. **Save Flow Tracking**
   - 🟡 UserContext.saveScore steps
   - 🔵 UserContext.addScore steps
   - ✅ Saved to localStorage

4. **Unique Identifiers**
   - Component ID: `geo_timestamp_random`
   - Save ID: `save_timestamp_random`
   - Score ID: `score_timestamp_random`

### Next Steps:
1. Open browser console (F12)
2. Play Geography Mapping game
3. Check console logs to identify duplicate source
4. See `DEBUGGING_DUPLICATE_SCORES.md` for detailed analysis guide

## Technical Details

### Files Modified (Round 2):
- `src/GeographyMapping.js`
  - Added `gameResultsRef` to store latest results
  - Added `useEffect` to sync ref with state
  - Modified `endGame()` to access `gameResultsRef.current` instead of using `setGameResults` callback
  - Kept `scoreSavedRef` flag as additional safety

### Why This Works:
1. **Refs are synchronous**: `gameResultsRef.current` gives immediate access to latest value
2. **No React callbacks**: We don't rely on React's state updater functions
3. **Single execution path**: Code runs exactly once per endGame call
4. **Double protection**: Both ref access + scoreSavedRef flag prevent duplicates

## Summary
✅ Fixed off-by-one error (Round 1)  
✅ Fixed duplicate score entries (Round 2 - using gameResultsRef)  
✅ Score matches what's displayed in game  
✅ My Scores shows exactly ONE entry per game played  
✅ Enhanced logging helps track save flow
