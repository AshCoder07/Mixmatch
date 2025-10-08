# Testing Geography Mapping Scores

## How to Test

1. **Start the app**: `npm start`
2. **Open browser console** (F12) to see the logging
3. **Play Geography Mapping game**:
   - Select any map (Tamil Nadu, India, Rivers, or World)
   - Answer all questions
   - Complete the game

4. **Check Console Logs**:
   - Look for "Geography Mapping - Saving score:" log
   - Look for "UserContext saveScore - Received:" log
   - Look for "UserContext saveScore - Calculated:" log

5. **Navigate to My Scores page**
   - Compare the score shown in the game completion screen with the score in My Scores
   - They should match exactly

## Expected Behavior

### For Tamil Nadu Map (8 places):
- **If you get 8/8 correct:**
  - Game completion screen: Shows "8/8" correct
  - Console log should show: `countCorrect: 8, totalQuestions: 8`
  - My Scores should show: `8/8` with `100%`

- **If you get 7/8 correct:**
  - Game completion screen: Shows "7/8" correct
  - Console log should show: `countCorrect: 7, totalQuestions: 8`
  - My Scores should show: `7/8` with `88%`

### For India Map (8 states):
- Same pattern as above

### For Rivers Map (7 rivers):
- **If you get 7/7 correct:**
  - Game completion screen: Shows "7/7" correct
  - My Scores should show: `7/7` with `100%`

### For World Map (7 countries):
- Same pattern as Rivers map

## What We Fixed

1. **Score Saving**: Changed from saving points (10 per correct answer) to saving the count of correct answers
2. **Max Score**: Now passes the actual number of questions in the map as maxScore
3. **Logging**: Added detailed logging to track what's being saved

## If Scores Still Don't Match

Check the console logs and note:
1. What does "Geography Mapping - Saving score:" show?
2. What does "UserContext saveScore - Received:" show?
3. What score is displayed on the game completion screen?
4. What score appears in My Scores page?

Share this information to help debug further.

## Common Issues

1. **Old scores in localStorage**: Clear your browser's localStorage or use Incognito mode to start fresh
2. **Caching**: Hard refresh the page (Ctrl+Shift+R) after making changes
3. **Multiple users**: Make sure you're logged in as the same user when checking My Scores
