import React, { useState, useEffect } from "react";
import "./Notes.css";
import { BiTrash } from "react-icons/bi";

const BACKEND_URL = "https://anynote-tfdy.onrender.com"; 

function Notes() {
  const [cards, setCards] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {

    const fetchCards = () => {
      fetch(`${BACKEND_URL}/cards`)
        .then((res) => res.json())
        .then(setCards)
        .catch((err) => console.error("Failed to fetch cards:", err));
    };

    fetchCards(); 

    const intervalId = setInterval(fetchCards, 5000); 

    return () => clearInterval(intervalId);
  }, []);

  const addCard = () => {
    if (!title.trim() || !description.trim()) return;

    const newCard = {
      title,
      description,
    };

    fetch(`${BACKEND_URL}/cards`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCard),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to add card");
        }
        return res.json();
      })
      .then((createdCard) => {

        setCards((prev) => [createdCard, ...prev]);
        setTitle("");
        setDescription("");
      })
      .catch((err) => {
        console.error(err);
        alert("Error adding card. Try again.");
      });
  };

  const deleteCard = () => {
    if (!selectedCard) return; 
    fetch(`${BACKEND_URL}/delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({id: selectedCard.id}),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to add card");
        }
        setCards(prev => prev.filter(card => card.id !== selectedCard.id));
        setSelectedCard(null);
      })
      .catch((err) => {
        console.error(err);
        alert("Error deleting card. Try again.");
      });
  }

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
              onKeyDown={(e) => {
                if (e.key === "Enter") setSelectedCard(card);
              }}
            >
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          ))
        )}
      </div>

      {selectedCard && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-delete"
              onClick={deleteCard}
              area-label="Delete card"
            ><BiTrash /></button>
            <button
              className="modal-close"
              onClick={closeModal}
              aria-label="Close modal"
            >
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
