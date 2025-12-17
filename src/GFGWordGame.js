import React, { useState, useEffect, useCallback, useMemo, memo } from "react";
import { useUser } from "./UserContext";
import ConfettiExplosion from 'react-confetti-explosion';
import congratsSound from './assets/Congratulations Sound Effect.mp3';
import victorySound from './assets/Victory.mp3';
import wrongSound from './assets/Wrong.mp3';

// Simple translations
const translations = {
  en: {
    title: "Chemistry Word Guessing Game",
    languageButton: "Switch to தமிழ்",
    selectLevel: "Choose Difficulty Level",
    beginner: "Beginner Level",
    medium: "Medium Level",
    advanced: "Advanced Level",
    seconds: "s",
    question: "Question",
    of: "of",
    timeLeft: "Time:",
    hint: "Hint:",
    yourScore: "Score:",
    hintsRemaining: "Hints:",
    getHint: "Get Hint",
    removeLetter: "Remove Letter",
    guess: "Check Word",
    restart: "Restart",
    backToMenu: "Back to Level",
    correctGuess: "Correct! Well done!",
    wrongGuess: "Wrong guess. Try again!",
    timeUp: "Time's up!",
    gameOver: "Game Over!",
    levelComplete: "Level Complete!",
    congratulations: "Congratulations!",
    correctWordWas: "The word was:",
    questionsCorrect: "questions correct out of",
    nextLevel: "Next Level",
    tooManyWrongGuesses: "Too many wrong guesses! Game over!",
  },
  ta: {
    title: "வேதியியல் சொல் அறிதல் விளையாட்டு",
    languageButton: "Switch to English",
    selectLevel: "சிரமத்தை தேர்ந்தெடுக்கவும்",
    beginner: "ஆரம்ப நிலை",
    medium: "இடைநிலை",
    advanced: "உயர் நிலை",
    seconds: "வி",
    question: "கேள்வி",
    of: "இல்",
    timeLeft: "நேரம்:",
    hint: "குறிப்பு:",
    yourScore: "மதிப்பெண்:",
    hintsRemaining: "குறிப்புகள்:",
    getHint: "குறிப்பு பெறுக",
    removeLetter: "எழுத்தை அகற்று",
    guess: "சொல்லை சரிபார்க்கவும்",
    restart: "மீண்டும் தொடங்கு",
    backToMenu: "முகப்புக்கு திரும்பு",
    correctGuess: "சரி! நல்லது!",
    wrongGuess: "தவறான ஊகம். மீண்டும் முயற்சிக்கவும்!",
    timeUp: "நேரம் முடிந்துவிட்டது!",
    gameOver: "விளையாட்டு முடிந்தது!",
    levelComplete: "நிலை முடிந்தது!",
    congratulations: "வாழ்த்துக்கள்!",
    correctWordWas: "சொல்:",
    questionsCorrect: "கேள்விகள் சரியாக",
    nextLevel: "அடுத்த நிலை",
    tooManyWrongGuesses: "அதிக தவறான ஊகங்கள்! விளையாட்டு முடிந்தது!",
  },
};

// Match-the-following questions for science education
const questionSets = {
  level1: [
    {
      id: "l1q1",
      english: {
        question: "Match digestive organs with functions",
        leftItems: ["Stomach", "Liver", "Small Intestine", "Large Intestine"],
        rightItems: [
          "Produces bile",
          "Absorbs nutrients",
          "Absorbs water",
          "Digests food",
        ],
      },
      tamil: {
        question: "செரிமான உறுப்புகளை செயல்பாடுகளுடன் பொருத்துக",
        leftItems: ["வயிறு", "கல்லீரல்", "சிறுகுடல்", "பெருங்குடல்"],
        rightItems: [
          "பித்தம் உற்பத்தி",
          "ஊட்டச்சத்து உறிஞ்சுதல்",
          "நீரை உறிஞ்சுதல்",
          "உணவு செரிமானம்",
        ],
      },
      correctMatches: {
        Stomach: "Digests food",
        Liver: "Produces bile",
        "Small Intestine": "Absorbs nutrients",
        "Large Intestine": "Absorbs water",
      },
      subject: "Biology",
    },
    {
      id: "l1q2",
      english: {
        question: "Match states of matter with properties",
        leftItems: ["Solid", "Liquid", "Gas", "Plasma"],
        rightItems: [
          "Ionized particles",
          "Fixed shape",
          "No fixed shape",
          "Container shape",
        ],
      },
      tamil: {
        question: "பொருளின் நிலைகளை பண்புகளுடன் பொருத்துக",
        leftItems: ["திடம்", "திரவம்", "வாயு", "பிளாஸ்மா"],
        rightItems: [
          "அயனியாக்கப்பட்ட துகள்கள்",
          "நிலையான வடிவம்",
          "நிலையான வடிவம் இல்லை",
          "பாத்திர வடிவம்",
        ],
      },
      correctMatches: {
        Solid: "Fixed shape",
        Liquid: "Container shape",
        Gas: "No fixed shape",
        Plasma: "Ionized particles",
      },
      subject: "Physics",
    },
    {
      id: "l1q3",
      english: {
        question: "Match acids with formulas",
        leftItems: ["HCl", "H₂SO₄", "HNO₃", "CH₃COOH"],
        rightItems: ["Nitric", "Hydrochloric", "Acetic Acid", "Sulphuric"],
      },
      tamil: {
        question: "அமிலங்களை சூத்திரங்களுடன் பொருத்துக",
        leftItems: ["HCl", "H₂SO₄", "HNO₃", "CH₃COOH"],
        rightItems: ["நைட்ரிக்", "ஹைட்ரோக்ளோரிக்", "அசிட்டிக்", "கந்தக"],
      },
      correctMatches: {
        HCl: "Hydrochloric",
        "H₂SO₄": "Sulphuric",
        "HNO₃": "Nitric",
        "CH₃COOH": "Acetic Acid",
      },
      subject: "Chemistry",
    },
    // Additional questions would continue here...
  ],

  level2: [
    {
      id: "l2q1",
      english: {
        question: "Match cell parts with functions",
        leftItems: ["Nucleus", "Mitochondria", "Chloroplast", "Ribosome"],
        rightItems: ["Protein", "Control", "Photosynthesis", "Energy"],
      },
      tamil: {
        question: "செல் பாகங்களை செயல்பாடுகளுடன் பொருத்துக",
        leftItems: ["கரு", "மைட்டோகாண்ட்ரியா", "குளோரோபிளாஸ்ட்", "ரைபோசோம்"],
        rightItems: ["புரதம்", "கட்டுப்பாடு", "ஒளிச்சேர்க்கை", "ஆற்றல்"],
      },
      correctMatches: {
        Nucleus: "Control",
        Mitochondria: "Energy",
        Chloroplast: "Photosynthesis",
        Ribosome: "Protein",
      },
      subject: "Biology",
    },
    // Additional level 2 questions would continue here...
  ],

  level3: [
    {
      id: "l3q1",
      english: {
        question: "Match biomolecules with roles",
        leftItems: ["Proteins", "Carbs", "Lipids", "DNA"],
        rightItems: ["Genes", "Structure", "Storage", "Energy"],
      },
      tamil: {
        question: "உயிர் மூலக்கூறுகளை பங்குகளுடன் பொருத்துக",
        leftItems: ["புரதங்கள்", "கார்போ", "கொழுப்புகள்", "டிஎன்ஏ"],
        rightItems: ["மரபணுக்கள்", "அமைப்பு", "சேமிப்பு", "ஆற்றல்"],
      },
      correctMatches: {
        Proteins: "Structure",
        Carbs: "Energy",
        Lipids: "Storage",
        DNA: "Genes",
      },
      subject: "Biology",
    },
    // Additional level 3 questions would continue here...
  ],
};

