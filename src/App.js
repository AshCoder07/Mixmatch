import React, {
  useState,
  createContext,
  useContext,
  useEffect,
  useRef,
  lazy,
  Suspense,
  memo,
  useMemo,
  useCallback,
} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import "./App.css";
import { UserProvider, useUser } from "./UserContext";
import UserEntry from "./UserEntry";

// Import session timeout test utilities for development
import "./utils/sessionTimeoutTest";

// Lazy load all game components - This will dramatically reduce initial bundle size
const MathQuiz = lazy(() => import("./MathQuiz"));
const GFGWordGame = lazy(() => import("./GFGWordGame"));
const ScienceQuiz = lazy(() => import("./ScienceQuiz"));
const PartsMarkingGame = lazy(() => import("./PartsMarkingGame"));
const GeographyMappping = lazy(() => import("./GeographyMapping"));
const UserScores = lazy(() => import("./UserScores"));
const Leaderboard = lazy(() => import("./Leaderboard"));

// Import logo images
import Logo1 from "./assets/Logo1.png";
import tn from "./assets/tn.jpg";
import Footer from "./Footer";

// Loading component
const LoadingSpinner = () => (
  <div
    className="loading-spinner"
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "200px",
      fontSize: "18px",
    }}
  >
    Loading...
  </div>
);

/* ---------------- LANGUAGE CONTEXT ---------------- */
const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("english");

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === "english" ? "tamil" : "english"));
  }, []);

  const contextValue = useMemo(
    () => ({
      language,
      toggleLanguage,
    }),
    [language, toggleLanguage]
  );

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

/* ---------------- TRANSLATIONS ---------------- */
const translations = {
  english: {
    sciencePark: "SCIENCE PARK - Tiruvallur District",
    designedBy: "Designed and developed by R.M.K. Engineering College",
    appTitle: "Mix and Match Contest for Budding Innovators ",
    selectGame: "Select your game",
    scienceQuiz: "Science Quiz",
    geographyMapping: "Geography Mapping",
    partsMarkingGame: "Parts Marking Game",
    wordGuessGame: "Chemistry Word Guess Game",
    mathQuiz: "Math Quiz",
    teamMembers: "Team Members: 2023-2027 ",
    mentor: "Mentor:",
    nikhita: "Tharigopula Nikhita - III/CSE",
    sheeba: "Sheeba Sherlin S - III/CSE",
    mentorName: "M P Karthikeyan - Associate Professor/CSE",
    backToMenu: "← Back to Home",
    languageToggle: "தமிழ்",
    myScores: "My Scores",
    leaderboard: "Leaderboard",
    welcome: "Welcome",
    logout: "Logout",
    teamMembersBatch1Title: "Team Members: 2023-2027",
    teamMembersBatch2Title: "Team Members: 2022-2026",
  },
  tamil: {
    sciencePark: "அறிவியல் பூங்கா - திருவள்ளூர் மாவட்டம்",
    designedBy:
      "ஆர்.எம்.கே பொறியியல் கல்லூரியால் வடிவமைக்கப்பட்டு உருவாக்கப்பட்டது",
    appTitle: "இளைய கண்டுபிடிப்பாளர்களுக்கான கலப்புபொருத்துப்போட்டி",
    selectGame: "உங்கள் விளையாட்டைத் தேர்ந்தெடுக்கவும்",
    scienceQuiz: "அறிவியல் வினாடி வினா",
    geographyMapping: "புவியியல் வரைபடம்",
    partsMarkingGame: "பாகங்கள் அடையாளம் காணும் விளையாட்டு",
    wordGuessGame: "வேதியியல் சொல் அறிதல் விளையாட்டு",
    mathQuiz: "கணித வினாடி வினா",
    teamMembers: "குழு உறுப்பினர்கள்: 2023-2027 ",
    mentor: "வழிகாட்டி:",
    nikhita: "தரிகோபுல நிகிதா - III/CSE",
    sheeba: "ஷீபா ஷெர்லின் சா - III/CSE",
    mentorName: "எம் பி கார்த்திகேயன் - இணை பேராசிரியர்/CSE",
    backToMenu: "← மெனுவுக்குத் திரும்பு",
    languageToggle: "English",
    myScores: "எனது மதிப்பெண்கள்",
    leaderboard: "தரவரிசை பலகை",
    welcome: "வரவேற்கிறோம்",
    logout: "வெளியேறு",
    teamMembersBatch1Title: "குழு உறுப்பினர்கள்: 2023-2027",
    teamMembersBatch2Title: "குழு உறுப்பினர்கள்: 2022-2026",
  },
};

/* ---------------- MEMOIZED COMPONENTS ---------------- */
const LanguageToggle = memo(() => {
  const { language, toggleLanguage } = useLanguage();
  return (
    <button onClick={toggleLanguage} className="language-toggle-btn">
      <span className="language-text">
        {translations[language].languageToggle}
      </span>
      <span className="language-icon">🌐</span>
    </button>
  );
});

const UserInfo = memo(() => {
  const { user, logout } = useUser();
  const { language } = useLanguage();

  if (!user) return null;

  return (
    <div className="user-info">
      <span className="welcome-text">
        {translations[language].welcome}, {user.name}!
      </span>
      <button onClick={logout} className="logout-btn">
        {translations[language].logout}
      </button>
    </div>
  );
});

