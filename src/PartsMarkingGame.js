import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PartsMarkingGame = () => {
  const navigate = useNavigate();
  const [selectedTopic, setSelectedTopic] = useState("plantcell");
  const [selectedParts, setSelectedParts] = useState(new Set());
  const [showAnswers, setShowAnswers] = useState(false);
  const [score, setScore] = useState(0);
  const [language, setLanguage] = useState("english");
  const [lastSelectedPart, setLastSelectedPart] = useState(null);
  const [pointerMarkers, setPointerMarkers] = useState([]);
  const [invalidClickPosition, setInvalidClickPosition] = useState(null);

  // Clear markers when topic changes
  useEffect(() => {
    setPointerMarkers([]);
    setSelectedParts(new Set());
    setLastSelectedPart(null);
    setInvalidClickPosition(null);
  }, [selectedTopic]);

  const translations = {
    english: {
      gameTitle: "Parts Marking Game",
      backToHome: "Home",
      gameSubtitle: "Click on any part of the diagram to identify it",
      chooseTopic: "Choose a Topic:",
      selectedParts: "Selected Parts",
      gameControls: "Game Controls",
      perfectScore: "🎉 Perfect Score!",
      results: "📊 Results",
      resultsText: "You identified",
      outOf: "out of",
      partsCorrectly: "parts correctly!",
      checkAnswers: "Check Answers",
      resultsShown: "Results Shown",
      resetGame: "Reset Game",
      answerKey: "📚 Answer Key - All",
      allParts: "Parts",
      noPartsSelected: "No parts selected yet. Click on the diagram to start!",
      instructions:
        "💡 Instructions: Click on different parts of the diagram to identify them. Selected parts will be highlighted in yellow.",
      topics: {
        sperm: "Sperm Cell",
        egg: "Egg Cell (Ovum)",
        eye: "Human Eye",
        plantcell: "Plant Cell",
        animalcell: "Animal Cell",
        circuit: "Electric Circuit",
        solar: "Solar System",
      },
      parts: {
        // Sperm parts
        head: "Head",
        acrosome: "Acrosome",
        nucleus: "Nucleus",
        "middle piece": "Middle Piece",
        tail: "Tail",
        mitochondria: "Mitochondria",

        // Egg parts
        "corona radiata": "Corona Radiata",
        "zona pellucida": "Zona Pellucida",
        "cell membrane": "Cell Membrane",
        cytoplasm: "Cytoplasm",
        nucleolus: "Nucleolus",

        // Eye parts
        sclera: "Sclera",
        retina: "Retina",
        lens: "Lens",
        iris: "Iris",
        cornea: "Cornea",
        pupil: "Pupil",
        "vitreous humor": "Vitreous Humor",
        "optic nerve": "Optic Nerve",

        // Plant cell parts
        "cell wall": "Cell Wall",
        vacuole: "Vacuole",
        chloroplast: "Chloroplast",

        // Animal cell parts
        "endoplasmic reticulum": "Endoplasmic Reticulum",
        lysosomes: "Lysosomes",

        // Circuit parts
        wire: "Wire",
        battery: "Battery",
        switch: "Switch",
        bulb: "Bulb",
        resistor: "Resistor",

        // Solar system parts
        sun: "Sun",
        earth: "Earth",
        mars: "Mars",
        jupiter: "Jupiter",
        saturn: "Saturn",
      },
      descriptions: {
        // Sperm descriptions
        head: "Contains genetic material (DNA) and enzymes necessary for fertilization",
        acrosome: "Enzyme-rich cap that helps sperm penetrate the egg during fertilization",
        nucleus: "Contains male genetic material (23 chromosomes) for reproduction",
        "middle piece": "Contains mitochondria that provide energy for sperm movement",
        tail: "Long flagellum that propels the sperm forward through swimming motions",
        mitochondria: "Power plants that produce ATP energy for sperm movement",

        // Egg descriptions
        "corona radiata": "Outermost layer of follicle cells that nourish and protect the egg",
        "zona pellucida": "Protective glycoprotein layer that sperm must penetrate for fertilization",
        "cell membrane": "Controls what enters and exits the egg cell",
        cytoplasm: "Gel-like substance containing nutrients and organelles for early development",
        nucleolus: "Dense region of the nucleus responsible for ribosome production",

        // Eye descriptions
        sclera: "Tough white outer layer that protects the eye and maintains its shape",
        retina: "Light-sensitive tissue that converts images into electrical signals",
        lens: "Clear structure that focuses light rays onto the retina",
        iris: "Colored part that controls how much light enters through the pupil",
        cornea: "Clear front layer that helps focus light into the eye",
        pupil: "Opening in the iris that allows light to enter the eye",
        "vitreous humor": "Clear gel that fills the eye and helps maintain its round shape",
        "optic nerve": "Nerve that carries visual information from the retina to the brain",

        // Plant cell descriptions
        "cell wall": "Rigid structure that provides support, protection, and shape to plant cells",
        vacuole: "Large storage compartment that maintains water pressure and cell rigidity",
        chloroplast: "Organelles containing chlorophyll that conduct photosynthesis",

        // Animal cell descriptions
        "endoplasmic reticulum": "Network of membranes that transports materials throughout the cell",
        lysosomes: "Digestive organelles that break down waste materials and worn-out parts",

        // Circuit descriptions
        wire: "Conductor that allows electric current to flow through the circuit",
        battery: "Power source that provides electrical energy to the circuit",
        switch: "Device that opens or closes circuits to control the flow of electricity",
        bulb: "Device that converts electrical energy into light energy",
        resistor: "Component that opposes current flow and controls the amount of current",

        // Solar system descriptions
        sun: "Central star that provides light and heat energy to all planets",
        earth: "Third planet from the sun, our home with water, atmosphere, and life",
        mars: "Fourth planet known as the 'Red Planet' due to iron oxide on its surface",
        jupiter: "Largest planet with the Great Red Spot storm and many moons",
        saturn: "Sixth planet famous for its beautiful ring system",
      },
    },
    tamil: {
      gameTitle: "பாகங்கள் அடையாளம் காணும் விளையாட்டு",
      backToHome: "முகப்பு",
      gameSubtitle: "பாகங்களை அடையாளம் காண வரைபடத்தில் கிளிக் செய்யுங்கள்",
      chooseTopic: "தலைப்பு தேர்வு செய்யுங்கள்:",
      selectedParts: "தேர்ந்தெடுக்கப்பட்ட பாகங்கள்",
      gameControls: "விளையாட்டு கட்டுப்பாடுகள்",
      perfectScore: "🎉 முழு மதிப்பெண்!",
      results: "📊 முடிவுகள்",
      resultsText: "நீங்கள் அடையாளம் கண்டுள்ளீர்கள்",
      outOf: "க்கு",
      partsCorrectly: "பாகங்கள் சரியாக!",
      checkAnswers: "பதில்களை சரிபார்க்கவும்",
      resultsShown: "முடிவுகள் காட்டப்பட்டுள்ளன",
      resetGame: "விளையாட்டை மீட்டமைக்கவும்",
      answerKey: "📚 விடைக்கோல் - அனைத்து",
      allParts: "பாகங்கள்",
      noPartsSelected:
        "இன்னும் பாகங்கள் தேர்ந்தெடுக்கப்படவில்லை. தொடங்க வரைபடத்தில் கிளிக் செய்யுங்கள்!",
      instructions:
        "💡 வழிமுறைகள்: பாகங்களை அடையாளம் காண வரைபடத்தின் வெவ்வேறு பகுதிகளில் கிளிக் செய்யுங்கள். தேர்ந்தெடுக்கப்பட்ட பாகங்கள் மஞ்சள் நிறத்தில் தனிமைப்படுத்தப்படும்.",
      topics: {
        sperm: "விந்தணு",
        egg: "கருமுட்டை",
        eye: "மனித கண்",
        plantcell: "தாவர செல்",
        animalcell: "விலங்கு செல்",
        circuit: "மின் சுற்று",
        solar: "சூரிய குடும்பம்",
      },
      parts: {
        // Sperm parts
        head: "தலை",
        acrosome: "அக்ரோசோம்",
        nucleus: "அணுக்கரு",
        "middle piece": "நடுப்பகுதி",
        tail: "வால்",
        mitochondria: "மைட்டோகான்ட்ரியா",

        // Egg parts
        "corona radiata": "கொரோனா ரேடியேட்டா",
        "zona pellucida": "சோனா பெல்லுசிடா",
        "cell membrane": "செல் சவ்வு",
        cytoplasm: "சைட்டோபிளாசம்",
        nucleolus: "அணுக்கருவின்",

        // Eye parts
        sclera: "ஸ்க்லீரா",
        retina: "விழித்திரை",
        lens: "லென்ஸ்",
        iris: "கருவிழி",
        cornea: "கார்னியா",
        pupil: "மாணவன்",
        "vitreous humor": "கண்ணாடி திரவம்",
        "optic nerve": "பார்வை நரம்பு",

        // Plant cell parts
        "cell wall": "செல் சுவர்",
        vacuole: "திரவப்பை",
        chloroplast: "பச்சையம்",

        // Animal cell parts
        "endoplasmic reticulum": "எண்டோபிளாஸ்மிக் ரெட்டிகுலம்",
        lysosomes: "லைசோசோம்கள்",

        // Circuit parts
        wire: "கம்பி",
        battery: "மின்கலம்",
        switch: "சுவிட்ச்",
        bulb: "விளக்கு",
        resistor: "எதிர்ப்பி",

        // Solar system parts
        sun: "சூரியன்",
        earth: "பூமி",
        mars: "செவ்வாய்",
        jupiter: "வியாழன்",
        saturn: "சனி",
      },
      descriptions: {
        // Sperm descriptions
        head: "தலையில் மரபணு பொருள் (DNA) மற்றும் கருத்தரிப்புக்கு தேவையான என்சைம்கள் உள்ளன",
        acrosome: "கருத்தரிப்பின் போது விந்தணு கருமுட்டையில் ஊடுருவ உதவும் என்சைம் நிறைந்த தொப்பி",
        nucleus: "இனப்பெருக்கத்திற்கான ஆண் மரபணு பொருள் (23 குரோமோசோம்கள்) உள்ளது",
        "middle piece": "விந்தணு இயக்கத்திற்கு ஆற்றல் வழங்கும் மைட்டோகாண்ட்ரியா உள்ளது",
        tail: "நீச்சல் இயக்கங்கள் மூலம் விந்தணுவை முன்னோக்கி செலுத்தும் நீண்ட கசை",
        mitochondria: "விந்தணு இயக்கத்திற்கு ATP ஆற்றலை உற்பத்தி செய்யும் சக்தி நிலையங்கள்",

        // Egg descriptions
        "corona radiata": "கருமுட்டையை பேணி பாதுகாக்கும் வெளிப்புற கூட்டு செல் அடுக்கு",
        "zona pellucida": "கருத்தரிப்புக்காக விந்தணு ஊடுருவ வேண்டிய பாதுகாப்பு கிளைக்கோபுரத அடுக்கு",
        "cell membrane": "கருமுட்டை செல்லுக்குள் என்ன நுழைகிறது மற்றும் வெளியேறுகிறது என்பதைக் கட்டுப்படுத்துகிறது",
        cytoplasm: "ஆரம்ப வளர்ச்சிக்கான ஊட்டச்சத்துக்கள் மற்றும் உறுப்புகளைக் கொண்ட ஜெல் போன்ற பொருள்",
        nucleolus: "ரைபோசோம் உற்பத்திக்கு பொறுப்பான அணுக்கருவின் அடர்த்தியான பகுதி",

        // Eye descriptions
        sclera: "கண்ணைப் பாதுகாத்து அதன் வடிவத்தை பராமரிக்கும் கடினமான வெள்ளை வெளிப்புற அடுக்கு",
        retina: "படங்களை மின் சமிக்ஞைகளாக மாற்றும் ஒளி உணர்வுத்திசு",
        lens: "ஒளிக்கதிர்களை விழித்திரை மீது குவிக்கும் வெளிப்படையான அமைப்பு",
        iris: "மாணவன் வழியே எவ்வளவு ஒளி நுழைகிறது என்பதைக் கட்டுப்படுத்தும் வண்ணப்பகுதி",
        cornea: "கண்ணுக்குள் ஒளியை குவிக்க உதவும் தெளிவான முன்புற அடுக்கு",
        pupil: "கண்ணுக்குள் ஒளி நுழைய அனுமதிக்கும் கருவிழியின் திறப்பு",
        "vitreous humor": "கண்ணை நிரப்பி அதன் வட்ட வடிவத்தை பராமரிக்க உதவும் தெளிவான ஜெல்",
        "optic nerve": "விழித்திரையிலிருந்து மூளைக்கு பார்வை தகவலை கொண்டு செல்லும் நரம்பு",

        // Plant cell descriptions
        "cell wall": "தாவர செல்களுக்கு ஆதரவு, பாதுகாப்பு மற்றும் வடிவத்தை வழங்கும் கடினமான அமைப்பு",
        vacuole: "நீர் அழுத்தத்தையும் செல் கடினத்தன்மையையும் பராமரிக்கும் பெரிய சேமிப்பு பகுதி",
        chloroplast: "ஒளிச்சேர்க்கையை நடத்தும் குளோரோஃபில் கொண்ட உறுப்புகள்",

        // Animal cell descriptions
        "endoplasmic reticulum": "செல் முழுவதும் பொருட்களை கொண்டு செல்லும் சவ்வுகளின் வலைப்பின்னல்",
        lysosomes: "கழிவு பொருட்கள் மற்றும் தேய்ந்த பாகங்களை உடைக்கும் செரிமான உறுப்புகள்",

        // Circuit descriptions
        wire: "மின்சுற்று வழியே மின்னோட்டம் பாய அனுமதிக்கும் கடத்தி",
        battery: "மின்சுற்றுக்கு மின் ஆற்றலை வழங்கும் சக்தி மூலம்",
        switch: "மின்னோட்ட ஓட்டத்தைக் கட்டுப்படுத்த சுற்றுகளைத் திறக்கவோ மூடவோ செய்யும் சாதனம்",
        bulb: "மின் ஆற்றலை ஒளி ஆற்றலாக மாற்றும் சாதனம்",
        resistor: "மின்னோட்ட ஓட்டத்தை எதிர்த்து மின்னோட்ட அளவைக் கட்டுப்படுத்தும் கூறு",

        // Solar system descriptions
        sun: "அனைத்து கிரகங்களுக்கும் ஒளி மற்றும் வெப்ப ஆற்றலை வழங்கும் மைய நட்சத்திரம்",
        earth: "நீர், வளிமண்டலம் மற்றும் உயிர்களைக் கொண்ட நமது வீடான சூரியனிலிருந்து மூன்றாவது கிரகம்",
        mars: "மேற்பரப்பில் இரும்பு ஆக்சைடு காரணமாக 'சிவப்பு கிரகம்' என்று அழைக்கப்படும் நான்காவது கிரகம்",
        jupiter: "பெரிய சிவப்பு புள்ளி புயல் மற்றும் பல நிலவுகளைக் கொண்ட மிகப்பெரிய கிரகம்",
        saturn: "அதன் அழகான வளைய அமைப்புக்கு பிரபலமான ஆறாவது கிரகம்",
      },
    },
  };

  const t = translations[language] || { parts: {}, topics: {}, descriptions: {} };

  // Update marker labels when language changes
  useEffect(() => {
    if (t && t.parts) {
      setPointerMarkers(prevMarkers => 
        prevMarkers.map(marker => ({
          ...marker,
          label: t.parts[marker.partName] || marker.partName
        }))
      );
    }
  }, [language, t]);

  // Helper function to get element style based on selection state
  const getElementStyle = (partName) => {
    const isSelected = selectedParts.has(partName);
    return {
      cursor: "pointer",
      filter: isSelected ? "drop-shadow(0 0 8px #FFD700)" : "none",
      stroke: isSelected ? "#FFD700" : undefined,
      strokeWidth: isSelected ? "4" : undefined,
      opacity: isSelected ? 0.8 : 1,
    };
  };

  const topics = {
    sperm: {
      title: t.topics.sperm,
      diagram: (
        <svg viewBox="0 0 450 200" style={{ width: "100%", height: "100%" }}>
          <defs>
            <radialGradient id="headGrad" cx="0.3" cy="0.3">
              <stop offset="0%" stopColor="#FFE4E1" />
              <stop offset="100%" stopColor="#FFB6C1" />
            </radialGradient>
            <linearGradient id="tailGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4682B4" />
              <stop offset="100%" stopColor="#87CEEB" />
            </linearGradient>
          </defs>

          {/* Head */}
          <ellipse
            cx="80"
            cy="100"
            rx="30"
            ry="40"
            fill="url(#headGrad)"
            stroke="#FF69B4"
            strokeWidth="2"
            style={getElementStyle("head")}
            data-part="head"
          />

          {/* Acrosome */}
          <ellipse
            cx="80"
            cy="75"
            rx="20"
            ry="25"
            fill="#FF69B4"
            stroke="#FF1493"
            strokeWidth="2"
            style={getElementStyle("acrosome")}
            data-part="acrosome"
          />

          {/* Nucleus */}
          <ellipse
            cx="80"
            cy="115"
            rx="18"
            ry="22"
            fill="#8B008B"
            stroke="#4B0082"
            strokeWidth="1"
            style={getElementStyle("nucleus")}
            data-part="nucleus"
          />

          {/* Middle Piece */}
          <rect
            x="110"
            y="85"
            width="35"
            height="30"
            fill="#32CD32"
            rx="15"
            stroke="#228B22"
            strokeWidth="2"
            style={getElementStyle("middle piece")}
            data-part="middle piece"
          />

          {/* Mitochondria spirals in middle piece */}
          <g data-part="mitochondria" style={getElementStyle("mitochondria")}>
            <ellipse cx="120" cy="95" rx="6" ry="3" fill="#FF4500" />
            <ellipse cx="130" cy="100" rx="6" ry="3" fill="#FF4500" />
            <ellipse cx="125" cy="105" rx="6" ry="3" fill="#FF4500" />
          </g>

          {/* Tail */}
          <path
            d="M145 100 Q180 90 220 100 Q260 110 300 100 Q340 90 380 100 Q420 110 440 100"
            stroke="url(#tailGrad)"
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
            style={getElementStyle("tail")}
            data-part="tail"
          />

          <text
            x="225"
            y="180"
            textAnchor="middle"
            fontSize="14"
            fill="#333"
            fontWeight="bold"
          >
            {t.topics.sperm}
          </text>
        </svg>
      ),
      parts: [
        "head",
        "acrosome",
        "nucleus",
        "middle piece",
        "tail",
        "mitochondria",
      ],
    },

    egg: {
      title: t.topics.egg,
      diagram: (
        <svg viewBox="0 0 400 400" style={{ width: "100%", height: "100%" }}>
          <defs>
            <radialGradient id="eggCellGrad" cx="0.4" cy="0.3">
              <stop offset="0%" stopColor="#FFFACD" />
              <stop offset="100%" stopColor="#F0E68C" />
            </radialGradient>
            <radialGradient id="nucleusGrad" cx="0.3" cy="0.3">
              <stop offset="0%" stopColor="#E6E6FA" />
              <stop offset="100%" stopColor="#9370DB" />
            </radialGradient>
          </defs>

          {/* Corona Radiata - outer cells */}
          <g
            data-part="corona radiata"
            style={getElementStyle("corona radiata")}
          >
            <circle
              cx="320"
              cy="200"
              r="12"
              fill="#98FB98"
              stroke="#32CD32"
              strokeWidth="2"
            />
            <circle
              cx="300"
              cy="120"
              r="12"
              fill="#98FB98"
              stroke="#32CD32"
              strokeWidth="2"
            />
            <circle
              cx="300"
              cy="280"
              r="12"
              fill="#98FB98"
              stroke="#32CD32"
              strokeWidth="2"
            />
            <circle
              cx="80"
              cy="200"
              r="12"
              fill="#98FB98"
              stroke="#32CD32"
              strokeWidth="2"
            />
            <circle
              cx="100"
              cy="120"
              r="12"
              fill="#98FB98"
              stroke="#32CD32"
              strokeWidth="2"
            />
            <circle
              cx="100"
              cy="280"
              r="12"
              fill="#98FB98"
              stroke="#32CD32"
              strokeWidth="2"
            />
            <circle
              cx="200"
              cy="50"
              r="12"
              fill="#98FB98"
              stroke="#32CD32"
              strokeWidth="2"
            />
            <circle
              cx="200"
              cy="350"
              r="12"
              fill="#98FB98"
              stroke="#32CD32"
              strokeWidth="2"
            />
          </g>

          {/* Zona Pellucida */}
          <circle
            cx="200"
            cy="200"
            r="130"
            fill="none"
            stroke="#FF69B4"
            strokeWidth="8"
            strokeDasharray="10,5"
            opacity="0.7"
            style={getElementStyle("zona pellucida")}
            data-part="zona pellucida"
          />

          {/* Cell Membrane */}
          <circle
            cx="200"
            cy="200"
            r="110"
            fill="url(#eggCellGrad)"
            stroke="#DAA520"
            strokeWidth="4"
            style={getElementStyle("cell membrane")}
            data-part="cell membrane"
          />

          {/* Cytoplasm */}
          <circle
            cx="200"
            cy="200"
            r="105"
            fill="#FFF8DC"
            opacity="0.6"
            style={getElementStyle("cytoplasm")}
            data-part="cytoplasm"
          />

          {/* Nucleus */}
          <circle
            cx="200"
            cy="180"
            r="35"
            fill="url(#nucleusGrad)"
            stroke="#4B0082"
            strokeWidth="3"
            style={getElementStyle("nucleus")}
            data-part="nucleus"
          />

          {/* Nucleolus */}
          <circle
            cx="200"
            cy="180"
            r="12"
            fill="#4B0082"
            style={getElementStyle("nucleolus")}
            data-part="nucleolus"
          />

          <text
            x="200"
            y="380"
            textAnchor="middle"
            fontSize="14"
            fill="#333"
            fontWeight="bold"
          >
            {t.topics.egg}
          </text>
        </svg>
      ),
      parts: [
        "corona radiata",
        "zona pellucida",
        "cell membrane",
        "cytoplasm",
        "nucleus",
        "nucleolus",
      ],
    },

    eye: {
      title: t.topics.eye,
      diagram: (
        <svg viewBox="0 0 400 300" style={{ width: "100%", height: "100%" }}>
          <defs>
            <radialGradient id="eyeGrad" cx="0.3" cy="0.3">
              <stop offset="0%" stopColor="#F8F8FF" />
              <stop offset="100%" stopColor="#E0E0E0" />
            </radialGradient>
            <radialGradient id="irisGrad" cx="0.4" cy="0.3">
              <stop offset="0%" stopColor="#87CEEB" />
              <stop offset="100%" stopColor="#4169E1" />
            </radialGradient>
          </defs>

          {/* Sclera - white outer layer */}
          <ellipse
            cx="200"
            cy="150"
            rx="130"
            ry="85"
            fill="url(#eyeGrad)"
            stroke="#B0C4DE"
            strokeWidth="3"
            style={getElementStyle("sclera")}
            data-part="sclera"
          />

          {/* Retina - inner layer */}
          <ellipse
            cx="200"
            cy="150"
            rx="115"
            ry="70"
            fill="#FFB6C1"
            stroke="#DC143C"
            strokeWidth="2"
            opacity="0.8"
            style={getElementStyle("retina")}
            data-part="retina"
          />

          {/* Vitreous Humor - clear gel */}
          <ellipse
            cx="210"
            cy="150"
            rx="90"
            ry="60"
            fill="#F0F8FF"
            opacity="0.4"
            style={getElementStyle("vitreous humor")}
            data-part="vitreous humor"
          />

          {/* Lens - clear biconvex */}
          <ellipse
            cx="160"
            cy="150"
            rx="25"
            ry="30"
            fill="#E6F3FF"
            stroke="#4682B4"
            strokeWidth="3"
            opacity="0.9"
            style={getElementStyle("lens")}
            data-part="lens"
          />

          {/* Iris - colored part */}
          <circle
            cx="135"
            cy="150"
            r="32"
            fill="url(#irisGrad)"
            stroke="#000080"
            strokeWidth="2"
            style={getElementStyle("iris")}
            data-part="iris"
          />

          {/* Pupil - black opening */}
          <circle
            cx="135"
            cy="150"
            r="15"
            fill="#000000"
            style={getElementStyle("pupil")}
            data-part="pupil"
          />

          {/* Cornea - transparent front */}
          <ellipse
            cx="125"
            cy="150"
            rx="35"
            ry="40"
            fill="#F0F8FF"
            opacity="0.6"
            stroke="#4682B4"
            strokeWidth="2"
            style={getElementStyle("cornea")}
            data-part="cornea"
          />

          {/* Optic Nerve */}
          <rect
            x="320"
            y="145"
            width="60"
            height="12"
            fill="#8B4513"
            stroke="#654321"
            strokeWidth="1"
            rx="6"
            style={getElementStyle("optic nerve")}
            data-part="optic nerve"
          />

          <text
            x="200"
            y="280"
            textAnchor="middle"
            fontSize="14"
            fill="#333"
            fontWeight="bold"
          >
            {t.topics.eye}
          </text>
        </svg>
      ),
      parts: [
        "sclera",
        "retina",
        "lens",
        "iris",
        "cornea",
        "pupil",
        "vitreous humor",
        "optic nerve",
      ],
    },

    plantcell: {
      title: t.topics.plantcell,
      diagram: (
        <svg viewBox="0 0 400 300" style={{ width: "100%", height: "100%" }}>
          <defs>
            <pattern
              id="cellWallPattern"
              patternUnits="userSpaceOnUse"
              width="4"
              height="4"
            >
              <rect width="4" height="4" fill="#228B22" />
              <rect width="2" height="2" fill="#32CD32" />
            </pattern>
            <radialGradient id="plantNucleusGrad" cx="0.3" cy="0.3">
              <stop offset="0%" stopColor="#E6E6FA" />
              <stop offset="100%" stopColor="#9370DB" />
            </radialGradient>
          </defs>

          {/* Cell Wall - thick green outer boundary */}
          <rect
            x="20"
            y="30"
            width="360"
            height="240"
            fill="none"
            stroke="url(#cellWallPattern)"
            strokeWidth="8"
            style={getElementStyle("cell wall")}
            data-part="cell wall"
          />

          {/* Cell Membrane - thin inner boundary */}
          <rect
            x="32"
            y="42"
            width="336"
            height="216"
            fill="#F0F8FF"
            stroke="#4682B4"
            strokeWidth="3"
            opacity="0.8"
            style={getElementStyle("cell membrane")}
            data-part="cell membrane"
          />

          {/* Cytoplasm - cell interior */}
          <rect
            x="40"
            y="50"
            width="320"
            height="200"
            fill="#FFFACD"
            opacity="0.6"
            rx="10"
            style={getElementStyle("cytoplasm")}
            data-part="cytoplasm"
          />

          {/* Large Central Vacuole */}
          <ellipse
            cx="200"
            cy="150"
            rx="90"
            ry="70"
            fill="#E6F7FF"
            stroke="#4169E1"
            strokeWidth="3"
            opacity="0.9"
            style={getElementStyle("vacuole")}
            data-part="vacuole"
          />

          {/* Nucleus */}
          <circle
            cx="130"
            cy="100"
            r="28"
            fill="url(#plantNucleusGrad)"
            stroke="#4B0082"
            strokeWidth="3"
            style={getElementStyle("nucleus")}
            data-part="nucleus"
          />

          {/* Nucleolus */}
          <circle
            cx="130"
            cy="100"
            r="10"
            fill="#4B0082"
            style={getElementStyle("nucleolus")}
            data-part="nucleolus"
          />

          {/* Chloroplasts - green oval structures */}
          <g data-part="chloroplast" style={getElementStyle("chloroplast")}>
            <ellipse
              cx="80"
              cy="80"
              rx="15"
              ry="25"
              fill="#32CD32"
              stroke="#228B22"
              strokeWidth="2"
            />
            <ellipse
              cx="75"
              cy="75"
              rx="4"
              ry="8"
              fill="#228B22"
              opacity="0.7"
            />
            <ellipse
              cx="85"
              cy="85"
              rx="4"
              ry="8"
              fill="#228B22"
              opacity="0.7"
            />

            <ellipse
              cx="320"
              cy="100"
              rx="15"
              ry="25"
              fill="#32CD32"
              stroke="#228B22"
              strokeWidth="2"
            />
            <ellipse
              cx="315"
              cy="95"
              rx="4"
              ry="8"
              fill="#228B22"
              opacity="0.7"
            />
            <ellipse
              cx="325"
              cy="105"
              rx="4"
              ry="8"
              fill="#228B22"
              opacity="0.7"
            />

            <ellipse
              cx="90"
              cy="210"
              rx="15"
              ry="25"
              fill="#32CD32"
              stroke="#228B22"
              strokeWidth="2"
            />
            <ellipse
              cx="85"
              cy="205"
              rx="4"
              ry="8"
              fill="#228B22"
              opacity="0.7"
            />
            <ellipse
              cx="95"
              cy="215"
              rx="4"
              ry="8"
              fill="#228B22"
              opacity="0.7"
            />

            <ellipse
              cx="330"
              cy="220"
              rx="15"
              ry="25"
              fill="#32CD32"
              stroke="#228B22"
              strokeWidth="2"
            />
            <ellipse
              cx="325"
              cy="215"
              rx="4"
              ry="8"
              fill="#228B22"
              opacity="0.7"
            />
            <ellipse
              cx="335"
              cy="225"
              rx="4"
              ry="8"
              fill="#228B22"
              opacity="0.7"
            />
          </g>

          <text
            x="200"
            y="285"
            textAnchor="middle"
            fontSize="14"
            fill="#333"
            fontWeight="bold"
          >
            {t.topics.plantcell}
          </text>
        </svg>
      ),
      parts: [
        "cell wall",
        "cell membrane",
        "vacuole",
        "nucleus",
        "chloroplast",
        "cytoplasm",
        "nucleolus",
      ],
    },

    animalcell: {
      title: t.topics.animalcell,
      diagram: (
        <svg viewBox="0 0 400 300" style={{ width: "100%", height: "100%" }}>
          <defs>
            <radialGradient id="cytoplasmGrad" cx="0.4" cy="0.3">
              <stop offset="0%" stopColor="#F0F8FF" />
              <stop offset="100%" stopColor="#E0E6FF" />
            </radialGradient>
            <radialGradient id="mitoGrad" cx="0.3" cy="0.3">
              <stop offset="0%" stopColor="#FF7F50" />
              <stop offset="100%" stopColor="#FF4500" />
            </radialGradient>
            <radialGradient id="animalNucleusGrad" cx="0.3" cy="0.3">
              <stop offset="0%" stopColor="#E6E6FA" />
              <stop offset="100%" stopColor="#9370DB" />
            </radialGradient>
          </defs>

          {/* Cell Membrane - irregular shape */}
          <path
            d="M80 120 Q60 80 100 60 Q150 50 200 55 Q250 50 300 70 Q340 90 330 130 Q335 170 310 200 Q280 230 240 240 Q200 245 160 240 Q120 235 90 210 Q70 180 75 150 Q70 130 80 120 Z"
            fill="url(#cytoplasmGrad)"
            stroke="#4169E1"
            strokeWidth="4"
            style={getElementStyle("cell membrane")}
            data-part="cell membrane"
          />

          {/* Nucleus */}
          <circle
            cx="200"
            cy="150"
            r="40"
            fill="url(#animalNucleusGrad)"
            stroke="#4B0082"
            strokeWidth="3"
            style={getElementStyle("nucleus")}
            data-part="nucleus"
          />

          {/* Nucleolus */}
          <circle
            cx="190"
            cy="140"
            r="12"
            fill="#4B0082"
            style={getElementStyle("nucleolus")}
            data-part="nucleolus"
          />

          {/* Mitochondria - bean-shaped with cristae */}
          <g data-part="mitochondria" style={getElementStyle("mitochondria")}>
            <ellipse
              cx="130"
              cy="120"
              rx="25"
              ry="15"
              fill="url(#mitoGrad)"
              stroke="#DC143C"
              strokeWidth="2"
            />
            <path
              d="M110 120 Q125 115 140 120 Q125 125 110 120"
              stroke="#8B0000"
              strokeWidth="1"
              fill="none"
            />
            <path
              d="M115 125 Q125 120 135 125"
              stroke="#8B0000"
              strokeWidth="1"
              fill="none"
            />

            <ellipse
              cx="280"
              cy="130"
              rx="25"
              ry="15"
              fill="url(#mitoGrad)"
              stroke="#DC143C"
              strokeWidth="2"
            />
            <path
              d="M260 130 Q275 125 290 130 Q275 135 260 130"
              stroke="#8B0000"
              strokeWidth="1"
              fill="none"
            />
            <path
              d="M265 135 Q275 130 285 135"
              stroke="#8B0000"
              strokeWidth="1"
              fill="none"
            />

            <ellipse
              cx="150"
              cy="210"
              rx="25"
              ry="15"
              fill="url(#mitoGrad)"
              stroke="#DC143C"
              strokeWidth="2"
            />
            <path
              d="M130 210 Q145 205 160 210 Q145 215 130 210"
              stroke="#8B0000"
              strokeWidth="1"
              fill="none"
            />
            <path
              d="M135 215 Q145 210 155 215"
              stroke="#8B0000"
              strokeWidth="1"
              fill="none"
            />
          </g>

          {/* Endoplasmic Reticulum - folded membranes */}
          <g
            data-part="endoplasmic reticulum"
            style={getElementStyle("endoplasmic reticulum")}
          >
            <path
              d="M100 100 Q120 90 140 100 Q160 110 180 100 Q200 90 220 100 Q240 110 260 100"
              stroke="#9370DB"
              strokeWidth="4"
              fill="none"
            />
            <path
              d="M105 180 Q125 170 145 180 Q165 190 185 180 Q205 170 225 180"
              stroke="#9370DB"
              strokeWidth="4"
              fill="none"
            />
            <circle cx="115" cy="95" r="3" fill="#8B4513" />
            <circle cx="135" cy="105" r="3" fill="#8B4513" />
            <circle cx="155" cy="95" r="3" fill="#8B4513" />
          </g>

          {/* Lysosomes - digestive vesicles */}
          <g data-part="lysosomes" style={getElementStyle("lysosomes")}>
            <circle
              cx="120"
              cy="160"
              r="12"
              fill="#FF69B4"
              stroke="#FF1493"
              strokeWidth="2"
            />
            <circle cx="115" cy="155" r="3" fill="#DC143C" />
            <circle cx="125" cy="165" r="3" fill="#DC143C" />

            <circle
              cx="290"
              cy="180"
              r="12"
              fill="#FF69B4"
              stroke="#FF1493"
              strokeWidth="2"
            />
            <circle cx="285" cy="175" r="3" fill="#DC143C" />
            <circle cx="295" cy="185" r="3" fill="#DC143C" />
          </g>

          <text
            x="200"
            y="280"
            textAnchor="middle"
            fontSize="14"
            fill="#333"
            fontWeight="bold"
          >
            {t.topics.animalcell}
          </text>
        </svg>
      ),
      parts: [
        "cell membrane",
        "nucleus",
        "mitochondria",
        "endoplasmic reticulum",
        "lysosomes",
        "nucleolus",
      ],
    },

    circuit: {
      title: t.topics.circuit,
      diagram: (
        <svg viewBox="0 0 400 300" style={{ width: "100%", height: "100%" }}>
          <defs>
            <linearGradient id="wireGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFD700" />
              <stop offset="100%" stopColor="#DAA520" />
            </linearGradient>
          </defs>

          {/* Wire - complete circuit path */}
          <g data-part="wire" style={getElementStyle("wire")}>
            <path
              d="M100 100 L300 100 L300 200 L100 200 Z"
              stroke="url(#wireGrad)"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
            />
          </g>

          {/* Battery - with + and - terminals */}
          <g data-part="battery" style={getElementStyle("battery")}>
            <rect
              x="85"
              y="140"
              width="30"
              height="50"
              fill="#FF6347"
              stroke="#8B0000"
              strokeWidth="2"
              rx="5"
            />
            <rect x="80" y="150" width="15" height="30" fill="#8B0000" rx="3" />
            <text x="70" y="135" fontSize="12" fill="#000" fontWeight="bold">
              +
            </text>
            <text x="70" y="210" fontSize="12" fill="#000" fontWeight="bold">
              -
            </text>
          </g>

          {/* Switch - with movable contact */}
          <g data-part="switch" style={getElementStyle("switch")}>
            <circle cx="200" cy="100" r="6" fill="#000" />
            <line
              x1="200"
              y1="100"
              x2="225"
              y2="80"
              stroke="#000"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <circle cx="225" cy="100" r="6" fill="#000" />
          </g>

          {/* Light Bulb - with filament */}
          <g data-part="bulb" style={getElementStyle("bulb")}>
            <circle
              cx="300"
              cy="150"
              r="25"
              fill="#FFF8DC"
              stroke="#000"
              strokeWidth="3"
            />
            <path
              d="M285 135 L315 165 M285 165 L315 135"
              stroke="#FFD700"
              strokeWidth="3"
            />
            <path
              d="M290 150 Q300 140 310 150 Q300 160 290 150"
              stroke="#FFD700"
              strokeWidth="2"
              fill="none"
            />
          </g>

          {/* Resistor - with zigzag pattern */}
          <g data-part="resistor" style={getElementStyle("resistor")}>
            <rect
              x="170"
              y="195"
              width="60"
              height="12"
              fill="#8B4513"
              stroke="#000"
              strokeWidth="2"
              rx="6"
            />
            <path
              d="M175 201 L180 195 L185 207 L190 195 L195 207 L200 195 L205 207 L210 195 L215 207 L220 195 L225 201"
              stroke="#000"
              strokeWidth="2"
              fill="none"
            />
          </g>

          <text
            x="200"
            y="280"
            textAnchor="middle"
            fontSize="14"
            fill="#333"
            fontWeight="bold"
          >
            {t.topics.circuit}
          </text>
        </svg>
      ),
      parts: ["wire", "battery", "switch", "bulb", "resistor"],
    },

    solar: {
      title: t.topics.solar,
      diagram: (
        <svg viewBox="0 0 500 300" style={{ width: "100%", height: "100%" }}>
          <defs>
            <radialGradient id="sunGrad" cx="0.3" cy="0.3">
              <stop offset="0%" stopColor="#FFFF99" />
              <stop offset="100%" stopColor="#FFD700" />
            </radialGradient>
            <radialGradient id="earthGrad" cx="0.3" cy="0.3">
              <stop offset="0%" stopColor="#87CEEB" />
              <stop offset="100%" stopColor="#4169E1" />
            </radialGradient>
          </defs>

          {/* Sun */}
          <g data-part="sun" style={getElementStyle("sun")}>
            <circle
              cx="100"
              cy="150"
              r="35"
              fill="url(#sunGrad)"
              stroke="#FF8C00"
              strokeWidth="3"
            />
            <path
              d="M100 110 L100 90 M100 190 L100 210 M140 150 L160 150 M60 150 L40 150"
              stroke="#FFD700"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M125 125 L140 110 M75 125 L60 110 M125 175 L140 190 M75 175 L60 190"
              stroke="#FFD700"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </g>

          {/* Earth */}
          <g data-part="earth" style={getElementStyle("earth")}>
            <circle
              cx="220"
              cy="150"
              r="12"
              fill="url(#earthGrad)"
              stroke="#000080"
              strokeWidth="2"
            />
            <path
              d="M215 145 Q220 140 225 145 Q220 150 215 150"
              fill="#228B22"
            />
            <path d="M218 155 Q222 152 225 155" fill="#228B22" />
          </g>

          {/* Mars */}
          <g data-part="mars" style={getElementStyle("mars")}>
            <circle
              cx="270"
              cy="150"
              r="8"
              fill="#CD5C5C"
              stroke="#8B0000"
              strokeWidth="2"
            />
            <ellipse cx="268" cy="148" rx="2" ry="1" fill="#8B0000" />
            <ellipse cx="272" cy="152" rx="1" ry="0.5" fill="#8B0000" />
          </g>

          {/* Jupiter */}
          <g data-part="jupiter" style={getElementStyle("jupiter")}>
            <circle
              cx="340"
              cy="150"
              r="22"
              fill="#DAA520"
              stroke="#B8860B"
              strokeWidth="2"
            />
            <ellipse
              cx="340"
              cy="145"
              rx="18"
              ry="3"
              fill="#8B7355"
              opacity="0.7"
            />
            <ellipse
              cx="340"
              cy="155"
              rx="18"
              ry="2"
              fill="#8B7355"
              opacity="0.7"
            />
            <circle cx="350" cy="140" r="4" fill="#FF6347" />
          </g>

          {/* Saturn */}
          <g data-part="saturn" style={getElementStyle("saturn")}>
            <circle
              cx="430"
              cy="150"
              r="18"
              fill="#FAD5A5"
              stroke="#DEB887"
              strokeWidth="2"
            />
            <ellipse
              cx="430"
              cy="150"
              rx="30"
              ry="6"
              fill="none"
              stroke="#8B7D6B"
              strokeWidth="3"
            />
            <ellipse
              cx="430"
              cy="150"
              rx="35"
              ry="8"
              fill="none"
              stroke="#8B7D6B"
              strokeWidth="2"
              opacity="0.6"
            />
            <ellipse
              cx="430"
              cy="145"
              rx="15"
              ry="2"
              fill="#DEB887"
              opacity="0.5"
            />
          </g>

          <text
            x="250"
            y="280"
            textAnchor="middle"
            fontSize="14"
            fill="#333"
            fontWeight="bold"
          >
            {t.topics.solar}
          </text>
        </svg>
      ),
      parts: ["sun", "earth", "mars", "jupiter", "saturn"],
    },
  };

  // Helper function to get the center position of an SVG element
  const getClickPosition = (e) => {
    try {
      // Find the SVG element that contains the diagram
      let svgElement = e.target;
      while (svgElement && svgElement.tagName !== 'svg') {
        svgElement = svgElement.parentElement;
      }
      
      // If we found the SVG, use it as reference, otherwise use the current target
      const referenceElement = svgElement || e.currentTarget;
      
      const rect = referenceElement.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      // Return exact click position without any clamping
      return { x: x, y: y };
    } catch (error) {
      console.warn("Could not get click position:", error);
      return { x: 50, y: 50 }; // fallback to center
    }
  };

  const handlePartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Find the data-part attribute from the clicked element or its parent
    let element = e.target;
    let part = null;

    // Search up the DOM tree for data-part attribute
    while (element && !part) {
      part = element.getAttribute("data-part");
      element = element.parentElement;
    }

    // Only process if we found a valid part and it exists in the current topic
    if (part && topics[selectedTopic].parts.includes(part)) {
      // Find the SVG container
      let svgContainer = element;
      while (svgContainer && svgContainer.tagName !== 'svg') {
        svgContainer = svgContainer.parentElement;
      }

      setSelectedParts((prev) => {
        const newSet = new Set(prev);
        const isCurrentlySelected = newSet.has(part);
        
        if (isCurrentlySelected) {
          newSet.delete(part);
          setLastSelectedPart(null); // Clear description when deselecting
          
          // Remove pointer marker for this part
          setPointerMarkers(prevMarkers => 
            prevMarkers.filter(marker => marker.partName !== part)
          );
        } else {
          newSet.add(part);
          setLastSelectedPart(part); // Show description when selecting
          
          // Add pointer marker for this part at exact click position
          const clickPosition = getClickPosition(e);
          
          setPointerMarkers(prevMarkers => [
            ...prevMarkers.filter(marker => marker.partName !== part), // Remove any existing marker for this part
            {
              partName: part,
              x: clickPosition.x,
              y: clickPosition.y,
              id: Date.now() + Math.random(), // unique id for each marker
              label: (t && t.parts && t.parts[part]) || part // Use current language part names
            }
          ]);
        }
        return newSet;
      });
    } else {
      // Handle invalid clicks - add visual feedback for incorrect clicks
      const clickPosition = getClickPosition(e);
      
      setInvalidClickPosition(clickPosition);
      setTimeout(() => setInvalidClickPosition(null), 1000);
    }
  };

  const checkAnswers = () => {
    setScore(selectedParts.size);
    setShowAnswers(true);
  };

  const resetGame = () => {
    setSelectedParts(new Set());
    setShowAnswers(false);
    setScore(0);
    setLastSelectedPart(null);
    setPointerMarkers([]);
    setInvalidClickPosition(null);
  };

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "english" ? "tamil" : "english"));
  };

  // Reset game when topic changes
  useEffect(() => {
    resetGame();
  }, [selectedTopic]);

  return (
    <>
      <style>
        {`
          @keyframes pulse {
            0% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.2);
              opacity: 0.7;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }

          @keyframes invalidClick {
            0% {
              transform: scale(1);
              opacity: 1;
            }
            25% {
              transform: scale(1.2);
              opacity: 0.8;
            }
            50% {
              transform: scale(0.9);
              opacity: 0.6;
            }
            75% {
              transform: scale(1.1);
              opacity: 0.4;
            }
            100% {
              transform: scale(1);
              opacity: 0;
            }
          }
        `}
      </style>
      <div
        style={{
          padding: "4px",
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#9333ea",
          height: "100vh",
          overflow: "hidden",
        }}
      >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Compact Header */}
        <div style={{ textAlign: "center", marginBottom: "4px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "4px",
              position: "relative",
            }}
          >
            <h1
              style={{
                color: "#ccd8e3ff",
                fontSize: "clamp(1.2rem, 3vw, 1.8rem)",
                margin: "0",
              }}
            >
              {t.gameTitle}
            </h1>
            <button
              onClick={toggleLanguage}
              style={{
                position: "absolute",
                right: "0",
                padding: "6px 12px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "15px",
                fontSize: "clamp(0.7rem, 2vw, 0.9rem)",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              {language === "english" ? "தமிழ்" : "English"}
            </button>
          </div>
          <p
            style={{
              color: "#f3f7fbff",
              fontSize: "clamp(0.8rem, 2vw, 1rem)",
              margin: "0",
            }}
          >
            {t.gameSubtitle}
          </p>
        </div>

        {/* Topic Selection */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "8px",
            padding: "8px",
            marginBottom: "4px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}
        >
          <h3
            style={{
              margin: "0 0 8px 0",
              color: "#2c3e50",
              fontSize: "clamp(0.9rem, 2.5vw, 1.1rem)",
            }}
          >
            {t.chooseTopic}
          </h3>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "6px",
              justifyContent: "center",
            }}
          >
            {Object.entries(topics).map(([key, topic]) => (
              <button
                key={key}
                onClick={() => setSelectedTopic(key)}
                style={{
                  padding: "6px 12px",
                  border:
                    selectedTopic === key
                      ? "2px solid #007bff"
                      : "1px solid #dee2e6",
                  borderRadius: "6px",
                  backgroundColor: selectedTopic === key ? "#007bff" : "white",
                  color: selectedTopic === key ? "white" : "#495057",
                  cursor: "pointer",
                  fontSize: "clamp(0.7rem, 2vw, 0.85rem)",
                  fontWeight: selectedTopic === key ? "bold" : "normal",
                  minWidth: "80px",
                }}
              >
                {topic.title}
              </button>
            ))}
          </div>
        </div>

        {/* Main Game Area - Flexible Layout */}
        <div
          style={{
            flex: 1,
            display: "grid",
            gridTemplateColumns: "1fr 250px",
            gap: "8px",
            overflow: "hidden",
            minHeight: 0, // Allow flex child to shrink
          }}
        >
          {/* Diagram Section */}
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              padding: "8px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "column",
              minHeight: 0, // Allow flex child to shrink
            }}
          >
            <h2
              style={{
                textAlign: "center",
                color: "#2c3e50",
                marginBottom: "8px",
                fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
              }}
            >
              {topics[selectedTopic].title}
            </h2>

            <div
              onClick={handlePartClick}
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "2px dashed #dee2e6",
                borderRadius: "6px",
                backgroundColor: "#75c67dff",
                userSelect: "none",
                minHeight: "200px",
                maxHeight: "60vh",
                position: "relative", // Add position relative for marker positioning
              }}
            >
              <div style={{ position: "relative", width: "100%", height: "100%" }}>
                {React.cloneElement(topics[selectedTopic].diagram, {
                  style: { width: "100%", height: "100%", ...topics[selectedTopic].diagram.props.style }
                })}
                
                {/* Pointer Markers with Labels */}
                {pointerMarkers.map((marker) => (
                  <div
                    key={marker.id}
                    className="part-label"
                    style={{
                      position: "absolute",
                      left: `${marker.x}%`,
                      top: `${marker.y}%`,
                      zIndex: 10,
                      pointerEvents: "none",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  >
                    {/* Pointer marker */}
                    <div
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        backgroundColor: "#FF6B6B",
                        border: "1px solid white",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                        marginBottom: "2px",
                        position: "relative",
                        top: "0px",
                        left: "0px",
                      }}
                    />
                    
                    {/* Label with part name */}
                    <div
                      style={{
                        backgroundColor: "rgba(0, 0, 0, 0.85)",
                        color: "white",
                        padding: "2px 6px",
                        borderRadius: "4px",
                        fontSize: "10px",
                        fontWeight: "bold",
                        whiteSpace: "nowrap",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                        maxWidth: "120px",
                        textAlign: "center",
                      }}
                    >
                      {marker.label || marker.partName}
                    </div>
                  </div>
                ))}

                {/* Invalid Click Feedback */}
                {invalidClickPosition && (
                  <div
                    style={{
                      position: "absolute",
                      left: `${invalidClickPosition.x}%`,
                      top: `${invalidClickPosition.y}%`,
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      backgroundColor: "#FF4444",
                      border: "2px solid white",
                      boxShadow: "0 4px 15px rgba(255,68,68,0.5)",
                      zIndex: 15,
                      pointerEvents: "none",
                      animation: "invalidClick 1s ease-out",
                    }}
                  />
                )}
              </div>
            </div>

            {/* Compact Instructions */}
            <div
              style={{
                marginTop: "8px",
                padding: "8px",
                backgroundColor: "#edddceff",
                borderRadius: "6px",
                border: "1px solid #2e0432ff",
              }}
            >
              <p
                style={{
                  margin: "0",
                  color: "#0066cc",
                  fontSize: "clamp(0.7rem, 2vw, 0.85rem)",
                  textAlign: "center",
                }}
              >
                {t.instructions}
              </p>
            </div>

            {/* Part Description */}
            {lastSelectedPart && (
              <div
                style={{
                  marginTop: "8px",
                  padding: "8px",
                  backgroundColor: "#e8f5e8",
                  borderRadius: "6px",
                  border: "2px solid #28a745",
                  maxHeight: "80px",
                  overflow: "auto",
                }}
              >
                <h4
                  style={{
                    margin: "0 0 4px 0",
                    color: "#155724",
                    fontSize: "clamp(0.8rem, 2vw, 1rem)",
                    fontWeight: "bold",
                  }}
                >
                  ✓ {(t && t.parts && t.parts[lastSelectedPart]) || lastSelectedPart}
                </h4>
                <p
                  style={{
                    margin: "0",
                    color: "#155724",
                    fontSize: "clamp(0.7rem, 1.8vw, 0.85rem)",
                    lineHeight: "1.2",
                  }}
                >
                  {(t && t.descriptions && t.descriptions[lastSelectedPart]) ||
                    "Description not available"}
                </p>
              </div>
            )}
          </div>

          {/* Right Panel - Controls */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              overflow: "hidden",
            }}
          >
            {/* Selected Parts */}
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "8px",
                padding: "12px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                flex: 1,
                overflow: "auto",
              }}
            >
              <h3
                style={{
                  margin: "0 0 8px 0",
                  color: "#2c3e50",
                  fontSize: "clamp(0.9rem, 2.5vw, 1.1rem)",
                }}
              >
                {t.selectedParts} ({selectedParts.size}/
                {topics[selectedTopic].parts.length})
              </h3>

              <div style={{ minHeight: "60px" }}>
                {selectedParts.size === 0 ? (
                  <p
                    style={{
                      color: "#6c757d",
                      fontStyle: "italic",
                      margin: "5px 0",
                      fontSize: "clamp(0.7rem, 2vw, 0.85rem)",
                    }}
                  >
                    {t.noPartsSelected}
                  </p>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "4px",
                    }}
                  >
                    {Array.from(selectedParts).map((part, index) => (
                      <span
                        key={index}
                        style={{
                          padding: "4px 8px",
                          backgroundColor: showAnswers
                            ? topics[selectedTopic].parts.includes(part)
                              ? "#d4edda"
                              : "#f8d7da"
                            : "#fde3efff",
                          color: showAnswers
                            ? topics[selectedTopic].parts.includes(part)
                              ? "#155724"
                              : "#721c24"
                            : "#1976d2",
                          border: showAnswers
                            ? topics[selectedTopic].parts.includes(part)
                              ? "1px solid #c3e6cb"
                              : "1px solid #f5c6cb"
                            : "1px solid #bbdefb",
                          borderRadius: "12px",
                          fontSize: "clamp(0.6rem, 1.8vw, 0.75rem)",
                          fontWeight: "500",
                        }}
                      >
                        {(t && t.parts && t.parts[part]) || part}
                        {showAnswers && (
                          <span style={{ marginLeft: "3px" }}>
                            {topics[selectedTopic].parts.includes(part)
                              ? "✓"
                              : "✗"}
                          </span>
                        )}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Controls */}
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "8px",
                padding: "12px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              }}
            >
              <h3
                style={{
                  margin: "0 0 8px 0",
                  color: "#2c3e50",
                  fontSize: "clamp(0.9rem, 2.5vw, 1.1rem)",
                }}
              >
                {t.gameControls}
              </h3>

              {showAnswers && (
                <div
                  style={{
                    padding: "8px",
                    backgroundColor:
                      score === topics[selectedTopic].parts.length
                        ? "#d4edda"
                        : "#fff3cd",
                    border:
                      score === topics[selectedTopic].parts.length
                        ? "1px solid #c3e6cb"
                        : "1px solid #ffeaa7",
                    borderRadius: "6px",
                    marginBottom: "8px",
                  }}
                >
                  <h4
                    style={{
                      margin: "0 0 4px 0",
                      color:
                        score === topics[selectedTopic].parts.length
                          ? "#155724"
                          : "#856404",
                      fontSize: "clamp(0.8rem, 2vw, 1rem)",
                    }}
                  >
                    {score === topics[selectedTopic].parts.length
                      ? t.perfectScore
                      : t.results}
                  </h4>
                  <p
                    style={{
                      margin: "0",
                      fontSize: "clamp(0.7rem, 2vw, 0.85rem)",
                      color:
                        score === topics[selectedTopic].parts.length
                          ? "#155724"
                          : "#856404",
                    }}
                  >
                    {t.resultsText} <strong>{score}</strong> {t.outOf}{" "}
                    <strong>{topics[selectedTopic].parts.length}</strong>{" "}
                    {t.partsCorrectly}
                  </p>
                </div>
              )}

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                }}
              >
                <button
                  onClick={checkAnswers}
                  disabled={selectedParts.size === 0}
                  style={{
                    padding: "8px 16px",
                    backgroundColor:
                      selectedParts.size === 0 ? "#e9ecef" : "#28a745",
                    color: selectedParts.size === 0 ? "#6c757d" : "white",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "clamp(0.8rem, 2vw, 0.9rem)",
                    fontWeight: "bold",
                    cursor:
                      selectedParts.size === 0 ? "not-allowed" : "pointer",
                  }}
                >
                  {showAnswers ? t.resultsShown : t.checkAnswers}
                </button>

                <button
                  onClick={resetGame}
                  style={{
                    padding: "6px 16px",
                    backgroundColor: "#6c757d",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "clamp(0.7rem, 2vw, 0.8rem)",
                    cursor: "pointer",
                  }}
                >
                  {t.resetGame}
                </button>
              </div>
            </div>

            {/* Answer Key - Compact */}
            {showAnswers && (
              <div
                style={{
                  backgroundColor: "white",
                  borderRadius: "8px",
                  padding: "8px",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                  maxHeight: "120px",
                  overflow: "auto",
                }}
              >
                <h3
                  style={{
                    margin: "0 0 6px 0",
                    color: "#2c3e50",
                    fontSize: "clamp(0.8rem, 2vw, 1rem)",
                  }}
                >
                  {t.answerKey}
                </h3>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    gap: "3px",
                  }}
                >
                  {topics[selectedTopic].parts.map((part, index) => (
                    <div
                      key={index}
                      style={{
                        padding: "4px 6px",
                        backgroundColor: selectedParts.has(part)
                          ? "#d4edda"
                          : "#f8f9fa",
                        border: selectedParts.has(part)
                          ? "1px solid #28a745"
                          : "1px solid #dee2e6",
                        borderRadius: "4px",
                        fontSize: "clamp(0.6rem, 1.8vw, 0.75rem)",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          fontWeight: "500",
                          color: selectedParts.has(part)
                            ? "#155724"
                            : "#495057",
                        }}
                      >
                        {index + 1}. {(t && t.parts && t.parts[part]) || part}
                      </span>
                      {selectedParts.has(part) && (
                        <span style={{ color: "#28a745", fontSize: "0.8em" }}>
                          ✓
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default PartsMarkingGame;