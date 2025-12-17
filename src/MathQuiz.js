import React, { useState, useEffect, useCallback, useMemo, memo, useRef } from "react";
import { useUser } from "./UserContext";
import ConfettiExplosion from 'react-confetti-explosion';
import congratsSound from './assets/Congratulations Sound Effect.mp3';
import victorySound from './assets/Victory.mp3';
import wrongSound from './assets/Wrong.mp3';

// Tamil Translations
const translations = {
  english: {
    title: "Math Quiz Challenge",
    languageButton: "தமிழ்",
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
    question: "Question",
    retry: "Retry",
    home: "Home",
    results: "Results",
    score: (score, total) => `You scored ${score}/${total}`,
    selectAnswerPrompt: "Select the correct answer:",
    sequencePrompt: "Order the steps by clicking them:",
    checkAnswer: "Check Answer",
    clearSequence: "Clear",
    answerPrompt: "Type your answer here...",
    correctAnswer: (answer) => `Correct Answer: ${answer}`,
    starPerformerTitle: "⭐ Star Performer!",
    achieverTitle: "🎯 Great Job!",
    needsPracticeTitle: "📚 Keep Practicing!",
    timeUp: "⏰ Time's up!",
    correct: "🎉 Correct! Well done!",
    nextQuestion: "Next Question",
  },
  tamil: {
    title: "கணித வினாடி வினா சவால்",
    languageButton: "English",
    beginner: "ஆரம்பநிலை",
    intermediate: "இடைநிலை",
    advanced: "மேம்பட்ட நிலை",
    question: "கேள்வி",
    retry: "மீண்டும் முயற்சி செய்",
    home: "முகப்பு",
    results: "முடிவுகள்",
    score: (score, total) => `நீங்கள் ${score}/${total} மதிப்பெண் பெற்றீர்கள்`,
    selectAnswerPrompt: "சரியான விடையைத் தேர்ந்தெடுக்கவும்:",
    sequencePrompt: "படிநிலைகளை வரிசையாக கிளிக் செய்யவும்:",
    checkAnswer: "விடையைச் சரிபார்க்கவும்",
    clearSequence: "அழி",
    answerPrompt: "உங்கள் பதிலை இங்கே தட்டச்சு செய்யவும்...",
    correctAnswer: (answer) => `சரியான விடை: ${answer}`,
    starPerformerTitle: "⭐ சிறந்த சாதனையாளர்!",
    achieverTitle: "🎯 நல்லது!",
    needsPracticeTitle: "📚 தொடர்ந்து பயிற்சி செய்யுங்கள்!",
    timeUp: "⏰ நேரம் முடிந்துவிட்டது!",
    correct: "🎉 சரி! நல்லது!",
    nextQuestion: "அடுத்த கேள்வி",
  },
};