const Navigation = memo(() => {
  const { language } = useLanguage();
  const location = useLocation();

  if (location.pathname !== "/") return null;

  return (
    <div className="navigation-menu">
      <Link to="/my-scores" className="nav-btn">
        📊 {translations[language].myScores}
      </Link>
      <Link to="/leaderboard" className="nav-btn">
        🏆 {translations[language].leaderboard}
      </Link>
    </div>
  );
});

const BackButton = memo(() => {
  const location = useLocation();
  const { language } = useLanguage();
  if (location.pathname === "/") return null;
  return (
    <Link to="/" className="back-btn">
      {translations[language].backToMenu}
    </Link>
  );
});

const GameIcon = memo(({ emoji, titleKey, to }) => {
  const { language } = useLanguage();
  return (
    <Link to={to} className="game-icon-container">
      <div className="game-icon">
        <span role="img" aria-label={translations[language][titleKey]}>
          {emoji}
        </span>
        <h3>{translations[language][titleKey]}</h3>
      </div>
    </Link>
  );
});

const GameSelection = memo(() => (
  <div className="games-grid">
    <GameIcon emoji="🔬" titleKey="scienceQuiz" to="/scienceQuiz" />
    <GameIcon emoji="🧬" titleKey="partsMarkingGame" to="/partsMarkingGame" />
    <GameIcon emoji="🔤" titleKey="wordGuessGame" to="/wordGame" />
    <GameIcon emoji="➕" titleKey="mathQuiz" to="/mathQuiz" />
    <GameIcon emoji="🗺" titleKey="geographyMapping" to="/GeographyMapping" />
  </div>
));

const EnhancedHeader = memo(() => {
  const { language } = useLanguage();
  return (
    <div className="enhanced-header">
      <div className="header-top">
        <UserInfo />
        <LanguageToggle />
      </div>
      <div className="extra-header">
        <div className="logo-placeholder left-logo">
          <img src={Logo1} alt="Left Logo" className="logo-image-direct" />
        </div>
        <div className="extra-header-content">
          <h1 className="extra-title">{translations[language].sciencePark}</h1>
          <p className="extra-subtitle">{translations[language].designedBy}</p>
        </div>
        <div className="logo-placeholder right-logo">
          <img src={tn} alt="Right Logo" className="logo-image-direct" />
        </div>
      </div>
      <div className="header-section">
        {language === "english" ? (
          <>
            <h2 className="main-title">{translations[language].appTitle}</h2>
            <h2 className="main-title">{translations["tamil"].appTitle}</h2>
          </>
        ) : (
          <h2 className="main-title">{translations[language].appTitle}</h2>
        )}
        <p className="game-selection-prompt">
          {translations[language].selectGame}
        </p>
      </div>
      <Navigation />
    </div>
  );
});

const TeamMembersSection = memo(() => {
  const { language } = useLanguage();
  return (
    <div className="team-members-section">
      <div className="team-grid">
        {/* Column 1 */}
        <div className="team-column">
          <span className="member-title">
            {translations[language].teamMembersBatch1Title ||
              "Team Members: 2023-2027"}
          </span>
          <span className="member-name">{translations[language].nikhita}</span>
          <span className="member-name">{translations[language].sheeba}</span>
        </div>

        {/* Column 2 */}
        <div className="team-column">
          <span className="member-title">
            {translations[language].teamMembersBatch2Title ||
              "Team Members: 2022-2026"}
          </span>
          <span className="member-name">
            {language === "tamil"
              ? "செ.ரா. அம்ருதா லெட்சுமி - IV/CSE"
              : "Amrutha Lakshmi S R - IV/CSE"}
          </span>
          <span className="member-name">
            {language === "tamil" ? "தாரணி .பொ - IV/CSE" : "Dharani P - IV/CSE"}
          </span>
          <span className="member-name">
            {language === "tamil" ? "அஸ்வின் .ரா - IV/CSE" : "Aswin R - IV/CSE"}
          </span>
        </div>

        {/* Column 3 */}
        <div className="team-column">
          <span className="member-title">{translations[language].mentor}</span>
          <span className="member-name">
            {translations[language].mentorName}
          </span>
        </div>
      </div>
    </div>
  );
});

// Updated Home component with content wrapper for no-scroll layout
const Home = memo(() => (
  <div className="main-container">
    <EnhancedHeader />
    <div className="content-wrapper">
      <div className="games-section">
        <GameSelection />
      </div>
      <TeamMembersSection />
    </div>
  </div>
));

/* ---------------- ROUTES ---------------- */
const AppRoutes = () => {
  const { user } = useUser();
  const location = useLocation();

  if (!user) {
    return <UserEntry />;
  }

  return (
    <>
      <BackButton />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mathQuiz" element={<MathQuiz />} />
          <Route path="/wordGame" element={<GFGWordGame />} />
          <Route path="/scienceQuiz" element={<ScienceQuiz />} />
          <Route path="/GeographyMapping" element={<GeographyMappping />} />
          <Route path="/my-scores" element={<UserScores />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/partsMarkingGame" element={<PartsMarkingGame />} />
        </Routes>
      </Suspense>
      {/* Show Footer only on non-home pages */}
      {location.pathname !== "/" && <Footer />}
    </>
  );
};

/* ---------------- MAIN APP ---------------- */
function App() {
  return (
    <UserProvider>
      <LanguageProvider>
        <Router>
          <div className="min-h-screen app-bg">
            <AppRoutes />
          </div>
        </Router>
      </LanguageProvider>
    </UserProvider>
  );
}

export default App;