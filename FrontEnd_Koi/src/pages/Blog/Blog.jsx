import React, { useState } from "react";
import Header from "../../components/header";
import Card from "./Blog_card";
import Footer from "../../components/footer";
import cardData from "./Card_data.jsx";
import "./Blog.css";

const Blog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6;

  // Logic for displaying current cards
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = cardData.slice(indexOfFirstCard, indexOfLastCard);

  // Logic for pagination buttons
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(cardData.length / cardsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="App">
      <Header />
      <div className="cards-container">
        {currentCards.map((card, index) => (
          <Card
            key={index}
            image={card.image}
            title={card.title}
            description={card.description}
            date={card.date}
            url={card.url} // Pass the URL here
          />
        ))}
      </div>
      {/* Pagination */}
      <div className="pagination">
        {pageNumbers.map((number) => (
          <span
            key={number}
            onClick={() => paginate(number)}
            className={number === currentPage ? "active" : ""}
          >
            {number}
          </span>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
