import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GlobeAltIcon } from '@heroicons/react/24/outline';

const languages = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'hi', label: 'हिंदी', flag: '🇮🇳' },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = languages.find(lang => lang.code === i18n.language) || languages[0];

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 border border-gray-200"
      >
        <GlobeAltIcon className="w-5 h-5 text-gray-600" />
        <span className="text-sm font-medium">{currentLang.flag} {currentLang.label}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 hover:bg-primary/10 ${i18n.language === lang.code ? 'bg-primary/5 text-primary font-medium' : 'text-gray-700'}`}
            >
              <span>{lang.flag}</span> {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
