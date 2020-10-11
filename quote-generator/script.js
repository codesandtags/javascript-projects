const quoteContainer = document.querySelector("#quote-container");
const quoteText = document.querySelector("#quote");
const authorText = document.querySelector("#author");
const twitterButton = document.querySelector("#twitter");
const newQuoteButton = document.querySelector("#new-quote");
const loaderSelector = document.querySelector("#loader");

const MAX_RETRIES = 3;
let retries = 0;

const showLoadingSpinner = () => {
  loaderSelector.hidden = false;
  quoteContainer.hidden = true;
};

const hideLoadingSpinner = () => {
  if (!loaderSelector.hidden) {
    loaderSelector.hidden = true;
    quoteContainer.hidden = false;
  }
};

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
const getQuoteFromAPI = async () => {
  const proxyURL = "https://cors-anywhere.herokuapp.com/";
  const apiURL =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
  const headers = {
    origin: "x-requested-with",
  };
  showLoadingSpinner();

  try {
    const response = await fetch(`${proxyURL}${apiURL}`, {
      headers: headers,
    });
    const data = await response.json();

    authorText.innerText = getAuthor(data.quoteAuthor);
    quoteText.innerText = data.quoteText;
    validateQuoteTextStyle(data.quoteText, quoteText);
    hideLoadingSpinner();
  } catch (error) {
    if (retries < MAX_RETRIES) {
      getQuoteFromAPI();
    }
  }
};

const twiteetQuote = () => {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} ${author}`;

  window.open(twitterUrl, "_blank");
};

// Listeners
newQuoteButton.addEventListener("click", getQuoteFromAPI);
twitterButton.addEventListener("click", twiteetQuote);

getQuoteFromAPI();
