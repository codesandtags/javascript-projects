// Selectors
const imageContainer = document.querySelector("#image-container");
const loader = document.querySelector("#loader");
let photos = [];

// Unsplash
const countPhotos = 10;
const apiKey =
  "183b5711ea11e14d521e7b9bf2572333b9c0e9de0c778b9c6f15e40cfdf42d51";
const UNSPLASH_URL = `https://api.unsplash.com/photos/random/?count=${countPhotos}&client_id=${apiKey}&orientation=landscape`;

const showLoader = () => {
  loader.style.display = "block";
};

const hideLoader = () => {
  loader.style.display = "none";
};

const setAttributes = (element, attributes) => {
  for (key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};

const displayPhotos = (photos) => {
  photos.forEach((photo) => {
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });

    const figure = document.createElement("figure");
    const figureCaption = document.createElement("figcaption");
    figureCaption.innerText = `Taken by ${photo.user.name}, ${photo.user.location}`;

    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    figure.appendChild(img);
    figure.appendChild(figureCaption);
    item.appendChild(figure);
    imageContainer.appendChild(item);
  });
};

const getPhotosFromUnsplash = async () => {
  try {
    showLoader();
    const response = await fetch(UNSPLASH_URL);
    photos = await response.json();
    displayPhotos(photos);
    hideLoader();
  } catch (error) {
    console.log(error);
    debugger;
  }
};

getPhotosFromUnsplash();