// Comprehensive chemistry word data with expanded vocabulary
const gameWords = {
  beginner: [
    {
      word: "WATER",
      description: {
        en: "H2O - Essential for all life, made of hydrogen and oxygen.",
        ta: "H2O - அனைத்து உயிர்களுக்கும் அவசியம், ஹைட்ரஜன் மற்றும் ஆக்ஸிஜனால் ஆனது.",
      },
    },
    {
      word: "SALT",
      description: {
        en: "Sodium chloride (NaCl) - Common table salt used in cooking.",
        ta: "சோடியம் குளோரைடு (NaCl) - சமையலில் பயன்படும் பொதுவான உப்பு.",
      },
    },
    {
      word: "GOLD",
      description: {
        en: "Au - A precious yellow metal that doesn't rust.",
        ta: "Au - துருப்பிடிக்காத விலையுயர்ந்த மஞ்சள் உலோகம்.",
      },
    },
    {
      word: "HYDROGEN",
      description: {
        en: "H - Lightest element, most abundant in universe.",
        ta: "H - பிரபஞ்சத்தில் மிக இலகுவான மற்றும் அதிகமாக உள்ள தனிமம்.",
      },
    },
    {
      word: "OXYGEN",
      description: {
        en: "O - Gas we breathe to survive.",
        ta: "O - நாம் உயிர் வாழ சுவாசிக்கும் வாயு.",
      },
    },
    {
      word: "NITROGEN",
      description: {
        en: "N - Makes up 78% of air, essential for proteins.",
        ta: "N - வளிமண்டலத்தில் 78% உள்ளது, புரதங்களுக்கு அவசியம்.",
      },
    },
    {
      word: "CARBON",
      description: {
        en: "C - Found in all living things like diamonds and coal.",
        ta: "C - வைரம் மற்றும் நிலக்கரி போல அனைத்து உயிரினங்களிலும் காணப்படும்.",
      },
    },
    {
      word: "SODIUM",
      description: {
        en: "Na - Found in table salt.",
        ta: "Na - சாதாரண உப்பில் காணப்படும்.",
      },
    },
    {
      word: "CHLORINE",
      description: {
        en: "Cl - Green gas used in disinfecting water.",
        ta: "Cl - நீரை சுத்திகரிக்க பயன்படும் பச்சை வாயு.",
      },
    },
    {
      word: "POTASSIUM",
      description: {
        en: "K - Reacts violently with water.",
        ta: "K - நீருடன் கடுமையாக வினையாற்றும்.",
      },
    },
    {
      word: "CALCIUM",
      description: {
        en: "Ca - Important for bones and teeth, found in milk.",
        ta: "Ca - எலும்புகள் மற்றும் பற்களுக்கு முக்கியம், பாலில் காணப்படும்.",
      },
    },
    {
      word: "MAGNESIUM",
      description: {
        en: "Mg - Burns with bright white flame.",
        ta: "Mg - பிரகாசமான வெள்ளை காட்சியுடன் எரியும்.",
      },
    },
    {
      word: "IRON",
      description: {
        en: "Fe - Magnetic metal, used in construction.",
        ta: "Fe - காந்த உலோகம், கட்டடங்களில் பயன்படும்.",
      },
    },
    {
      word: "COPPER",
      description: {
        en: "Cu - A reddish-brown metal used in electrical wires.",
        ta: "Cu - மின்சார கம்பிகளில் பயன்படும் சிவப்பு-பழுப்பு உலோகம்.",
      },
    },
    {
      word: "SILVER",
      description: {
        en: "Ag - A shiny white metal used in jewelry.",
        ta: "Ag - நகைகளில் பயன்படும் பளபளக்கும் வெள்ளை உலோகம்.",
      },
    },
    {
      word: "HELIUM",
      description: {
        en: "He - A light gas that makes balloons float.",
        ta: "He - பலூன்களை மிதக்க வைக்கும் இலகுவான வாயு.",
      },
    },
    {
      word: "NEON",
      description: {
        en: "Ne - A colorful gas used in bright signs.",
        ta: "Ne - பிரகாசமான பலகைகளில் பயன்படும் வண்ணமயமான வாயு.",
      },
    },
    {
      word: "FLUORINE",
      description: {
        en: "F - A very reactive halogen, used in toothpaste.",
        ta: "F - மிகவும் வினையாற்றும் ஹாலஜன், பல் பேஸ்ட்டில் பயன்படும்.",
      },
    },
    {
      word: "ALUMINIUM",
      description: {
        en: "Al - Lightweight metal used in cans and foil.",
        ta: "Al - கேன்கள் மற்றும் தட்டில் பயன்படும் இலகுவான உலோகம்.",
      },
    },
    {
      word: "SULPHUR",
      description: {
        en: "S - Yellow element with a pungent smell, used in matches.",
        ta: "S - வலுவான வாசனை கொண்ட மஞ்சள் தனிமம், சிலிண்டர்கள் மற்றும் விளக்குகளில் பயன்படும்.",
      },
    },
  ],

  medium: [
    {
      word: "LITHIUM",
      description: {
        en: "Li - Lightest metal, used in batteries.",
        ta: "Li - எளிதான உலோகம், பேட்டரிகளில் பயன்படும்.",
      },
    },
    {
      word: "BERYLLIUM",
      description: {
        en: "Be - Used in aerospace materials.",
        ta: "Be - விண்வெளி உபகரணங்களில் பயன்படும்.",
      },
    },
    {
      word: "BORON",
      description: {
        en: "B - Used in glass and detergents.",
        ta: "B - கண்ணாடி மற்றும் சோப்புகளில் பயன்படும்.",
      },
    },
    {
      word: "HYDROGEN",
      description: {
        en: "H - The lightest and most abundant element in the universe.",
        ta: "H - பிரபஞ்சத்தில் மிக இலகுவான மற்றும் அதிகமாக உள்ள தனிமம்.",
      },
    },
    {
      word: "FLUORINE",
      description: {
        en: "F - Most reactive element, used in toothpaste.",
        ta: "F - மிகவும் வினையாற்றும் தனிமம், பல் பேஸ்ட்டில் பயன்படும்.",
      },
    },
    {
      word: "NEON",
      description: {
        en: "Ne - Colorful gas used in bright signs.",
        ta: "Ne - பிரகாசமான பலகைகளில் பயன்படும் வண்ணமயமான வாயு.",
      },
    },
    {
      word: "SODIUM",
      description: {
        en: "Na - An alkali metal that reacts violently with water.",
        ta: "Na - நீருடன் கடுமையாக வினையாற்றும் ஆல்கலி உலோகம்.",
      },
    },
    {
      word: "CHLORINE",
      description: {
        en: "Cl - A greenish gas used to purify swimming pool water.",
        ta: "Cl - நீச்சல் குளத்தின் நீரை சுத்திகரிக்க பயன்படும் பச்சை நிற வாயு.",
      },
    },
    {
      word: "CALCIUM",
      description: {
        en: "Ca - Important for strong bones and teeth, found in milk.",
        ta: "Ca - வலுவான எலும்புகள் மற்றும் பற்களுக்கு முக்கியம், பாலில் காணப்படும்.",
      },
    },
    {
      word: "NITROGEN",
      description: {
        en: "N - Makes up 78% of Earth's atmosphere, essential for proteins.",
        ta: "N - பூமியின் வளிமண்டலத்தின் 78% உள்ளது, புரதங்களுக்கு அவசியம்.",
      },
    },
    {
      word: "ALUMINUM",
      description: {
        en: "Al - A lightweight metal used in cans and aircraft.",
        ta: "Al - கேன்கள் மற்றும் விமானங்களில் பயன்படும் இலகு உலோகம்.",
      },
    },
    {
      word: "SULFUR",
      description: {
        en: "S - A yellow element that smells like rotten eggs.",
        ta: "S - அழுகிய முட்டை போன்ற வாசனை கொண்ட மஞ்சள் தனிமம்.",
      },
    },
    {
      word: "PHOSPHORUS",
      description: {
        en: "P - Essential for DNA and bones, glows in the dark.",
        ta: "P - DNA மற்றும் எலும்புகளுக்கு அவசியம், இருட்டில் ஒளிரும்.",
      },
    },
    {
      word: "POTASSIUM",
      description: {
        en: "K - Important for muscles and nerves, found in bananas.",
        ta: "K - தசைகள் மற்றும் நரம்புகளுக்கு முக்கியம், வாழைப்பழத்தில் உள்ளது.",
      },
    },
    {
      word: "SILICON",
      description: {
        en: "Si - Semiconductor used in electronics.",
        ta: "Si - மின்னணுவியல் சாதனங்களில் பயன்படும் அரை-கொண்டு உலோகம்.",
      },
    },
    {
      word: "MAGNESIUM",
      description: {
        en: "Mg - Burns with bright white flame.",
        ta: "Mg - பிரகாசமான வெள்ளை காட்சியுடன் எரியும்.",
      },
    },
    {
      word: "ARGON",
      description: {
        en: "Ar - Noble gas used in lighting and welding.",
        ta: "Ar - விளக்கு மற்றும் வேல்டிங் வேலைகளில் பயன்படும் அரிய வாயু.",
      },
    },
    {
      word: "NICKEL",
      description: {
        en: "Ni - Shiny metal used in coins and alloys.",
        ta: "Ni - நாணயங்கள் மற்றும் கலவைகளில் பயன்படும் பளபளக்கும் உலோகம்.",
      },
    },
    {
      word: "ZINC",
      description: {
        en: "Zn - Used for galvanizing iron and making alloys.",
        ta: "Zn - இரும்பை ஜால்வனேஸ் செய்யவும் கலவைகள் செய்யவும் பயன்படும்.",
      },
    },
    {
      word: "PLATINUM",
      description: {
        en: "Pt - Precious metal, used in jewelry and catalysts.",
        ta: "Pt - நகைகள் மற்றும் சார்ஜ் செயலிகளில் பயன்படும் விலைமதிப்பான உலோகம்.",
      },
    },
  ],

  advanced: [
    {
      word: "URANIUM",
      description: {
        en: "U - A radioactive element used in nuclear power plants.",
        ta: "U - அணு மின் நிலையங்களில் பயன்படும் கதிரியக்க தனிமம்.",
      },
    },
    {
      word: "PLUTONIUM",
      description: {
        en: "Pu - A man-made radioactive element used in nuclear weapons.",
        ta: "Pu - அணு ஆயுதங்களில் பயன்படும் மனிதனால் உருவாக்கப்பட்ட கதிரியக்க தனிமம்.",
      },
    },
    {
      word: "TUNGSTEN",
      description: {
        en: "W - Has the highest melting point, used in light bulb filaments.",
        ta: "W - மிக அதிக உருகு நிலை கொண்டது, மின்விளக்கு இழைகளில் பயன்படும்.",
      },
    },
    {
      word: "CHROMIUM",
      description: {
        en: "Cr - Used to make stainless steel and chrome plating.",
        ta: "Cr - துருப்பிடிக்காத எஃகு மற்றும் குரோம் முலாம் செய்ய பயன்படும்.",
      },
    },
    {
      word: "VANADIUM",
      description: {
        en: "V - Used to strengthen steel and in rechargeable batteries.",
        ta: "V - எஃகை வலுப்படுத்த மற்றும் மீண்டும் சார்ஜ் செய்யக்கூடிய பேட்டரிகளில் பயன்படும்.",
      },
    },
    {
      word: "MOLYBDENUM",
      description: {
        en: "Mo - Used in high-strength steel alloys and electronics.",
        ta: "Mo - அதிக வலிமை எஃகு கலவைகள் மற்றும் மின்னணுவியலில் பயன்படும்.",
      },
    },
    {
      word: "RUTHENIUM",
      description: {
        en: "Ru - A rare platinum group metal used in electronics.",
        ta: "Ru - மின்னணுவியலில் பயன்படும் அரிய பிளாட்டினம் குழு உலோகம்.",
      },
    },
    {
      word: "RHENIUM",
      description: {
        en: "Re - One of the rarest elements, used in jet engines.",
        ta: "Re - அரிதான தனிமங்களில் ஒன்று, ஜெட் என்ஜின்களில் பயன்படும்.",
      },
    },
    {
      word: "BERKELIUM",
      description: {
        en: "Bk - A synthetic radioactive element created in laboratories.",
        ta: "Bk - ஆய்வகங்களில் உருவாக்கப்படும் செயற்கை கதிரியக்க தனிமம்.",
      },
    },
    {
      word: "EINSTEINIUM",
      description: {
        en: "Es - Named after Einstein, produced in nuclear reactors.",
        ta: "Es - ஐன்ஸ்டைன் பெயரில் பெயரிடப்பட்டது, அணு உலைகளில் உற்பத்தியாகிறது.",
      },
    },
    {
      word: "THORIUM",
      description: {
        en: "Th - Radioactive metal used as nuclear fuel.",
        ta: "Th - அணு எரிபொருளாக பயன்படும் கதிரியக்க உலோகம்.",
      },
    },
    {
      word: "RADIUM",
      description: {
        en: "Ra - Glows in dark, used in old luminous paints.",
        ta: "Ra - இருட்டில் ஒளிரும், பழைய வெளிச்ச பேண்ட்களில் பயன்படுத்தப்பட்டது.",
      },
    },
    {
      word: "COPERNICIUM",
      description: {
        en: "Cn - Synthetic element, very unstable.",
        ta: "Cn - செயற்கை தனிமம், மிகவும் நிலைத்திருக்காதது.",
      },
    },
    {
      word: "NIHINIUM",
      description: {
        en: "Nh - Man-made element, highly radioactive.",
        ta: "Nh - மனிதனால் உருவாக்கப்பட்ட, மிகவும் கதிரியக்க தனிமம்.",
      },
    },
    {
      word: "FLEROVIUM",
      description: {
        en: "Fl - Synthetic element, discovered in labs.",
        ta: "Fl - ஆய்வகங்களில் கண்டுபிடிக்கப்பட்ட செயற்கை தனிமம்.",
      },
    },
    {
      word: "MOSCOVIUM",
      description: {
        en: "Mc - Highly unstable synthetic element.",
        ta: "Mc - மிகவும் நிலைத்திராத செயற்கை தனிமம்.",
      },
    },
    {
      word: "LIVERMORIUM",
      description: {
        en: "Lv - Synthetic element, radioactive.",
        ta: "Lv - செயற்கை தனிமம், கதிரியக்கம் கொண்டது.",
      },
    },
    {
      word: "TENNESSINE",
      description: {
        en: "Ts - Man-made, very unstable element.",
        ta: "Ts - மனிதனால் உருவாக்கப்பட்ட, மிகவும் நிலைத்திராத தனிமம்.",
      },
    },
    {
      word: "OGANESSON",
      description: {
        en: "Og - Synthetic noble gas, very unstable.",
        ta: "Og - செயற்கை அரிய வாயு, மிகவும் நிலைத்திராதது.",
      },
    },
    {
      word: "ACTINIUM",
      description: {
        en: "Ac - Radioactive metal used in research.",
        ta: "Ac - ஆய்வில் பயன்படும் கதிரியக்க உலோகம்.",
      },
    },
  ],
};

