import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_AvmzYdxhYUWrUCZ5yeAm9G4fuWK7Ia94l4yDoXF4V38Y2KNkOlvZIaTrjZGD9fqz';

export function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data)
    .catch(error => {
      console.error('Error:', error);
      throw error;
    });
}

export function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
  return axios
    .get(url)
    .then(response => response.data[0])
    .catch(error => {
      console.error('Error:', error);
      throw error;
    });
}
