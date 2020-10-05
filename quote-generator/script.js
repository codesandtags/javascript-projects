const quoteContainer = document.querySelector("#quote-container");
const quoteText = document.querySelector("#quote");
const authorText = document.querySelector("#author");
const twitterButton = document.querySelector("#twitter");
const newQuoteButton = document.querySelector("#new-quote");

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