// Simple feedback component
const GameFeedback = ({ message, type, correctWord, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: type === "correct" ? "#10b981" : "#ef4444",
        color: "white",
        padding: "2rem",
        borderRadius: "12px",
        fontSize: "1.2rem",
        fontWeight: "600",
        boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
        zIndex: 1000,
        textAlign: "center",
        maxWidth: "400px",
        animation: "fadeIn 0.3s ease-out",
      }}
    >
      <div>{message}</div>
      {correctWord && (
        <div style={{ marginTop: "1rem", fontSize: "1rem" }}>
          The word was: <strong>{correctWord}</strong>
        </div>
      )}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: "translate(-50%, -50%) scale(0.9)";
          }
          to {
            opacity: 1;
            transform: "translate(-50%, -50%) scale(1)";
          }
        }
      `}</style>
    </div>
  );
};

// Utility functions
const shuffleArray = (array) => {
  let shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const generateRandomQuestions = (level) => {
  const levelWords = gameWords[level];
  if (!levelWords || levelWords.length === 0) {
    return [];
  }
  const availableWords = [...levelWords];
  const selectedWords = [];
  const questionsCount = Math.min(10, availableWords.length);

  for (let i = 0; i < questionsCount; i++) {
    const randomIndex = Math.floor(Math.random() * availableWords.length);
    selectedWords.push(availableWords[randomIndex]);
    availableWords.splice(randomIndex, 1);
  }
  return selectedWords;
};

// Main component
const WordGame = memo(() => {
  const { user, addScore } = useUser();
  const [language, setLanguage] = useState("en");
  const [currentLevel, setCurrentLevel] = useState(null);
  const [currentScreen, setCurrentScreen] = useState("home"); // home, game, results
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [wordData, setWordData] = useState(null);
  const [randomQuestions, setRandomQuestions] = useState([]);
  const [chosenLetters, setChosenLetters] = useState([]);
  const [hints, setHints] = useState(3);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [gameStartTime, setGameStartTime] = useState(null);
  const [totalGameTime, setTotalGameTime] = useState(0);
  const [hintsUsedThisQuestion, setHintsUsedThisQuestion] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const t = translations[language];

  // Play victory audio when results screen is shown
  useEffect(() => {
    if (currentScreen === "results") {
      const audio = new Audio(victorySound);
      audio.play().catch(err => console.log('Victory audio play failed:', err));
    }
  }, [currentScreen]);

  // Timer configuration
  const getTimerDuration = (level) => {
    switch (level) {
      case "beginner":
        return 50;
      case "medium":
        return 40;
      case "advanced":
        return 30;
      default:
        return 50;
    }
  };

  // Timer effect
  useEffect(() => {
    let interval;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0 && timerActive) {
      handleTimeUp();
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  const handleTimeUp = () => {
    setTimerActive(false);
    setFeedback({
      message: t.tooManyWrongGuesses,
      type: "incorrect",
      correctWord: wordData.word,
    });
  };

  const handleFeedbackClose = useCallback(() => {
    setFeedback(null);
    nextQuestion();
  }, [currentQuestionIndex, randomQuestions]);

  const startGame = (level) => {
    setCurrentLevel(level);
    setCurrentScreen("game");
    setCurrentQuestionIndex(0);
    setScore(0);
    setCorrectAnswers(0);
    setGameStartTime(Date.now());

    const randomlySelectedQuestions = generateRandomQuestions(level);
    setRandomQuestions(randomlySelectedQuestions);

    if (randomlySelectedQuestions.length > 0) {
      startQuestion(randomlySelectedQuestions, 0);
    }
  };

  const startQuestion = (questionsArray, questionIndex) => {
    console.log(
      `Starting question ${questionIndex + 1} of ${questionsArray.length}`
    );
    if (questionIndex >= questionsArray.length) {
      completeLevel();
      return;
    }

    setWordData(questionsArray[questionIndex]);
    setChosenLetters([]);
    //setHints(3);
    setHints(3); // Reset hints for each question
    setHintsUsedThisQuestion(0); // Reset hints counter
    setWrongGuesses(0);
    setTimeLeft(getTimerDuration(currentLevel));
    setTimerActive(true);
  };

  const selectLetter = (letter) => {
    if (!chosenLetters.includes(letter) && timerActive) {
      setChosenLetters([...chosenLetters, letter]);
      if (!wordData.word.includes(letter)) {
        // Play wrong sound
        const audio = new Audio(wrongSound);
        audio.play().catch(err => console.log('Wrong audio play failed:', err));
        
        const newWrongGuesses = wrongGuesses + 1;
        setWrongGuesses(newWrongGuesses);

        // Check if maximum wrong guesses reached
        if (newWrongGuesses >= 3) {
          setTimerActive(false);
          setFeedback({
            message: "Too many wrong guesses!",
            type: "incorrect",
            correctWord: wordData.word,
          });
        }
      }
    }
  };

  const useHint = () => {
    if (hints > 0 && timerActive) {
      const hiddenLetterIndex = wordData.word
        .split("")
        .findIndex((letter) => !chosenLetters.includes(letter));

      if (hiddenLetterIndex !== -1) {
        setChosenLetters([...chosenLetters, wordData.word[hiddenLetterIndex]]);
        setHints(hints - 1);
        setHintsUsedThisQuestion(hintsUsedThisQuestion + 1); // Add this line
      }
    }
  };

  const removeLetter = () => {
    if (timerActive && chosenLetters.length > 0) {
      setChosenLetters(chosenLetters.slice(0, -1));
    }
  };

  const checkWordGuessed = () => {
    return wordData.word
      .split("")
      .every((letter) => chosenLetters.includes(letter));
  };

  const guessWord = () => {
    setTimerActive(false);

    if (checkWordGuessed()) {
      let questionScore = 10; // Base score
      const pointsDeducted = hintsUsedThisQuestion * 2; // 2 points per hint
      questionScore = Math.max(1, questionScore - pointsDeducted);
      setScore(score + questionScore);
      setCorrectAnswers(correctAnswers + 1);
      setFeedback({ message: t.correctGuess, type: "correct" });
      
      // Play congratulations sound
      const audio = new Audio(congratsSound);
      audio.play().catch(err => console.log('Audio play failed:', err));
      
      // Show confetti for correct answer
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1000);
    } else {
      // Play wrong sound
      const audio = new Audio(wrongSound);
      audio.play().catch(err => console.log('Wrong audio play failed:', err));
      
      setFeedback({
        message: t.wrongGuess,
        type: "incorrect",
        correctWord: wordData.word,
      });
    }
  };

  const nextQuestion = useCallback(() => {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex >= randomQuestions.length) {
      completeLevel();
      return;
    }
    setCurrentQuestionIndex(nextIndex);
    startQuestion(randomQuestions, nextIndex);
  }, [currentQuestionIndex, randomQuestions, currentLevel]);

  const completeLevel = useCallback(() => {
    setTimerActive(false);
    setCurrentScreen("results");

    if (gameStartTime) {
      const endTime = Date.now();
      const timeTakenInSeconds = Math.round((endTime - gameStartTime) / 1000);
      setTotalGameTime(timeTakenInSeconds);

      // Save score to the platform scoring system
      // Use setTimeout to ensure we get the latest score state after all updates
      setTimeout(() => {
        setScore((latestScore) => {
          if (user && addScore) {
            const maxPossibleScore = randomQuestions.length * 10; // 10 points per question
            addScore(
              "chemistryWordGame", // gameType - unique identifier for this game
              latestScore, // current score - using the latest value
              maxPossibleScore, // max possible score
              timeTakenInSeconds, // time taken in seconds
              currentLevel || "beginner" // difficulty level
            );

            console.log("GFGWordGame score saved:", {
              gameType: "chemistryWordGame",
              score: latestScore,
              maxPossibleScore,
              timeTakenInSeconds,
              level: currentLevel,
            });
          }
          return latestScore; // Return unchanged score
        });
      }, 100);
    }
  }, [
    gameStartTime,
    user,
    addScore,
    randomQuestions.length,
    currentLevel,
  ]);

  const resetGame = () => {
    setCurrentScreen("home");
    setCurrentLevel(null);
    setCurrentQuestionIndex(0);
    setWordData(null);
    setRandomQuestions([]);
    setChosenLetters([]);
    setHints(3);
    setHintsUsedThisQuestion(0); // Add this line
    setWrongGuesses(0);
    setTimeLeft(0);
    setTimerActive(false);
    setScore(0);
    setCorrectAnswers(0);
    setGameStartTime(null);
    setTotalGameTime(0);
  };
  // Render alphabet buttons
  const renderLetters = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return Array.from(letters).map((letter, index) => (
      <button
        key={index}
        onClick={() => selectLetter(letter)}
        disabled={chosenLetters.includes(letter) || !timerActive}
        style={{
          padding: "8px",
          margin: "2px",
          background: chosenLetters.includes(letter) ? "#6b7280" : "#3b82f6",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor:
            chosenLetters.includes(letter) || !timerActive
              ? "not-allowed"
              : "pointer",
          fontSize: "14px",
          fontWeight: "bold",
          minWidth: "36px",
          opacity: chosenLetters.includes(letter) || !timerActive ? 0.5 : 1,
        }}
      >
        {letter}
      </button>
    ));
  };

  // Common styles
  const baseStyle = {
    fontFamily: "Arial, sans-serif",
    margin: 0,
    padding: 0,
    minHeight: "100vh",
    width: "100%",
  };

  const cardStyle = {
    background: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    padding: "2rem",
    margin: "1rem",
    maxWidth: "800px",
    width: "100%",
  };

  const buttonStyle = {
    padding: "12px 24px",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
    width: "100%",
    marginBottom: "12px",
  };

  // Home Screen
  if (currentScreen === "home") {
    return (
      <>
        {showConfetti && (
          <div style={{ position: "fixed", top: "50%", left: "50%", zIndex: 9999 }}>
            <ConfettiExplosion
              force={0.8}
              duration={3000}
              particleCount={150}
              width={1600}
            />
          </div>
        )}
        <div
          style={{
            ...baseStyle,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div style={cardStyle}>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <h1
              style={{
                fontSize: "clamp(2rem, 5vw, 3rem)",
                color: "#333",
                marginBottom: "1rem",
              }}
            >
              {t.title}
            </h1>

            <button
              onClick={() => setLanguage(language === "en" ? "ta" : "en")}
              style={{
                ...buttonStyle,
                background: "#6366f1",
                color: "white",
                maxWidth: "200px",
                margin: "0 auto 2rem",
              }}
            >
              {t.languageButton}
            </button>

            <h2 style={{ color: "#666", marginBottom: "2rem" }}>
              {t.selectLevel}
            </h2>
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <button
              onClick={() => startGame("beginner")}
              style={{
                ...buttonStyle,
                background: "#10b981",
                color: "white",
                fontSize: "18px",
              }}
            >
              {t.beginner}
              <div
                style={{ fontSize: "14px", opacity: "0.9", marginTop: "4px" }}
              >
                ⏱ 50{t.seconds} • 10 questions
              </div>
            </button>

            <button
              onClick={() => startGame("medium")}
              style={{
                ...buttonStyle,
                background: "#f59e0b",
                color: "white",
                fontSize: "18px",
              }}
            >
              {t.medium}
              <div
                style={{ fontSize: "14px", opacity: "0.9", marginTop: "4px" }}
              >
                ⏱ 50{t.seconds} • 10 questions
              </div>
            </button>

            <button
              onClick={() => startGame("advanced")}
              style={{
                ...buttonStyle,
                background: "#ef4444",
                color: "white",
                fontSize: "18px",
              }}
            >
              {t.advanced}
              <div
                style={{ fontSize: "14px", opacity: "0.9", marginTop: "4px" }}
              >
                ⏱ 50{t.seconds} • 10 questions
              </div>
            </button>
          </div>
        </div>
      </div>
      </>
    );
  }

  // Game Screen
  if (currentScreen === "game" && wordData) {
    const progressPercentage =
      ((currentQuestionIndex + 1) / randomQuestions.length) * 100;

    return (
      <>
        {showConfetti && (
          <div style={{ position: "fixed", top: "50%", left: "50%", zIndex: 9999 }}>
            <ConfettiExplosion
              force={0.8}
              duration={3000}
              particleCount={150}
              width={1600}
            />
          </div>
        )}
        <div
          style={{
            ...baseStyle,
            background:
              currentLevel === "beginner"
                ? "linear-gradient(135deg, #10b981 0%, #3b82f6 100%)"
                : currentLevel === "medium"
                ? "linear-gradient(135deg, #f59e0b 0%, #f97316 100%)"
                : "linear-gradient(135deg, #ef4444 0%, #8b5cf6 100%)",
            display: "flex",
            flexDirection: "column",
          }}
        >
        {/* Header */}
        <br />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1rem 2rem",
            background: "rgba(255,255,255,0.1)",
            color: "white",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div style={{ fontSize: "16px", fontWeight: "bold" }}>
            {t.question} {currentQuestionIndex + 1}/{randomQuestions.length}
          </div>
          <button
            onClick={() => setLanguage(language === "en" ? "ta" : "en")}
            style={{
              ...buttonStyle,
              background: "#6366f1",
              color: "white",
              maxWidth: "200px",
              margin: "0 auto 2rem",
            }}
          >
            {t.languageButton}
          </button>

          <div
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              background: timeLeft <= 10 ? "#ef4444" : "rgba(255,255,255,0.2)",
              padding: "8px 16px",
              borderRadius: "20px",
            }}
          >
            {t.timeLeft} {timeLeft}
            {t.seconds}
          </div>

          <div style={{ fontSize: "16px", fontWeight: "bold" }}>
            {t.yourScore} {score}
          </div>

          <button
            onClick={resetGame}
            style={{
              background: "rgba(255,255,255,0.2)",
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            🏠 {t.backToMenu}
          </button>
        </div>

        {/* Progress Bar */}
        <div
          style={{
            height: "4px",
            background: "rgba(255,255,255,0.2)",
            margin: "0 2rem",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progressPercentage}%`,
              background: "#10b981",
              transition: "width 0.3s ease",
            }}
          />
        </div>

        {/* Game Content */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
          }}
        >
          <div
            style={{
              ...cardStyle,
              maxWidth: "800px",
            }}
          >
            {/* Word Display */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: "8px",
                marginBottom: "2rem",
              }}
            >
              {Array.from(wordData.word).map((letter, index) => (
                <div
                  key={index}
                  style={{
                    width: "40px",
                    height: "40px",
                    border: "2px solid #d1d5db",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "20px",
                    fontWeight: "bold",
                    background: chosenLetters.includes(letter)
                      ? "#e5e7eb"
                      : "white",
                    color: chosenLetters.includes(letter)
                      ? "#374151"
                      : "transparent",
                  }}
                >
                  {chosenLetters.includes(letter) ? letter : ""}
                </div>
              ))}
            </div>

            {/* Hint */}
            <p
              style={{
                fontSize: "18px",
                color: "#666",
                textAlign: "center",
                marginBottom: "2rem",
                lineHeight: "1.5",
              }}
            >
              <strong>{t.hint}</strong> {wordData.description[language]}
            </p>

            {/* Game Stats */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "2rem",
                flexWrap: "wrap",
                gap: "1rem",
              }}
            >
              <div style={{ fontSize: "16px", color: "#666" }}>
                ✅ {correctAnswers}/{randomQuestions.length}
              </div>
              <div style={{ fontSize: "16px", color: "#666" }}>
                {t.hintsRemaining} {hints} | Used: {hintsUsedThisQuestion}
              </div>
              <div style={{ fontSize: "16px", color: "#ef4444" }}>
                ❌ {wrongGuesses}/3
              </div>
            </div>

            {/* Letter Selection */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(36px, 1fr))",
                gap: "4px",
                marginBottom: "2rem",
                maxWidth: "600px",
                margin: "0 auto 2rem",
              }}
            >
              {renderLetters()}
            </div>
            {/* Action Buttons */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  flexWrap: "wrap",
                }}
              >
                <button
                  onClick={useHint}
                  disabled={hints === 0 || !timerActive}
                  style={{
                    ...buttonStyle,
                    background:
                      hints === 0 || !timerActive ? "#9ca3af" : "#6366f1",
                    color: "white",
                    flex: "1",
                    minWidth: "120px",
                  }}
                >
                  💡 {t.getHint}
                </button>

                <button
                  onClick={removeLetter}
                  disabled={chosenLetters.length === 0 || !timerActive}
                  style={{
                    ...buttonStyle,
                    background:
                      chosenLetters.length === 0 || !timerActive
                        ? "#9ca3af"
                        : "#f59e0b",
                    color: "white",
                    flex: "1",
                    minWidth: "120px",
                  }}
                >
                  ⬅ {t.removeLetter}
                </button>
              </div>

              <button
                onClick={guessWord}
                disabled={chosenLetters.length === 0 || !timerActive}
                style={{
                  ...buttonStyle,
                  background:
                    chosenLetters.length === 0 || !timerActive
                      ? "#9ca3af"
                      : "#10b981",
                  color: "white",
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                ✓ {t.guess}
              </button>
            </div>
          </div>
        </div>

        {feedback && (
          <GameFeedback
            message={feedback.message}
            type={feedback.type}
            correctWord={feedback.correctWord}
            onClose={handleFeedbackClose}
          />
        )}
      </div>
      </>
    );
  }

  // Results Screen
  if (currentScreen === "results") {
    const percentage = (correctAnswers / randomQuestions.length) * 100;
    const isHighScore = percentage >= 80;
    const isMediumScore = percentage >= 60;

    return (
      <>
        {showConfetti && (
          <div style={{ position: "fixed", top: "50%", left: "50%", zIndex: 9999 }}>
            <ConfettiExplosion
              force={0.8}
              duration={3000}
              particleCount={150}
              width={1600}
            />
          </div>
        )}
        <div
          style={{
            ...baseStyle,
            background:
              "linear-gradient(135deg, #4c1d95 0%, #7c2d12 50%, #be185d 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
        <div style={cardStyle}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>
              {isHighScore ? "🏆" : isMediumScore ? "🎖" : "📚"}
            </div>

            <h1
              style={{
                fontSize: "clamp(2rem, 4vw, 2.5rem)",
                color: "#333",
                marginBottom: "1rem",
              }}
            >
              {t.levelComplete}
            </h1>

            <h2
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                color: "#10b981",
                marginBottom: "2rem",
              }}
            >
              {t.congratulations}
            </h2>

            <div
              style={{
                background: "#f3f4f6",
                borderRadius: "12px",
                padding: "2rem",
                marginBottom: "2rem",
              }}
            >
              <div
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "bold",
                  color: "#333",
                  marginBottom: "1rem",
                }}
              >
                🏆 {score} points
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                  gap: "1rem",
                  fontSize: "16px",
                  color: "#666",
                }}
              >
                <div>
                  <strong>{correctAnswers}</strong> {t.questionsCorrect}{" "}
                  <strong>{randomQuestions.length}</strong>
                </div>
                <div>
                  📊 <strong>{percentage.toFixed(1)}%</strong>
                </div>
                <div>
                  ⏱{" "}
                  <strong>
                    {Math.floor(totalGameTime / 60)}m {totalGameTime % 60}s
                  </strong>
                </div>
              </div>

              <div
                style={{
                  width: "100%",
                  height: "12px",
                  background: "#e5e7eb",
                  borderRadius: "6px",
                  overflow: "hidden",
                  marginTop: "1rem",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${percentage}%`,
                    background: isHighScore
                      ? "#10b981"
                      : isMediumScore
                      ? "#f59e0b"
                      : "#6b7280",
                    borderRadius: "6px",
                    transition: "width 1s ease",
                  }}
                />
              </div>
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <button
                onClick={() => startGame(currentLevel)}
                style={{
                  ...buttonStyle,
                  background: "#3b82f6",
                  color: "white",
                  fontSize: "18px",
                }}
              >
                🔄 {t.restart}
              </button>

              {currentLevel !== "advanced" && (
                <button
                  onClick={() => {
                    const nextLevel =
                      currentLevel === "beginner" ? "medium" : "advanced";
                    startGame(nextLevel);
                  }}
                  style={{
                    ...buttonStyle,
                    background: "#10b981",
                    color: "white",
                    fontSize: "18px",
                  }}
                >
                  ⬆ {t.nextLevel}
                </button>
              )}

              <button
                onClick={resetGame}
                style={{
                  ...buttonStyle,
                  background: "#6b7280",
                  color: "white",
                  fontSize: "18px",
                }}
              >
                🏠 {t.backToMenu}
              </button>
            </div>
          </div>
        </div>
      </div>
      </>
    );
  }

  return <div style={baseStyle}></div>;
});

export default WordGame;
