import React, { useEffect, useState } from "react";
import "./quote.css";
import quotes from "../../quotes.json";

const Quote = () => {
  const [quote, setQuote] = useState({
    quote: quotes[0].quote,
    author: quotes[0].author,
  });

  function randomQuote() {
    let randomNumber = Math.floor(Math.random() * quotes.length);
    let newQuote = quotes[randomNumber];
    //update state
    setQuote({
      quote: newQuote.quote,
      author: newQuote.author,
    });
    shuffleQuotes(quotes);
  }
  //shuffle quotes function
  const shuffleQuotes = (arr) => {
    return arr.sort(function () {
      return 0.5 - Math.random();
    });
  };
  useEffect(() => {
    randomQuote();
  }, []);
  return (
    <div className="quoteContainer">
      <p className="quoteBody">{quote.quote}</p>
      <h6 className="quoteAuthor">{quote.author ? quote.author : "Unknown"}</h6>
    </div>
  );
};

export default Quote;
