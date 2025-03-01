import React from 'react';
import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';

export const LanguageToggle: React.FC = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'hi' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="fixed top-4 right-4 bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full flex items-center gap-2 transition-all z-50"
      title={i18n.language === 'en' ? 'Switch to Hindi' : 'अंग्रेजी में स्विच करें'}
    >
      <Languages size={24} />
      <span className="text-sm font-medium">
        {i18n.language === 'en' ? 'हिंदी' : 'ENG'}
      </span>
    </button>
  );
};