import { Notify } from 'notiflix';
import { refs } from './refs';
import { imgApiService } from './handlers';

export const clear = el => {
  el.innerHTML = '';
};
export const showEl = el => {
  el.classList.remove('hidden');
};
export const hideEl = el => {
  el.classList.add('hidden');
};
export const errorMsg = error => {
  Notify.failure(`${error}`);
  console.log(error);
};

export const smoothScroll = el => {
  const { height: cardHeight } = el.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
};

export const notification = hits => {
  if (!imgApiService.hasPages || hits.length < imgApiService.perPage) {
    hideEl(refs.loadBtn);
    Notify.warning(
      "We're sorry, but you've reached the end of search results."
    );
  }
};
