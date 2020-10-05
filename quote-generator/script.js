const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterButton = document.getElementById("twitter");
const newQuoteButton = document.getElementById("new-quote");

// http://forismatic.com/en/api
// GET Quote from API
const getQuote = async () => {
  const proxyURL = "https://cors-anywhere.herokuapp.com/";
  const apiURL =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
  try {
    const response = await fetch(`${proxyURL}${apiURL}`, {
      headers: {
        origin: "x-requested-with",
      },
    });
    const quote = await response.json();

    authorText.innerText = quote.quoteAuthor;
    quoteText.innerText = quote.quoteText;
  } catch (error) {
    debugger;
    console.error("Upss, there is an error here ", error);
  }
};

// Listeners
newQuoteButton.addEventListener("click", getQuote);

getQuote();