// Question Bank
const questionBank = {
  beginner: [
    {
      q: "What is 45 ÷ 9?",
      correct: "5",
      options: ["3", "4", "5", "6"],
      language: { tamil: "45 ÷ 9 என்றால் என்ன?" },
      type: "multipleChoice",
    },
    {
      q: "LCM of 12 and 18",
      correct: "36",
      options: ["24", "36", "48", "12"],
      language: { tamil: "12 மற்றும் 18-இன் மீ.சி.ம" },
      type: "multipleChoice",
    },
    {
      q: "HCF of 36 and 54",
      correct: "18",
      options: ["6", "9", "18", "27"],
      language: { tamil: "36 மற்றும் 54-இன் மீ.பொ.வ" },
      type: "multipleChoice",
    },
    {
      q: "Solve: 15 + (8 × 2)",
      correct: "31",
      options: ["31", "23", "39", "20"],
      language: { tamil: "தீர்க்கவும்: 15 + (8 × 2)" },
      type: "multipleChoice",
    },
    {
      q: "Area of a square with side 5 cm",
      correct: "25",
      options: ["10", "20", "25", "30"],
      language: { tamil: "5 செ.மீ பக்கமுள்ள சதுரத்தின் பரப்பளவு" },
      type: "multipleChoice",
    },
    {
      q: "What is the value of 3²?",
      correct: "9",
      options: ["6", "8", "9", "12"],
      language: { tamil: "3²-இன் மதிப்பு என்ன?" },
      type: "multipleChoice",
    },
    {
      q: "What is the square root of 64?",
      correct: "8",
      options: ["6", "7", "8", "9"],
      language: { tamil: "64-இன் வர்க்கமூலம் என்ன?" },
      type: "multipleChoice",
    },
    {
      q: "What is 7 × 8?",
      correct: "56",
      options: ["48", "56", "54", "64"],
      language: { tamil: "7 × 8 என்றால் என்ன?" },
      type: "multipleChoice",
    },
    {
      q: "What is 72 ÷ 8?",
      correct: "9",
      options: ["8", "9", "6", "10"],
      language: { tamil: "72 ÷ 8 என்றால் என்ன?" },
      type: "multipleChoice",
    },
    {
      q: "Find the perimeter of a square with side 6 cm",
      correct: "24",
      options: ["18", "20", "24", "36"],
      language: { tamil: "6 செ.மீ பக்கமுள்ள சதுரத்தின் சுற்றளவு" },
      type: "multipleChoice",
    },
    {
      q: "Simplify: 50 – 25 ÷ 5",
      correct: "45",
      options: ["25", "45", "35", "40"],
      language: { tamil: "50 – 25 ÷ 5-ஐ எளிமைப்படுத்தவும்" },
      type: "multipleChoice",
    },
    {
      q: "What is 3/4 of 20?",
      correct: "15",
      options: ["10", "12", "15", "18"],
      language: { tamil: "20-இன் 3/4 என்றால் என்ன?" },
      type: "multipleChoice",
    },
    {
      q: "Area of a rectangle with length 8 cm and breadth 3 cm",
      correct: "24",
      options: ["11", "16", "20", "24"],
      language: {
        tamil:
          "8 செ.மீ நீளம் மற்றும் 3 செ.மீ அகலம் கொண்ட செவ்வகத்தின் பரப்பளவு",
      },
      type: "multipleChoice",
    },
    {
      q: "Solve: 5 × (6 + 2)",
      correct: "40",
      options: ["35", "36", "40", "42"],
      language: { tamil: "தீர்க்கவும்: 5 × (6 + 2)" },
      type: "multipleChoice",
    },
    {
      q: "What is the square of 12?",
      correct: "144",
      options: ["120", "144", "156", "168"],
      language: { tamil: "12-இன் வர்க்கம் என்ன?" },
      type: "multipleChoice",
    },
    {
      q: "What is the cube root of 27?",
      correct: "3",
      options: ["2", "3", "4", "5"],
      language: { tamil: "27-இன் கனமூலம் என்ன?" },
      type: "multipleChoice",
    },
    {
      q: "LCM of 8 and 12",
      correct: "24",
      options: ["16", "18", "20", "24"],
      language: { tamil: "8 மற்றும் 12-இன் மீ.சி.ம" },
      type: "multipleChoice",
    },
    {
      q: "HCF of 28 and 42",
      correct: "14",
      options: ["7", "14", "21", "28"],
      language: { tamil: "28 மற்றும் 42-இன் மீ.பொ.வ" },
      type: "multipleChoice",
    },
    {
      q: "If side = 7 cm, area of square?",
      correct: "49",
      options: ["21", "42", "49", "56"],
      language: { tamil: "7 செ.மீ பக்கமுள்ள சதுரத்தின் பரப்பளவு" },
      type: "multipleChoice",
    },
    {
      q: "Convert 3/5 into percentage",
      correct: "60%",
      options: ["50%", "55%", "60%", "65%"],
      language: { tamil: "3/5-ஐ சதவீதமாக மாற்றவும்" },
      type: "multipleChoice",
    },
    {
      q: "Simplify: 2³",
      correct: "8",
      options: ["6", "7", "8", "9"],
      language: { tamil: "2³-ஐ எளிமைப்படுத்தவும்" },
      type: "multipleChoice",
    },
    {
      q: "What is 25% of 200?",
      correct: "50",
      options: ["25", "50", "75", "100"],
      language: { tamil: "200-இன் 25% என்றால் என்ன?" },
      type: "multipleChoice",
    },
    {
      q: "What is the average of 5, 10, 15?",
      correct: "10",
      options: ["5", "8", "10", "12"],
      language: { tamil: "5, 10, 15-இன் சராசரி என்ன?" },
      type: "multipleChoice",
    },
    {
      q: "Simplify: (9 × 3) – (5 × 2)",
      correct: "17",
      options: ["19", "17", "20", "15"],
      language: { tamil: "(9 × 3) – (5 × 2)-ஐ எளிமைப்படுத்தவும்" },
      type: "multipleChoice",
    },
    {
      q: "If a triangle has sides 3, 4, 5, what type is it?",
      correct: "Right angled",
      options: ["Equilateral", "Isosceles", "Scalene", "Right angled"],
      language: { tamil: "3, 4, 5 பக்கங்கள் உள்ள முக்கோணம் எப்படிப்பட்டது?" },
      type: "multipleChoice",
    },
    {
      q: "What is the perimeter of a rectangle with length 10 cm and breadth 6 cm?",
      correct: "32",
      options: ["16", "20", "26", "32"],
      language: {
        tamil:
          "10 செ.மீ நீளம் மற்றும் 6 செ.மீ அகலம் கொண்ட செவ்வகத்தின் சுற்றளவு",
      },
      type: "multipleChoice",
    },
    {
      q: "What is 15²?",
      correct: "225",
      options: ["200", "215", "225", "240"],
      language: { tamil: "15²-இன் மதிப்பு என்ன?" },
      type: "multipleChoice",
    },
    {
      q: "Find mode of 2, 3, 3, 5, 6",
      correct: "3",
      options: ["2", "3", "5", "6"],
      language: {
        tamil: "2, 3, 3, 5, 6-இன் அடிக்கடி வருவதை (mode) கண்டறியவும்",
      },
      type: "multipleChoice",
    },
    {
      q: "If radius = 7 cm, area of circle? (use π = 22/7)",
      correct: "154",
      options: ["144", "154", "147", "160"],
      language: {
        tamil:
          "ஆரம் 7 செ.மீ உள்ள வட்டத்தின் பரப்பளவு (π = 22/7 பயன்படுத்தவும்)",
      },
      type: "multipleChoice",
    },
    {
      q: "What is 9 × 12?",
      correct: "108",
      options: ["96", "100", "108", "112"],
      language: { tamil: "9 × 12 என்றால் என்ன?" },
      type: "multipleChoice",
    },
    {
      q: "Solve: 7 + (4 × 5)",
      correct: "27",
      options: ["20", "22", "27", "30"],
      language: { tamil: "தீர்க்கவும்: 7 + (4 × 5)" },
      type: "multipleChoice",
    },
    {
      q: "What is the square root of 121?",
      correct: "11",
      options: ["10", "11", "12", "13"],
      language: { tamil: "121-இன் வர்க்கமூலம் என்ன?" },
      type: "multipleChoice",
    },
    {
      q: "Arrange steps to find average of numbers 10, 20, 30.",
      correct: ["Add all numbers", "Divide sum by 3", "Get answer = 20"],
      options: ["Add all numbers", "Get answer = 20", "Divide sum by 3"],
      language: {
        tamil:
          "10, 20, 30 எண்களின் சராசரியை காணும் படிகளை வரிசைப்படுத்துங்கள்.",
      },
      type: "sequencing",
    },
    {
      q: "What is 100 ÷ 4?",
      correct: "25",
      options: ["20", "24", "25", "30"],
      language: { tamil: "100 ÷ 4 என்றால் என்ன?" },
      type: "multipleChoice",
    },
    {
      q: "If a triangle has angles 60°, 60°, 60°, what type is it?",
      correct: "Equilateral",
      options: ["Isosceles", "Scalene", "Equilateral", "Right angled"],
      language: {
        tamil: "60°, 60°, 60° கோணங்கள் கொண்ட முக்கோணம் எப்படிப்பட்டது?",
      },
      type: "multipleChoice",
    },
    {
      q: "Simplify: (12 × 2) + (15 ÷ 3)",
      correct: "29",
      options: ["30", "27", "29", "26"],
      language: { tamil: "(12 × 2) + (15 ÷ 3)-ஐ எளிமைப்படுத்தவும்" },
      type: "multipleChoice",
    },
    {
      q: "What is 2/3 of 90?",
      correct: "60",
      options: ["30", "45", "60", "75"],
      language: { tamil: "90-இன் 2/3 என்றால் என்ன?" },
      type: "multipleChoice",
    },
    {
      q: "Area of a triangle with base 10 cm and height 6 cm",
      correct: "30",
      options: ["20", "25", "30", "35"],
      language: {
        tamil:
          "10 செ.மீ அடிப்பாகம் மற்றும் 6 செ.மீ உயரம் கொண்ட முக்கோணத்தின் பரப்பளவு",
      },
      type: "multipleChoice",
    },
    {
      q: "Find HCF of 45 and 75",
      correct: "15",
      options: ["5", "10", "15", "25"],
      language: { tamil: "45 மற்றும் 75-இன் மீ.பொ.வ" },
      type: "multipleChoice",
    },
    {
      q: "What is the square of 20?",
      correct: "400",
      options: ["380", "390", "400", "420"],
      language: { tamil: "20-இன் வர்க்கம் என்ன?" },
      type: "multipleChoice",
    },
    {
      q: "What is the cube of 4?",
      correct: "64",
      options: ["48", "56", "64", "72"],
      language: { tamil: "4-இன் கன மதிப்பு என்ன?" },
      type: "multipleChoice",
    },
    {
      q: "What is 5 × 16?",
      correct: "80",
      options: ["60", "70", "80", "90"],
      language: { tamil: "5 × 16 என்றால் என்ன?" },
      type: "multipleChoice",
    },
    {
      q: "Simplify: 90 – (6 × 5)",
      correct: "60",
      options: ["70", "65", "60", "55"],
      language: { tamil: "90 – (6 × 5)-ஐ எளிமைப்படுத்தவும்" },
      type: "multipleChoice",
    },
    {
      q: "If side = 9 cm, perimeter of square?",
      correct: "36",
      options: ["18", "27", "36", "45"],
      language: { tamil: "9 செ.மீ பக்கமுள்ள சதுரத்தின் சுற்றளவு" },
      type: "multipleChoice",
    },
    {
      q: "Convert 0.25 into fraction",
      correct: "1/4",
      options: ["1/2", "1/3", "1/4", "3/4"],
      language: { tamil: "0.25-ஐ எளிய பகுத்தொகுதியாக மாற்றவும்" },
      type: "multipleChoice",
    },
    {
      q: "Simplify: 5² + 6²",
      correct: "61",
      options: ["56", "60", "61", "62"],
      language: { tamil: "5² + 6²-ஐ எளிமைப்படுத்தவும்" },
      type: "multipleChoice",
    },
    {
      q: "Find median of 4, 7, 10",
      correct: "7",
      options: ["4", "7", "10", "6"],
      language: { tamil: "4, 7, 10-இன் இடைநிலை என்ன?" },
      type: "multipleChoice",
    },
    {
      q: "What is 12% of 200?",
      correct: "24",
      options: ["20", "22", "24", "26"],
      language: { tamil: "200-இன் 12% என்றால் என்ன?" },
      type: "multipleChoice",
    },
    {
      q: "Simplify: (8 × 4) – (12 ÷ 3)",
      correct: "28",
      options: ["32", "28", "30", "26"],
      language: { tamil: "(8 × 4) – (12 ÷ 3)-ஐ எளிமைப்படுத்தவும்" },
      type: "multipleChoice",
    },
    {
      q: "If a rectangle has length 12 cm and breadth 5 cm, area?",
      correct: "60",
      options: ["55", "58", "60", "62"],
      language: {
        tamil:
          "12 செ.மீ நீளம் மற்றும் 5 செ.மீ அகலம் கொண்ட செவ்வகத்தின் பரப்பளவு",
      },
      type: "multipleChoice",
    },
    {
      q: "What is the average of 2, 4, 6, 8?",
      correct: "5",
      options: ["4", "5", "6", "7"],
      language: { tamil: "2, 4, 6, 8-இன் சராசரி என்ன?" },
      type: "multipleChoice",
    },
    {
      q: "Find LCM of 9 and 15",
      correct: "45",
      options: ["30", "35", "40", "45"],
      language: { tamil: "9 மற்றும் 15-இன் மீ.சி.ம" },
      type: "multipleChoice",
    },
    {
      q: "Square root of 225?",
      correct: "15",
      options: ["13", "14", "15", "16"],
      language: { tamil: "225-இன் வர்க்கமூலம் என்ன?" },
      type: "multipleChoice",
    },
    {
      q: "Simplify: 7³",
      correct: "343",
      options: ["300", "320", "343", "350"],
      language: { tamil: "7³-ஐ எளிமைப்படுத்தவும்" },
      type: "multipleChoice",
    },
    {
      q: "If radius = 14 cm, circumference of circle? (use π = 22/7)",
      correct: "88",
      options: ["84", "88", "90", "92"],
      language: {
        tamil:
          "ஆரம் 14 செ.மீ உள்ள வட்டத்தின் சுற்றளவு (π = 22/7 பயன்படுத்தவும்)",
      },
      type: "multipleChoice",
    },
    {
      q: "What is 18 × 7?",
      correct: "126",
      options: ["118", "120", "124", "126"],
      language: { tamil: "18 × 7 என்றால் என்ன?" },
      type: "multipleChoice",
    },
    {
      q: "Arrange steps to find perimeter of rectangle with l = 8, b = 5.",
      correct: ["Add length + breadth", "Multiply by 2", "Get answer = 26"],
      options: ["Get answer = 26", "Multiply by 2", "Add length + breadth"],
      language: {
        tamil:
          "நீளம் = 8, அகலம் = 5 உள்ள செவ்வகத்தின் சுற்றளவை காணும் படிகளை வரிசைப்படுத்துங்கள்.",
      },
      type: "sequencing",
    },
    {
      q: "Simplify: (20 ÷ 4) + (3 × 6)",
      correct: "23",
      options: ["22", "23", "24", "25"],
      language: { tamil: "(20 ÷ 4) + (3 × 6)-ஐ எளிமைப்படுத்தவும்" },
      type: "multipleChoice",
    },
  ],

  intermediate: [
    {
      q: "Find median of 5, 7, 9, 11, 13",
      correct: "9",
      options: ["7", "9", "11", "8"],
      language: { tamil: "5, 7, 9, 11, 13-இன் இடைநிலை என்ன?" },
      type: "multipleChoice",
    },
    {
      q: "Solve: 2x + 3 = 11",
      correct: "4",
      options: ["2", "3", "4", "5"],
      language: { tamil: "தீர்க்கவும்: 2x + 3 = 11" },
      type: "multipleChoice",
    },
    {
      q: "What is 20% of 150?",
      correct: "30",
      options: ["15", "30", "50", "100"],
      language: { tamil: "150-இன் 20% என்றால் என்ன?" },
      type: "multipleChoice",
    },
    {
      q: "What is the next prime number after 13?",
      correct: "17",
      options: ["15", "16", "17", "19"],
      language: { tamil: "13-க்குப் பிறகு வரும் அடுத்த பகா எண் என்ன?" },
      type: "multipleChoice",
    },
    {
      q: "If a circle has a circumference of 8π, what is its radius?",
      correct: "4",
      options: ["2", "3", "4", "5"],
      language: {
        tamil: "ஒரு வட்டத்தின் சுற்றளவு 8π என்றால், அதன் ஆரம் என்ன?",
      },
      type: "multipleChoice",
    },
    {
      q: "What is the slope of the line y = 3x + 2?",
      correct: "3",
      options: ["2", "3", "5", "1"],
      language: { tamil: "y = 3x + 2 கோட்டின் சாய்வு என்ன?" },
      type: "multipleChoice",
    },
    {
      q: "Solve: 3x – 5 = 10",
      correct: "5",
      options: ["3", "4", "5", "6"],
      language: { tamil: "தீர்க்கவும்: 3x – 5 = 10" },
      type: "multipleChoice",
    },
    {
      q: "Find the value of (x – 2)(x + 2) when x = 5",
      correct: "21",
      options: ["20", "21", "22", "25"],
      language: { tamil: "x = 5 ஆகும் போது (x – 2)(x + 2)-இன் மதிப்பு" },
      type: "multipleChoice",
    },
    {
      q: "What is the distance between (0,0) and (3,4)?",
      correct: "5",
      options: ["3", "4", "5", "6"],
      language: { tamil: "(0,0) மற்றும் (3,4) இடையிலான தூரம் என்ன?" },
      type: "multipleChoice",
    },
    {
      q: "Solve: x² – 9 = 0",
      correct: "±3",
      options: ["±2", "±3", "±4", "±5"],
      language: { tamil: "தீர்க்கவும்: x² – 9 = 0" },
      type: "multipleChoice",
    },
    {
      q: "Find slope of line joining (2,3) and (4,7)",
      correct: "2",
      options: ["1", "2", "3", "4"],
      language: { tamil: "(2,3) மற்றும் (4,7) இணைக்கும் கோட்டின் சாய்வு" },
      type: "multipleChoice",
    },
    {
      q: "sin30° = ?",
      correct: "1/2",
      options: ["1/2", "√3/2", "√2/2", "1"],
      language: { tamil: "sin30° = ?" },
      type: "multipleChoice",
    },
    {
      q: "cos60° = ?",
      correct: "1/2",
      options: ["1/2", "√3/2", "√2/2", "0"],
      language: { tamil: "cos60° = ?" },
      type: "multipleChoice",
    },
    {
      q: "tan45° = ?",
      correct: "1",
      options: ["0", "1", "√3", "√3/3"],
      language: { tamil: "tan45° = ?" },
      type: "multipleChoice",
    },
    {
      q: "Solve: 2x + y = 10, if y = 4",
      correct: "3",
      options: ["2", "3", "4", "5"],
      language: { tamil: "2x + y = 10, y = 4 ஆகும் போது x-இன் மதிப்பு" },
      type: "multipleChoice",
    },
    {
      q: "Find probability of getting head in a coin toss",
      correct: "1/2",
      options: ["0", "1/2", "1/3", "1"],
      language: { tamil: "ஒரு நாணயத்தை வீசும் போது தலை வரும் சாத்தியம்" },
      type: "multipleChoice",
    },
    {
      q: "What is mean of 2, 4, 6, 8, 10?",
      correct: "6",
      options: ["5", "6", "7", "8"],
      language: { tamil: "2, 4, 6, 8, 10-இன் சராசரி என்ன?" },
      type: "multipleChoice",
    },
    {
      q: "Find median of 12, 14, 16, 18, 20",
      correct: "16",
      options: ["14", "15", "16", "18"],
      language: { tamil: "12, 14, 16, 18, 20-இன் இடைநிலை" },
      type: "multipleChoice",
    },
    {
      q: "If P(E) = 0.4, find P(not E)",
      correct: "0.6",
      options: ["0.4", "0.5", "0.6", "0.7"],
      language: { tamil: "P(E) = 0.4 என்றால், P(not E)-ஐ கண்டறிக" },
      type: "multipleChoice",
    },
    {
      q: "Simplify: (x + 3)²",
      correct: "x² + 6x + 9",
      options: ["x² + 6x + 9", "x² + 3x + 9", "x² + 6x + 6", "x² + 9x + 3"],
      language: { tamil: "(x + 3)²-ஐ எளிமைப்படுத்தவும்" },
      type: "multipleChoice",
    },
    {
      q: "Find roots of x² – 5x + 6 = 0",
      correct: "2,3",
      options: ["1,6", "2,3", "3,4", "2,4"],
      language: { tamil: "x² – 5x + 6 = 0-இன் வேர்கள்" },
      type: "multipleChoice",
    },
    {
      q: "Equation of line parallel to y = 2x + 3 and passing through (0,1)",
      correct: "y = 2x + 1",
      options: ["y = 2x + 1", "y = 3x + 1", "y = 2x - 1", "y = x + 1"],
      language: {
        tamil: "(0,1)-இல் செல்லும் y = 2x + 3-க்கு இணையான கோட்டின் சமன்பாடு",
      },
      type: "multipleChoice",
    },
    {
      q: "Simplify: sin²θ + cos²θ",
      correct: "1",
      options: ["0", "1", "θ", "2"],
      language: { tamil: "sin²θ + cos²θ-ஐ எளிமைப்படுத்தவும்" },
      type: "multipleChoice",
    },
    {
      q: "If radius = 7 cm, find volume of sphere (use π = 22/7)",
      correct: "1436.67",
      options: ["1436.67", "1540", "1500", "1400"],
      language: { tamil: "ஆரம் 7 செ.மீ உள்ள உருளையின் கன அளவு (π = 22/7)" },
      type: "multipleChoice",
    },
    {
      q: "Surface area of cube with side 4 cm",
      correct: "96",
      options: ["64", "80", "96", "100"],
      language: { tamil: "4 செ.மீ பக்கமுள்ள கனத்தின் மேற்பரப்பளவு" },
      type: "multipleChoice",
    },
    {
      q: "Simplify: (a + b)² – (a – b)²",
      correct: "4ab",
      options: ["2ab", "4ab", "2a²", "4b²"],
      language: { tamil: "(a + b)² – (a – b)²-ஐ எளிமைப்படுத்தவும்" },
      type: "multipleChoice",
    },
    {
      q: "Find distance between (1,2) and (4,6)",
      correct: "5",
      options: ["4", "5", "6", "7"],
      language: { tamil: "(1,2) மற்றும் (4,6) இடையிலான தூரம்" },
      type: "multipleChoice",
    },
    {
      q: "tan²θ + 1 = ?",
      correct: "sec²θ",
      options: ["cosec²θ", "cos²θ", "sec²θ", "cot²θ"],
      language: { tamil: "tan²θ + 1 = ?" },
      type: "multipleChoice",
    },
    {
      q: "Arrange steps to solve 2x – 4 = 10",
      correct: [
        "Add 4 to both sides",
        "Simplify to get 2x = 14",
        "Divide by 2",
        "x = 7",
      ],
      options: [
        "Divide by 2",
        "x = 7",
        "Simplify to get 2x = 14",
        "Add 4 to both sides",
      ],
      language: {
        tamil: "2x – 4 = 10-ஐ தீர்க்கும் படிகளை வரிசைப்படுத்துங்கள்.",
      },
      type: "sequencing",
    },
    {
      q: "If hypotenuse = 13 and one side = 5, find other side",
      correct: "12",
      options: ["10", "11", "12", "13"],
      language: {
        tamil:
          "ஒரு நாற்கர சாய்வு முக்கோணத்தில், ஹைப்போட்டினியூஸ் = 13 மற்றும் ஒரு பக்கம் = 5 என்றால், மற்ற பக்கம் என்ன?",
      },
      type: "multipleChoice",
    },
    {
      q: "Solve: 5x + 7 = 27",
      correct: "4",
      options: ["3", "4", "5", "6"],
      language: { tamil: "தீர்க்கவும்: 5x + 7 = 27" },
      type: "multipleChoice",
    },
    {
      q: "Factorize: x² – 7x + 12",
      correct: "(x – 3)(x – 4)",
      options: [
        "(x – 3)(x – 4)",
        "(x – 2)(x – 6)",
        "(x – 1)(x – 12)",
        "(x + 3)(x + 4)",
      ],
      language: { tamil: "x² – 7x + 12-ஐ காரணி பிரிக்கவும்" },
      type: "multipleChoice",
    },
    {
      q: "Find distance between (2,5) and (5,9)",
      correct: "5",
      options: ["3", "4", "5", "6"],
      language: { tamil: "(2,5) மற்றும் (5,9) இடையிலான தூரம்" },
      type: "multipleChoice",
    },
    {
      q: "Find slope of line y = 3x + 7",
      correct: "3",
      options: ["3", "7", "-3", "1/3"],
      language: { tamil: "y = 3x + 7-இன் சாய்வு" },
      type: "multipleChoice",
    },
    {
      q: "sin²45° + cos²45° = ?",
      correct: "1",
      options: ["0", "1", "√2", "2"],
      language: { tamil: "sin²45° + cos²45° = ?" },
      type: "multipleChoice",
    },
    {
      q: "Find value of tan30°",
      correct: "1/√3",
      options: ["1/√3", "√3", "1", "0"],
      language: { tamil: "tan30°-இன் மதிப்பு" },
      type: "multipleChoice",
    },
    {
      q: "Solve: 2x – 3y = 12, if y = 2",
      correct: "9",
      options: ["6", "7", "8", "9"],
      language: { tamil: "2x – 3y = 12, y = 2 என்றால் x-இன் மதிப்பு" },
      type: "multipleChoice",
    },
    {
      q: "Find probability of getting an even number in a dice roll",
      correct: "1/2",
      options: ["1/6", "1/2", "2/3", "1"],
      language: { tamil: "பாச்சியில் சீரெண் வருவதற்கான சாத்தியம்" },
      type: "multipleChoice",
    },
    {
      q: "Mean of 5, 10, 15, 20, 25",
      correct: "15",
      options: ["10", "12", "15", "20"],
      language: { tamil: "5, 10, 15, 20, 25-இன் சராசரி" },
      type: "multipleChoice",
    },
    {
      q: "Find mode of 2, 4, 4, 6, 8, 8, 8, 10",
      correct: "8",
      options: ["4", "6", "8", "10"],
      language: {
        tamil: "2, 4, 4, 6, 8, 8, 8, 10-இன் அதிகம் தோன்றும் மதிப்பு",
      },
      type: "multipleChoice",
    },
    {
      q: "Simplify: (x – 5)(x + 5)",
      correct: "x² – 25",
      options: ["x² – 25", "x² + 25", "x² – 10x", "x² + 10x"],
      language: { tamil: "(x – 5)(x + 5)-ஐ எளிமைப்படுத்தவும்" },
      type: "multipleChoice",
    },
    {
      q: "Roots of x² – 4x – 5 = 0",
      correct: "5,-1",
      options: ["5,-1", "4,-1", "5,1", "4,5"],
      language: { tamil: "x² – 4x – 5 = 0-இன் வேர்கள்" },
      type: "multipleChoice",
    },
    {
      q: "Equation of line through (0,2) with slope 2",
      correct: "y = 2x + 2",
      options: ["y = 2x + 2", "y = x + 2", "y = 2x - 2", "y = 3x + 2"],
      language: {
        tamil: "சாய்வு 2 மற்றும் (0,2) வழியாக செல்லும் கோட்டின் சமன்பாடு",
      },
      type: "multipleChoice",
    },
    {
      q: "Find value of cos²30° + sin²30°",
      correct: "1",
      options: ["0", "1", "√3/2", "1/2"],
      language: { tamil: "cos²30° + sin²30° = ?" },
      type: "multipleChoice",
    },
    {
      q: "Volume of cone with r = 7 cm, h = 12 cm (π = 22/7)",
      correct: "616",
      options: ["616", "700", "650", "720"],
      language: {
        tamil: "ஆரம் 7 செ.மீ, உயரம் 12 செ.மீ கொண்ட கூம்பின் கன அளவு",
      },
      type: "multipleChoice",
    },
    {
      q: "Surface area of sphere of radius 7 cm",
      correct: "616",
      options: ["616", "700", "770", "600"],
      language: { tamil: "ஆரம் 7 செ.மீ கொண்ட உருளையின் மேற்பரப்பளவு" },
      type: "multipleChoice",
    },
    {
      q: "Simplify: (a + b)³ – (a – b)³",
      correct: "2b(3a² + b²)",
      options: ["2b(3a² + b²)", "6a²b + 2b³", "2a³ + 6ab²", "8ab²"],
      language: { tamil: "(a + b)³ – (a – b)³-ஐ எளிமைப்படுத்தவும்" },
      type: "multipleChoice",
    },
    {
      q: "Find distance between (–3,0) and (0,4)",
      correct: "5",
      options: ["3", "4", "5", "6"],
      language: { tamil: "(–3,0) மற்றும் (0,4) இடையிலான தூரம்" },
      type: "multipleChoice",
    },
    {
      q: "cot45° = ?",
      correct: "1",
      options: ["0", "1", "√3", "1/√3"],
      language: { tamil: "cot45° = ?" },
      type: "multipleChoice",
    },
    {
      q: "Arrange steps to solve x/2 + 5 = 9",
      correct: [
        "Subtract 5 from both sides",
        "Simplify to get x/2 = 4",
        "Multiply both sides by 2",
        "x = 8",
      ],
      options: [
        "Multiply both sides by 2",
        "Subtract 5 from both sides",
        "x = 8",
        "Simplify to get x/2 = 4",
      ],
      language: {
        tamil: "x/2 + 5 = 9-ஐ தீர்க்கும் படிகளை வரிசைப்படுத்துங்கள்.",
      },
      type: "sequencing",
    },
    {
      q: "If diameter of circle = 14 cm, find area (π = 22/7)",
      correct: "154",
      options: ["144", "154", "160", "168"],
      language: { tamil: "வட்டத்தின் விட்டம் 14 செ.மீ என்றால், பரப்பளவு" },
      type: "multipleChoice",
    },
    {
      q: "Solve: 7x – 21 = 0",
      correct: "3",
      options: ["0", "1", "2", "3"],
      language: { tamil: "தீர்க்கவும்: 7x – 21 = 0" },
      type: "multipleChoice",
    },
    {
      q: "Find midpoint of (2,4) and (6,8)",
      correct: "(4,6)",
      options: ["(3,5)", "(4,6)", "(5,7)", "(6,6)"],
      language: { tamil: "(2,4) மற்றும் (6,8)-இன் நடுப்புள்ளி" },
      type: "multipleChoice",
    },
    {
      q: "If P(A) = 0.7, find P(not A)",
      correct: "0.3",
      options: ["0.2", "0.3", "0.4", "0.5"],
      language: { tamil: "P(A) = 0.7 என்றால், P(not A)" },
      type: "multipleChoice",
    },
    {
      q: "Find equation of line through (1,2) with slope 1",
      correct: "y – 2 = (x – 1)",
      options: [
        "y – 2 = (x – 1)",
        "y – 1 = (x – 2)",
        "y + 2 = (x + 1)",
        "y = x + 1",
      ],
      language: {
        tamil: "சாய்வு 1 மற்றும் (1,2) வழியாக செல்லும் கோட்டின் சமன்பாடு",
      },
      type: "multipleChoice",
    },
  ],

  advanced: [
    {
      q: "Derivative of x²",
      correct: "2x",
      options: ["2x", "x²", "2", "x"],
      language: { tamil: "x²-இன் வகைக்கெழு" },
      type: "multipleChoice",
    },
    {
      q: "Evaluate: 5²",
      correct: "25",
      options: ["20", "25", "30", "15"],
      language: { tamil: "5²-ஐ மதிப்பீடு செய்யவும்" },
      type: "multipleChoice",
    },
    {
      q: "Simplify: √49",
      correct: "7",
      options: ["6", "7", "8", "9"],
      language: { tamil: "√49-ஐ எளிமையாக்கவும்" },
      type: "multipleChoice",
    },
    {
      q: "Order the steps to solve: x + 3 = 7",
      correct: ["Subtract 3 from both sides", "Simplify to get x = 4"],
      options: ["Simplify to get x = 4", "Subtract 3 from both sides"],
      language: {
        tamil: "x + 3 = 7-ஐ தீர்க்கும் படிநிலைகளை வரிசைப்படுத்துங்கள்",
      },
      type: "sequencing",
    },
    {
      q: "What is the derivative of sin(x)?",
      correct: "cos(x)",
      options: ["cos(x)", "-cos(x)", "sin(x)", "-sin(x)"],
      language: { tamil: "sin(x)-இன் வகைக்கெழு என்ன?" },
      type: "multipleChoice",
    },
    {
      q: "Solve: log₂(8)",
      correct: "3",
      options: ["2", "3", "4", "8"],
      language: { tamil: "தீர்க்கவும்: log₂(8)" },
      type: "multipleChoice",
    },
    {
      q: "Differentiate: d/dx (e^x)",
      correct: "e^x",
      options: ["1", "e^x", "xe^(x-1)", "ln(x)"],
      language: { tamil: "d/dx (e^x)-ஐ வேறுபடுத்தவும்" },
      type: "multipleChoice",
    },
    {
      q: "Simplify: 2³",
      correct: "8",
      options: ["6", "7", "8", "9"],
      language: { tamil: "2³-ஐ எளிமையாக்கவும்" },
      type: "multipleChoice",
    },
    {
      q: "Integrate: ∫ cos x dx",
      correct: "sin x + C",
      options: ["cos x + C", "sin x + C", "-cos x + C", "-sin x + C"],
      language: { tamil: "∫ cos x dx" },
      type: "multipleChoice",
    },
    {
      q: "Simplify: √64",
      correct: "8",
      options: ["6", "7", "8", "9"],
      language: { tamil: "√64-ஐ எளிமையாக்கவும்" },
      type: "multipleChoice",
    },
    {
      q: "Evaluate: 10!",
      correct: "3628800",
      options: ["3628800", "3628000", "3620800", "3600000"],
      language: { tamil: "10!-ஐ மதிப்பீடு செய்யவும்" },
      type: "multipleChoice",
    },
    {
      q: "If A = [[1,2],[3,4]], find det(A)",
      correct: "-2",
      options: ["-2", "2", "4", "1"],
      language: { tamil: "A = [[1,2],[3,4]] என்றால், det(A)" },
      type: "multipleChoice",
    },
    {
      q: "Find HCF of 18 and 24",
      correct: "6",
      options: ["4", "5", "6", "8"],
      language: { tamil: "18 மற்றும் 24 இன் மிகப்பெரிய பொதுகாரணி (HCF)" },
      type: "multipleChoice",
    },
    {
      q: "Solve: ∫ x² dx",
      correct: "x³/3 + C",
      options: ["x³/3 + C", "x³ + C", "2x³/3 + C", "3x² + C"],
      language: { tamil: "∫ x² dx" },
      type: "multipleChoice",
    },
    {
      q: "Differentiate: d/dx (sin x cos x)",
      correct: "cos²x – sin²x",
      options: ["cos²x – sin²x", "2sin x cos x", "1", "0"],
      language: { tamil: "d/dx (sin x cos x)" },
      type: "multipleChoice",
    },
    {
      q: "If A = [[2,0],[0,3]], find eigenvalues",
      correct: "2,3",
      options: ["0,0", "2,3", "1,3", "2,4"],
      language: { tamil: "A = [[2,0],[0,3]] என்றால், eigenvalues" },
      type: "multipleChoice",
    },
    {
      q: "Simplify: (7×8)",
      correct: "56",
      options: ["54", "56", "58", "60"],
      language: { tamil: "7×8-ஐ எளிமையாக்கவும்" },
      type: "multipleChoice",
    },
    {
      q: "Find ∫ 2x dx",
      correct: "x² + C",
      options: ["x² + C", "2x² + C", "x + C", "2x + C"],
      language: { tamil: "∫ 2x dx" },
      type: "multipleChoice",
    },
    {
      q: "If f(x) = x³, find f'(2)",
      correct: "12",
      options: ["6", "8", "12", "10"],
      language: { tamil: "f(x) = x³ என்றால், f'(2)" },
      type: "multipleChoice",
    },
    {
      q: "Simplify: 15 × 12",
      correct: "180",
      options: ["150", "160", "170", "180"],
      language: { tamil: "15 × 12-ஐ எளிமையாக்கவும்" },
      type: "multipleChoice",
    },
    {
      q: "Find limit x→0 (sin x / x)",
      correct: "1",
      options: ["0", "1", "∞", "Does not exist"],
      language: { tamil: "x→0 (sin x / x)-இன் வரம்பு" },
      type: "multipleChoice",
    },
    {
      q: "Find derivative of tan x",
      correct: "sec²x",
      options: ["cos²x", "sec²x", "cot x", "-sec²x"],
      language: { tamil: "tan x-இன் வகைக்கெழு" },
      type: "multipleChoice",
    },
    {
      q: "Simplify: (9² – 81)",
      correct: "0",
      options: ["0", "1", "9", "81"],
      language: { tamil: "(9² – 81)-ஐ எளிமையாக்கவும்" },
      type: "multipleChoice",
    },
    {
      q: "Evaluate: ∫₀^π sin x dx",
      correct: "2",
      options: ["0", "1", "2", "π"],
      language: { tamil: "∫₀^π sin x dx" },
      type: "multipleChoice",
    },
    {
      q: "Evaluate: ∫₀^1 (1 – x) dx",
      correct: "1/2",
      options: ["1", "1/2", "0", "2"],
      language: { tamil: "∫₀^1 (1 – x) dx" },
      type: "multipleChoice",
    },
    {
      q: "Simplify: 20% of 250",
      correct: "50",
      options: ["25", "50", "75", "100"],
      language: { tamil: "250-இன் 20%" },
      type: "multipleChoice",
    },
    {
      q: "Differentiate: d/dx (x⁴)",
      correct: "4x³",
      options: ["4x²", "x³", "4x³", "x²"],
      language: { tamil: "x⁴-இன் வகைக்கெழு" },
      type: "multipleChoice",
    },
    {
      q: "Find derivative of cos x",
      correct: "-sin x",
      options: ["cos x", "sin x", "-cos x", "-sin x"],
      language: { tamil: "cos x-இன் வகைக்கெழு" },
      type: "multipleChoice",
    },
    {
      q: "Solve: ∫ 1/(1 + x²) dx",
      correct: "tan⁻¹x + C",
      options: ["tan⁻¹x + C", "sin⁻¹x + C", "ln(1+x²) + C", "x/(1+x²) + C"],
      language: { tamil: "∫ 1/(1 + x²) dx" },
      type: "multipleChoice",
    },
    {
      q: "Simplify: 7³",
      correct: "343",
      options: ["343", "336", "350", "300"],
      language: { tamil: "7³-ஐ எளிமையாக்கவும்" },
      type: "multipleChoice",
    },
    {
      q: "If y = x^x, find dy/dx",
      correct: "x^x(1 + ln x)",
      options: ["x^x(1 + ln x)", "x^x ln x", "x^x + ln x", "x^(x-1)"],
      language: { tamil: "y = x^x என்றால், dy/dx" },
      type: "multipleChoice",
    },
    {
      q: "Differentiate: d/dx (x ln x)",
      correct: "1 + ln x",
      options: ["1 + ln x", "ln x", "x/ln x", "1/x"],
      language: { tamil: "d/dx (x ln x)" },
      type: "multipleChoice",
    },
    {
      q: "Find derivative of e^(2x)",
      correct: "2e^(2x)",
      options: ["e^(2x)", "2e^(2x)", "e^x", "2e^x"],
      language: { tamil: "e^(2x)-இன் வகைக்கெழு" },
      type: "multipleChoice",
    },
    {
      q: "Simplify: √121",
      correct: "11",
      options: ["10", "11", "12", "13"],
      language: { tamil: "√121-ஐ எளிமையாக்கவும்" },
      type: "multipleChoice",
    },
    {
      q: "Simplify: (100 ÷ 4)",
      correct: "25",
      options: ["20", "24", "25", "30"],
      language: { tamil: "100 ÷ 4-ஐ எளிமையாக்கவும்" },
      type: "multipleChoice",
    },
    {
      q: "Find ∫ tan x dx",
      correct: "–ln|cos x| + C",
      options: ["–ln|cos x| + C", "ln|sin x| + C", "sec²x + C", "tan²x + C"],
      language: { tamil: "∫ tan x dx" },
      type: "multipleChoice",
    },
    {
      q: "Limit x→∞ (1 + 1/x)^x",
      correct: "e",
      options: ["0", "1", "e", "∞"],
      language: { tamil: "x→∞ (1 + 1/x)^x-இன் வரம்பு" },
      type: "multipleChoice",
    },
    {
      q: "Solve: ∫ cos²x dx",
      correct: "(x/2) + (sin2x/4) + C",
      options: [
        "(x/2) + (sin2x/4) + C",
        "cos x + C",
        "sin²x/2 + C",
        "x cos x + C",
      ],
      language: { tamil: "∫ cos²x dx" },
      type: "multipleChoice",
    },
    {
      q: "Differentiate: d/dx (tan⁻¹x)",
      correct: "1/(1+x²)",
      options: ["1/(1+x²)", "1/√(1-x²)", "sec²x", "-1/(1+x²)"],
      language: { tamil: "d/dx (tan⁻¹x)" },
      type: "multipleChoice",
    },
    {
      q: "Differentiate: d/dx (cot⁻¹x)",
      correct: "-1/(1+x²)",
      options: ["-1/(1+x²)", "1/(1+x²)", "-1/√(1-x²)", "cosec²x"],
      language: { tamil: "d/dx (cot⁻¹x)" },
      type: "multipleChoice",
    },
    {
      q: "Simplify: 50 × 2",
      correct: "100",
      options: ["50", "75", "100", "150"],
      language: { tamil: "50 × 2-ஐ எளிமையாக்கவும்" },
      type: "multipleChoice",
    },
    {
      q: "Find inverse of [[1,2],[3,4]]",
      correct: "[[-2,1],[1.5,-0.5]]",
      options: [
        "[[-2,1],[1.5,-0.5]]",
        "[[4,-2],[-3,1]]",
        "[[-4,2],[3,-1]]",
        "[[2,-1],[-3,4]]",
      ],
      language: { tamil: "[[1,2],[3,4]]-இன் பிரதிபலன் (inverse)" },
      type: "multipleChoice",
    },
    {
      q: "Simplify: (25 ÷ 5)",
      correct: "5",
      options: ["4", "5", "6", "7"],
      language: { tamil: "25 ÷ 5-ஐ எளிமையாக்கவும்" },
      type: "multipleChoice",
    },
    {
      q: "Evaluate: ∫₀^π/2 cos x dx",
      correct: "1",
      options: ["0", "1", "2", "π/2"],
      language: { tamil: "∫₀^(π/2) cos x dx" },
      type: "multipleChoice",
    },
    {
      q: "Evaluate: ∫₀^π/2 sin x dx",
      correct: "1",
      options: ["0", "1", "2", "π/2"],
      language: { tamil: "∫₀^(π/2) sin x dx" },
      type: "multipleChoice",
    },
    {
      q: "If f(x) = sin x, find f''(x)",
      correct: "-sin x",
      options: ["cos x", "-sin x", "-cos x", "sin x"],
      language: { tamil: "f(x) = sin x என்றால், f''(x)" },
      type: "multipleChoice",
    },
    {
      q: "If f(x) = cos x, find f''(x)",
      correct: "-cos x",
      options: ["cos x", "-cos x", "sin x", "-sin x"],
      language: { tamil: "f(x) = cos x என்றால், f''(x)" },
      type: "multipleChoice",
    },
    {
      q: "Simplify: 9 × 11",
      correct: "99",
      options: ["90", "91", "99", "101"],
      language: { tamil: "9 × 11-ஐ எளிமையாக்கவும்" },
      type: "multipleChoice",
    },
    {
      q: "Simplify: √225",
      correct: "15",
      options: ["13", "14", "15", "16"],
      language: { tamil: "√225-ஐ எளிமையாக்கவும்" },
      type: "multipleChoice",
    },
    {
      q: "Find ∫ e^(–x) dx",
      correct: "–e^(–x) + C",
      options: ["–e^(–x) + C", "e^(–x) + C", "e^x + C", "–e^x + C"],
      language: { tamil: "∫ e^(–x) dx" },
      type: "multipleChoice",
    },
    {
      q: "Simplify: 45 ÷ 9",
      correct: "5",
      options: ["4", "5", "6", "7"],
      language: { tamil: "45 ÷ 9-ஐ எளிமையாக்கவும்" },
      type: "multipleChoice",
    },
    {
      q: "Solve: ∫ cosh x dx",
      correct: "sinh x + C",
      options: ["sinh x + C", "cosh x + C", "tanh x + C", "sech x + C"],
      language: { tamil: "∫ cosh x dx" },
      type: "multipleChoice",
    },
    {
      q: "Solve: ∫ sinh x dx",
      correct: "cosh x + C",
      options: ["cosh x + C", "sinh x + C", "tanh x + C", "sech x + C"],
      language: { tamil: "∫ sinh x dx" },
      type: "multipleChoice",
    },
    {
      q: "Simplify: (5² + 12²)",
      correct: "169",
      options: ["144", "156", "169", "181"],
      language: { tamil: "5² + 12²-ஐ எளிமையாக்கவும்" },
      type: "multipleChoice",
    },
    {
      q: "Find derivative of sinh x",
      correct: "cosh x",
      options: ["cosh x", "sinh x", "-cosh x", "-sinh x"],
      language: { tamil: "sinh x-இன் வகைக்கெழு" },
      type: "multipleChoice",
    },
    {
      q: "Find derivative of cosh x",
      correct: "sinh x",
      options: ["cosh x", "sinh x", "-cosh x", "-sinh x"],
      language: { tamil: "cosh x-இன் வகைக்கெழு" },
      type: "multipleChoice",
    },
    {
      q: "Simplify: 14 × 14",
      correct: "196",
      options: ["190", "194", "196", "200"],
      language: { tamil: "14 × 14-ஐ எளிமையாக்கவும்" },
      type: "multipleChoice",
    },
    {
      q: "Simplify: 72 ÷ 8",
      correct: "9",
      options: ["7", "8", "9", "10"],
      language: { tamil: "72 ÷ 8-ஐ எளிமையாக்கவும்" },
      type: "multipleChoice",
    },
    {
      q: "Find derivative of sec x",
      correct: "sec x tan x",
      options: ["sec x tan x", "cos x", "-sec x tan x", "tan x"],
      language: { tamil: "sec x-இன் வகைக்கெழு" },
      type: "multipleChoice",
    },
    {
      q: "Find derivative of cosec x",
      correct: "-cosec x cot x",
      options: ["cosec x cot x", "-cosec x cot x", "-sin x", "cos x"],
      language: { tamil: "cosec x-இன் வகைக்கெழு" },
      type: "multipleChoice",
    },
    {
      q: "Simplify: 18 × 25",
      correct: "450",
      options: ["425", "440", "450", "475"],
      language: { tamil: "18 × 25-ஐ எளிமையாக்கவும்" },
      type: "multipleChoice",
    },
    {
      q: "Find derivative of log|x|",
      correct: "1/x",
      options: ["1/x", "log x", "x", "1/log x"],
      language: { tamil: "log|x|-இன் வகைக்கெழு" },
      type: "multipleChoice",
    },
    {
      q: "Limit x→0 (1–cos x)/x²",
      correct: "1/2",
      options: ["0", "1/2", "1", "∞"],
      language: { tamil: "x→0 (1–cos x)/x²-இன் வரம்பு" },
      type: "multipleChoice",
    },
    {
      q: "Simplify: 144 ÷ 12",
      correct: "12",
      options: ["10", "11", "12", "13"],
      language: { tamil: "144 ÷ 12-ஐ எளிமையாக்கவும்" },
      type: "multipleChoice",
    },
    {
      q: "If A = [[1,1],[1,1]], find rank(A)",
      correct: "1",
      options: ["0", "1", "2", "∞"],
      language: { tamil: "[[1,1],[1,1]]-இன் rank" },
      type: "multipleChoice",
    },
    {
      q: "Simplify: 125^(1/3)",
      correct: "5",
      options: ["4", "5", "6", "7"],
      language: { tamil: "125^(1/3)-ஐ எளிமையாக்கவும்" },
      type: "multipleChoice",
    },
    {
      q: "If y = e^(2x), find dy/dx",
      correct: "2e^(2x)",
      options: ["e^(2x)", "2e^(2x)", "e^x", "2e^x"],
      language: { tamil: "y = e^(2x) என்றால், dy/dx" },
      type: "multipleChoice",
    },
    {
      q: "Simplify: 2/5 of 100",
      correct: "40",
      options: ["30", "35", "40", "45"],
      language: { tamil: "100 இன் 2/5" },
      type: "multipleChoice",
    },
  ],
};

