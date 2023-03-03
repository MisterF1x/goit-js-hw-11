import { Notify } from 'notiflix';

export const clear = el => {
  el.innerHTML = '';
};

export const errorMsg = error => {
  Notify.failure(error);
  console.log(error);
};

export const smoothScroll = el => {
  const { height: cardHeight } = el.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
};
