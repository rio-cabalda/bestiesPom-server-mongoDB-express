import axios from 'axios';

//Unsplash API access key
const unsplashAccessKey = 's4uSfA2ywPdiiM6kASODW7QpkJDGRyA6-A-tbUfMUXo';

const numImages = 100;
// Number of images to fetch

async function fetchMaleImages() {
  try {
    const response = await axios.get(
      `https://api.unsplash.com/photos/random/?count=${numImages}&query=male&orientation=portrait`,
      {
        headers: {
          Authorization: `Client-ID ${unsplashAccessKey}`,
        },
      }
    );

    const imageUrls = response.data.map((imageData: any) => imageData.urls.small);
    return imageUrls;
  } catch (error) {
    console.error('Error fetching images:', error);
    return [];
  }
}

export default fetchMaleImages;