import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useCustomerStore } from '../../store/customerStore';
import { useAuthStore } from '../../store/authStore';

const SUPPORTED_LANGUAGES = [
  { code: 'hi', name: 'हिंदी (Hindi)', flag: '🇮🇳' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ta', name: 'தமிழ் (Tamil)', flag: '🇮🇳' },
  { code: 'mr', name: 'मराठी (Marathi)', flag: '🇮🇳' },
  { code: 'bn', name: 'বাংলা (Bengali)', flag: '🇮🇳' },
  { code: 'te', name: 'తెలుగు (Telugu)', flag: '🇮🇳' },
  { code: 'gu', name: 'ગુજરાતી (Gujarati)', flag: '🇮🇳' }
];

export default function LanguageSwitcher({ className = '' }) {
  const { i18n } = useTranslation();
  const { customer } = useAuthStore();
  const { updateProfile } = useCustomerStore();

  const [currentLang, setCurrentLang] = useState(
    (i18n.language || localStorage.getItem('preferred_language') || 'en').split('-')[0]
  );

  useEffect(() => {
    const active = (i18n.language || 'en').split('-')[0];
    setCurrentLang(active);
  }, [i18n.language]);

  const handleLanguageChange = async (e) => {
    const lang = e.target.value;
    setCurrentLang(lang);
    await i18n.changeLanguage(lang);
    localStorage.setItem('preferred_language', lang);

    if (customer?.customer_id) {
      try {
        await updateProfile(customer.customer_id, { language: lang });
      } catch {
        // ignore background profile sync error
      }
    }
  };

  return (
    <div className={`flex items-center space-x-1.5 ${className}`}>
      <span className="text-sm">🌐</span>
      <select
        value={currentLang}
        onChange={handleLanguageChange}
        className="bg-white border border-gray-300 text-gray-800 text-xs font-semibold rounded-lg px-2 py-1.5 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none cursor-pointer shadow-sm hover:border-gray-400 transition"
      >
        {SUPPORTED_LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
}
