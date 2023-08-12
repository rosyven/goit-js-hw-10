import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

function elementsVisibility(isLoading) {
  if (isLoading) {
    // breedSelect.style.display = 'none';
    catInfo.style.display = 'none';
    loader.style.display = 'block';
    error.style.display = 'none';
  } else {
    // breedSelect.style.display = 'block';
    catInfo.style.display = 'block';
    loader.style.display = 'none';
    error.style.display = 'none';
  }
}

function handleBreedSelectChange(event) {
  const selectedBreedId = event.target.value;
  elementsVisibility(true);

  fetchCatByBreed(selectedBreedId)
    .then(catData => {
      const catName = catData.breeds[0].name;
      const catDescription = catData.breeds[0].description;
      const catTemperament = catData.breeds[0].temperament;
      const catImageURL = catData.url;
      const width = catData.width;
      const height = catData.height;

      catInfo.innerHTML = `
        <h2>${catName}</h2>
        <p>${catDescription}</p>
        <p>Temperament: ${catTemperament}</p>
        <img src="${catImageURL}" alt="Cat Image" width="${width}" height="${height}">
      `;
      elementsVisibility(false);
    })
    .catch(error => {
      console.error('Error:', error);
      elementsVisibility(false);
      //   error.style.display = 'block';
      Notiflix.Notify.failure('Oops! Something went wrong. Try again later.');
    });
}
window.addEventListener('load', () => {
  fetchBreeds()
    .then(breeds => {
      breedSelect.innerHTML = breeds
        .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
        .join('');
      breedSelect.addEventListener('change', handleBreedSelectChange);
      elementsVisibility(false);
      const slimSelect = new SlimSelect({
        select: breedSelect,
      });
    })
    .catch(error => {
      console.error('Error:', error);
      elementsVisibility(false);
      //   error.style.display = 'block';
      Notiflix.Notify.failure('Oops! Something went wrong. Try again later.');
    });
});
