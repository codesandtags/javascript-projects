const quoteContainer = document.querySelector("#quote-container");
const quoteText = document.querySelector("#quote");
const authorText = document.querySelector("#author");
const twitterButton = document.querySelector("#twitter");
const newQuoteButton = document.querySelector("#new-quote");

const getAuthor = (author) => {
  return author === "" ? "- Unknown" : `- ${author}`;
};

const validateQuoteTextStyle = (quote, quoteTextSelector) => {
  if (quote.length > 120) {
    quoteTextSelector.classList.add("long-quote");
  } else {
    quoteTextSelector.classList.remove("long-quote");
  }
};

// http://forismatic.com/en/api
// GET Quote from API
const getQuote = async () => {
  const proxyURL = "https://cors-anywhere.herokuapp.com/";
  const apiURL =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
  const headers = {
    origin: "x-requested-with",
  };

  try {
    const response = await fetch(`${proxyURL}${apiURL}`, {
      headers: headers,
    });
    const data = await response.json();

    authorText.innerText = getAuthor(data.quoteAuthor);
    quoteText.innerText = data.quoteText;
    validateQuoteTextStyle(data.quoteText, quoteText);
  } catch (error) {
    debugger;
    setTimeout(() => {
      getQuote();
    }, 1000);
    console.error("Upss, there is an error here ", error);
  }
};

const twiteetQuote = () => {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;

  window.open(twitterUrl, "_blank");
};

// Listeners
newQuoteButton.addEventListener("click", getQuote);
twitterButton.addEventListener("click", twiteetQuote);

getQuote();
