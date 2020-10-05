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
    debugger;
  } catch (error) {
    debugger;
  }
};

getQuote();
