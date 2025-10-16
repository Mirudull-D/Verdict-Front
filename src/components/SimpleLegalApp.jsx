import { useState, useRef, useEffect } from "react";
import "./SimpleLegalApp.css";

const SimpleLegalApp = ({ language }) => {
  // Core state
  const [step, setStep] = useState(1); // 3-step process
  const [inputText, setInputText] = useState("");
  const [queryType, setQueryType] = useState(null); // "complaint" | "question"

  // Voice recording
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [hasPermission, setHasPermission] = useState(false);

  // Additional details (optional)
  const [location, setLocation] = useState("");
  const [evidenceItems, setEvidenceItems] = useState([]);

  // Results
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  // Audio playback for results
  const [autoPlayAudio, setAutoPlayAudio] = useState(true);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const resultAudioRef = useRef(null);

  // Translations
  const translations = {
    english: {
      appTitle: "Legal Helper",
      step1Title: "What do you need help with?",
      complaint: "Report a Crime",
      question: "Ask a Question",
      step2Title: "Tell us your problem",
      speakButton: "🎤 Speak",
      stopButton: "⏹️ Stop",
      typeHere: "Or type here...",
      step3Title: "Additional Details (Optional)",
      locationLabel: "Where did this happen?",
      evidenceLabel: "Do you have evidence?",
      nextButton: "Next",
      submitButton: "Get Legal Help",
      backButton: "Back",
      listening: "Listening...",
      processing: "Analyzing...",
      results: "Legal Guidance",
      playAudio: "🔊 Listen to Response",
    },
    hindi: {
      appTitle: "कानूनी सहायक",
      step1Title: "आपको किस चीज़ में मदद चाहिए?",
      complaint: "अपराध की रिपोर्ट करें",
      question: "प्रश्न पूछें",
      step2Title: "अपनी समस्या बताएं",
      speakButton: "🎤 बोलें",
      stopButton: "⏹️ रोकें",
      typeHere: "या यहाँ टाइप करें...",
      step3Title: "अतिरिक्त विवरण (वैकल्पिक)",
      locationLabel: "यह कहाँ हुआ?",
      evidenceLabel: "क्या आपके पास सबूत है?",
      nextButton: "आगे",
      submitButton: "कानूनी सहायता प्राप्त करें",
      backButton: "पीछे",
      listening: "सुन रहे हैं...",
      processing: "विश्लेषण कर रहे हैं...",
      results: "कानूनी मार्गदर्शन",
      playAudio: "🔊 जवाब सुनें",
    },
    tamil: {
      appTitle: "சட்ட உதவியாளர்",
      step1Title: "உங்களுக்கு என்ன உதவி தேவை?",
      complaint: "குற்றத்தை புகாரளி",
      question: "கேள்வி கேளுங்கள்",
      step2Title: "உங்கள் பிரச்சனையை சொல்லுங்கள்",
      speakButton: "🎤 பேசுங்கள்",
      stopButton: "⏹️ நிறுத்து",
      typeHere: "அல்லது இங்கே தட்டச்சு செய்யுங்கள்...",
      step3Title: "கூடுதல் விவரங்கள் (விரும்பினால்)",
      locationLabel: "இது எங்கே நடந்தது?",
      evidenceLabel: "உங்களிடம் சான்றுகள் உள்ளதா?",
      nextButton: "அடுத்து",
      submitButton: "சட்ட உதவி பெறுங்கள்",
      backButton: "பின்",
      listening: "கேட்டுக்கொண்டிருக்கிறது...",
      processing: "பகுப்பாய்வு செய்கிறது...",
      results: "சட்ட வழிகாட்டுதல்",
      playAudio: "🔊 பதிலைக் கேளுங்கள்",
    },
  };

  const t = translations[language];

  const evidenceOptions = {
    english: ["CCTV", "Eyewitness", "Medical Report", "Photos/Videos"],
    hindi: ["CCTV", "प्रत्यक्षदर्शी", "चिकित्सा रिपोर्ट", "फोटो/वीडियो"],
    tamil: ["CCTV", "நேரில் பார்த்தவர்", "மருத்துவ அறிக்கை", "புகைப்படங்கள்"],
  };

  // Auto-request microphone permission on mount
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => setHasPermission(true))
      .catch(() => setHasPermission(false));
  }, []);

  // Voice Recording Functions
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/webm",
      });

      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        setAudioBlob(blob);
        await transcribeAudio(blob);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      alert("Microphone access needed for voice input");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const transcribeAudio = async (blob) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("audio", blob, "recording.webm");
      formData.append("language", language);

      const response = await fetch("http://localhost:5000/api/transcribe", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setInputText(data.transcription);
      }
    } catch (err) {
      setError("Failed to process voice input");
    } finally {
      setLoading(false);
    }
  };

  // Submit legal query
  const submitQuery = async () => {
    if (!inputText.trim()) {
      alert("Please provide some information");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/api/legal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          narrative: inputText,
          location_state: location,
          evidence_available: evidenceItems,
          aggravating_factors: [],
          language: language,
          is_complaint: queryType === "complaint",
          enableTTS: autoPlayAudio,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setResults(data);
        setStep(4); // Results step

        // Auto-play audio if enabled
        if (autoPlayAudio && data.audio && resultAudioRef.current) {
          setTimeout(() => {
            resultAudioRef.current.play();
          }, 500);
        }
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const resetApp = () => {
    setStep(1);
    setInputText("");
    setQueryType(null);
    setLocation("");
    setEvidenceItems([]);
    setResults(null);
    setError(null);
  };

  const toggleEvidence = (item) => {
    setEvidenceItems((prev) =>
      prev.includes(item) ? prev.filter((e) => e !== item) : [...prev, item]
    );
  };

  return (
    <div className="simple-legal-container">
      {/* Progress Indicator */}
      {step < 4 && (
        <div className="progress-bar">
          <div className={`progress-step ${step >= 1 ? "active" : ""}`}>1</div>
          <div className="progress-line"></div>
          <div className={`progress-step ${step >= 2 ? "active" : ""}`}>2</div>
          <div className="progress-line"></div>
          <div className={`progress-step ${step >= 3 ? "active" : ""}`}>3</div>
        </div>
      )}

      {/* Step 1: Choose Query Type */}
      {step === 1 && (
        <div className="step-container fade-in">
          <h1 className="main-title">{t.step1Title}</h1>
          <div className="large-button-group">
            <button
              className="large-button primary"
              onClick={() => {
                setQueryType("complaint");
                setStep(2);
              }}
            >
              <span className="button-icon">⚖️</span>
              <span className="button-text">{t.complaint}</span>
            </button>
            <button
              className="large-button secondary"
              onClick={() => {
                setQueryType("question");
                setStep(2);
              }}
            >
              <span className="button-icon">❓</span>
              <span className="button-text">{t.question}</span>
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Input (Voice or Text) */}
      {step === 2 && (
        <div className="step-container fade-in">
          <h1 className="main-title">{t.step2Title}</h1>

          {/* Voice Input - Prominent */}
          <div className="voice-input-section">
            {!isRecording ? (
              <button
                className="voice-button large"
                onClick={startRecording}
                disabled={loading}
              >
                <span className="voice-icon">🎤</span>
                <span className="voice-text">{t.speakButton}</span>
              </button>
            ) : (
              <button
                className="voice-button recording large"
                onClick={stopRecording}
              >
                <span className="recording-pulse"></span>
                <span className="voice-text">{t.listening}</span>
              </button>
            )}
          </div>

          {/* OR Divider */}
          <div className="divider-or">
            <span>OR</span>
          </div>

          {/* Text Input */}
          <div className="text-input-section">
            <textarea
              className="large-textarea"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={t.typeHere}
              rows={6}
            />
          </div>

          {/* Navigation */}
          <div className="button-row">
            <button className="nav-button back" onClick={() => setStep(1)}>
              ← {t.backButton}
            </button>
            <button
              className="nav-button next"
              onClick={() => setStep(3)}
              disabled={!inputText.trim()}
            >
              {t.nextButton} →
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Additional Details (Optional) */}
      {step === 3 && (
        <div className="step-container fade-in">
          <h1 className="main-title">{t.step3Title}</h1>

          <div className="detail-section">
            <label className="large-label">{t.locationLabel}</label>
            <input
              type="text"
              className="large-input"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Delhi, Mumbai..."
            />
          </div>

          {queryType === "complaint" && (
            <div className="detail-section">
              <label className="large-label">{t.evidenceLabel}</label>
              <div className="evidence-grid">
                {evidenceOptions[language].map((item, idx) => (
                  <button
                    key={idx}
                    className={`evidence-chip ${
                      evidenceItems.includes(item) ? "selected" : ""
                    }`}
                    onClick={() => toggleEvidence(item)}
                  >
                    {evidenceItems.includes(item) && "✓ "}
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Audio Response Toggle */}
          <div className="audio-toggle">
            <label className="toggle-label">
              <input
                type="checkbox"
                checked={autoPlayAudio}
                onChange={(e) => setAutoPlayAudio(e.target.checked)}
              />
              <span>🔊 {t.playAudio}</span>
            </label>
          </div>

          {/* Navigation */}
          <div className="button-row">
            <button className="nav-button back" onClick={() => setStep(2)}>
              ← {t.backButton}
            </button>
            <button
              className="submit-button-large"
              onClick={submitQuery}
              disabled={loading}
            >
              {loading ? t.processing : t.submitButton}
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Results */}
      {step === 4 && results && (
        <div className="results-container fade-in">
          <h1 className="results-title">✅ {t.results}</h1>

          {/* Audio Player - Top Priority */}
          {results.audio && (
            <div className="audio-player-box">
              <audio
                ref={resultAudioRef}
                src={`http://localhost:5000${results.audio.url}`}
                controls
                className="large-audio-player"
              />
            </div>
          )}

          {/* Complaint Results */}
          {queryType === "complaint" && results.legal_analysis && (
            <div className="results-content">
              {/* Summary */}
              {results.legal_analysis.summary && (
                <div className="result-card">
                  <h2 className="card-title">📋 Summary</h2>
                  <p className="summary-text">
                    {results.legal_analysis.summary}
                  </p>
                </div>
              )}

              {/* Law Sections */}
              <div className="result-card">
                <h2 className="card-title">
                  ⚖️ Applicable Laws (
                  {results.legal_analysis.applicable_provisions?.length || 0})
                </h2>
                {results.legal_analysis.applicable_provisions?.map(
                  (provision, idx) => (
                    <div key={idx} className="law-item">
                      <div className="law-header">
                        <strong>
                          {provision.statute} - Section {provision.section}
                        </strong>
                      </div>
                      <p className="law-description">{provision.description}</p>
                      <p className="law-punishment">
                        <strong>Punishment:</strong>{" "}
                        {provision.punishment_range}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* Question Results */}
          {queryType === "question" && results.legal_analysis && (
            <div className="results-content">
              <div className="result-card">
                <h2 className="card-title">💬 Answer</h2>
                <p className="answer-text">{results.legal_analysis.answer}</p>
              </div>
            </div>
          )}

          {/* New Query Button */}
          <button className="reset-button" onClick={resetApp}>
            🔄 New Query
          </button>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="error-banner">
          <span>❌ {error}</span>
          <button onClick={() => setError(null)}>✕</button>
        </div>
      )}
    </div>
  );
};

export default SimpleLegalApp;