// Optimized shuffle function - memoized to prevent repeated array creation
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Memoized lightweight feedback component to prevent unnecessary re-renders
const QuizFeedback = memo(
  ({ message, type, correctAnswer, language, onNext }) => {
    const isCorrect = type === "correct";

    const overlayStyle = {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "1rem",
      zIndex: 50,
    };

    const modalStyle = {
      padding: "1.5rem",
      borderRadius: "0.5rem",
      maxWidth: "24rem",
      width: "100%",
      textAlign: "center",
      color: "white",
      backgroundColor: isCorrect ? "#10b981" : "#ef4444",
    };

    const buttonStyle = {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      padding: "0.5rem 1rem",
      borderRadius: "0.25rem",
      fontWeight: "600",
      border: "none",
      color: "white",
      cursor: "pointer",
      transition: "background-color 0.3s",
    };

    return (
      <div style={overlayStyle}>
        <div style={modalStyle}>
          <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
            {isCorrect ? "✅" : "❌"}
          </div>
          <p
            style={{
              fontWeight: "bold",
              fontSize: "1.125rem",
              marginBottom: "1rem",
            }}
          >
            {message}
          </p>
          {correctAnswer && (
            <p
              style={{
                fontSize: "0.875rem",
                marginBottom: "1rem",
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                padding: "0.5rem",
                borderRadius: "0.25rem",
              }}
            >
              {language === "english"
                ? `Correct Answer: ${correctAnswer}`
                : `சரியான விடை: ${correctAnswer}`}
            </p>
          )}
          <button
            onClick={onNext}
            style={buttonStyle}
            onMouseOver={(e) =>
              (e.target.style.backgroundColor = "rgba(255, 255, 255, 0.3)")
            }
            onMouseOut={(e) =>
              (e.target.style.backgroundColor = "rgba(255, 255, 255, 0.2)")
            }
          >
            {language === "english" ? "Next Question" : "அடுத்த கேள்வி"}
          </button>
        </div>
      </div>
    );
  }
);

