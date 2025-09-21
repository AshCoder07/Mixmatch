import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import TamilNaduMap from "./assets/TamilNaduMap.png";
import IndiaMap from "./assets/IndiaMap.png";
import IndianRiverMap from "./assets/IndianRiverMap.png";
import WorldMap from "./assets/WorldMap.png";
import { useUser } from "./UserContext";

// Updated coordinates based on the map screenshots
const tamilNaduPoints = [
  { name: "Chennai", tamil: "சென்னை", top: "11%", left: "70%" },
  { name: "Coimbatore", tamil: "கோயம்புத்தூர்", top: "52%", left: "36%" },
  { name: "Madurai", tamil: "மதுரை", top: "64%", left: "47%" },
  { name: "Salem", tamil: "சேலம்", top: "35%", left: "47%" },
  { name: "Trichy", tamil: "திருச்சி", top: "46%", left: "53%" },
  { name: "Vellore", tamil: "வேலூர்", top: "14%", left: "57%" },
  { name: "Tanjore", tamil: "தஞ்சாவூர்", top: "52%", left: "60.5%" },
  { name: "Kanyakumari", tamil: "கன்னியாகுமரி", top: "95%", left: "41%" },
];

const indiaPoints = [
  { name: "New Delhi", tamil: "புது டெல்லி", top: "32%", left: "42.5%" },
  { name: "Maharashtra", tamil: "மஹாராஷ்ட்ரா", top: "61%", left: "36%" },
  { name: "TamilNadu", tamil: "தமிழ்நாடு", top: "83%", left: "44%" },
  { name: "WestBengal", tamil: "மேற்கு வங்காளம்", top: "48%", left: "60%" },
  { name: "Karnataka", tamil: "கர்நாடகா", top: "72%", left: "39%" },
  { name: "Telangana", tamil: "தெலங்கானா", top: "65%", left: "45%" },
  { name: "Rajasthan", tamil: "ராஜஸ்தான்", top: "39%", left: "37%" },
  { name: "Goa", tamil: "கோவா", top: "70%", left: "36%" },
];

const riverPoints = [
  { name: "Ganga", tamil: "கங்கை", top: "36%", left: "48.5%" },
  { name: "Yamuna", tamil: "யமுனை", top: "40%", left: "48.5%" },
  { name: "Brahmaputra", tamil: "பிரம்மபுத்திரா", top: "33%", left: "55%" },
  { name: "Narmada", tamil: "நர்மதா", top: "47.5%", left: "45%" },
  { name: "Godavari", tamil: "கோதாவரி", top: "53%", left: "47%" },
  { name: "Krishna", tamil: "கிருஷ்ணா", top: "58%", left: "47%" },
  { name: "Kaveri", tamil: "காவேரி", top: "68%", left: "45%" },
];

const worldPoints = [
  { name: "India", tamil: "இந்தியா", top: "55%", left: "68%" },
  { name: "USA", tamil: "அமெரிக்கா", top: "40%", left: "20%" },
  { name: "Australia", tamil: "ஆஸ்திரேலியா", top: "77%", left: "82%" },
  { name: "China", tamil: "சீனா", top: "44%", left: "73%" },
  { name: "Brazil", tamil: "பிரேசில்", top: "70%", left: "30%" },
  { name: "South Africa", tamil: "தென்னாப்பிரிக்கா", top: "78%", left: "52%" },
  { name: "Egypt", tamil: "எகிப்து", top: "48%", left: "48%" },
];

