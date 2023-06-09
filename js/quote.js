const quote = document.querySelector(".quote");
const quoteText = document.querySelector(".quote-text");
const quoteAuthor = document.querySelector(".quote-author");
const quotes = [
    {
        quote: "1",
        author: "1"
    },
    {
        quote: "2",
        author: "2"
    },
    {
        quote: "3",
        author: "3"
    },
    {
        quote: "4",
        author: "4"
    },
    {
        quote: "5",
        author: "5"
    },
    {
        quote: "6.",
        author: "6"
    },
    {
        quote: "7",
        author: "7"
    },
    {
        quote: "8",
        author: "8"
    },
    {
        quote: "9",
        author: "9"
    },
    {
        quote: "10",
        author: "10"
    },
];

function setQuote() {
  const todayQuote = Math.floor(Math.random() * quotes.length);
  quoteText.textContent = quotes[todayQuote].quote;
  quoteAuthor.textContent = quotes[todayQuote].author;
}

setQuote();