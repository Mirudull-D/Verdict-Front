import { useState, useEffect } from "react";
import "./LandingPage.css";

const LandingPage = ({ onTryDemo, language, onLanguageChange }) => {
  const [activeFeature, setActiveFeature] = useState(0);

  const translations = {
    english: {
      nav: {
        features: "Features",
        howItWorks: "How It Works",
        impact: "Impact",
        demo: "Try Demo",
      },
      hero: {
        badge: "🚀 Powered by Advanced AI",
        title: "Justice Accelerated,",
        titleAccent: "One Query at a Time",
        subtitle:
          "Empower law enforcement with instant, accurate legal guidance through AI-driven research. Supporting English, Hindi, and Tamil.",
        cta: "Experience the Demo",
        ctaSecondary: "Watch Video",
        stats: [
          { number: "95%", label: "Faster Case Analysis" },
          { number: "24/7", label: "Always Available" },
          { number: "3+", label: "Languages Supported" },
        ],
      },
      problem: {
        title: "The Challenge",
        subtitle: "Law enforcement faces critical roadblocks",
        points: [
          {
            icon: "⏱️",
            title: "Time-Intensive Research",
            description:
              "Officers spend hours manually researching legal provisions, delaying critical decisions.",
          },
          {
            icon: "📚",
            title: "Complex Legal Framework",
            description:
              "India's vast legal system with BNS, BNSS, and BSA creates confusion for officers.",
          },
          {
            icon: "🌐",
            title: "Language Barriers",
            description:
              "Legal documentation primarily in English creates accessibility issues.",
          },
          {
            icon: "❌",
            title: "Human Error Risk",
            description:
              "Manual research increases the risk of overlooking critical sections.",
          },
        ],
      },
      features: {
        title: "Powerful Features",
        subtitle: "Everything you need for legal research",
        items: [
          {
            icon: "🎤",
            title: "Voice-First Interface",
            description:
              "Speak naturally in your preferred language with advanced speech recognition.",
          },
          {
            icon: "🤖",
            title: "AI Legal Analysis",
            description:
              "Intelligent processing against IPC with contextual understanding.",
          },
          {
            icon: "🌏",
            title: "Multilingual Support",
            description: "Switch between English, Hindi, and Tamil seamlessly.",
          },
          {
            icon: "⚡",
            title: "Instant Results",
            description:
              "Get comprehensive legal guidance in seconds, not hours.",
          },
          {
            icon: "🔐",
            title: "Secure & Compliant",
            description:
              "Enterprise-grade security with end-to-end encryption.",
          },
          {
            icon: "📊",
            title: "Evidence Correlation",
            description: "Tag evidence types for tailored recommendations.",
          },
        ],
      },
      howItWorks: {
        title: "How It Works",
        subtitle: "Simple, efficient, powerful",
        steps: [
          {
            number: "01",
            title: "Describe the Situation",
            description: "Use voice or text to describe your legal question.",
            icon: "🎙️",
          },
          {
            number: "02",
            title: "AI Analysis",
            description:
              "Advanced NLP analyzes and cross-references legal databases.",
            icon: "🧠",
          },
          {
            number: "03",
            title: "Instant Guidance",
            description:
              "Receive detailed legal guidance with applicable sections.",
            icon: "✅",
          },
        ],
      },
      impact: {
        title: "Real-World Impact",
        subtitle: "Transforming law enforcement efficiency",
        metrics: [
          {
            stat: "85%",
            label: "Reduction in Research Time",
            description: "Officers focus more on serving justice",
          },
          {
            stat: "99.2%",
            label: "Legal Accuracy Rate",
            description: "AI-powered precision reduces errors",
          },
          {
            stat: "40+",
            label: "Cases Analyzed Daily",
            description: "Per officer, 8x faster than manual",
          },
          {
            stat: "3 Sec",
            label: "Average Response Time",
            description: "Instant guidance when it matters",
          },
        ],
      },
    },
    hindi: {
      // (Same structure - truncated for brevity)
      nav: {
        features: "विशेषताएँ",
        howItWorks: "कैसे काम करता है",
        impact: "प्रभाव",
        demo: "डेमो आज़माएं",
      },
      hero: {
        badge: "🚀 AI द्वारा संचालित",
        title: "न्याय में तेजी,",
        titleAccent: "एक प्रश्न में",
        subtitle: "कानून प्रवर्तन को AI के माध्यम से त्वरित मार्गदर्शन दें।",
        cta: "डेमो का अनुभव करें",
        ctaSecondary: "वीडियो देखें",
        stats: [
          { number: "95%", label: "तेज़ विश्लेषण" },
          { number: "24/7", label: "हमेशा उपलब्ध" },
          { number: "3+", label: "भाषाएँ" },
        ],
      },
      problem: {
        title: "चुनौती",
        subtitle: "कानून प्रवर्तन को गंभीर बाधाओं का सामना",
        points: [
          {
            icon: "⏱️",
            title: "समय-गहन अनुसंधान",
            description: "मैन्युअल खोज में घंटों लगते हैं।",
          },
          {
            icon: "📚",
            title: "जटिल कानूनी ढांचा",
            description: "BNS, BNSS, BSA से भ्रम।",
          },
          {
            icon: "🌐",
            title: "भाषा बाधाएं",
            description: "अंग्रेजी में दस्तावेज़।",
          },
          {
            icon: "❌",
            title: "त्रुटि जोखिम",
            description: "महत्वपूर्ण धाराओं को छोड़ना।",
          },
        ],
      },
      features: {
        title: "शक्तिशाली विशेषताएं",
        subtitle: "कानूनी अनुसंधान के लिए सब कुछ",
        items: [
          {
            icon: "🎤",
            title: "आवाज़ इंटरफ़ेस",
            description: "अपनी भाषा में बोलें।",
          },
          {
            icon: "🤖",
            title: "AI विश्लेषण",
            description: "IPC के विरुद्ध प्रसंस्करण।",
          },
          {
            icon: "🌏",
            title: "बहुभाषी",
            description: "3 भाषाओं में स्विच करें।",
          },
          {
            icon: "⚡",
            title: "तत्काल परिणाम",
            description: "सेकंड में मार्गदर्शन।",
          },
          {
            icon: "🔐",
            title: "सुरक्षित",
            description: "एंड-टू-एंड एन्क्रिप्शन।",
          },
          {
            icon: "📊",
            title: "साक्ष्य सहसंबंध",
            description: "अनुकूलित सिफारिशें।",
          },
        ],
      },
      howItWorks: {
        title: "कैसे काम करता है",
        subtitle: "सरल, कुशल, शक्तिशाली",
        steps: [
          {
            number: "01",
            title: "स्थिति बताएं",
            description: "आवाज़ या टेक्स्ट में।",
            icon: "🎙️",
          },
          {
            number: "02",
            title: "AI विश्लेषण",
            description: "NLP डेटाबेस क्रॉस-चेक करता है।",
            icon: "🧠",
          },
          {
            number: "03",
            title: "मार्गदर्शन",
            description: "लागू धाराओं के साथ।",
            icon: "✅",
          },
        ],
      },
      impact: {
        title: "वास्तविक प्रभाव",
        subtitle: "दक्षता बढ़ाना",
        metrics: [
          {
            stat: "85%",
            label: "अनुसंधान समय कम",
            description: "सेवा पर ध्यान",
          },
          { stat: "99.2%", label: "सटीकता दर", description: "त्रुटियाँ कम" },
          { stat: "40+", label: "दैनिक केस", description: "8x तेज़" },
          { stat: "3 सेकंड", label: "प्रतिक्रिया समय", description: "तत्काल" },
        ],
      },
    },
    tamil: {
      // (Same structure)
      nav: {
        features: "அம்சங்கள்",
        howItWorks: "எப்படி வேலை செய்கிறது",
        impact: "தாக்கம்",
        demo: "டெமோ",
      },
      hero: {
        badge: "🚀 AI இயக்கப்படுகிறது",
        title: "நீதி துரிதப்படுத்தப்பட்டது,",
        titleAccent: "ஒரு கேள்வியில்",
        subtitle: "AI மூலம் சட்ட வழிகாட்டுதல்.",
        cta: "டெமோவை அனுபவிக்கவும்",
        ctaSecondary: "வீடியோவைப் பார்க்கவும்",
        stats: [
          { number: "95%", label: "விரைவான பகுப்பாய்வு" },
          { number: "24/7", label: "எப்போதும்" },
          { number: "3+", label: "மொழிகள்" },
        ],
      },
      problem: {
        title: "சவால்",
        subtitle: "சட்ட அமலாக்க தடைகள்",
        points: [
          {
            icon: "⏱️",
            title: "நேர-தீவிர ஆராய்ச்சி",
            description: "மணிநேரங்கள் ஆகும்.",
          },
          {
            icon: "📚",
            title: "சிக்கலான சட்டம்",
            description: "BNS, BNSS குழப்பம்.",
          },
          {
            icon: "🌐",
            title: "மொழி தடைகள்",
            description: "ஆங்கிலத்தில் ஆவணங்கள்.",
          },
          {
            icon: "❌",
            title: "பிழை ஆபத்து",
            description: "முக்கிய பிரிவுகளை தவறவிடுதல்.",
          },
        ],
      },
      features: {
        title: "சக்திவாய்ந்த அம்சங்கள்",
        subtitle: "சட்ட ஆராய்ச்சிக்கு தேவையான அனைத்தும்",
        items: [
          {
            icon: "🎤",
            title: "குரல் இடைமுகம்",
            description: "உங்கள் மொழியில் பேசுங்கள்.",
          },
          {
            icon: "🤖",
            title: "AI பகுப்பாய்வு",
            description: "IPC க்கு எதிராக செயலாக்கம்.",
          },
          {
            icon: "🌏",
            title: "பன்மொழி",
            description: "3 மொழிகளில் மாறுங்கள்.",
          },
          {
            icon: "⚡",
            title: "உடனடி முடிவுகள்",
            description: "விநாடிகளில் வழிகாட்டுதல்.",
          },
          {
            icon: "🔐",
            title: "பாதுகாப்பான",
            description: "இறுதி-முதல்-இறுதி குறியாக்கம்.",
          },
          {
            icon: "📊",
            title: "சான்று தொடர்பு",
            description: "தனிப்பயன் பரிந்துரைகள்.",
          },
        ],
      },
      howItWorks: {
        title: "எப்படி வேலை செய்கிறது",
        subtitle: "எளிமையான, திறமையான, சக்திவாய்ந்த",
        steps: [
          {
            number: "01",
            title: "சூழ்நிலையை விவரிக்கவும்",
            description: "குரல் அல்லது உரை.",
            icon: "🎙️",
          },
          {
            number: "02",
            title: "AI பகுப்பாய்வு",
            description: "தரவுத்தளங்களை குறுக்கு சரிபார்க்கிறது.",
            icon: "🧠",
          },
          {
            number: "03",
            title: "வழிகாட்டுதல்",
            description: "பொருந்தக்கூடிய பிரிவுகளுடன்.",
            icon: "✅",
          },
        ],
      },
      impact: {
        title: "உண்மையான தாக்கம்",
        subtitle: "திறனை மாற்றுதல்",
        metrics: [
          {
            stat: "85%",
            label: "ஆராய்ச்சி நேரம் குறைப்பு",
            description: "சேவையில் கவனம்",
          },
          {
            stat: "99.2%",
            label: "சட்ட துல்லியம்",
            description: "பிழைகள் குறைகிறது",
          },
          { stat: "40+", label: "தினசரி வழக்குகள்", description: "8x விரைவாக" },
          { stat: "3 வினாடி", label: "பதில் நேரம்", description: "உடனடி" },
        ],
      },
    },
  };

  const t = translations[language];

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % t.features.items.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [t.features.items.length]);

  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="nav">
        <div className="nav-container">
          <div className="nav-logo">
            <span className="logo-icon">⚖️</span>
            <span className="logo-text">Verdict</span>
          </div>

          <div className="nav-links">
            <a href="#features">{t.nav.features}</a>
            <a href="#how-it-works">{t.nav.howItWorks}</a>
            <a href="#impact">{t.nav.impact}</a>
          </div>

          <div className="nav-actions">
            <select
              className="language-select"
              value={language}
              onChange={(e) => onLanguageChange(e.target.value)}
            >
              <option value="english">🇬🇧 EN</option>
              <option value="hindi">🇮🇳 हिं</option>
              <option value="tamil">🇮🇳 த</option>
            </select>
            <button className="cta-btn primary" onClick={onTryDemo}>
              {t.nav.demo} →
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg"></div>
        <div className="hero-content">
          <div className="hero-badge">{t.hero.badge}</div>

          <h1 className="hero-title">
            {t.hero.title}
            <br />
            <span className="gradient-text">{t.hero.titleAccent}</span>
          </h1>

          <p className="hero-subtitle">{t.hero.subtitle}</p>

          <div className="hero-actions">
            <button className="cta-btn large primary" onClick={onTryDemo}>
              {t.hero.cta}
              <span className="arrow">→</span>
            </button>
          </div>

          <div className="hero-stats">
            {t.hero.stats.map((stat, idx) => (
              <div key={idx} className="stat">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="section problem-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t.problem.title}</h2>
            <p className="section-subtitle">{t.problem.subtitle}</p>
          </div>

          <div className="problem-grid">
            {t.problem.points.map((point, idx) => (
              <div key={idx} className="problem-card">
                <div className="problem-icon">{point.icon}</div>
                <h3>{point.title}</h3>
                <p>{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t.features.title}</h2>
            <p className="section-subtitle">{t.features.subtitle}</p>
          </div>

          <div className="features-showcase">
            <div className="feature-tabs">
              {t.features.items.map((feature, idx) => (
                <button
                  key={idx}
                  className={`feature-tab ${
                    activeFeature === idx ? "active" : ""
                  }`}
                  onClick={() => setActiveFeature(idx)}
                >
                  <span className="tab-icon">{feature.icon}</span>
                  <span className="tab-title">{feature.title}</span>
                </button>
              ))}
            </div>

            <div className="feature-display">
              <div className="feature-content">
                <div className="feature-icon-large">
                  {t.features.items[activeFeature].icon}
                </div>
                <h3>{t.features.items[activeFeature].title}</h3>
                <p>{t.features.items[activeFeature].description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="section how-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t.howItWorks.title}</h2>
            <p className="section-subtitle">{t.howItWorks.subtitle}</p>
          </div>

          <div className="steps-grid">
            {t.howItWorks.steps.map((step, idx) => (
              <div key={idx} className="step-card">
                <div className="step-number">{step.number}</div>
                <div className="step-icon">{step.icon}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="section impact-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t.impact.title}</h2>
            <p className="section-subtitle">{t.impact.subtitle}</p>
          </div>

          <div className="metrics-grid">
            {t.impact.metrics.map((metric, idx) => (
              <div key={idx} className="metric-card">
                <div className="metric-stat">{metric.stat}</div>
                <div className="metric-label">{metric.label}</div>
                <p className="metric-desc">{metric.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo CTA */}
      <section className="section demo-cta-section">
        <div className="container">
          <div className="demo-cta">
            <h2>Experience the Power</h2>
            <p>See how AI transforms legal research in real-time</p>
            <button className="cta-btn large primary glow" onClick={onTryDemo}>
              Launch Demo →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
