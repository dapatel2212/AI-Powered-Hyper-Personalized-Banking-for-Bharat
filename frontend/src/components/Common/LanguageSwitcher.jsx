import React from 'react';
import { useTranslation } from 'react-i18next';
import { LANGUAGES } from '../../constants';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    i18n.changeLanguage(lang);
    localStorage.setItem('preferred_language', lang);
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm">🌐</span>
      <select
        value={i18n.language}
        onChange={handleLanguageChange}
        className="bg-white border border-gray-300 text-gray-800 text-sm rounded-lg px-2.5 py-1.5 focus:ring-green-500 focus:border-green-500 outline-none cursor-pointer font-medium"
      >
        {LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name} ({lang.english})
          </option>
        ))}
      </select>
    </div>
  );
}
