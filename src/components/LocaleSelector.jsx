import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import classNames from 'classnames'

const LOCALES = [
  {
    code: "en-US",
    name: "ENGLISH",
    currency: "USD",
  },
  { 
    code: "es-ES",
    name: "SPANISH",
    currency: "PESOS",
  }
];
  
  const BankIcon = ({ width = 24, height = 24 }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="currentColor"
      className="bi bi-globe"
      viewBox="0 0 16 16"
    >
    <path d="M8 .95 14.61 4h.89a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H15v7a.5.5 0 0 1 .485.379l.5 2A.5.5 0 0 1 15.5 17H.5a.5.5 0 0 1-.485-.621l.5-2A.5.5 0 0 1 1 14V7H.5a.5.5 0 0 1-.5-.5v-2A.5.5 0 0 1 .5 4h.89L8 .95zM3.776 4h8.447L8 2.05 3.776 4zM2 7v7h1V7H2zm2 0v7h2.5V7H4zm3.5 0v7h1V7h-1zm2 0v7H12V7H9.5zM13 7v7h1V7h-1zm2-1V5H1v1h14zm-.39 9H1.39l-.25 1h13.72l-.25-1z"/>    </svg>
  )

const LocaleSelector = () => {
    const [dropdown, setDropdown] = useState(false);
    const toggleOpen = () => setDropdown(!dropdown);
    const [currentLocale, setCurrentLocale] = useState(localStorage.getItem("locale"));
    const { t } = useTranslation()

    
  useEffect(() => {
    console.log('Setting page stuff')
  }, [currentLocale, t])

  const changeLocale = (code) => {
    // storing locale in the localstorage
    localStorage.setItem("locale", code);
    setCurrentLocale(code);
    setDropdown(!dropdown)
    window.location.reload();
  }



  return (<>
      <div className="language-select">
        <div className="d-flex justify-content-end align-items-center language-select-root">
          <div className="dropdown">
            <button
              className="btn btn-link dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              onClick={toggleOpen}
            >
              <BankIcon />
            </button>
            <ul className={`dropdown-menu ${dropdown ? 'show' : ''}`} aria-labelledby="dropdownMenuButton1">
              <li>
                <span className="dropdown-item-text">{t('currency')}</span>
              </li>
              {LOCALES.map(({ code, currency}) => (
                <li key={code}>
                  <button
                    className={classNames('dropdown-item', {
                      disabled: currentLocale === code,
                    })}
                    onClick={() => {changeLocale(code)}}
                  >
                    {currency}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      </>
    )
}

export default LocaleSelector