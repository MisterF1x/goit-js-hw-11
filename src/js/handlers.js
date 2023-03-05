import { Notify, Loading } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import {
  clear,
  errorMsg,
  hideEl,
  showEl,
  smoothScroll,
  notification,
} from './functions';
import ImgApiService from './fetchAPI';
import { refs } from './refs';
import { renderImages } from './createMarkup';

export const imgApiService = new ImgApiService();
let simpleLightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
});

export const onSubmitSearchInput = async e => {
  e.preventDefault();
  const form = e.currentTarget;
  imgApiService.query = e.currentTarget.elements.searchQuery.value.trim();
  imgApiService.resetPage();

  if (imgApiService.query === '') {
    return errorMsg('Please fill in all the fields!');
  }

  try {
    const { hits, total, totalHits } = await imgApiService.fetchImages();

    if (hits.length === 0) {
      errorMsg(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      clear(refs.gallery);
      hideEl(refs.loadBtn);
      form.reset();
      return;
    }
    imgApiService.totalImages = totalHits;
    imgApiService.incrementPage();

    Loading.standard('Loading...');

    Notify.info(`Hooray! We found ${total} images.`);

    clear(refs.gallery);
    renderImages(refs.gallery, hits);

    simpleLightbox.refresh();

    showEl(refs.loadBtn);
    notification(hits);
    form.reset();
    Loading.remove();
  } catch (errorMsg) {}
};

export const onLoadMore = async () => {
  hideEl(refs.loadBtn);
  showEl(refs.loader);

  try {
    const { hits } = await imgApiService.fetchImages();
    imgApiService.incrementPage();

    setTimeout(() => {
      renderImages(refs.gallery, hits);
      smoothScroll(refs.gallery);
      simpleLightbox.refresh();

      hideEl(refs.loader);
      showEl(refs.loadBtn);
      notification(hits);
    }, 1000);
  } catch (errorMsg) {}
};
