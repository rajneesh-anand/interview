const axios = require("axios");
async function getImageBuffer() {
  const response = await axios.get(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    { responseType: "arraybuffer" }
  );
  const buffer = Buffer.from(response.data, "utf-8");
  return buffer;
}

getImageBuffer().then((data) => console.log(data));
