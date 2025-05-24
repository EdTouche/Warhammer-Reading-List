// Warhammer 40K Space Marine & Imperium Novel Tracker (React + TailwindCSS)
import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";

const booksData = [
  {
    title: "Horus Rising",
    author: "Dan Abnett",
    timePeriod: "Horus Heresy",
    faction: "Luna Wolves",
    character: "Horus Lupercal",
    series: "Horus Heresy",
    rating: 9.5,
    summary: "The beginning of the Heresy: Horus ascends to Warmaster.",
    cover: "#",
    read: false,
    favorite: false,
    notes: ""
  },
  {
    title: "Know No Fear",
    author: "Dan Abnett",
    timePeriod: "Horus Heresy",
    faction: "Ultramarines",
    character: "Roboute Guilliman",
    series: "Horus Heresy",
    rating: 9.3,
    summary: "Word Bearers betray the Ultramarines at Calth.",
    cover: "#",
    read: false,
    favorite: false,
    notes: ""
  },
  {
    title: "Dark Imperium",
    author: "Guy Haley",
    timePeriod: "Indomitus Era",
    faction: "Ultramarines",
    character: "Roboute Guilliman",
    series: "Dark Imperium",
    rating: 8.7,
    summary: "Guilliman returns to a corrupted Imperium.",
    cover: "#",
    read: false,
    favorite: false,
    notes: ""
  }
];

function BookCard({ book, toggleRead }) {
  return (
    <div className="bg-neutral-900 text-white shadow-md mb-4 p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-1">{book.title}</h2>
      <p className="text-sm">by {book.author}</p>
      <p className="text-xs text-yellow-400">{book.timePeriod} | {book.faction} | {book.series}</p>
      <p className="text-sm mt-2">{book.summary}</p>
      <button
        onClick={() => toggleRead(book.title)}
        className="mt-4 px-3 py-1 bg-red-700 hover:bg-red-600 text-white rounded"
      >
        {book.read ? "Mark as Unread" : "Mark as Read"}
      </button>
    </div>
  );
}

function App() {
  const [books, setBooks] = useState(() => {
    const saved = localStorage.getItem("warhammer_books");
    return saved ? JSON.parse(saved) : booksData;
  });

  useEffect(() => {
    localStorage.setItem("warhammer_books", JSON.stringify(books));
  }, [books]);

  const toggleRead = (title) => {
    setBooks(prev =>
      prev.map(book =>
        book.title === title ? { ...book, read: !book.read } : book
      )
    );
  };

  return (
    <div className="bg-black min-h-screen text-white p-6">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-extrabold text-red-600">Codex Librarium: Space Marine Reading Tracker</h1>
        <p className="text-gray-400 mt-2">Track, explore, and conquer the lore of the Adeptus Astartes</p>
      </header>
      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map(book => (
          <BookCard key={book.title} book={book} toggleRead={toggleRead} />
        ))}
      </main>
    </div>
  );
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
