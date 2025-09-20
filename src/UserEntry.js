import React, { useState } from 'react';
import { useUser } from './UserContext';
import './UserEntry.css';

const UserEntry = () => {
  const [name, setName] = useState('');
  const [school, setSchool] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [language, setLanguage] = useState('english'); // 'english' or 'tamil'
  const { login } = useUser();

  // Translation object
  const translations = {
    english: {
      title: "Welcome to Mix and Match Contest for Budding Innovators!",
      subtitle: "Enter your details to start playing educational games",
      nameLabel: "Your Name",
      namePlaceholder: "Enter your full name",
      schoolLabel: "School Name", 
      schoolPlaceholder: "Enter your school name",
      nameRequired: "Name is required",
      nameLength: "Name must be at least 2 characters",
      schoolRequired: "School name is required",
      schoolLength: "School name must be at least 2 characters",
      submitError: "Something went wrong. Please try again.",
      loading: "Getting Ready...",
      submitBtn: "Start Learning!",
      footerText: "🎯 Track your progress • 🏆 Compete with friends • 📚 Learn while playing",
      languageToggle: "தமிழ்"
    },
    tamil: {
      title: "வளர்ந்து வரும் கண்டுபிடிப்பாளர்களுக்கான கலவை மற்றும் பொருத்தப் போட்டிக்கு வரவேற்கிறோம்!",
      subtitle: "கல்வி விளையாட்டுகளைத் தொடங்க உங்கள் விவரங்களை உள்ளிடுங்கள்",
      nameLabel: "உங்கள் பெயர்",
      namePlaceholder: "உங்கள் முழு பெயரை உள்ளிடுங்கள்",
      schoolLabel: "பள்ளியின் பெயர்",
      schoolPlaceholder: "உங்கள் பள்ளியின் பெயரை உள்ளிடுங்கள்",
      nameRequired: "பெயர் தேவை",
      nameLength: "பெயர் குறைந்தது 2 எழுத்துகள் இருக்க வேண்டும்",
      schoolRequired: "பள்ளியின் பெயர் தேவை", 
      schoolLength: "பள்ளியின் பெயர் குறைந்தது 2 எழுத்துகள் இருக்க வேண்டும்",
      submitError: "ஏதோ தவறு நடந்துள்ளது. தயவுசெய்து மீண்டும் முயற்சிக்கவும்.",
      loading: "தயாராகிக்கொண்டிருக்கிறது...",
      submitBtn: "கற்க ஆரம்பிக்கவும்!",
      footerText: "🎯 உங்கள் முன்னேற்றத்தைக் கண்காணிக்கவும் • 🏆 நண்பர்களுடன் போட்டியிடவும் • 📚 விளையாடும்போது கற்றுக்கொள்ளுங்கள்",
      languageToggle: "English"
    }
  };

  const t = translations[language];

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = t.nameRequired;
    } else if (name.trim().length < 2) {
      newErrors.name = t.nameLength;
    }

    if (!school.trim()) {
      newErrors.school = t.schoolRequired;
    } else if (school.trim().length < 2) {
      newErrors.school = t.schoolLength;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate a brief loading state
      await new Promise(resolve => setTimeout(resolve, 500));
      login(name, school);
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ submit: t.submitError });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (errors.name) {
      setErrors(prev => ({ ...prev, name: '' }));
    }
  };

  const handleSchoolChange = (e) => {
    setSchool(e.target.value);
    if (errors.school) {
      setErrors(prev => ({ ...prev, school: '' }));
    }
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'english' ? 'tamil' : 'english');
    // Clear errors when switching languages
    setErrors({});
  };

  return (
    <div className="user-entry-container">
      <div className="user-entry-backdrop">
        <div className="user-entry-card">
          {/* Language Toggle Button */}
        <button 
  className="language-toggle"
  onClick={toggleLanguage}
  type="button"
>
  <span className="toggle-icon">🌐</span>
  {t.languageToggle}
</button>


          <div className="user-entry-header">
            <h1 className="entry-title">{t.title}</h1>
            <p className="entry-subtitle">{t.subtitle}</p>
          </div>

          <form onSubmit={handleSubmit} className="user-entry-form">
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                <span className="label-icon">👤</span>
                {t.nameLabel}
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={handleNameChange}
                className={`form-input ${errors.name ? 'error' : ''}`}
                placeholder={t.namePlaceholder}
                maxLength={50}
                disabled={isSubmitting}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="school" className="form-label">
                <span className="label-icon">🏫</span>
                {t.schoolLabel}
              </label>
              <input
                type="text"
                id="school"
                value={school}
                onChange={handleSchoolChange}
                className={`form-input ${errors.school ? 'error' : ''}`}
                placeholder={t.schoolPlaceholder}
                maxLength={100}
                disabled={isSubmitting}
              />
              {errors.school && <span className="error-message">{errors.school}</span>}
            </div>

            {errors.submit && (
              <div className="error-message submit-error">{errors.submit}</div>
            )}

            <button
              type="submit"
              className={`submit-btn ${isSubmitting ? 'loading' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="loading-spinner"></span>
                  {t.loading}
                </>
              ) : (
                <>
                  <span className="btn-icon">🚀</span>
                  {t.submitBtn}
                </>
              )}
            </button>
          </form>

          <div className="entry-footer">
            <p className="footer-text" style={{ color: '#8A2BE2' }}>
              {t.footerText}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserEntry;