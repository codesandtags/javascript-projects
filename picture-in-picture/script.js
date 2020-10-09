const videoElement = document.querySelector("#video");
const buttonElemnt = document.querySelector("#button");

const selectMediaStream = async () => {
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();

    videoElement.srcObject = mediaStream;
    videoElement.onloadedmetadata = () => {
      videoElement.play();
    };
  } catch (error) {
    debugger;
    console.log(error);
  }
};

buttonElemnt.addEventListener("click", async () => {
  buttonElemnt.disabled = true;
  await videoElement.requestPictureInPicture();
  buttonElemnt.disabled = false;
});

selectMediaStream();
