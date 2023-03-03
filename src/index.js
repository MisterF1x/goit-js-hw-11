import 'modern-normalize';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { refs } from './js/refs';
import { onLoadMore, onSubmitSearchInput } from './js/handlers';

refs.searchForm.addEventListener('submit', onSubmitSearchInput);
refs.loadBtn.addEventListener('click', onLoadMore);
