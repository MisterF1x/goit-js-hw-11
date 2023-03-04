import { Notify, Loading } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import {
  clear,
  errorMsg,
  hideEl,
  showEl,
  smoothScroll,
  hideShowBtn,
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
      return errorMsg(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    imgApiService.totalImages = totalHits;
    imgApiService.incrementPage();

    Loading.standard('Loading...');
    setTimeout(() => {
      Notify.info(`Hooray! We found ${total} images.`);

      clear(refs.gallery);

      renderImages(refs.gallery, hits);
      simpleLightbox.refresh();
      hideShowBtn(hits);
      Loading.remove();
      form.reset();
    }, 1000);
  } catch (errorMsg) {}
};

export const onLoadMore = async () => {
  hideEl(refs.loadBtn);
  showEl(refs.loader);

  try {
    const { hits } = await imgApiService.fetchImages();
    setTimeout(() => {
      renderImages(refs.gallery, hits);

      simpleLightbox.refresh();
      smoothScroll(refs.gallery);
      imgApiService.incrementPage();
      hideShowBtn(hits);
      hideEl(refs.loader);
    }, 1000);
  } catch (errorMsg) {}
};