const GeographyGame = () => {
  const { user, saveScore } = useUser();
  const [currentMap, setCurrentMap] = useState("india");
  const [language, setLanguage] = useState("english");
  const [gameState, setGameState] = useState("menu");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(40);
  const [placedMarkers, setPlacedMarkers] = useState([]);
  const [gameResults, setGameResults] = useState([]);
  const [notification, setNotification] = useState(null);
  const [showReport, setShowReport] = useState(false);
  const [feedback, setFeedback] = useState({
    difficulty: "",
    enjoyment: "",
    comments: "",
    rating: 0,
  });
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showingAnswers, setShowingAnswers] = useState({
    correct: null,
    wrong: null,
  });

  const timerRef = useRef(null);
  const notificationRef = useRef(null);
  const mapElementRef = useRef(null);

  // Add refs to store current values for timer callbacks
  const currentMapRef = useRef(currentMap);
  const currentQuestionIndexRef = useRef(currentQuestionIndex);
  const languageRef = useRef(language);
  const isAnsweredRef = useRef(isAnswered);

  // Update refs when values change
  useEffect(() => {
    currentMapRef.current = currentMap;
  }, [currentMap]);

  useEffect(() => {
    currentQuestionIndexRef.current = currentQuestionIndex;
  }, [currentQuestionIndex]);

  useEffect(() => {
    languageRef.current = language;
  }, [language]);

  useEffect(() => {
    isAnsweredRef.current = isAnswered;
  }, [isAnswered]);
  // Memoize map configurations
  const mapConfigs = useMemo(
    () => ({
      tamilnadu: {
        name: { english: "Tamil Nadu Map", tamil: "தமிழ்நாடு வரைபடம்" },
        points: tamilNaduPoints,
        bgImage: `url(${TamilNaduMap})`,
        bgColor: "#ff9a9e",
      },
      india: {
        name: { english: "India Map", tamil: "இந்தியா வரைபடம்" },
        points: indiaPoints,
        bgImage: `url(${IndiaMap})`,
        bgColor: "#a8edea",
      },
      rivers: {
        name: { english: "Indian Rivers Map", tamil: "இந்திய நதிகள் வரைபடம்" },
        points: riverPoints,
        bgImage: `url(${IndianRiverMap})`,
        bgColor: "#d299c2",
      },
      world: {
        name: { english: "World Map", tamil: "உலக வரைபடம்" },
        points: worldPoints,
        bgImage: `url(${WorldMap})`,
        bgColor: "#89f7fe",
      },
    }),
    []
  );

  const getCurrentMapConfig = useCallback(() => {
    return mapConfigs[currentMap] || mapConfigs.india;
  }, [mapConfigs, currentMap]);

  // Memoized text translations
  const texts = useMemo(
    () => ({
      english: {
        title: "Geography Explorer",
        subtitle: "Click and Learn!",
        selectMap: "Choose a Map",
        startGame: "Start Game",
        score: "Score",
        timeLeft: "Time Left",
        dragToMap: "Click on the correct location on the map",
        correct: "Correct! Well done!",
        incorrect: "Wrong answer!",
        gameOver: "Game Complete!",
        finalScore: "Final Score",
        playAgain: "Play Again",
        backToMenu: "Back to Menu",
        backToLevels: "Back to Levels",
        language: "தமிழ்",
        seconds: "seconds",
        question: "Question",
        participationReport: "Participation Report",
        viewReport: "View Report",
        feedback: "Feedback",
        correctAnswers: "Correct Answers",
        totalTime: "Total Time",
        accuracy: "Accuracy",
        performance: "Performance",
        excellent: "Excellent!",
        good: "Good job!",
        needsImprovement: "Needs improvement",
        thankYou: "Thank you for your feedback!",
      },
      tamil: {
        title: "புவியியல் ஆய்வாளர்",
        subtitle: "கிளிக் செய்து கற்றுக்கொள்ளுங்கள்!",
        selectMap: "வரைபடம் தேர்ந்தெடுக்கவும்",
        startGame: "விளையாட்டைத் தொடங்கு",
        score: "மதிப்பெண்",
        timeLeft: "மீதமுள்ள நேரம்",
        dragToMap: "வரைபடத்தில் சரியான இடத்தில் கிளிக் செய்யவும்",
        correct: "சரியானது! நன்று!",
        incorrect: "மீண்டும் முயற்சிக்கவும்!",
        gameOver: "விளையாட்டு முடிந்தது!",
        finalScore: "இறுதி மதிப்பெண்",
        playAgain: "மீண்டும் விளையாடு",
        backToMenu: "பிரதான மெனு",
        backToLevels: "நிலைகளுக்கு திரும்பு",
        language: "English",
        seconds: "விநாடிகள்",
        question: "கேள்வி",
        participationReport: "பங்கேற்பு அறிக்கை",
        viewReport: "அறிக்கையைப் பார்க்கவும்",
        feedback: "கருத்துக்கள்",
        correctAnswers: "சரியான பதில்கள்",
        totalTime: "மொத்த நேரம்",
        accuracy: "துல்லியம்",
        performance: "செயல்திறன்",
        excellent: "சிறப்பானது!",
        good: "நல்லது!",
        needsImprovement: "முன்னேற்றம் தேவை",
        thankYou: "உங்கள் கருத்துக்களுக்கு நன்றி!",
      },
    }),
    []
  );

  // Notification system
  const showNotification = useCallback((message, type = "info") => {
    setNotification({ message, type });

    if (notificationRef.current) {
      clearTimeout(notificationRef.current);
    }

    notificationRef.current = setTimeout(() => {
      setNotification(null);
    }, 2000);
  }, []);

  // Timer functions - Fixed circular dependency
  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Fixed timeUp handler using refs to get current values
  const timeUp = useCallback(() => {
    // Check if already answered using ref
    if (isAnsweredRef.current) return;

    stopTimer();

    // Set time and answered state
    setTimeLeft(0);
    setIsAnswered(true);

    // Get current values from refs
    const currentMapKey = currentMapRef.current;
    const currentIndex = currentQuestionIndexRef.current;
    const currentLang = languageRef.current;

    // Get the correct map config and point using current values
    const mapConfig = mapConfigs[currentMapKey] || mapConfigs.india;
    const point = mapConfig.points[currentIndex];

    if (point) {
      // Add to results
      setGameResults((prev) => [
        ...prev,
        {
          question: point.name,
          questionDisplay: point[currentLang] || point.name,
          correct: false,
          timeTaken: 40,
        },
      ]);

      // Show correct answer with proper coordinates from current point
      setShowingAnswers({
        correct: {
          x: parseFloat(point.left),
          y: parseFloat(point.top),
          name: point[currentLang] || point.name,
        },
        wrong: null,
      });

      // Show notification using current language
      const currentTexts = texts[currentLang] || texts.english;
      showNotification(currentTexts.incorrect, "error");
    }

    // Move to next question after delay
    setTimeout(() => {
      setShowingAnswers({ correct: null, wrong: null });

      const totalQuestions = mapConfig.points.length;
      if (currentIndex + 1 >= totalQuestions) {
        endGame();
      } else {
        setCurrentQuestionIndex(currentIndex + 1);
        setTimeLeft(40);
        setIsAnswered(false);
        startTimer();
      }
    }, 2500);
  }, [stopTimer, mapConfigs, texts, showNotification]);

  const startTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          timeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [timeUp]);

  // Enhanced answer checking with visual feedback
  const checkAnswer = useCallback(
    (clickX, clickY) => {
      if (isAnswered) return;

      const currentMapConfig = getCurrentMapConfig();
      const currentPoint = currentMapConfig.points[currentQuestionIndex];

      if (!currentPoint || !currentPoint.left || !currentPoint.top) {
        return;
      }

      const mapElement = mapElementRef.current;
      if (!mapElement) return;

      const rect = mapElement.getBoundingClientRect();
      const targetX = (parseFloat(currentPoint.left) / 100) * rect.width;
      const targetY = (parseFloat(currentPoint.top) / 100) * rect.height;

      const distance = Math.sqrt(
        Math.pow(clickX - targetX, 2) + Math.pow(clickY - targetY, 2)
      );

      // Responsive tolerance
      const baseSize = Math.min(rect.width, rect.height);
      const tolerance = Math.max(baseSize * 0.06, 40);
      const isCorrect = distance <= tolerance;
      const timeTaken = 40 - timeLeft;

      // Calculate clicked position as percentage
      const clickedPercentX = (clickX / rect.width) * 100;
      const clickedPercentY = (clickY / rect.height) * 100;

      if (isCorrect) {
        setScore((s) => s + 10);
        showNotification(texts[language].correct, "success");

        // Show green marker at clicked position
        setShowingAnswers({
          correct: {
            x: clickedPercentX,
            y: clickedPercentY,
            name: currentPoint[language] || currentPoint.name,
          },
          wrong: null,
        });
      } else {
        showNotification(texts[language].incorrect, "error");

        // Show red marker at clicked position and blue marker at correct position
        setShowingAnswers({
          wrong: {
            x: clickedPercentX,
            y: clickedPercentY,
            name: "Wrong",
          },
          correct: {
            x: parseFloat(currentPoint.left),
            y: parseFloat(currentPoint.top),
            name: currentPoint[language] || currentPoint.name,
          },
        });
      }

      setGameResults((prev) => [
        ...prev,
        {
          question: currentPoint.name,
          questionDisplay: currentPoint[language] || currentPoint.name,
          correct: isCorrect,
          timeTaken: timeTaken,
        },
      ]);

      setIsAnswered(true);
      stopTimer();

      setTimeout(() => {
        nextQuestion();
      }, 2500);
    },
    [
      currentMap,
      currentQuestionIndex,
      timeLeft,
      mapConfigs,
      language,
      texts,
      showNotification,
      stopTimer,
      isAnswered,
      getCurrentMapConfig,
    ]
  );

  // Next question
  const nextQuestion = useCallback(() => {
    const currentMapConfig = getCurrentMapConfig();
    const totalQuestions = currentMapConfig.points.length;

    setShowingAnswers({ correct: null, wrong: null });

    if (currentQuestionIndex + 1 >= totalQuestions) {
      endGame();
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(40);
      setIsAnswered(false);
      startTimer();
    }
  }, [currentQuestionIndex, getCurrentMapConfig, startTimer]);

  // Game functions
  const startGame = useCallback(
    (mapKey) => {
      if (!mapConfigs[mapKey]) {
        mapKey = "india";
      }

      setCurrentMap(mapKey);
      setGameState("playing");
      setCurrentQuestionIndex(0);
      setScore(0);
      setTimeLeft(40);
      setPlacedMarkers([]);
      setGameResults([]);
      setIsAnswered(false);
      setShowingAnswers({ correct: null, wrong: null });

      setTimeout(() => startTimer(), 100);
    },
    [startTimer, mapConfigs]
  );

  const endGame = useCallback(() => {
    stopTimer();
    setGameState("completed");

    if (user && saveScore && score > 0) {
      saveScore("geographyMapping", score, user.name);
    }
  }, [user, saveScore, score, stopTimer]);

  const resetGame = useCallback(() => {
    stopTimer();
    setGameState("menu");
    setCurrentMap("india");
    setCurrentQuestionIndex(0);
    setScore(0);
    setTimeLeft(40);
    setPlacedMarkers([]);
    setGameResults([]);
    setShowReport(false);
    setShowFeedbackForm(false);
    setNotification(null);
    setIsAnswered(false);
    setShowingAnswers({ correct: null, wrong: null });
  }, [stopTimer]);

  const backToLevels = useCallback(() => {
    resetGame();
  }, [resetGame]);

  const handleMapClick = useCallback(
    (e) => {
      if (gameState !== "playing" || isAnswered) return;

      e.preventDefault();
      const rect = e.currentTarget.getBoundingClientRect();

      const clientX =
        e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
      const clientY =
        e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0);

      const clickX = clientX - rect.left;
      const clickY = clientY - rect.top;

      checkAnswer(clickX, clickY);
    },
    [gameState, checkAnswer, isAnswered]
  );

  useEffect(() => {
    return () => {
      stopTimer();
      if (notificationRef.current) {
        clearTimeout(notificationRef.current);
      }
    };
  }, [stopTimer]);
  // Optimized styles for viewboard without scroll
  const getViewboardStyles = () => ({
    container: {
      height: "100vh",
      width: "100vw",
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
      overflow: "hidden",
    },
    gameWrapper: {
      display: "flex",
      height: "100vh",
      width: "100vw",
    },
    sidebar: {
      width: "25vw",
      minWidth: "300px",
      maxWidth: "380px",
      height: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      padding: "1.5vh 1vw",
      overflowY: "auto",
      boxShadow: "2px 0 10px rgba(0,0,0,0.1)",
      display: "flex",
      flexDirection: "column",
    },
    mapArea: {
      flex: 1,
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "1vh",
    },
    mapDisplay: {
      width: "95%",
      height: "95%",
      borderRadius: "12px",
      border: "2px solid rgba(255,255,255,0.3)",
      boxShadow: "0 5px 20px rgba(0,0,0,0.2)",
      cursor: "pointer",
      touchAction: "manipulation",
    },
  });

  const styles = getViewboardStyles();

  // Menu Screen
  if (gameState === "menu") {
    return (
      <div style={styles.container}>
        <div
          style={{
            padding: "2vh 2vw",
            textAlign: "center",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <h1
            style={{
              fontSize: "min(8vh, 6vw)",
              color: "white",
              marginBottom: "2vh",
              textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            {texts[language].title}
          </h1>

          <div style={{ marginBottom: "3vh" }}>
            <button
              onClick={() =>
                setLanguage(language === "english" ? "tamil" : "english")
              }
              style={{
                background: "rgba(255,255,255,0.9)",
                color: "#2d3748",
                border: "none",
                padding: "1vh 2vw",
                borderRadius: "25px",
                fontSize: "min(3vh, 2vw)",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              {texts[language].language}
            </button>
          </div>

          {user && (
            <div style={{ marginBottom: "2vh" }}>
              <p
                style={{
                  fontSize: "min(3vh, 2.5vw)",
                  fontWeight: "bold",
                  color: "white",
                  background: "rgba(255,255,255,0.2)",
                  padding: "1vh 2vw",
                  borderRadius: "25px",
                  display: "inline-block",
                }}
              >
                Welcome, {user.name}!
              </p>
            </div>
          )}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "2vw",
              maxWidth: "80vw",
              margin: "0 auto",
            }}
          >
            {Object.entries(mapConfigs).map(([key, config]) => (
              <div
                key={key}
                onClick={() => startGame(key)}
                style={{
                  background: "rgba(255,255,255,0.9)",
                  borderRadius: "15px",
                  padding: "2vh 1vw",
                  cursor: "pointer",
                  transition: "transform 0.2s ease",
                  textAlign: "center",
                  minHeight: "20vh",
                }}
                onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
              >
                <h3
                  style={{
                    fontSize: "min(3vh, 2vw)",
                    color: "#2d3748",
                    marginBottom: "2vh",
                  }}
                >
                  {config.name[language]}
                </h3>
                <div style={{ fontSize: "6vh", marginBottom: "2vh" }}>🗺</div>
                <div
                  style={{
                    background:
                      "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                    color: "white",
                    padding: "1vh 2vw",
                    borderRadius: "20px",
                    fontSize: "min(2.5vh, 1.8vw)",
                    fontWeight: "bold",
                  }}
                >
                  {texts[language].startGame}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Game Complete Screen
  if (gameState === "completed") {
    const correctAnswers = gameResults.filter((r) => r.correct).length;
    const totalQuestions = gameResults.length;
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    const totalTime = gameResults.reduce(
      (sum, result) => sum + result.timeTaken,
      0
    );
    const avgTime = Math.round(totalTime / totalQuestions);

    let performanceLevel = "";
    if (percentage >= 80) {
      performanceLevel = texts[language].excellent;
    } else if (percentage >= 60) {
      performanceLevel = texts[language].good;
    } else {
      performanceLevel = texts[language].needsImprovement;
    }

    // Report Component - Truly Fixed Screen Layout (No Scroll)
    const ReportScreen = () => (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          padding: "1vh 1vw",
        }}
      >
        {/* Compact Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "1vh",
            height: "8vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h2
            style={{
              fontSize: "min(3.5vh, 2.5vw)",
              color: "white",
              margin: 0,
              textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            {texts[language].participationReport}
          </h2>
          <div
            style={{
              fontSize: "min(2vh, 1.5vw)",
              color: "rgba(255,255,255,0.9)",
              fontWeight: "bold",
            }}
          >
            Student: {user?.name || "Unknown"}
          </div>
        </div>

        {/* Main Content Area - Fixed Height */}
        <div
          style={{
            flex: 1,
            display: "flex",
            gap: "1vw",
            height: "82vh",
            maxHeight: "82vh",
            minHeight: "82vh",
          }}
        >
          {/* Left Panel - Statistics (40% width) */}
          <div
            style={{
              width: "40%",
              background: "rgba(255,255,255,0.95)",
              borderRadius: "12px",
              padding: "1.5vh 1vw",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {/* Stats Grid - Compact */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "1vh",
                marginBottom: "1.5vh",
                height: "20vh",
              }}
            >
              <div
                style={{
                  background: "#4CAF50",
                  color: "white",
                  padding: "1vh",
                  borderRadius: "8px",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div style={{ fontSize: "min(1.8vh, 1vw)", opacity: "0.9" }}>
                  Correct
                </div>
                <div
                  style={{ fontSize: "min(2.8vh, 2vw)", fontWeight: "bold" }}
                >
                  {correctAnswers}/{totalQuestions}
                </div>
              </div>

              <div
                style={{
                  background: "#2196F3",
                  color: "white",
                  padding: "1vh",
                  borderRadius: "8px",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div style={{ fontSize: "min(1.8vh, 1vw)", opacity: "0.9" }}>
                  Accuracy
                </div>
                <div
                  style={{ fontSize: "min(2.8vh, 2vw)", fontWeight: "bold" }}
                >
                  {percentage}%
                </div>
              </div>

              <div
                style={{
                  background: "#FF9800",
                  color: "white",
                  padding: "1vh",
                  borderRadius: "8px",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div style={{ fontSize: "min(1.8vh, 1vw)", opacity: "0.9" }}>
                  Total Time
                </div>
                <div
                  style={{ fontSize: "min(2.8vh, 2vw)", fontWeight: "bold" }}
                >
                  {totalTime}s
                </div>
              </div>

              <div
                style={{
                  background: "#9C27B0",
                  color: "white",
                  padding: "1vh",
                  borderRadius: "8px",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div style={{ fontSize: "min(1.8vh, 1vw)", opacity: "0.9" }}>
                  Avg/Q
                </div>
                <div
                  style={{ fontSize: "min(2.8vh, 2vw)", fontWeight: "bold" }}
                >
                  {avgTime}s
                </div>
              </div>
            </div>

            {/* Performance Banner - Compact */}
            <div
              style={{
                background:
                  percentage >= 80
                    ? "#4CAF50"
                    : percentage >= 60
                    ? "#FF9800"
                    : "#f44336",
                color: "white",
                padding: "2vh 1vw",
                borderRadius: "12px",
                textAlign: "center",
                height: "8vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{ fontSize: "min(2.5vh, 1.8vw)", fontWeight: "bold" }}
              >
                {performanceLevel}
              </div>
            </div>
          </div>

          {/* Right Panel - Question Details (60% width) */}
          <div
            style={{
              width: "60%",
              background: "rgba(255,255,255,0.95)",
              borderRadius: "12px",
              padding: "1.5vh 1vw",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <h3
              style={{
                color: "#2d3748",
                marginBottom: "1vh",
                fontSize: "min(2.5vh, 1.8vw)",
                textAlign: "center",
                height: "4vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Question Details
            </h3>

            {/* Fixed height container for questions */}
            <div
              style={{
                height: "calc(100% - 5vh)",
                display: "grid",
                gridTemplateRows: `repeat(${Math.min(
                  gameResults.length,
                  8
                )}, 1fr)`,
                gap: "0.5vh",
                overflow: "hidden",
              }}
            >
              {gameResults.slice(0, 8).map((result, index) => (
                <div
                  key={`{${result.question}-${index}}`}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0.8vh 1.2vh",
                    borderRadius: "6px",
                    background: result.correct
                      ? "rgba(76, 175, 80, 0.1)"
                      : "rgba(244, 67, 54, 0.1)",
                    border: result.correct
                      ? "2px solid rgba(76, 175, 80, 0.3)"
                      : "2px solid rgba(244, 67, 54, 0.3)",
                    fontSize: "min(1.8vh, 1.2vw)",
                    minHeight: 0,
                    maxHeight: "100%",
                  }}
                >
                  <span
                    style={{
                      fontWeight: "bold",
                      flex: 1,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      marginRight: "1vw",
                    }}
                  >
                    {result.correct ? "✅" : "❌"} {result.question}
                  </span>
                  <span
                    style={{
                      fontSize: "min(1.6vh, 1vw)",
                      opacity: "0.8",
                      fontWeight: "bold",
                      minWidth: "3vw",
                      textAlign: "right",
                    }}
                  >
                    {result.timeTaken}s
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Buttons - Fixed Height */}
        <div
          style={{
            height: "9vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1.5vw",
          }}
        >
          <button
            onClick={() => setShowReport(false)}
            style={{
              background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
              color: "white",
              border: "none",
              padding: "1.2vh 2vw",
              borderRadius: "20px",
              fontSize: "min(2.2vh, 1.5vw)",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Close Report
          </button>
          <button
            onClick={() => startGame(currentMap)}
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              border: "none",
              padding: "1.2vh 2vw",
              borderRadius: "20px",
              fontSize: "min(2.2vh, 1.5vw)",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            {texts[language].playAgain}
          </button>
          <button
            onClick={resetGame}
            style={{
              background: "linear-gradient(135deg, #fd79a8 0%, #fdcbf1 100%)",
              color: "white",
              border: "none",
              padding: "1.2vh 2vw",
              borderRadius: "20px",
              fontSize: "min(2.2vh, 1.5vw)",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            {texts[language].backToMenu}
          </button>
        </div>
      </div>
    );

    // Show report if requested
    if (showReport) {
      return <ReportScreen />;
    }

    // Main completion screen
    return (
      <div style={styles.container}>
        <div
          style={{
            padding: "2vh 2vw",
            textAlign: "center",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <div style={{ fontSize: "8vh", marginBottom: "2vh" }}>🎉</div>
          <h1
            style={{
              fontSize: "min(6vh, 4vw)",
              color: "white",
              marginBottom: "2vh",
            }}
          >
            {texts[language].gameOver}
          </h1>
          <div
            style={{
              fontSize: "min(5vh, 3vw)",
              color: "#FFD700",
              fontWeight: "bold",
              marginBottom: "2vh",
            }}
          >
            {texts[language].finalScore}: {score}
          </div>
          <div
            style={{
              fontSize: "min(3vh, 2vw)",
              color: "rgba(255,255,255,0.9)",
              marginBottom: "4vh",
            }}
          >
            {correctAnswers}/{totalQuestions} ({percentage}%)
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "2vw",
              flexWrap: "wrap",
              marginBottom: "2vh",
            }}
          >
            <button
              onClick={() => setShowReport(true)}
              style={{
                background: "linear-gradient(135deg, #2196F3 0%, #42A5F5 100%)",
                color: "white",
                border: "none",
                padding: "2vh 3vw",
                borderRadius: "25px",
                fontSize: "min(3vh, 2vw)",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              📊 {texts[language].viewReport}
            </button>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "2vw",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() => startGame(currentMap)}
              style={{
                background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                color: "white",
                border: "none",
                padding: "2vh 3vw",
                borderRadius: "25px",
                fontSize: "min(3vh, 2vw)",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              {texts[language].playAgain}
            </button>
            <button
              onClick={resetGame}
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                border: "none",
                padding: "2vh 3vw",
                borderRadius: "25px",
                fontSize: "min(3vh, 2vw)",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              {texts[language].backToMenu}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Playing Screen
  const currentMapConfig = getCurrentMapConfig();
  const currentPoint =
    currentMapConfig.points[currentQuestionIndex] || currentMapConfig.points[0];
  const mapAreaBackground = `linear-gradient(135deg, ${currentMapConfig.bgColor} 0%, rgba(255,255,255,0.1) 100%)`;

  return (
    <div style={styles.container}>
      {/* Notification */}
      {notification && (
        <div
          style={{
            position: "fixed",
            top: "2vh",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1000,
            background:
              notification.type === "success"
                ? "#4CAF50"
                : notification.type === "error"
                ? "#f44336"
                : "#2196F3",
            color: "white",
            padding: "1.5vh 3vw",
            borderRadius: "25px",
            fontSize: "min(3vh, 2vw)",
            fontWeight: "bold",
            pointerEvents: "none",
          }}
        >
          {notification.message}
        </div>
      )}
      <br />
      <br />
      <div style={styles.gameWrapper}>
        {/* Sidebar */}
        <div style={styles.sidebar}>
          {/* Header */}
          <div
            style={{
              textAlign: "center",
              marginBottom: "2vh",
              paddingBottom: "1vh",
              borderBottom: "2px solid rgba(255,255,255,0.3)",
            }}
          >
            <h2
              style={{
                fontSize: "min(3vh, 2vw)",
                color: "white",
                margin: 0,
                fontWeight: "bold",
                marginBottom: "1vh",
              }}
            >
              {currentMapConfig.name[language]}
            </h2>
            <div
              style={{
                fontSize: "min(2vh, 1.5vw)",
                color: "rgba(255,255,255,0.8)",
                marginBottom: "1vh",
              }}
            >
              {texts[language].question} {currentQuestionIndex + 1}/
              {currentMapConfig.points.length}
            </div>
            <button
              onClick={() =>
                setLanguage(language === "english" ? "tamil" : "english")
              }
              style={{
                background: "rgba(255,255,255,0.3)",
                color: "white",
                border: "2px solid rgba(255,255,255,0.3)",
                padding: "1vh 2vw",
                borderRadius: "20px",
                fontSize: "min(2vh, 1.5vw)",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              {texts[language].language}
            </button>
          </div>

          {/* Back Button */}
          <button
            onClick={resetGame}
            style={{
              background: "rgba(255,255,255,0.3)",
              color: "white",
              border: "2px solid rgba(255,255,255,0.3)",
              padding: "1vh 2vw",
              borderRadius: "20px",
              fontSize: "min(2vh, 1.5vw)",
              fontWeight: "bold",
              cursor: "pointer",
              marginBottom: "2vh",
              width: "100%",
            }}
          >
            ← {texts[language].backToMenu}
          </button>

          {/* Stats */}
          <div style={{ display: "flex", gap: "1vw", marginBottom: "2vh" }}>
            <div
              style={{
                background: "rgba(255,255,255,0.2)",
                borderRadius: "12px",
                padding: "1.5vh 1vw",
                textAlign: "center",
                flex: 1,
                backdropFilter: "blur(10px)",
              }}
            >
              <h3
                style={{
                  fontSize: "min(2vh, 1.2vw)",
                  color: "rgba(255,255,255,0.8)",
                  margin: "0 0 1vh 0",
                }}
              >
                {texts[language].score}
              </h3>
              <div
                style={{
                  fontSize: "min(4vh, 2.5vw)",
                  fontWeight: "bold",
                  color: "#FFD700",
                }}
              >
                {score}
              </div>
            </div>

            <div
              style={{
                background: "rgba(255,255,255,0.2)",
                borderRadius: "12px",
                padding: "1.5vh 1vw",
                textAlign: "center",
                flex: 1,
                backdropFilter: "blur(10px)",
              }}
            >
              <h3
                style={{
                  fontSize: "min(2vh, 1.2vw)",
                  color: "rgba(255,255,255,0.8)",
                  margin: "0 0 1vh 0",
                }}
              >
                {texts[language].timeLeft}
              </h3>
              <div
                style={{
                  fontSize: "min(4vh, 2.5vw)",
                  fontWeight: "bold",
                  color: timeLeft <= 10 ? "#FF6B6B" : "#FF9800",
                }}
              >
                {timeLeft}s
              </div>
              <div
                style={{
                  width: "100%",
                  height: "0.5vh",
                  background: "rgba(255,255,255,0.2)",
                  borderRadius: "0.25vh",
                  marginTop: "1vh",
                }}
              >
                <div
                  style={{
                    width: `${(timeLeft / 40) * 100}%`,
                    height: "100%",
                    background: timeLeft <= 10 ? "#FF6B6B" : "#FF9800",
                    transition: "width 1s linear",
                    borderRadius: "0.25vh",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Current Question - Much Smaller Size */}
          <div
            style={{
              background: "rgba(255,255,255,0.2)",
              borderRadius: "10px",
              padding: "1vh 0.8vw",
              textAlign: "center",
              backdropFilter: "blur(10px)",
              marginBottom: "2vh",
            }}
          >
            <h3
              style={{
                fontSize: "min(1.6vh, 1vw)",
                color: "rgba(255,255,255,0.8)",
                margin: "0 0 0.8vh 0",
              }}
            >
              Find This Location
            </h3>

            <div
              style={{
                fontSize: "min(2.2vh, 1.5vw)",
                fontWeight: "bold",
                color: "white",
                marginBottom: "0.8vh",
                padding: "0.8vh 0.6vw",
                borderRadius: "6px",
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.4)",
                userSelect: "none",
                wordWrap: "break-word",
                minHeight: "auto",
              }}
            >
              🎯{" "}
              {currentPoint
                ? currentPoint[language] || currentPoint.name
                : "Loading..."}
            </div>

            <div
              style={{
                fontSize: "min(1.4vh, 0.8vw)",
                color: "rgba(255,255,255,0.7)",
                fontStyle: "italic",
              }}
            >
              {texts[language].dragToMap}
            </div>
          </div>

          {/* Progress */}
          <div
            style={{
              background: "rgba(255,255,255,0.2)",
              borderRadius: "15px",
              padding: "2vh 1vw",
              textAlign: "center",
              backdropFilter: "blur(10px)",
            }}
          >
            <h3
              style={{
                fontSize: "min(2vh, 1.2vw)",
                color: "rgba(255,255,255,0.8)",
                margin: "0 0 1vh 0",
              }}
            >
              Progress
            </h3>
            <div
              style={{
                width: "100%",
                height: "1vh",
                background: "rgba(255,255,255,0.2)",
                borderRadius: "0.5vh",
                overflow: "hidden",
                marginBottom: "1vh",
              }}
            >
              <div
                style={{
                  width: `${
                    (currentQuestionIndex / currentMapConfig.points.length) *
                    100
                  }%`,
                  height: "100%",
                  background: "#4CAF50",
                  transition: "width 0.3s ease",
                  borderRadius: "0.5vh",
                }}
              />
            </div>
            <div
              style={{
                fontSize: "min(2.5vh, 1.5vw)",
                color: "white",
                fontWeight: "bold",
              }}
            >
              {currentQuestionIndex}/{currentMapConfig.points.length}
            </div>
          </div>
        </div>

        {/* Map Area */}
        <div
          style={{
            ...styles.mapArea,
            background: mapAreaBackground,
          }}
        >
          <div
            ref={mapElementRef}
            onClick={handleMapClick}
            onTouchStart={handleMapClick}
            style={{
              ...styles.mapDisplay,
              backgroundImage: currentMapConfig.bgImage,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              position: "relative",
              cursor: isAnswered ? "default" : "pointer",
            }}
          >
            {/* Answer feedback overlay */}
            {isAnswered && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: "rgba(0,0,0,0.1)",
                  borderRadius: "inherit",
                  pointerEvents: "none",
                  zIndex: 5,
                }}
              />
            )}

            {/* Enhanced Visual Feedback Markers */}
            {showingAnswers.wrong && (
              <div
                style={{
                  position: "absolute",
                  left: `${showingAnswers.wrong.x}%`,
                  top: `${showingAnswers.wrong.y}%`,
                  transform: "translate(-50%, -50%)",
                  zIndex: 15,
                  pointerEvents: "none",
                }}
              >
                <div
                  style={{
                    width: "min(6vh, 4vw)",
                    height: "min(6vh, 4vw)",
                    borderRadius: "50%",
                    background: "#f44336",
                    border: "3px solid white",
                    boxShadow: "0 4px 15px rgba(244, 67, 54, 0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "min(3vh, 2vw)",
                    fontWeight: "bold",
                  }}
                >
                  ✗
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "#f44336",
                    color: "white",
                    padding: "0.5vh 1vw",
                    borderRadius: "8px",
                    fontSize: "min(2vh, 1.2vw)",
                    fontWeight: "bold",
                    marginTop: "0.5vh",
                    whiteSpace: "nowrap",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
                  }}
                >
                  Wrong
                </div>
              </div>
            )}

            {showingAnswers.correct && (
              <div
                style={{
                  position: "absolute",
                  left: `${showingAnswers.correct.x}%`,
                  top: `${showingAnswers.correct.y}%`,
                  transform: "translate(-50%, -50%)",
                  zIndex: 20,
                  pointerEvents: "none",
                }}
              >
                <div
                  style={{
                    width: "min(6vh, 4vw)",
                    height: "min(6vh, 4vw)",
                    borderRadius: "50%",
                    background: showingAnswers.wrong ? "#2196F3" : "#4CAF50",
                    border: "3px solid white",
                    boxShadow: `0 4px 15px ${
                      showingAnswers.wrong
                        ? "rgba(33, 150, 243, 0.5)"
                        : "rgba(76, 175, 80, 0.5)"
                    }`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "min(3vh, 2vw)",
                    fontWeight: "bold",
                  }}
                >
                  ✓
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: showingAnswers.wrong ? "#2196F3" : "#4CAF50",
                    color: "white",
                    padding: "1vh 1.5vw",
                    borderRadius: "8px",
                    fontSize: "min(2vh, 1.2vw)",
                    fontWeight: "bold",
                    marginTop: "0.5vh",
                    whiteSpace: "nowrap",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
                    maxWidth: "20vw",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {showingAnswers.correct.name}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeographyGame;
