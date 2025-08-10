import React, { useState, useEffect } from "react";

function Notes() {
    const [cards, setCards] = useState([])
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    // Using local storage for now but backend can save
    useEffect(() => {
        const savedCards = localStorage.getItem("cards")
        if (savedCards) {
            setCards(JSON.parse(savedCards));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("cards", JSON.stringify(cards));
    }, [cards])

    const addCard = async () => {
        if (!title.trim() || !description.trim()) return;

        const newCard = {
            id: Date.now(),
            title,
            description
        };

        setCards((prev) => [newCard, ...prev]); 

        //Clear inputs
        setTitle("");
        setDescription("");
    };


    return (
        <div>
            <h2>Create an Anonymous card</h2>
            <input
                type="text"
                placeholder="Card title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
                placeholder="Card description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{
                    width: "100%",
                    padding: "0.5rem",
                    marginBottom: "0.5rem",
                    minHeight: "60px",
                }}
            />

            <button onClick={addCard}>
                Add Card
            </button>

            <div>
                {cards.map((card) => (
                    <div key={card.id}>
                        <h3 >{card.title}</h3>
                        <p >{card.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Notes
