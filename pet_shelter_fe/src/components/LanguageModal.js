import React from 'react';

const LanguageModal = ({ isOpen, onClose, changeLanguage, currentLanguage }) => {
  const languages = [
    { code: 'ar', name: 'العربية' },
    { code: 'be', name: 'Беларуская' },
    { code: 'bg', name: 'Български' },
    { code: 'cs', name: 'Čeština' },
    { code: 'de', name: 'Deutsch' },
    { code: 'el', name: 'Ελληνικά' },
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'et', name: 'Eesti' },
    { code: 'fi', name: 'Suomi' },
    { code: 'fr', name: 'Français' },
    { code: 'ga', name: 'Gaeilge' },
    { code: 'he', name: 'עברית' },
    { code: 'hi', name: 'हिन्दी' },
    { code: 'hr', name: 'Hrvatski' },
    { code: 'hu', name: 'Magyar' },
    { code: 'it', name: 'Italiano' },
    { code: 'ja', name: '日本語' },
    { code: 'ka', name: 'ქართული' },
    { code: 'lt', name: 'Lietuvių' },
    { code: 'lv', name: 'Latviešu' },
    { code: 'mk', name: 'Македонски' },
    { code: 'no', name: 'Norsk' },
    { code: 'pl', name: 'Polski' },
    { code: 'pt', name: 'Português' },
    { code: 'ro', name: 'Română' },
    { code: 'ru', name: 'Русский' },
    { code: 'sk', name: 'Slovenčina' },
    { code: 'sl', name: 'Slovenščina' },
    { code: 'sr', name: 'Српски' },
    { code: 'sv', name: 'Svenska' },
    { code: 'th', name: 'ไทย' },
    { code: 'tr', name: 'Türkçe' },
    { code: 'uk', name: 'Українська' },
    { code: 'vi', name: 'Tiếng Việt' },
    { code: 'zh', name: '中文' },
  ];

  if (!isOpen) {
    return null;
  }

  return (
    <div className={`modal-backdrop ${!isOpen ? 'hidden' : ''}`} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-end">
          <button onClick={onClose}>
            <img src={process.env.PUBLIC_URL + "/cross.svg"} alt="Close" className="h-7" />
          </button>
        </div>

        <div className="language-grid grid gap-4 p-4">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`p-2 rounded ${currentLanguage === lang.code ? 'bg-blue-500 text-white' : 'bg-gray-200'} hover:bg-blue-300`}
              onClick={() => {
                changeLanguage(lang.code);
                onClose();
              }}
            >
              {lang.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageModal;
