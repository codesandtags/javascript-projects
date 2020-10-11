const button = document.querySelector("#button");
const audio = document.querySelector("#audio");
const loaderSelector = document.querySelector("#loader");

const MAX_RETRIES = 3;
let retries = 0;

const translateQuote = async (language, quote) => {
  const key = "AIzaSyCddeSwyx9p3mMMrDF1m67N4W0WVLhSZPs";
  const url = `https://translation.googleapis.com/language/translate/v2?target=${language}&key=${key}&q=${quote}`;
  const response = await fetch(url);
  const textTranslated = await response.json();

  if (
    textTranslated &&
    textTranslated.data &&
    textTranslated.data.translations.length > 0
  ) {
    return textTranslated.data.translations[0].translatedText;
  }

  return "";
};

const getAuthor = (author) => {
  return author === "" ? "Unknown" : `${author}`;
};

const showLoadingSpinner = () => {
  loaderSelector.hidden = false;
  button.hidden = true;
};

const hideLoadingSpinner = () => {
  if (!loaderSelector.hidden) {
    loaderSelector.hidden = true;
    button.hidden = false;
  }
};

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

    const author = getAuthor(data.quoteAuthor);
    const quote = data.quoteText;
    const quoteTranslated = await translateQuote("es", quote);
    const formattedQuote = formatQuote(author, quoteTranslated);

    textToSpeech(formattedQuote);
    hideLoadingSpinner();
  } catch (error) {
    debugger;
    if (retries < MAX_RETRIES) {
      retries++;
      getQuoteFromAPI();
    }
  }
};

const formatQuote = (author, quote) => {
  return `${author} dijo, ${quote}. Que tengas un feliz día.`;
};

const textToSpeech = async (text) => {
  VoiceRSS.speech({
    key: "fb1f693e35dc4995a4ad68aa53981824",
    src: text,
    hl: "es-mx",
    v: "Jose",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
};

button.addEventListener("click", getQuoteFromAPI);
