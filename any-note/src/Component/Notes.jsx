import React, { useState, useEffect } from "react";
import "./Notes.css";

function Notes() {
  const [cards, setCards] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCard, setSelectedCard] = useState(null); // <-- new state

  useEffect(() => {
    const savedCards = localStorage.getItem("cards");
    if (savedCards) {
      setCards(JSON.parse(savedCards));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cards", JSON.stringify(cards));
  }, [cards]);

  const addCard = () => {
    if (!title.trim() || !description.trim()) return;

    const newCard = {
      id: Date.now(),
      title,
      description,
    };

    setCards((prev) => [newCard, ...prev]);
    setTitle("");
    setDescription("");
  };

  const closeModal = () => setSelectedCard(null);

  return (
    <div className="notes-container">
      <h2>Create an Anonymous card</h2>
      <input
        className="notes-input"
        type="text"
        placeholder="Card title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="notes-textarea"
        placeholder="Card description..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button className="notes-button" onClick={addCard}>
        Add Card
      </button>

      <div className="cards-list">
        {cards.length === 0 ? (
          <p>No cards yet. Add one above!</p>
        ) : (
          cards.map((card) => (
            <div
              key={card.id}
              className="card-item"
              onClick={() => setSelectedCard(card)}
              tabIndex={0}
              role="button"
              onKeyDown={(e) => { if (e.key === "Enter") setSelectedCard(card); }}
            >
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          ))
        )}
      </div>

      {selectedCard && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal-card"
            onClick={(e) => e.stopPropagation()} 
          >
            <button className="modal-close" onClick={closeModal} aria-label="Close modal">
              &times;
            </button>
            <h2>{selectedCard.title}</h2>
            <p>{selectedCard.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Notes;
