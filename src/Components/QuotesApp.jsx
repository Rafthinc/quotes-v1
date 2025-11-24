// src/Components/QuotesApp.jsx
import { useState, useEffect } from "react";

import { quotesRO } from "../data_ro.js";
import { quotesEN } from "../data_en.js";

const FAVORITES_KEY = "quotes_favorites";

// încarcă favoritele din localStorage
const loadFavoritesFromStorage = () => {
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error loading favorites from storage", error);
    return [];
  }
};

// salvează favoritele în localStorage
const saveFavoritesToStorage = (favorites) => {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error("Error saving favorites to storage", error);
  }
};

const QuotesApp = () => {
  const [language, setLanguage] = useState("ro");

  function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length); // <- fără []
    return quotes[randomIndex];
  }

  const quotes = language === "ro" ? quotesRO : quotesEN;

  const [quote, setQuote] = useState(() => getRandomQuote());
  const [favorites, setFavorites] = useState(() => loadFavoritesFromStorage());
  const [showFavorites, setShowFavorites] = useState(false);

  // ia un citat random

  // de fiecare dată când se schimbă favoritele, le salvăm în storage
  useEffect(() => {
    saveFavoritesToStorage(favorites);
  }, [favorites]);

  const handleNewQuote = () => {
    const newQuote = getRandomQuote();
    setQuote(newQuote);
  };

  const toggleFavorites = () => {
    setShowFavorites((prev) => !prev);
  };

  const addToFavorites = () => {
    const isAlreadyInFavorites = favorites.some(
      (fav) => fav.text === quote.text && fav.author === quote.author
    );

    if (!isAlreadyInFavorites) {
      setFavorites([...favorites, quote]);
    }
  };

  const deleteFavorite = (indexToDelete) => {
    const updatedFavorites = favorites.filter((_, i) => i !== indexToDelete);
    setFavorites(updatedFavorites);
  };

  useEffect(() => {
    // când se schimbă limba → actualizează citatul
    setQuote(getRandomQuote());
  }, [language]);

  return (
    <div className="container">
      <div className="bg-glow">
        <div className="glow glow-1"></div>
        <div className="glow glow-2"></div>
        <div className="glow glow-3"></div>
      </div>
      <div className="quotes-app">
        <h1 className="app-heading">
          {language === "ro" ? "Citate" : "Quotes"}
        </h1>

        <div className="language-switch">
          <button
            className={language === "ro" ? "active" : ""}
            onClick={() => setLanguage("ro")}
          >
            🇷🇴
          </button>

          <button
            className={language === "en" ? "active" : ""}
            onClick={() => setLanguage("en")}
          >
            🇬🇧
          </button>
        </div>

        <i className="bx bxs-heart fav-icon" onClick={toggleFavorites}></i>

        <div className="quote">
          <i className="bx bxs-quote-alt-left left-quote"></i>
          <p className="quote-text">{quote.text}</p>
          <p className="quote-author">{quote.author}</p>
          <i className="bx bxs-quote-alt-right right-quote"></i>
          <div className="main-site-link">
            <a
              href="https://www.psihoterapie-nutritie.ro"
              target="_blank"
              rel="noopener noreferrer"
              className="main-site-link"
            >
              www.psihoterapie-nutritie.ro
            </a>

            <p className="brand-subtitle">
              Psihoterapie & Nutriție – Roșu Adrian-Francois
            </p>
          </div>
        </div>

        <div className="circles">
          <div className="circle-1"></div>
          <div className="circle-2"></div>
          <div className="circle-3"></div>
          <div className="circle-4"></div>
        </div>

        <div className="buttons">
          <button className="btn btn-new" onClick={handleNewQuote}>
            {language === "ro" ? "Citat nou" : "New Quote"}
          </button>
          <button className="btn btn-fav" onClick={addToFavorites}>
            {language === "ro" ? "Adaugă la favorite" : "Add to Favorites"}
          </button>
        </div>

        {showFavorites && (
          <div className="favorites">
            <button className="btn-close" onClick={toggleFavorites}>
              <i className="bx bx-x"></i>
            </button>

            {favorites.map((favQuote, index) => (
              <div className="fav-quote" key={index}>
                <div className="fav-quote-delete">
                  <i
                    className="bx bx-x-circle"
                    onClick={() => deleteFavorite(index)}
                  ></i>
                </div>
                <div className="fav-quote-content">
                  <div className="fav-quote-text">{favQuote.text}</div>
                  <div className="fav-quote-author">{favQuote.author}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuotesApp;