// Main App Component - Memoized for performance
const MathQuiz = memo(() => {
  const { addScore } = useUser();
  const [currentScreen, setCurrentScreen] = useState("home");
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [language, setLanguage] = useState("english");
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isTestActive, setIsTestActive] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [selectedSequence, setSelectedSequence] = useState([]);
  const [inputAnswer, setInputAnswer] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const scoreSubmittedRef = useRef(false); // Track if score has been submitted

  // Memoized translations to prevent object recreation on every render
  const t = useMemo(() => translations[language], [language]);

  // Memoized current question to prevent unnecessary lookups
  const currentQuestion = useMemo(
    () => shuffledQuestions[currentQuestionIndex] || null,
    [shuffledQuestions, currentQuestionIndex]
  );

  // Styles
  const containerStyle = {
    minHeight: "100vh",
    width: "100%",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  };

  const cardStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(10px)",
    borderRadius: "0.75rem",
    padding: "2rem",
    maxWidth: "28rem",
    width: "100%",
    textAlign: "center",
  };

  const buttonStyle = {
    padding: "0.75rem 1.5rem",
    borderRadius: "0.5rem",
    fontWeight: "bold",
    border: "none",
    cursor: "pointer",
    transition: "all 0.3s ease",
    fontSize: "1rem",
  };

  const primaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    color: "white",
  };

  const levelButtonStyle = {
    ...buttonStyle,
    width: "100%",
    padding: "1rem",
    fontSize: "1.125rem",
    marginBottom: "0.75rem",
  };

  // Next question handler
  const handleNextQuestion = useCallback(() => {
    setFeedback(null);
    setAnswerSubmitted(false);
    setSelectedAnswer(null);
    setInputAnswer("");
    setSelectedSequence([]);

    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setTimeLeft(30);
    } else {
      setIsTestActive(false);
      setCurrentScreen("results");

      // Save score to UserContext using setTimeout to ensure we get the latest score
      // Use ref to prevent duplicate submissions
      if (!scoreSubmittedRef.current) {
        console.log('MathQuiz: Saving score (first time)');
        scoreSubmittedRef.current = true;
        setTimeout(() => {
          setScore((latestScore) => {
            const maxPossibleScore = shuffledQuestions.length;
            console.log('MathQuiz: Actually calling addScore with score:', latestScore, '/', maxPossibleScore);
            addScore(
              "mathQuiz",
              latestScore,
              maxPossibleScore,
              null, // No time tracking in current implementation
              selectedLevel || "beginner"
            );
            return latestScore; // Return unchanged score
          });
        }, 100);
      } else {
        console.log('MathQuiz: Score already submitted, skipping duplicate');
      }
    }
  }, [currentQuestionIndex, shuffledQuestions.length, addScore, selectedLevel]);

  // Timer effect
  useEffect(() => {
    if (!isTestActive || timeLeft <= 0) {
      if (timeLeft <= 0 && isTestActive && !answerSubmitted) {
        setFeedback({
          message: t.timeUp,
          type: "incorrect",
          correctAnswer: shuffledQuestions[currentQuestionIndex]?.correct,
        });
      }
      return;
    }
    const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [
    timeLeft,
    isTestActive,
    answerSubmitted,
    t.timeUp,
    shuffledQuestions,
    currentQuestionIndex,
  ]);

  // Play victory audio when results screen is shown
  useEffect(() => {
    if (currentScreen === "results") {
      const audio = new Audio(victorySound);
      audio.play().catch(err => console.log('Victory audio play failed:', err));
    }
  }, [currentScreen]);

  // Start test function
  const startTest = (level) => {
    setSelectedLevel(level);
    setCurrentScreen("test");
    const levelQuestions = questionBank[level];
    const questionsToUse = Math.min(6, levelQuestions.length);
    setShuffledQuestions(shuffleArray(levelQuestions).slice(0, questionsToUse));
    setCurrentQuestionIndex(0);
    setScore(0);
    setTimeLeft(30);
    setIsTestActive(true);
    setFeedback(null);
    setAnswerSubmitted(false);
    scoreSubmittedRef.current = false; // Reset score submission flag
  };

  // Answer checking
  const handleCheckAnswer = () => {
    if (answerSubmitted) return;

    const currentQ = shuffledQuestions[currentQuestionIndex];
    let isCorrect = false;
    let userAnswer = "";

    if (currentQ.type === "multipleChoice") {
      if (!selectedAnswer) return;
      userAnswer = selectedAnswer;
      isCorrect =
        selectedAnswer.toString().toLowerCase() ===
        currentQ.correct.toString().toLowerCase();
    } else if (currentQ.type === "fillInTheBlank") {
      if (!inputAnswer.trim()) return;
      userAnswer = inputAnswer.trim();
      isCorrect =
        inputAnswer.trim().toLowerCase() ===
        currentQ.correct.toString().toLowerCase();
    }

    setAnswerSubmitted(true);

    if (isCorrect) {
      setScore((prev) => prev + 1);
      setFeedback({ message: t.correct, type: "correct" });
      
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
        message:
          language === "english"
            ? "Try again! Practice makes perfect!"
            : "மீண்டும் முயற்சி செய்யுங்கள்! பயிற்சியே வெற்றிக்கு வழி!",
        type: "incorrect",
        correctAnswer: currentQ.correct,
      });
    }
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
            ...containerStyle,
            display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          padding: "1rem",
        }}
      >
        <div style={cardStyle}>
          <h1
            style={{
              fontSize: "1.875rem",
              fontWeight: "bold",
              color: "white",
              marginBottom: "1rem",
            }}
          >
            {t.title}
          </h1>

          <p
            style={{
              color: "white",
              opacity: 0.9,
              marginBottom: "1.5rem",
              fontSize: "0.875rem",
            }}
          >
            {language === "english"
              ? "Challenge yourself with interactive math problems!"
              : "ஊடாடும் கணிதச் சிக்கல்களுடன் உங்களை சவால் செய்யுங்கள்!"}
          </p>

          <button
            onClick={() =>
              setLanguage(language === "english" ? "tamil" : "english")
            }
            style={{
              ...primaryButtonStyle,
              marginBottom: "1.5rem",
              borderRadius: "9999px",
              padding: "0.5rem 1.5rem",
            }}
          >
            🌐 {t.languageButton}
          </button>

          <div>
            {[
              { level: "beginner", color: "#10b981", emoji: "🟢" },
              { level: "intermediate", color: "#f59e0b", emoji: "🟡" },
              { level: "advanced", color: "#ef4444", emoji: "🔴" },
            ].map(({ level, color, emoji }) => (
              <button
                key={level}
                onClick={() => startTest(level)}
                style={{
                  ...levelButtonStyle,
                  backgroundColor: color,
                  color: "white",
                }}
                onMouseOver={(e) => (e.target.style.opacity = "0.9")}
                onMouseOut={(e) => (e.target.style.opacity = "1")}
              >
                {emoji} {t[level]}
              </button>
            ))}
          </div>
        </div>
      </div>
      </>
    );
  }

  // Test Screen
  if (currentScreen === "test" && shuffledQuestions.length > 0) {
    const q = shuffledQuestions[currentQuestionIndex];
    const questionText =
      language === "tamil" && q.language?.tamil ? q.language.tamil : q.q;
    const backgrounds = {
      beginner: "linear-gradient(135deg, #10b981 0%, #3b82f6 100%)",
      intermediate: "linear-gradient(135deg, #f59e0b 0%, #f97316 100%)",
      advanced: "linear-gradient(135deg, #ef4444 0%, #8b5cf6 100%)",
    };

    const headerStyle = {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "1rem",
      padding: "0 1rem",
    };

    const timerStyle = {
      padding: "0.5rem 1rem",
      borderRadius: "9999px",
      fontWeight: "bold",
      color: "white",
      backgroundColor: timeLeft <= 10 ? "#ef4444" : "rgba(255, 255, 255, 0.2)",
      animation: timeLeft <= 10 ? "pulse 1s infinite" : "none",
    };

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
            ...containerStyle,
            background: backgrounds[selectedLevel],
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
        <style>
          {`
            @keyframes pulse {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.5; }
            }
          `}
        </style>

        {/* Header */}
        <div style={headerStyle}>
          <div style={{ color: "white", fontWeight: "bold" }}>
            {t.question} {currentQuestionIndex + 1}/{shuffledQuestions.length}
          </div>

          <div style={timerStyle}>⏰ {timeLeft}s</div>

          <button
            onClick={() => setCurrentScreen("home")}
            style={{
              ...primaryButtonStyle,
              borderRadius: "9999px",
              padding: "0.5rem",
            }}
          >
            Back to level
          </button>
        </div>
        <button
          onClick={() =>
            setLanguage(language === "english" ? "tamil" : "english")
          }
          style={{
            ...primaryButtonStyle,
            marginBottom: "1.5rem",
            borderRadius: "9999px",
            padding: "0.5rem 1.5rem",
            width: "fit-content",
          }}
        >
          🌐 {t.languageButton}
        </button>
        {/* Question Card */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              ...cardStyle,
              maxWidth: "32rem",
            }}
          >
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: "600",
                color: "white",
                marginBottom: "1.5rem",
              }}
            >
              {questionText}
            </h2>

            {q.type === "multipleChoice" && (
              <div style={{ marginBottom: "1.5rem" }}>
                {q.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedAnswer(opt)}
                    disabled={answerSubmitted}
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      borderRadius: "0.5rem",
                      fontWeight: "600",
                      border: "none",
                      marginBottom: "0.75rem",
                      cursor: answerSubmitted ? "not-allowed" : "pointer",
                      opacity: answerSubmitted ? 0.6 : 1,
                      backgroundColor:
                        selectedAnswer === opt
                          ? "white"
                          : "rgba(255, 255, 255, 0.2)",
                      color: selectedAnswer === opt ? "#1f2937" : "white",
                      transition: "all 0.3s",
                    }}
                    onMouseOver={(e) => {
                      if (!answerSubmitted && selectedAnswer !== opt) {
                        e.target.style.backgroundColor =
                          "rgba(255, 255, 255, 0.3)";
                      }
                    }}
                    onMouseOut={(e) => {
                      if (selectedAnswer !== opt) {
                        e.target.style.backgroundColor =
                          "rgba(255, 255, 255, 0.2)";
                      }
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {q.type === "fillInTheBlank" && (
              <div style={{ marginBottom: "1.5rem" }}>
                <input
                  type="text"
                  value={inputAnswer}
                  onChange={(e) => setInputAnswer(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleCheckAnswer()}
                  disabled={answerSubmitted}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    borderRadius: "0.5rem",
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    color: "white",
                    textAlign: "center",
                    fontWeight: "600",
                    border: "2px solid rgba(255, 255, 255, 0.3)",
                    outline: "none",
                    fontSize: "1rem",
                  }}
                  placeholder={t.answerPrompt}
                />
              </div>
            )}

            <button
              onClick={handleCheckAnswer}
              disabled={
                answerSubmitted || (!selectedAnswer && !inputAnswer.trim())
              }
              style={{
                ...buttonStyle,
                width: "100%",
                backgroundColor: "rgba(255, 255, 255, 0.3)",
                color: "white",
                opacity:
                  answerSubmitted || (!selectedAnswer && !inputAnswer.trim())
                    ? 0.5
                    : 1,
                cursor:
                  answerSubmitted || (!selectedAnswer && !inputAnswer.trim())
                    ? "not-allowed"
                    : "pointer",
              }}
              onMouseOver={(e) => {
                if (!e.target.disabled) {
                  e.target.style.backgroundColor = "rgba(255, 255, 255, 0.4)";
                }
              }}
              onMouseOut={(e) => {
                if (!e.target.disabled) {
                  e.target.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
                }
              }}
            >
              ✓ {t.checkAnswer}
            </button>
          </div>
        </div>

        {feedback && (
          <QuizFeedback
            message={feedback.message}
            type={feedback.type}
            correctAnswer={feedback.correctAnswer}
            language={language}
            onNext={handleNextQuestion}
          />
        )}
      </div>
      </>
    );
  }

  // Results Screen
  if (currentScreen === "results") {
    const totalQuestions = shuffledQuestions.length;
    const percentage = Math.round((score / totalQuestions) * 100);
    const isHighScore = score >= totalQuestions * 0.8;
    const isMediumScore = score >= totalQuestions * 0.6;

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
            ...containerStyle,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background:
              "linear-gradient(135deg, #4c1d95 0%, #7c2d12 50%, #be185d 100%)",
            padding: "1rem",
          }}
        >
        <div style={cardStyle}>
          <div style={{ fontSize: "3.75rem", marginBottom: "1rem" }}>
            {isHighScore ? "🏆" : isMediumScore ? "🎖" : "📚"}
          </div>

          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "white",
              marginBottom: "1rem",
            }}
          >
            {isHighScore
              ? t.starPerformerTitle
              : isMediumScore
              ? t.achieverTitle
              : t.needsPracticeTitle}
          </h1>

          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderRadius: "0.5rem",
              padding: "1.5rem",
              marginBottom: "1.5rem",
            }}
          >
            <div
              style={{
                fontSize: "2.25rem",
                fontWeight: "bold",
                color: "white",
                marginBottom: "0.5rem",
              }}
            >
              {score}/{totalQuestions}
            </div>
            <div
              style={{
                fontSize: "1.5rem",
                color: "white",
                marginBottom: "1rem",
              }}
            >
              {percentage}%
            </div>
            <div
              style={{
                width: "100%",
                height: "0.5rem",
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                borderRadius: "9999px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  background: "linear-gradient(to right, #10b981, #3b82f6)",
                  borderRadius: "9999px",
                  transition: "width 1s ease",
                  width: `${percentage}%`,
                }}
              />
            </div>
          </div>

          <div>
            <button
              onClick={() => startTest(selectedLevel)}
              style={{
                ...levelButtonStyle,
                backgroundColor: "#3b82f6",
                color: "white",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#2563eb")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#3b82f6")}
            >
              🔄 {t.retry}
            </button>
            <button
              onClick={() => setCurrentScreen("home")}
              style={{
                ...levelButtonStyle,
                backgroundColor: "#10b981",
                color: "white",
                marginBottom: 0,
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#059669")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#10b981")}
            >
              🏠 {t.home}
            </button>
          </div>
        </div>
      </div>
      </>
    );
  }

  return <div style={containerStyle} />;
});

export default MathQuiz;
