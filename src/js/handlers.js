import { Notify, Loading } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import { clear, errorMsg, smoothScroll } from './functions';
import ImgApiService from './fetchAPI';
import { refs } from './refs';
import { renderImages } from './createMarkup';

const imgApiService = new ImgApiService();
let simpleLightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
});

export const onSubmitSearchInput = e => {
  e.preventDefault();
  const form = e.currentTarget;

  imgApiService.query = e.currentTarget.elements.searchQuery.value.trim();
  if (imgApiService.query === '') {
    return errorMsg('Please fill in all the fields!');
  }

  imgApiService
    .fetchImages()
    .then(({ hits, total }) => {
      Loading.standard('Loading...');

      if (hits.length === 0) {
        errorMsg(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }
      Notify.info(`Hooray! We found ${total} images.`);
      clear(refs.gallery);
      renderImages(refs.gallery, hits);
      simpleLightbox.refresh();
    })
    .catch(errorMsg)
    .finally(() => {
      refs.loadBtn.classList.remove('hidden');
      Loading.remove();
      form.reset();
    });
};

export const onLoadMore = () => {
  setTimeout(() => {
    imgApiService
      .fetchImages()
      .then(({ hits }) => {
        renderImages(refs.gallery, hits);
        simpleLightbox.refresh();
        smoothScroll(refs.gallery);
      })
      .finally(() => {});
  }, 1000);
};
