# Parts Marking Game - Category-Based Topic Selection

## Changes Made

### Problem
The original Parts Marking Game showed all topics (Sperm, Egg, Eye, Plant Cell, Animal Cell, Circuit, Solar System) in a single selection screen without any organization.

### Solution
Implemented a two-level navigation system:
1. **Category Selection** - First screen shows three categories
2. **Topic Selection** - Second screen shows only topics from the selected category

## Implementation Details

### 1. Added Category State
```javascript
const [selectedCategory, setSelectedCategory] = useState(null); // null, 'physics', 'botany', 'zoology'
const [selectedTopic, setSelectedTopic] = useState(null); // Changed from default 'plantcell' to null
```

### 2. Category Mapping
Topics are organized into three categories:

```javascript
const categoryMapping = {
  physics: ['circuit', 'solar'],
  botany: ['plantcell'],
  zoology: ['sperm', 'egg', 'eye', 'animalcell'],
};
```

- **Physics**: Electric Circuit, Solar System
- **Botany**: Plant Cell
- **Zoology**: Sperm Cell, Egg Cell, Human Eye, Animal Cell

### 3. Added Translations
Added new translation keys for both English and Tamil:

```javascript
english: {
  chooseCategory: "Choose a Category:",
  backToCategories: "← Back to Categories",
  categories: {
    physics: "Physics",
    botany: "Botany",
    zoology: "Zoology",
  },
}

tamil: {
  chooseCategory: "வகை தேர்வு செய்யுங்கள்:",
  backToCategories: "← வகைகளுக்கு திரும்பு",
  categories: {
    physics: "இயற்பியல்",
    botany: "தாவரவியல்",
    zoology: "விலங்கியல்",
  },
}
```

### 4. Two-Screen Navigation Flow

#### Screen 1: Category Selection
- Shows when `selectedCategory === null`
- Displays three large buttons: Physics, Botany, Zoology
- Buttons have hover effects (scale + color change)
- Clean, centered layout

#### Screen 2: Topic Selection
- Shows when `selectedCategory !== null`
- Displays "Back to Categories" button
- Shows only topics from selected category
- Same topic selection UI as before, but filtered

#### Screen 3: Game Play
- Shows when `selectedTopic !== null`
- Same gameplay experience as before
- Shows diagram and sidebar

### 5. Back Navigation
When user clicks "Back to Categories":
```javascript
onClick={() => {
  setSelectedCategory(null);
  setSelectedTopic(null);
  setSelectedParts(new Set());
  setPointerMarkers([]);
  setScore(0);
  setShowAnswers(false);
}}
```
This resets all game state and returns to category selection.

### 6. Placeholder Screen
When category is selected but no topic yet:
- Shows instruction message
- Prompts user to select a topic from above

## User Experience Flow

```
Start
  ↓
Category Selection (Physics / Botany / Zoology)
  ↓
Topic Selection (Filtered topics based on category)
  ↓
Game Play (Same as before)
  ↓
[Back to Categories] button → Returns to start
```

## Benefits

1. **Better Organization**: Topics grouped by subject area
2. **Reduced Clutter**: Only 2-3 topics shown at a time instead of 7
3. **Educational Context**: Clear subject categorization helps learning
4. **Scalability**: Easy to add more topics to each category
5. **Bilingual Support**: All new UI elements support English and Tamil

## Files Modified
- `src/PartsMarkingGame.js`
  - Added `selectedCategory` state
  - Changed `selectedTopic` initial value to `null`
  - Added `categoryMapping` object
  - Added category translations (English & Tamil)
  - Implemented conditional rendering for category/topic selection
  - Added back navigation button
  - Added placeholder screen

## Testing Checklist
- [ ] Category selection screen appears on load
- [ ] All three categories are clickable
- [ ] Selecting a category shows correct topics
- [ ] Physics shows: Circuit, Solar System
- [ ] Botany shows: Plant Cell
- [ ] Zoology shows: Sperm, Egg, Eye, Animal Cell
- [ ] "Back to Categories" button works
- [ ] Game plays normally after topic selection
- [ ] Language toggle works on all screens
- [ ] Tamil translations display correctly

## Visual Design

### Category Buttons:
- Large (150px min width, 20px 40px padding)
- Blue outline with white background
- Hover: Blue background, white text, slight scale
- Box shadow for depth
- Responsive font sizes

### Topic Buttons:
- Compact (80px min width, 6px 12px padding)
- Same style as before
- Blue border when selected

## Future Enhancements
Could add:
- Category icons (🔬 for Physics, 🌱 for Botany, 🧬 for Zoology)
- Category descriptions
- Progress tracking per category
- Achievement badges per category
- More topics in each category
