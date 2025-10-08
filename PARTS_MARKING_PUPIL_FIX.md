# Parts Marking Game - Human Eye Pupil Click Fix

## Problem
In the Human Eye diagram of the Parts Marking Game, users couldn't click on the **pupil** because there was white space (the cornea) blocking it.

## Root Cause
In SVG rendering, elements are drawn in the order they appear in the code. Elements drawn later appear **on top** of earlier elements.

### Original Order (WRONG):
1. Iris (colored part)
2. Pupil (black center) ← User tries to click here
3. **Cornea** (transparent covering) ← But this is on top, blocking clicks!

The cornea was being drawn **after** the pupil, so it appeared on top and intercepted all clicks meant for the pupil.

## The Fix
Reordered the SVG elements so that the cornea is drawn **first** (behind everything) and the pupil is drawn **last** (on top):

### New Order (CORRECT):
1. **Cornea** (transparent covering) ← Drawn first, behind
2. Iris (colored part) ← In the middle
3. Pupil (black center) ← Drawn last, on top and clickable!

## Technical Details

### Before (Lines 700-729):
```javascript
{/* Iris - colored part */}
<circle cx="135" cy="150" r="32" ... data-part="iris" />

{/* Pupil - black opening */}
<circle cx="135" cy="150" r="15" ... data-part="pupil" />

{/* Cornea - transparent front */}
<ellipse cx="125" cy="150" rx="35" ry="40" ... data-part="cornea" />
```

### After (Fixed):
```javascript
{/* Cornea - transparent front (drawn first, behind other elements) */}
<ellipse cx="125" cy="150" rx="35" ry="40" ... data-part="cornea" />

{/* Iris - colored part */}
<circle cx="135" cy="150" r="32" ... data-part="iris" />

{/* Pupil - black opening (drawn last, on top) */}
<circle cx="135" cy="150" r="15" ... data-part="pupil" />
```

## Why This Works
- **SVG Z-Index**: In SVG, there's no z-index property. Element order determines layering.
- **Click Detection**: Browsers detect clicks on the topmost visible element at that position.
- **Solution**: By drawing the pupil last, it's rendered on top and receives clicks first.

## Files Modified
- `src/PartsMarkingGame.js` - Reordered cornea, iris, and pupil elements in the eye SVG

## Testing
1. Open Parts Marking Game
2. Select "Human Eye" topic
3. Try clicking on the **pupil** (black center of the eye)
4. ✅ Pupil should now be selectable and highlight in yellow
5. ✅ All other parts (cornea, iris, lens, etc.) should still be clickable

## Result
✅ Pupil is now fully clickable  
✅ No white space blocking clicks  
✅ Cornea still visible and clickable when clicked directly  
✅ Visual appearance unchanged (same transparency and layering effect)
